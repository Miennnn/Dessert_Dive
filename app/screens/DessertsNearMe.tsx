import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SINGAPORE_COORDS = { latitude: 1.3521, longitude: 103.8198 };

const DessertsNearMe: React.FC = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetchPopularDessertLocations();
  }, []);

  const fetchPopularDessertLocations = async () => {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=cafe](1.264,103.605,1.456,104.082);out;`;

    try {
      const response = await axios.get(overpassUrl);
      setPlaces(response.data.elements);
    } catch (error) {
      console.error(error);
    }
  };

  const getAddress = (place) => {
    const address = [];
    if (place.tags['addr:housenumber']) address.push(place.tags['addr:housenumber']);
    if (place.tags['addr:street']) address.push(place.tags['addr:street']);
    if (place.tags['addr:city']) address.push(place.tags['addr:city']);
    return address.join(', ');
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: SINGAPORE_COORDS.latitude,
        longitude: SINGAPORE_COORDS.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          coordinate={{
            latitude: place.lat,
            longitude: place.lon,
          }}
          title={place.tags.name || 'Dessert Place'}
          description={getAddress(place)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default DessertsNearMe;
