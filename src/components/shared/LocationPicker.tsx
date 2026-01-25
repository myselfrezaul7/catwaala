"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet/Next.js icon issue
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

type LocationPickerProps = {
    onLocationSelect: (lat: number, lng: number) => void;
    initialLat?: number;
    initialLng?: number;
};

// Component to handle map clicks
function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function LocationPicker({ onLocationSelect, initialLat, initialLng }: LocationPickerProps) {
    const [position, setPosition] = useState<[number, number] | null>(
        initialLat && initialLng ? [initialLat, initialLng] : null
    );

    const handleSelect = (lat: number, lng: number) => {
        setPosition([lat, lng]);
        onLocationSelect(lat, lng);
    };

    // Default center: Dhaka
    const defaultCenter: [number, number] = [23.8103, 90.4125];

    return (
        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 z-0 relative">
            <MapContainer
                center={position || defaultCenter}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onLocationSelect={handleSelect} />
                {position && <Marker position={position} icon={customIcon} />}
            </MapContainer>
        </div>
    );
}
