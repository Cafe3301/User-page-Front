import React, { useEffect, useRef } from 'react';

// O restante do seu código abaixo
const CustomMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const loadGoogleMaps = () => {
            if (window.google && mapRef.current) {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: -15.760729, lng: -47.874290 }, // Coordenadas do local
                    zoom: 15, // Nível de zoom
                    styles: [
                        {
                            "elementType": "geometry",
                            "stylers": [
                                { "color": "#242f3e" }
                            ]
                        },
                        // ... O restante do seu JSON de estilo
                    ]
                });

                // Adiciona um marcador verde
                new window.google.maps.Marker({
                    position: { lat: -15.760729, lng: -47.874290 },
                    map: map,
                    icon: {
                        path: window.google.maps.SymbolPath.CIRCLE,
                        scale: 10,
                        fillColor: '#00ff00',
                        fillOpacity: 1,
                        strokeColor: '#00ff00',
                        strokeWeight: 2,
                    },
                });
            }
        };

        if (window.google) {
            loadGoogleMaps();
        } else {
            // Se o script ainda não foi carregado, tentamos novamente
            const interval = setInterval(() => {
                if (window.google) {
                    loadGoogleMaps();
                    clearInterval(interval);
                }
            }, 100);
        }
    }, []);

    return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default CustomMap;
