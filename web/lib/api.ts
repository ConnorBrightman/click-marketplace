const API_BASE = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface Vehicle {
  id: string;
  dealer_id: string;
  dms_ref?: string;
  vehicle_type: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  price: number;
  price_pence: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  body_type?: string;
  colour?: string;
  doors?: number;
  engine_size?: string;
  registration?: string;
  description?: string;
  status: string;
  featured: boolean;
  views_count: number;
  created_at: string;
  images: VehicleImage[];
  dealer?: Dealer;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  url: string;
  position: number;
}

export interface Dealer {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address_line1?: string;
  address_city?: string;
  address_postcode?: string;
  logo_url?: string;
  website_url?: string;
}

export interface DealerPublicProfile {
  dealer: Dealer;
  vehicles: Vehicle[];
  total: number;
}

export interface SearchResult {
  vehicles: Vehicle[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface SearchParams {
  vehicle_type?: string;
  make?: string;
  model?: string;
  min_price?: string;
  max_price?: string;
  min_year?: string;
  max_year?: string;
  min_mileage?: string;
  max_mileage?: string;
  fuel_type?: string;
  transmission?: string;
  body_type?: string;
  colour?: string;
  doors?: string;
  postcode?: string;
  distance?: string;
  sort?: string;
  page?: string;
  per_page?: string;
  q?: string;
}

export async function searchVehicles(params: SearchParams): Promise<SearchResult> {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v) qs.set(k, v);
  });
  const res = await fetch(`${API_BASE}/api/v1/vehicles?${qs}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}

export async function getVehicle(id: string): Promise<Vehicle> {
  const res = await fetch(`${API_BASE}/api/v1/vehicles/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Vehicle not found");
  return res.json();
}

export async function getDealerBySlug(slug: string): Promise<DealerPublicProfile> {
  const res = await fetch(`${API_BASE}/api/v1/dealers/${slug}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Dealer not found");
  return res.json();
}

export async function getMakes(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/api/v1/makes`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function submitEnquiry(data: {
  vehicle_id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}): Promise<void> {
  const res = await fetch(`/api/v1/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit enquiry");
}

export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pence / 100);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat("en-GB").format(miles) + " miles";
}
