-- Create properties table for real estate listings
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('House', 'Land', 'Flat')),
  description TEXT,
  image_url TEXT,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Since there's no authentication, allow public read access
CREATE POLICY "Allow public read access" ON properties FOR SELECT USING (true);

-- Allow public insert access (no auth required per requirements)
CREATE POLICY "Allow public insert access" ON properties FOR INSERT WITH CHECK (true);

-- Insert some seed data
INSERT INTO properties (title, price, location, type, description, image_url, phone) VALUES
('Modern 3BHK Apartment', 8500000, 'Indiranagar, Bangalore', 'Flat', 'Spacious 3BHK apartment with modern amenities, 24/7 security, covered parking, and a beautiful balcony view. Located in the heart of Indiranagar with easy access to metro and shopping areas.', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', '9876543210'),
('Luxury Villa with Garden', 25000000, 'Whitefield, Bangalore', 'House', 'Stunning 4BHK independent villa with landscaped garden, swimming pool, and home theater. Premium gated community with clubhouse and gym facilities.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', '9876543211'),
('Prime Commercial Land', 15000000, 'Electronic City, Bangalore', 'Land', '5000 sq ft commercial plot in Electronic City Phase 2. Corner plot with excellent road connectivity and approved for commercial construction.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800', '9876543212'),
('Cozy 2BHK Flat', 4500000, 'HSR Layout, Bangalore', 'Flat', 'Well-maintained 2BHK flat in a family-friendly neighborhood. Close to schools, hospitals, and IT parks. Semi-furnished with modular kitchen.', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', '9876543213'),
('Farmhouse with Orchard', 12000000, 'Devanahalli, Bangalore', 'House', 'Beautiful 2-acre farmhouse with mango orchard, bore well, and caretaker quarters. Perfect weekend getaway just 45 minutes from the airport.', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', '9876543214'),
('Residential Plot', 6000000, 'Sarjapur Road, Bangalore', 'Land', '2400 sq ft BMRDA approved residential plot in gated layout. All amenities including underground drainage, street lights, and park.', 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800', '9876543215');
