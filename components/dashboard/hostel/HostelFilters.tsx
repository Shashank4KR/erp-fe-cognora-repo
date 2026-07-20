"use client";

import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import { Input } from "@/components/ui/input";
import {
  BLOCK_OPTIONS,
  ROOM_TYPE_OPTIONS,
  STATUS_OPTIONS,
  GENDER_OPTIONS,
} from "@/lib/fixtures/hostel-management-reference-fixture";

interface HostelFiltersProps {
  block: string;
  onBlockChange: (value: string) => void;
  roomType: string;
  onRoomTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onFilter: () => void;
}

export default function HostelFilters({
  block,
  onBlockChange,
  roomType,
  onRoomTypeChange,
  status,
  onStatusChange,
  gender,
  onGenderChange,
  search,
  onSearchChange,
  onFilter,
}: HostelFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
        <Dropdown label="Hostel Block" value={block} options={BLOCK_OPTIONS} onChange={onBlockChange} />
        <Dropdown label="Room Type" value={roomType} options={ROOM_TYPE_OPTIONS} onChange={onRoomTypeChange} />
        <Dropdown label="Status" value={status} options={STATUS_OPTIONS} onChange={onStatusChange} />
        <Dropdown label="Gender" value={gender} options={GENDER_OPTIONS} onChange={onGenderChange} />
        <div>
          <label className="mb-2 block text-xs font-semibold text-slate-700">Search Student</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, roll no..."
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
