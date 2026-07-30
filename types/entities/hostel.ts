export type HostelBlockCreate = {
  name: string;
  block_type: string;
  capacity: number;
};

export type HostelBlockUpdate = {
  name?: string | null;
  block_type?: string | null;
  capacity?: number | null;
};

export type HostelBlockResponse = {
  id: string;
  name: string;
  block_type: string;
  capacity: number;
};

export type RoomCreate = {
  room_number: string;
  block_id: string;
  capacity: number;
  current_occupancy?: number | null;
};

export type RoomUpdate = {
  room_number?: string | null;
  block_id?: string | null;
  capacity?: number | null;
  current_occupancy?: number | null;
};

export type RoomResponse = {
  id: string;
  room_number: string;
  block_id: string;
  capacity: number;
  current_occupancy?: number | null;
};

export type HostelAllocatePayload = {
  student_id: string;
  room_id: string;
};