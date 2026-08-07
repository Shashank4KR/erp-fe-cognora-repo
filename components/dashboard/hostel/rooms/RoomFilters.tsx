"use client";

import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import { Input } from "@/components/ui/input";
const BLOCK_FILTER_OPTIONS = ["All Blocks", "Block A", "Block B", "Block C"];

const ROOM_TYPE_FILTER_OPTIONS = ["All Types", "1 Seater", "2 Seater", "3 Seater", "4 Seater"];

const FLOOR_FILTER_OPTIONS = ["All Floors", "1st Floor", "2nd Floor", "3rd Floor"];

const ROOM_STATUS_OPTIONS = ["All Status", "Occupied", "Partially Vacant", "Vacant", "Maintenance"];

interface RoomFiltersProps {
  block: string;
  onBlockChange: (value: string) => void;
  roomType: string;
  onRoomTypeChange: (value: string) => void;
  floor: string;
  onFloorChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
}

export default function RoomFilters({
  block,
  onBlockChange,
  roomType,
  onRoomTypeChange,
  floor,
  onFloorChange,
  status,
  onStatusChange,
  search,
  onSearchChange,
  onFilter,
}: RoomFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
        <Dropdown label="Hostel Block" value={block} options={BLOCK_FILTER_OPTIONS} onChange={onBlockChange} />
        <Dropdown label="Room Type" value={roomType} options={ROOM_TYPE_FILTER_OPTIONS} onChange={onRoomTypeChange} />
        <Dropdown label="Floor" value={floor} options={FLOOR_FILTER_OPTIONS} onChange={onFloorChange} />
        <Dropdown label="Status" value={status} options={ROOM_STATUS_OPTIONS} onChange={onStatusChange} />
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Search Room</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by room no or type..."
              className="pl-9"
            />
          </div>
        </div>
        <Button
          onClick={onFilter}
          className="inline-flex items-center justify-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg h-9 px-4 text-sm font-semibold whitespace-nowrap w-full"
        >
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>
    </div>
  );
}
