-- Seed dealers
INSERT INTO dealers (clickdealer_id, name, slug, email, phone, address_line1, address_city, address_postcode, latitude, longitude, is_active)
VALUES
  ('CD001', 'Midlands Motor Co', 'midlands-motor-co', 'sales@midlandsmotorco.co.uk', '01212 345678', '45 Broad Street', 'Birmingham', 'B1 2HF', 52.4862, -1.8904, true),
  ('CD002', 'Northern Cars Direct', 'northern-cars-direct', 'info@northerncarsdirect.co.uk', '01132 456789', '12 The Headrow', 'Leeds', 'LS1 5JW', 53.7997, -1.5492, true),
  ('CD003', 'Capital Auto Group', 'capital-auto-group', 'sales@capitalautogroup.co.uk', '02071 234567', '88 Old Street', 'London', 'EC1V 9AZ', 51.5260, -0.0880, true),
  ('CD004', 'Manchester Motor Village', 'manchester-motor-village', 'hello@mcrmotors.co.uk', '01612 345678', '5 Deansgate', 'Manchester', 'M3 2EN', 53.4808, -2.2426, true),
  ('CD005', 'Scottish Car Centre', 'scottish-car-centre', 'enquiries@scottishcarcentre.co.uk', '01312 345678', '15 Princes Street', 'Edinburgh', 'EH2 2BY', 55.9533, -3.1883, true)
ON CONFLICT (clickdealer_id) DO NOTHING;

-- ── CARS ────────────────────────────────────────────────────────────────────

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD001')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-001', 'car', 'Ford', 'Focus', 'ST-Line 1.0T EcoBoost', 2021, 1599900, 28000, 'Petrol', 'Manual', 'Hatchback', 'Magnetic Grey', 5, '1.0T', 'EK21 ABC', 'Immaculate Ford Focus ST-Line with full service history. Heated seats, Apple CarPlay, rear parking sensors. One previous keeper.', true),
  ('DMS-002', 'car', 'Volkswagen', 'Golf', 'R-Line 2.0 TDI', 2020, 1849900, 42000, 'Diesel', 'Manual', 'Hatchback', 'Deep Black', 5, '2.0T', 'GF20 XYZ', 'VW Golf R-Line in excellent condition. Full VW service history, adaptive cruise control, lane assist.', false),
  ('DMS-003', 'car', 'BMW', '3 Series', '320d Sport', 2022, 2799900, 18500, 'Diesel', 'Automatic', 'Saloon', 'Alpine White', 4, '2.0D', 'YE22 BMW', 'BMW 320d in sport trim. One owner, full BMW dealer history. Pro Navigation, parking cameras, heated steering wheel.', true),
  ('DMS-004', 'car', 'Toyota', 'Yaris', 'Excel Hybrid', 2022, 1899900, 11000, 'Hybrid', 'Automatic', 'Hatchback', 'Scarlet Red', 5, '1.5H', 'MK22 TYT', 'Stunning Toyota Yaris Excel Hybrid with incredibly low mileage. No previous damage, zero road tax, 50+ mpg.', false),
  ('DMS-005', 'car', 'Honda', 'Jazz', 'EX e:HEV', 2023, 2199900, 6500, 'Hybrid', 'Automatic', 'Hatchback', 'Sonic Grey', 5, '1.5H', 'OT23 HND', 'Nearly new Honda Jazz EX with full hybrid powertrain. Magic seats, wireless Apple CarPlay, Honda Sensing suite.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD002')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-101', 'car', 'Nissan', 'Qashqai', 'Tekna+ DIG-T 158', 2022, 2649900, 24000, 'Petrol', 'Automatic', 'SUV', 'Storm White', 5, '1.3T', 'NK22 NIS', 'Nissan Qashqai Tekna+ top spec. ProPilot, Bose audio, panoramic roof, 360-degree camera system. Superb condition.', true),
  ('DMS-102', 'car', 'Hyundai', 'Tucson', 'Ultimate 1.6 CRDi', 2021, 2299900, 31000, 'Diesel', 'Automatic', 'SUV', 'Phantom Black', 5, '1.6D', 'YO21 HYN', 'Hyundai Tucson Ultimate spec, full service history. Heated and ventilated front seats, wireless charging, smart parking.', false),
  ('DMS-103', 'car', 'Kia', 'Sportage', 'GT-Line S 1.6 T-GDi', 2023, 3099900, 9000, 'Petrol', 'Automatic', 'SUV', 'Quantum Blue', 5, '1.6T', 'LE23 KIA', 'Barely used Kia Sportage GT-Line S. 7-year warranty remaining, panoramic sunroof, Harman Kardon audio.', true),
  ('DMS-104', 'car', 'SEAT', 'Leon', 'FR 1.5 TSI Evo', 2020, 1449900, 38000, 'Petrol', 'Manual', 'Hatchback', 'Desire Red', 5, '1.5T', 'GR20 SEA', 'SEAT Leon FR in sporty desire red. Full SEAT service history, digital cockpit, wireless phone charging.', false),
  ('DMS-105', 'car', 'Skoda', 'Octavia', 'SE Technology 2.0 TDI', 2021, 1749900, 35000, 'Diesel', 'Manual', 'Estate', 'Moon White', 5, '2.0D', 'LK21 SKD', 'Hugely practical Skoda Octavia Estate. Full service history, Columbus navigation, electric tailgate.', false),
  ('DMS-106', 'car', 'Audi', 'A3', 'S Line 35 TFSI', 2022, 2449900, 19000, 'Petrol', 'Automatic', 'Saloon', 'Navarra Blue', 4, '1.5T', 'RE22 AUD', 'Audi A3 Saloon S-Line with sport suspension. Virtual cockpit plus, Matrix LED headlights.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD003')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-201', 'car', 'Mercedes-Benz', 'C-Class', 'C300 AMG Line Premium', 2022, 4299900, 14000, 'Petrol', 'Automatic', 'Saloon', 'Obsidian Black', 4, '2.0T', 'YT22 MRC', 'Mercedes C300 AMG Line in immaculate condition. Burmester audio, panoramic sunroof, digital light, night package.', true),
  ('DMS-202', 'car', 'BMW', '5 Series', '530d M Sport', 2021, 3999900, 28000, 'Diesel', 'Automatic', 'Saloon', 'Carbon Black', 4, '3.0D', 'DP21 BMW', 'BMW 530d M Sport with innovation pack. HUD, gesture control, parking assistant plus, Harman Kardon.', true),
  ('DMS-203', 'car', 'Tesla', 'Model 3', 'Long Range AWD', 2022, 3899900, 22000, 'Electric', 'Automatic', 'Saloon', 'Pearl White', 4, 'EV', 'LT22 TSL', 'Tesla Model 3 Long Range AWD. Enhanced autopilot, premium audio, glass roof, over-the-air updates current.', true),
  ('DMS-204', 'car', 'Porsche', 'Cayenne', 'S E-Hybrid', 2021, 7999900, 19000, 'Hybrid', 'Automatic', 'SUV', 'Mahogany', 5, '2.9T', 'KS21 POR', 'Porsche Cayenne S E-Hybrid. PHEV with 25 mile electric range. Sport Chrono, air suspension, Bose surround.', false),
  ('DMS-205', 'car', 'Range Rover', 'Velar', 'R-Dynamic HSE 2.0 D', 2021, 4999900, 31000, 'Diesel', 'Automatic', 'SUV', 'Portofino Blue', 5, '2.0D', 'SK21 RRV', 'Range Rover Velar R-Dynamic HSE. Meridian sound, air suspension, panoramic roof, pixel LED.', false),
  ('DMS-206', 'car', 'Jaguar', 'F-Pace', 'P400 R-Dynamic SE', 2022, 5299900, 16000, 'Petrol', 'Automatic', 'SUV', 'British Racing Green', 5, '3.0T', 'ER22 JAG', 'Jaguar F-Pace R-Dynamic SE with Pivi Pro infotainment. Meridian audio, configurable dynamics, HUD.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD004')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-301', 'car', 'Vauxhall', 'Astra', 'SRi Nav 1.2T', 2021, 1299900, 29000, 'Petrol', 'Manual', 'Hatchback', 'Sapphire Blue', 5, '1.2T', 'NK21 VAX', 'Vauxhall Astra SRi Nav, full service history. IntelliLux LED lights, wireless Apple CarPlay.', false),
  ('DMS-302', 'car', 'Ford', 'Kuga', 'ST-Line X FHEV 2.5', 2022, 2799900, 17000, 'Hybrid', 'Automatic', 'SUV', 'Frozen White', 5, '2.5H', 'WJ22 FRD', 'Ford Kuga ST-Line X with full hybrid. Co-Pilot360, panoramic sunroof, heated front and rear seats.', true),
  ('DMS-303', 'car', 'Renault', 'Zoe', 'GT Line R135 Z.E.50', 2021, 1699900, 24000, 'Electric', 'Automatic', 'Hatchback', 'Celadon Blue', 5, 'EV', 'DL21 REN', 'Renault Zoe GT Line with 245 mile range. Rapid charge capability, BOSE audio, wireless charging.', false),
  ('DMS-304', 'car', 'Peugeot', '3008', 'GT Premium 1.5 BlueHDi', 2021, 2099900, 33000, 'Diesel', 'Automatic', 'SUV', 'Titanium Grey', 5, '1.5D', 'FH21 PGT', 'Peugeot 3008 GT Premium. Panoramic sunroof, Focal audio system, massage seats, night vision.', false),
  ('DMS-305', 'car', 'Citroen', 'e-C4', 'Shine Plus Electric', 2022, 2299900, 12000, 'Electric', 'Automatic', 'Hatchback', 'Platinum Grey', 5, 'EV', 'OT22 CIT', 'Citroen e-C4 with 217 mile range. Advanced Comfort suspension, wireless carplay, 360 degree cameras.', false),
  ('DMS-306', 'car', 'Volkswagen', 'Tiguan', 'R-Line 2.0 TDI 150', 2020, 2199900, 44000, 'Diesel', 'Automatic', 'SUV', 'Deep Black', 5, '2.0D', 'GJ20 VWT', 'VW Tiguan R-Line with DSG auto. Full VW service history, electric tailgate, active info display.', false),
  ('DMS-307', 'car', 'Honda', 'HR-V', 'Advance Style e:HEV', 2023, 2999900, 5000, 'Hybrid', 'Automatic', 'SUV', 'Sonic Grey', 5, '1.5H', 'AD23 HND', 'Brand new Honda HR-V Advance Style. Full hybrid system, panoramic sunroof, wireless Apple CarPlay.', true)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD005')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-401', 'car', 'Subaru', 'Forester', 'e-Boxer Premium', 2021, 2499900, 27000, 'Hybrid', 'Automatic', 'SUV', 'Crystal Black', 5, '2.0H', 'SG21 SUB', 'Subaru Forester e-Boxer with all-wheel drive. EyeSight safety, 8-inch touchscreen, roof rails.', false),
  ('DMS-402', 'car', 'Mazda', 'CX-5', 'Sport Lux 2.5 SKYACTIV-G', 2022, 2999900, 21000, 'Petrol', 'Automatic', 'SUV', 'Soul Red Crystal', 5, '2.5T', 'SP22 MAZ', 'Mazda CX-5 Sport Lux in stunning Soul Red. Bose 10-speaker audio, sunroof, heated and ventilated seats.', true),
  ('DMS-403', 'car', 'Mitsubishi', 'Outlander', 'PHEV Dynamic', 2021, 3499900, 29000, 'Hybrid', 'Automatic', 'SUV', 'Sterling Silver', 5, '2.4H', 'MR21 MIT', 'Mitsubishi Outlander PHEV with 28 mile electric range. 7-seats, twin motor AWD, 360 camera.', false),
  ('DMS-404', 'car', 'Dacia', 'Sandero', 'Stepway Extreme TCe 100', 2023, 1499900, 8000, 'Petrol', 'Manual', 'Hatchback', 'Slate Grey', 5, '1.0T', 'AD23 DAC', 'Brilliant value Dacia Sandero Stepway. MediaNav touchscreen, roof bars, 17-inch alloys.', false),
  ('DMS-405', 'car', 'MG', 'ZS EV', 'Trophy Long Range', 2022, 2299900, 18000, 'Electric', 'Automatic', 'SUV', 'Dover White', 5, 'EV', 'KG22 MGZ', 'MG ZS EV Trophy Long Range with 273 mile range. Panoramic sunroof, heated seats, blind spot monitoring.', false),
  ('DMS-406', 'car', 'Volvo', 'XC40', 'Recharge Ultimate Electric', 2022, 3799900, 14000, 'Electric', 'Automatic', 'SUV', 'Vapour Grey', 5, 'EV', 'LE22 VOL', 'Volvo XC40 Recharge Ultimate. 418 mile range, Harman Kardon audio, full pilot assist, panoramic sunroof.', true),
  ('DMS-407', 'car', 'Ford', 'Puma', 'ST-Line X 1.0T EcoBoost MHEV', 2022, 1999900, 22000, 'Petrol', 'Manual', 'SUV', 'Desert Island Blue', 5, '1.0T', 'FJ22 FRD', 'Ford Puma ST-Line X with mild hybrid. Bang & Olufsen audio, FordPass Connect, heated windscreen.', false),
  ('DMS-408', 'car', 'Audi', 'Q3', 'S line 35 TFSI S Tronic', 2021, 2849900, 26000, 'Petrol', 'Automatic', 'SUV', 'Nano Grey', 5, '1.5T', 'RK21 AUD', 'Audi Q3 S-Line with virtual cockpit plus. Matrix LED, adaptive cruise, parking plus system.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

-- ── VANS ────────────────────────────────────────────────────────────────────

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD001')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-V001', 'van', 'Ford', 'Transit Custom', 'Sport 2.0 EcoBlue 130', 2022, 2499900, 31000, 'Diesel', 'Manual', 'Panel Van', 'Magnetic Grey', 3, '2.0D', 'EK22 FTV', 'Ford Transit Custom Sport. Sport bodykit, heated seats, rear parking sensors, SYNC 3 with Apple CarPlay. Euro 6.', true),
  ('DMS-V002', 'van', 'Mercedes-Benz', 'Sprinter', '314 CDI L2 H2 RWD', 2021, 2999900, 48000, 'Diesel', 'Manual', 'Panel Van', 'White', 3, '2.1D', 'GK21 SPR', 'Mercedes Sprinter 314 CDI L2 H2. Cruise control, DAB radio, reversing camera. Full service history.', false),
  ('DMS-V003', 'van', 'Volkswagen', 'Transporter', 'T6.1 TDI 150 Startline SWB', 2022, 2799900, 22000, 'Diesel', 'Manual', 'Panel Van', 'Candy White', 3, '2.0D', 'WJ22 VWT', 'VW Transporter T6.1 in excellent condition. One owner, VW service history, load-through bulkhead.', true),
  ('DMS-V004', 'van', 'Vauxhall', 'Vivaro', 'Dynamic 2.0 Turbo D L1', 2021, 1999900, 39000, 'Diesel', 'Manual', 'Panel Van', 'Arctic White', 3, '2.0D', 'NK21 VVR', 'Vauxhall Vivaro Dynamic. Air con, rear parking sensors, DAB radio. Well maintained with service history.', false),
  ('DMS-V005', 'van', 'Renault', 'Trafic', 'SL27 Business+ dCi 120', 2020, 1699900, 55000, 'Diesel', 'Manual', 'Panel Van', 'White', 3, '2.0D', 'GL20 RNT', 'Renault Trafic Business+. Air con, navigation, Bluetooth. Ideal workhorse with good service record.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD002')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-V101', 'van', 'Peugeot', 'Expert', 'Professional+ 2.0 BlueHDi 120 L2', 2022, 2299900, 19000, 'Diesel', 'Manual', 'Panel Van', 'Pearl White', 3, '2.0D', 'NK22 PGT', 'Peugeot Expert Professional+ L2. Reversing camera, full partition, side loading door. Excellent condition.', false),
  ('DMS-V102', 'van', 'Ford', 'Transit', '350 L3 H2 Leader 2.0 EcoBlue 130', 2021, 2749900, 42000, 'Diesel', 'Manual', 'Panel Van', 'White', 3, '2.0D', 'YO21 FTT', 'Ford Transit 350 L3 H2. High roof, twin rear doors, rear parking sensors. One fleet owner, full history.', false),
  ('DMS-V103', 'van', 'Citroen', 'Dispatch', 'X 2.0 BlueHDi 120 M', 2021, 2099900, 28000, 'Diesel', 'Manual', 'Panel Van', 'Ice Silver', 3, '2.0D', 'GR21 CIT', 'Citroen Dispatch in excellent shape. Air con, Bluetooth, ply-lined with side door. Ready for work.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

-- ── BIKES ───────────────────────────────────────────────────────────────────

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD003')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-B001', 'bike', 'Honda', 'CB500F', 'ABS', 2022, 599900, 4200, 'Petrol', 'Manual', 'Naked', 'Pearl Glare White', 0, '471cc', 'AB22 HON', 'Honda CB500F ABS. A2 licence compliant. One owner, full Honda dealer service history. DATATAG security fitted.', true),
  ('DMS-B002', 'bike', 'Kawasaki', 'Z650', 'Performance', 2021, 699900, 8100, 'Petrol', 'Manual', 'Naked', 'Metallic Spark Black', 0, '649cc', 'YK21 KAW', 'Kawasaki Z650 in stunning condition. Akrapovic exhaust, tail tidy, pillion seat cover. Full service history.', false),
  ('DMS-B003', 'bike', 'Yamaha', 'MT-07', 'Tech Max', 2022, 849900, 6300, 'Petrol', 'Manual', 'Naked', 'Icon Blue', 0, '689cc', 'GR22 YAM', 'Yamaha MT-07 Tech Max. Quickshifter, heated grips, TFT dash with smartphone connectivity. One owner.', true),
  ('DMS-B004', 'bike', 'Royal Enfield', 'Meteor 350', 'Fireball', 2023, 449900, 2100, 'Petrol', 'Manual', 'Cruiser', 'Fireball Orange', 0, '349cc', 'OT23 REF', 'Royal Enfield Meteor 350 Fireball. Nearly new with warranty remaining. Tripper navigation pod fitted.', false),
  ('DMS-B005', 'bike', 'BMW', 'F900R', 'Sport', 2021, 949900, 11500, 'Petrol', 'Manual', 'Naked', 'Style Sport', 0, '895cc', 'LT21 BMW', 'BMW F900R Sport. Dynamic ESA suspension, heated grips, traction control. Full BMW service history.', false),
  ('DMS-B006', 'bike', 'Triumph', 'Trident 660', 'Matte Silver', 2022, 799900, 5700, 'Petrol', 'Manual', 'Naked', 'Matte Silver Ice / Matte Jet Black', 0, '660cc', 'DK22 TRI', 'Triumph Trident 660 in excellent condition. Traction control, ABS, up/down quickshifter. One lady owner.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD004')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-B101', 'bike', 'Ducati', 'Monster', '937 Plus', 2022, 1149900, 3800, 'Petrol', 'Manual', 'Naked', 'Ducati Red', 0, '937cc', 'WJ22 DUC', 'Ducati Monster 937 Plus. Full colour TFT, cornering ABS and traction control. Termignoni exhaust. Stunning bike.', true),
  ('DMS-B102', 'bike', 'KTM', '390 Duke', 'ABS', 2023, 499900, 1200, 'Petrol', 'Manual', 'Naked', 'White', 0, '373cc', 'AD23 KTM', 'KTM 390 Duke. Nearly new with warranty. A2 compliant, TFT display, cornering ABS. Great starter sports bike.', false),
  ('DMS-B103', 'bike', 'Honda', 'Africa Twin', 'Adventure Sports DCT', 2021, 1249900, 14000, 'Petrol', 'Automatic', 'Adventure', 'Grand Prix Red', 0, '1084cc', 'SK21 HON', 'Honda Africa Twin Adventure Sports with DCT. Long-range fuel tank, heated grips, Android Auto. Full history.', false)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

-- ── MOTORHOMES ──────────────────────────────────────────────────────────────

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD005')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-M001', 'motorhome', 'Swift', 'Escape', '694 4 Berth A-Class', 2021, 6999900, 18000, 'Diesel', 'Automatic', 'A-Class', 'White/Silver', 2, '2.3D', 'YK21 SWF', 'Swift Escape 694 A-Class motorhome. 4 berths, island bed, fixed French bed, garage storage, solar panel, satellite dish.', true),
  ('DMS-M002', 'motorhome', 'Bailey', 'Autograph', '79-4i 4 Berth', 2022, 7499900, 9500, 'Diesel', 'Automatic', 'Coach Built', 'White', 2, '2.3D', 'GK22 BAY', 'Bailey Autograph 79-4i coach built. Fixed island bed, twin singles, large washroom, Truma Combi 6 heating.', false),
  ('DMS-M003', 'motorhome', 'Elddis', 'Autoquest', '196 4 Berth', 2020, 5499900, 28000, 'Diesel', 'Manual', 'Coach Built', 'White/Grey', 2, '2.3D', 'GL20 ELD', 'Elddis Autoquest 196. Fixed bed, U-shaped lounge, Alko ATC, Alde central heating. Well maintained.', false),
  ('DMS-M004', 'motorhome', 'Chausson', 'Welcome', '728 EB 4 Berth', 2021, 6299900, 21000, 'Diesel', 'Automatic', 'Coach Built', 'White', 2, '2.2D', 'NK21 CHA', 'Chausson Welcome 728 EB. Large garage, 4-berth with island bed, satellite TV, reversing camera.', false),
  ('DMS-M005', 'motorhome', 'Hymer', 'B-Class', 'B 578 MC T A-Class', 2022, 8999900, 11000, 'Diesel', 'Automatic', 'A-Class', 'White', 2, '2.3D', 'RE22 HYM', 'Hymer B 578 premium A-Class. Mercedes Sprinter base, bi-directional layout, large garage, premium finish.', true)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

-- ── CARAVANS ────────────────────────────────────────────────────────────────

WITH d AS (SELECT id FROM dealers WHERE clickdealer_id = 'CD005')
INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
SELECT d.id, dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured
FROM d, (VALUES
  ('DMS-C001', 'caravan', 'Bailey', 'Pegasus Grande', 'GT65 Brindisi 4 Berth', 2022, 2499900, 0, 'N/A', 'N/A', 'Tourer', 'White', 0, 'N/A', NULL, 'Bailey Pegasus Grande GT65 4 berth. Fixed island bed, Alde heating, solar panel, super-lightweight at 1,488kg MTPLM.', true),
  ('DMS-C002', 'caravan', 'Swift', 'Challenger', '590 4 Berth', 2021, 1999900, 0, 'N/A', 'N/A', 'Tourer', 'White/Silver', 0, 'N/A', NULL, 'Swift Challenger 590 4-berth tourer. Fixed bed layout, large washroom, Truma Combi heating. Excellent condition.', false),
  ('DMS-C003', 'caravan', 'Elddis', 'Avante', '866 6 Berth', 2020, 1599900, 0, 'N/A', 'N/A', 'Tourer', 'White', 0, 'N/A', NULL, 'Elddis Avante 866 6-berth. Large end washroom, bunk beds, side dinette. Serviced annually, Alko hitch lock included.', false),
  ('DMS-C004', 'caravan', 'Coachman', 'Acadia', '520 2 Berth', 2022, 2199900, 0, 'N/A', 'N/A', 'Tourer', 'White/Graphite', 0, 'N/A', NULL, 'Coachman Acadia 520 2-berth. Fixed bed, large rear washroom, satellite prep, stunning modern interior.', false),
  ('DMS-C005', 'caravan', 'Bailey', 'Unicorn', 'Cartagena V 4 Berth', 2023, 2999900, 0, 'N/A', 'N/A', 'Tourer', 'White', 0, 'N/A', NULL, 'Brand new Bailey Unicorn Cartagena V. Fixed island bed, Ultima EX body, Apple CarPlay connectivity centre. Warranty applies.', true)
) AS v(dms_ref, vehicle_type, make, model, variant, year, price, mileage, fuel_type, transmission, body_type, colour, doors, engine_size, registration, description, featured)
ON CONFLICT DO NOTHING;

-- ── IMAGES ──────────────────────────────────────────────────────────────────

INSERT INTO vehicle_images (vehicle_id, url, position)
SELECT v.id, img.url, img.pos
FROM vehicles v
CROSS JOIN LATERAL (
  SELECT url, pos FROM (VALUES
    (CASE v.vehicle_type
      WHEN 'van'       THEN 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80'
      WHEN 'bike'      THEN 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
      WHEN 'motorhome' THEN 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80'
      WHEN 'caravan'   THEN 'https://images.unsplash.com/photo-1561361058-c12e04f801c0?w=800&q=80'
      ELSE                  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'
    END, 0),
    (CASE v.vehicle_type
      WHEN 'van'       THEN 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&q=80'
      WHEN 'bike'      THEN 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=800&q=80'
      WHEN 'motorhome' THEN 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'
      WHEN 'caravan'   THEN 'https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800&q=80'
      ELSE                  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'
    END, 1),
    (CASE v.vehicle_type
      WHEN 'van'       THEN 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
      WHEN 'bike'      THEN 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80'
      WHEN 'motorhome' THEN 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80'
      WHEN 'caravan'   THEN 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80'
      ELSE                  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80'
    END, 2)
  ) AS t(url, pos)
) AS img(url, pos)
WHERE NOT EXISTS (SELECT 1 FROM vehicle_images vi WHERE vi.vehicle_id = v.id)
ON CONFLICT DO NOTHING;
