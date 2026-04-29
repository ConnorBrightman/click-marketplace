package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"

	"github.com/clickdealer/click-marketplace/api/internal/handler"
	"github.com/clickdealer/click-marketplace/api/internal/middleware"
	"github.com/clickdealer/click-marketplace/api/internal/repository"
	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	_ "github.com/lib/pq"
	"github.com/jmoiron/sqlx"
	"github.com/redis/go-redis/v9"
)

func main() {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://clickmarket:secret@localhost:5432/clickmarketplace?sslmode=disable"
	}

	db, err := connectDB(dbURL)
	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer db.Close()

	if err := runMigrations(db); err != nil {
		log.Fatalf("failed to run migrations: %v", err)
	}

	redisURL := os.Getenv("REDIS_URL")
	if redisURL == "" {
		redisURL = "localhost:6379"
	}
	rdb := redis.NewClient(&redis.Options{Addr: redisURL})
	if _, err := rdb.Ping(context.Background()).Result(); err != nil {
		log.Printf("warning: redis unavailable (%v) — caching disabled", err)
	}

	vehicleRepo := repository.NewVehicleRepository(db)
	dealerRepo := repository.NewDealerRepository(db)
	enquiryRepo := repository.NewEnquiryRepository(db)

	vehicleHandler := handler.NewVehicleHandler(vehicleRepo, rdb)
	dealerHandler := handler.NewDealerHandler(dealerRepo, vehicleRepo)
	enquiryHandler := handler.NewEnquiryHandler(enquiryRepo, vehicleRepo, dealerRepo)
	syncHandler := handler.NewSyncHandler(vehicleRepo, dealerRepo)

	r := chi.NewRouter()
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(chimiddleware.RealIP)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "https://*.clickdealer.co.uk"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-API-Key"},
		AllowCredentials: true,
	}))

	r.Route("/api/v1", func(r chi.Router) {
		// Public
		r.Get("/vehicles", vehicleHandler.Search)
		r.Get("/vehicles/{id}", vehicleHandler.GetByID)
		r.Get("/makes", vehicleHandler.GetMakes)
		r.Get("/dealers/{slug}", dealerHandler.GetPublicProfile)
		r.Post("/enquiries", enquiryHandler.Create)
		r.Post("/auth/login", dealerHandler.Login)

		// Dealer (JWT auth)
		r.Group(func(r chi.Router) {
			r.Use(middleware.DealerAuth)
			r.Get("/dealer/dashboard", dealerHandler.GetDashboard)
			r.Get("/dealer/vehicles", vehicleHandler.GetDealerVehicles)
			r.Post("/dealer/vehicles", vehicleHandler.Create)
			r.Put("/dealer/vehicles/{id}", vehicleHandler.Update)
			r.Delete("/dealer/vehicles/{id}", vehicleHandler.Delete)
			r.Get("/dealer/enquiries", enquiryHandler.GetByDealer)
		})

		// DMS sync (API key auth)
		r.Group(func(r chi.Router) {
			r.Use(middleware.APIKeyAuth)
			r.Post("/sync/vehicles", syncHandler.SyncVehicles)
			r.Post("/sync/dealer", dealerHandler.SyncDealer)
		})
	})

	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{"status":"ok"}`))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("server listening on :%s", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatal(err)
	}
}

func connectDB(url string) (*sqlx.DB, error) {
	var db *sqlx.DB
	var err error
	for i := 0; i < 30; i++ {
		db, err = sqlx.Connect("postgres", url)
		if err == nil {
			db.SetMaxOpenConns(25)
			db.SetMaxIdleConns(5)
			return db, nil
		}
		log.Printf("waiting for database... (%d/30)", i+1)
		time.Sleep(2 * time.Second)
	}
	return nil, fmt.Errorf("could not connect to database: %w", err)
}

func runMigrations(db *sqlx.DB) error {
	_, err := db.Exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
		version VARCHAR(255) PRIMARY KEY,
		applied_at TIMESTAMPTZ DEFAULT NOW()
	)`)
	if err != nil {
		return err
	}

	entries, err := os.ReadDir("migrations")
	if err != nil {
		return fmt.Errorf("cannot read migrations dir: %w", err)
	}

	var upFiles []string
	for _, e := range entries {
		if !e.IsDir() && strings.HasSuffix(e.Name(), ".up.sql") {
			upFiles = append(upFiles, e.Name())
		}
	}
	sort.Strings(upFiles)

	for _, filename := range upFiles {
		version := strings.TrimSuffix(filename, ".up.sql")

		var count int
		db.Get(&count, `SELECT COUNT(*) FROM schema_migrations WHERE version=$1`, version)
		if count > 0 {
			continue
		}

		content, err := os.ReadFile(filepath.Join("migrations", filename))
		if err != nil {
			return fmt.Errorf("reading migration %s: %w", filename, err)
		}

		if _, err := db.Exec(string(content)); err != nil {
			return fmt.Errorf("applying migration %s: %w", filename, err)
		}

		db.Exec(`INSERT INTO schema_migrations (version) VALUES ($1)`, version)
		log.Printf("applied migration: %s", version)
	}

	return nil
}
