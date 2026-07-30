export type TransportRouteCreate = {
  name: string;
  start_point: string;
  end_point: string;
  stops?: string[] | null;
  distance_km?: number | null;
  estimated_duration_minutes?: number | null;
};

export type TransportRouteUpdate = {
  name?: string | null;
  start_point?: string | null;
  end_point?: string | null;
  stops?: string[] | null;
  distance_km?: number | null;
  estimated_duration_minutes?: number | null;
};

export type TransportRouteResponse = {
  id: string;
  name: string;
  start_point: string;
  end_point: string;
  stops?: string[] | null;
  distance_km?: number | null;
  estimated_duration_minutes?: number | null;
};

export type VehicleCreate = {
  registration_number: string;
  vehicle_type: string;
  capacity: number;
  route_id?: string | null;
  driver_id?: string | null;
};

export type VehicleUpdate = {
  registration_number?: string | null;
  vehicle_type?: string | null;
  capacity?: number | null;
  route_id?: string | null;
  driver_id?: string | null;
};

export type VehicleResponse = {
  id: string;
  registration_number: string;
  vehicle_type: string;
  capacity: number;
  route_id?: string | null;
  driver_id?: string | null;
};

export type DriverCreate = {
  name: string;
  license_number: string;
  phone: string;
  address?: string | null;
};

export type DriverUpdate = {
  name?: string | null;
  license_number?: string | null;
  phone?: string | null;
  address?: string | null;
};

export type DriverResponse = {
  id: string;
  name: string;
  license_number: string;
  phone: string;
  address?: string | null;
};