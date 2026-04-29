FROM golang:1.22-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY go.mod ./
RUN go mod download || true

COPY . .
RUN go mod tidy && go build -o server ./cmd/server

FROM alpine:3.19

RUN apk add --no-cache ca-certificates

WORKDIR /app

COPY --from=builder /app/server .
COPY migrations ./migrations

EXPOSE 8080

CMD ["./server"]
