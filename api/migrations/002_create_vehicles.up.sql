CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_id UUID NOT NULL REFERENCES dealers(id),
    dms_ref VARCHAR(100),
    vehicle_type VARCHAR(50) NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    variant VARCHAR(255),
    year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    mileage INTEGER NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    body_type VARCHAR(50),
    colour VARCHAR(50),
    doors INTEGER,
    engine_size VARCHAR(20),
    registration VARCHAR(20),
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicle_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vehicles_vehicle_type ON vehicles(vehicle_type);
CREATE INDEX IF NOT EXISTS idx_vehicles_make ON vehicles(make);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON vehicles(year);
CREATE INDEX IF NOT EXISTS idx_vehicles_fuel_type ON vehicles(fuel_type);
CREATE INDEX IF NOT EXISTS idx_vehicles_body_type ON vehicles(body_type);
CREATE INDEX IF NOT EXISTS idx_vehicles_transmission ON vehicles(transmission);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_dealer_id ON vehicles(dealer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_mileage ON vehicles(mileage);
CREATE INDEX IF NOT EXISTS idx_vehicles_search ON vehicles(status, make, fuel_type, body_type, transmission, price, year);
CREATE UNIQUE INDEX idx_vehicles_dealer_dms ON vehicles(dealer_id, dms_ref) WHERE dms_ref IS NOT NULL;