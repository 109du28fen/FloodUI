import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import newAreaDataImage from './new_area_Data.png';

const CatchpitsMarkers = ({ catchpits, toggleBlocked, xAdjust, yAdjust }) => {
    const map = useMap();

    return (
        <>
            {catchpits.map((feature) => {
                const [longitude, latitude] = feature.geometry.coordinates;
                const isBlocked = feature.properties.blocked;
                const key = feature.id || feature.properties.id;

                // Convert lat/lng to layer point
                const latLng = L.latLng(latitude, longitude);
                const point = map.latLngToLayerPoint(latLng);

                // Apply pixel adjustments
                point.x += xAdjust;
                point.y += yAdjust;

                // Convert back to lat/lng
                const adjustedLatLng = map.layerPointToLatLng(point);

                return (
                    <CircleMarker
                        key={key}
                        center={[adjustedLatLng.lat, adjustedLatLng.lng]}
                        radius={5}
                        color={isBlocked ? 'red' : 'green'}
                        eventHandlers={{
                            click: () => {
                                toggleBlocked(key);
                            },
                        }}
                    />
                );
            })}
        </>
    );
};

const Catchpits = () => {
    const [imageBounds, setImageBounds] = useState(null);
    const [catchpits, setCatchpits] = useState([]);

    // Pixel adjustments for marker positions
    const xAdjust = 10;
    const yAdjust = 10;

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/catchpits.geojson`)
            .then((response) => response.json())
            .then((catchpitsData) => {
                let minLat = Infinity;
                let maxLat = -Infinity;
                let minLng = Infinity;
                let maxLng = -Infinity;

                const convertedFeatures = catchpitsData.features.map((feature, index) => {
                    const [x, y] = feature.geometry.coordinates;
                    const point = L.point(x, y);
                    const latLng = L.CRS.EPSG3857.unproject(point);
                    const latitude = latLng.lat;
                    const longitude = latLng.lng;

                    if (latitude < minLat) minLat = latitude;
                    if (latitude > maxLat) maxLat = latitude;
                    if (longitude < minLng) minLng = longitude;
                    if (longitude > maxLng) maxLng = longitude;

                    return {
                        ...feature,
                        id: feature.id || index,
                        properties: {
                            ...feature.properties,
                            blocked: feature.properties.blocked || false,
                        },
                        geometry: {
                            ...feature.geometry,
                            coordinates: [longitude, latitude],
                        },
                    };
                });

                const imageWidth = 3350;
                const imageHeight = 3000;
                const imageAspectRatio = imageWidth / imageHeight;
                const imageWidthDegrees = maxLng - minLng;
                const imageHeightDegrees = imageWidthDegrees / imageAspectRatio;
                const adjustedMinLat = maxLat - imageHeightDegrees;

                setImageBounds([
                    [adjustedMinLat, minLng],
                    [maxLat, maxLng],
                ]);

                setCatchpits(convertedFeatures);
            })
            .catch((error) => {
                console.error('Error fetching catchpits data:', error);
            });
    }, []);

    const toggleBlocked = (id) => {
        setCatchpits((prevCatchpits) =>
            prevCatchpits.map((feature) =>
                feature.id === id
                    ? {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            blocked: !feature.properties.blocked,
                        },
                    }
                    : feature
            )
        );
    };

    return (
        <MapContainer center={[-36.751697, 174.754]} zoom={15} style={{ height: '600px', width: '100%' }}>
            {imageBounds && (
                <ImageOverlay url={newAreaDataImage} bounds={imageBounds} opacity={0.8} />
            )}

            <CatchpitsMarkers
                catchpits={catchpits}
                toggleBlocked={toggleBlocked}
                xAdjust={xAdjust}
                yAdjust={yAdjust}
            />
        </MapContainer>
    );
};

export default Catchpits;
