"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Locate } from "lucide-react";

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

    // Bangladesh Bounds
    const bangladeshBounds = L.latLngBounds(
        [20.34, 88.01], // Southwest
        [26.64, 92.67]  // Northeast
    );

    function LocationButton() {
        const map = useMap();

        const handleLocate = (e: React.MouseEvent) => {
            e.preventDefault();
            map.locate().on("locationfound", function (e) {
                setPosition([e.latlng.lat, e.latlng.lng]);
                onLocationSelect(e.latlng.lat, e.latlng.lng);
                map.flyTo(e.latlng, map.getZoom());
            });
        };

        return (
            <button
                onClick={handleLocate}
                className="absolute top-4 right-4 z-[400] bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                title="Locate Me"
                type="button"
            >
                <Locate className="w-6 h-6 text-gray-700" />
            </button>
        );
    }

    return (
        <div className="h-[300px] w-full z-0 relative">
            <MapContainer
                center={position || defaultCenter}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                maxBounds={bangladeshBounds}
                minZoom={6}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onLocationSelect={handleSelect} />
                <LocationButton />
                {position && <Marker position={position} icon={customIcon} />}
            </MapContainer>
        </div>
    );
}
