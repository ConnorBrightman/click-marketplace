CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID NOT NULL REFERENCES vehicles(id),
    dealer_id UUID NOT NULL REFERENCES dealers(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_dealer_id ON enquiries(dealer_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_vehicle_id ON enquiries(vehicle_id);
