"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import TransportDatePicker from "./TransportDatePicker";
import {
  ROUTE_OPTIONS,
  VEHICLE_OPTIONS,
  DRIVER_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/fixtures/transport-management-reference-fixture";

interface TransportFiltersProps {
  route: string;
  onRouteChange: (value: string) => void;
  vehicle: string;
  onVehicleChange: (value: string) => void;
  driver: string;
  onDriverChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  fromDate: string;
  onFromDateChange: (value: string) => void;
  toDate: string;
  onToDateChange: (value: string) => void;
  onFilter: () => void;
  onReset: () => void;
}

export default function TransportFilters({
  route,
  onRouteChange,
  vehicle,
  onVehicleChange,
  driver,
  onDriverChange,
  status,
  onStatusChange,
  fromDate,
  onFromDateChange,
  toDate,
  onToDateChange,
  onFilter,
  onReset,
}: TransportFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 items-end">
        <Dropdown label="Route" value={route} options={ROUTE_OPTIONS} onChange={onRouteChange} />
        <Dropdown label="Vehicle" value={vehicle} options={VEHICLE_OPTIONS} onChange={onVehicleChange} />
        <Dropdown label="Driver" value={driver} options={DRIVER_OPTIONS} onChange={onDriverChange} />
        <Dropdown label="Status" value={status} options={STATUS_OPTIONS} onChange={onStatusChange} />
        <TransportDatePicker label="From Date" value={fromDate} onChange={onFromDateChange} />
        <TransportDatePicker label="To Date" value={toDate} onChange={onToDateChange} />
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
