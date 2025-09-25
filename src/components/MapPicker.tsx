"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";

export default function MapPicker({
                                      onSelectAction,
                                      initialLat = 35.54441901483873,
                                      initialLng = 134.82017544277463,
                                  }: {
    onSelectAction: (lat: number, lng: number) => void;
    initialLat?: number;
    initialLng?: number;
}) {
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(null);

    // 親の関数をメモ化
    const handleSelect = useCallback((lat: number, lng: number) => {
        setSelected({ lat, lng });
        onSelectAction(lat, lng);
    }, [onSelectAction]);

    useEffect(() => {
        let map: any;
        let L: any;

        (async () => {
            L = (await import("leaflet")).default;

            if (!mapRef.current) {
                map = L.map("map").setView([initialLat, initialLng], 13);
                mapRef.current = map;

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; OpenStreetMap contributors",
                }).addTo(map);

                markerRef.current = L.marker([initialLat, initialLng]).addTo(map);

                map.on("click", (e: any) => {
                    const { lat, lng } = e.latlng;

                    if (markerRef.current) {
                        markerRef.current.setLatLng(e.latlng);
                    } else {
                        markerRef.current = L.marker(e.latlng).addTo(map);
                    }

                    map.panTo(e.latlng);

                    handleSelect(lat, lng);
                });
            }
        })();

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
            markerRef.current = null;
        };
    }, []); // ← 依存配列を空にして初期化は一度だけ

    return (
        <div>
            <div id="map" style={{ height: "400px", width: "100%" }} />
            {selected && (
                <div className="mt-2 text-sm text-gray-700">
                    Selected: lat {selected.lat.toFixed(8)}, lng {selected.lng.toFixed(8)}
                </div>
            )}
        </div>
    );
}
