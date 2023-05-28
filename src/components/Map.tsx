import React, { useEffect, useRef, useState } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

export const Map = () => {
    const [showPolyline, setShowPolyline] = useState(true);

    const { hasLocation,
        initialPosition,
        userLocation,
        routeLines,
        getCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
    } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    const centerPosition = async () => {
        const location = await getCurrentLocation();
        following.current = true;
        mapViewRef.current?.animateCamera({
            center: location,
        });
    };

    useEffect(() => {
        followUserLocation();
        return () => {
            stopFollowUserLocation();
        };
    }, []);

    useEffect(() => {
        if (!following.current) return;
        mapViewRef.current?.animateCamera({
            center: userLocation,
        });
    }, [userLocation]);



    if (!hasLocation) {
        return <LoadingScreen />;
    }

    return (
        <>
            <MapView
                ref={(element) => mapViewRef.current = element!}
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onTouchStart={() => following.current = false}
            >
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor='#000'
                            strokeWidth={3}
                        />
                    )
                }
                {/* <Marker
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='Esto es un titulo'
                    description='Esto es una descripción'
                /> */}
            </MapView>

            <Fab
                iconName='compass-outline'
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                }}
            />
            <Fab
                iconName='brush-outline'
                onPress={() => setShowPolyline(!showPolyline)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 10,
                }}
            />
        </>
    );
};
