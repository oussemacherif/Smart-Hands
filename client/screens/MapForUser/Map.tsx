import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert,Image } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { SvgXml } from "react-native-svg";
import Slider from "@react-native-community/slider";
import * as geolib from "geolib";

import { port } from "../../port";

import {getProviderData} from "../../store/mapSlice"
// import ItineraryModal from "../components/ItinerairyModal.jsx";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
const google_api = "AIzaSyA6k67mLz5qFbAOpq2zx1GBX9gXqNBeS-Y";

const Map = ({}) => {
  const navigation = useNavigation();
  const [serviceData,setServiceData]=useState([])
  const [getLocation, setGetLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 50.842278,
    longitude: 30.187765,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  });
  const [itineraryMode, setItineraryMode] = useState(false);
  const [filterRadius, setFilterRadius] = useState(10);
  const [sliderValue, setSliderValue] = useState(10);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [mapType, setMapType] = useState("standard");
const [providers,setProviders]=useState([])
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [currentProviderIndex, setCurrentProviderIndex] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${port}/api/service`);
        console.log("hh",result.data);
        
        const imageArray = result.data.map(item => item.service_image);
        setServiceData(imageArray);
        console.log(imageArray);
      } catch (error) {
        console.log(error);
      }
    };
  
    getData();
  }, []);



  const svgXml = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512">
    <path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
  </svg>
`;


  const Person = `<svg xmlns="http://www.w3.org/2000/svg" fill=#001170 viewBox="0 0 320 512"><path d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"/></svg>`;



  const customMapStyle = [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.province",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative.province",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#4e9d91",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station.bus",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station.rail",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#89bdd7",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];
  useEffect(() => {
    const getProviderData = async () => {
      try {
        const res = await axios.get(
          `http://${process.env.EXPO_PUBLIC_SERVER_IP}:3000/api/provider`
        );
        setProviders(res.data);
        console.log(res.data);
        
      } catch (er) {
        console.error(JSON.stringify(er));
      }
    };
  
    getProviderData();
  }, []);


const svgXml3 = `
<svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>.cls-1{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:1.91px;}</style>
  </defs>
  <polyline class="cls-1" points="1.5 23.48 1.5 9.16 12 1.52 22.5 9.16 22.5 23.48"/>
  <path class="cls-1" d="M7.23,14.89h9.55a1.91,1.91,0,0,1,1.91,1.91v3.82a0,0,0,0,1,0,0H5.32a0,0,0,0,1,0,0V16.8a1.91,1.91,0,0,1,1.91-1.91Z"/>
  <line class="cls-1" x1="10.09" y1="17.75" x2="8.18" y2="17.75"/>
  <line class="cls-1" x1="15.82" y1="17.75" x2="13.91" y2="17.75"/>
  <rect class="cls-1" x="7.23" y="20.61" width="0.95" height="1.91"/>
  <rect class="cls-1" x="15.82" y="20.61" width="0.95" height="1.91"/>
  <path class="cls-1" d="M16.77,14.89H7.23l.59-2.38a1.9,1.9,0,0,1,1.85-1.44h4.66a1.9,1.9,0,0,1,1.85,1.44Z"/>
</svg>`
useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGetLocation(userLocation);
      setMapRegion({
        ...mapRegion,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
    })();
  }, [estimatedDuration, mapRegion]);
  const handleSliderChange = (value) => {
    setSliderValue(value);
    setFilterRadius(value);
  };

  const handleSetItinerary = (provider) => {
    setSelectedProvider(provider);
    setTimeout(() => setModalVisible(true), 1500);
    getTime();
  
    const providerLocation = {
      latitude: provider.provider_lattitude,
      longitude: provider.provider_langitude,
    };
  
    mapRef.current.fitToCoordinates([providerLocation], {
      animated: true,
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  };

  const handleStartItinerary = () => {
    handleToggleItineraryMode();
    setModalVisible(false);

    setMapRegion({
      latitude: getLocation.latitude,
      longitude: getLocation.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.001,
    });
  };

  const handleToggleItineraryMode = () => {
    setItineraryMode(!itineraryMode);
  };

  const handleToggleMapType = () => {
    setMapType((prevMapType) =>
      prevMapType === "standard" ? "satellite" : "standard"
    );
  };

  const handleZoomToUser = () => {
    if (getLocation && getLocation.latitude && getLocation.longitude) {
      mapRef.current.animateToRegion({
        latitude: getLocation.latitude,
        longitude: getLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      });
    } else {
      Alert.alert("provider not available", "Please enable provider services.");
    }
  };

  const svgXml1 = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512">
    <path d="M192 32c0-17.7 14.3-32 32-32C383.1 0 512 128.9 512 288c0 17.7-14.3 32-32 32s-32-14.3-32-32C448 164.3 347.7 64 224 64c-17.7 0-32-14.3-32-32zM60.6 220.6L164.7 324.7l28.4-28.4c-.7-2.6-1.1-5.4-1.1-8.3c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32c-2.9 0-5.6-.4-8.3-1.1l-28.4 28.4L291.4 451.4c14.5 14.5 11.8 38.8-7.3 46.3C260.5 506.9 234.9 512 208 512C93.1 512 0 418.9 0 304c0-26.9 5.1-52.5 14.4-76.1c7.5-19 31.8-21.8 46.3-7.3zM224 96c106 0 192 86 192 192c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-70.7-57.3-128-128-128c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
  </svg>
`;
  const getTime = async () => {
    if (
      getLocation &&
      getLocation.latitude &&
      getLocation.longitude &&
      selectedProvider
    ) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${
            getLocation.latitude
          },${getLocation.longitude}&destination=${
            (selectedProvider).provider_lattitude
          },${(selectedProvider). provider_langitude}&key=${google_api}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          const duration = data.routes[0].legs[0].duration.text;
          setEstimatedDuration(duration);
        } else {
          console.error("Error calculating route: ", data.status);
        }
      } catch (error) {
        console.error("Error fetching route data: ", error);
      }
    }
  };
  // const handleNavigateToProfile = (serviceId) => {
  //   if (serviceId) {
  //     navigation.navigate(`vets${serviceId}`, { ServiceId: serviceId });
  //   }
  // };
  const handleNextProvider = () => {
    if (providers&& providers.length > 0) {
      const nextIndex = (currentProviderIndex + 1) % providers.length;
      setCurrentProviderIndex(nextIndex);

      const nextProvider= providers[nextIndex];
      const nextProviderLocation = {
        latitude: (nextProvider).provider_lattitude,
        longitude:(nextProvider). provider_langitude,
      };

      mapRef.current.animateToRegion({
        latitude: nextProviderLocation.latitude,
        longitude: nextProviderLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      });
    }
  };
  const svgXml2 = `
  <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 576 512">
    <path d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"/>
  </svg>`
  return (
    <View style={styles.container}>

 <MapView
   ref={mapRef}
   style={styles.map}
   region={mapRegion}
   mapType={mapType}
   customMapStyle={customMapStyle}
   onLayout={() => {
     mapRef.current.setCamera({
       center: {
         latitude: getLocation?.latitude,
         longitude: getLocation?.longitude,
       },
       pitch: 45,
       zoom: mapRegion.latitudeDelta,
     });
   }}
 > 
   {getLocation && getLocation?.latitude && getLocation?.longitude && (
     <Marker
       coordinate={{
         latitude: getLocation?.latitude,
         longitude: getLocation?.longitude,
       }}
       title="Your location"
     >
       <SvgXml xml={Person} width="30" height="30" />
     </Marker>
   )}
 {providers?.map((provider) => {
     const providerLocation = {
       latitude: provider. provider_lattitude*1,
       longitude:provider. provider_langitude*1,
     };

     if (getLocation && getLocation?.latitude && getLocation?.longitude) {
       const distance = geolib.getDistance(
         {
           latitude: getLocation.latitude,
           longitude: getLocation.longitude,
         },
         providerLocation
       ); 

       if (distance <= filterRadius * 1000) {
         return (
           <Marker
             coordinate={providerLocation}
            
             key={provider.id}
             title={provider.name}
             onPress={() => handleSetItinerary(provider)}
           >
           {
  (provider.serviceId >= 1 && provider.serviceId <= 6) && (
    <Image style={{ width: 30, height: 30 }} source={{uri:serviceData[provider.serviceId - 1]}}></Image>
   
  )
}
          
           </Marker>
         );
       } else {
         return null;
       }
     } else {
       return null;
     }
   })} 
   {getLocation && getLocation?.latitude && getLocation?.longitude && (
     <Circle
       center={{
         latitude: getLocation.latitude,
         longitude: getLocation.longitude,
       }}
       radius={filterRadius * 1000}
       fillColor="rgba(255, 0, 0, 0.1)"
       strokeWidth={1}
       strokeColor="#ffc368"
     />
   )} 
    {itineraryMode && selectedProvider && getLocation && (
    <MapViewDirections
    origin={{
      latitude: getLocation.latitude,
      longitude: getLocation.longitude,
    }}
    destination={{
      latitude: selectedProvider.provider_lattitude*1,
      longitude: selectedProvider.provider_langitude*1,
    }}
    apikey={google_api}
    strokeWidth={5}
    strokeColor="#ffc368"
  />
   )} 
  </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleToggleMapType}
          style={styles.changeView}
        >
     {mapType==="satelitte"?<SvgXml xml={svgXml2} />:  <SvgXml xml={svgXml1} />}
        </TouchableOpacity>

         <TouchableOpacity style={styles.zoomButton} onPress={handleNextProvider}>
         <SvgXml xml={svgXml3} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleZoomToUser} style={styles.locsvg}>
        <SvgXml xml={svgXml} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.sliderContainer}>
          <Text>Filter Radius: {sliderValue} km</Text>
          <Slider
            style={{ width: "80%", height: 40 }}
            minimumValue={1}
            maximumValue={50}
            step={1}
            value={sliderValue}
            onValueChange={handleSliderChange}
          />
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  zoomButton: {
  padding:10,
    backgroundColor: "lightgrey",

    margin: 5, 
    borderRadius: 5,
  },
  changeView: {
  padding:10,
    backgroundColor: "lightgrey",

    margin: 5, 
    borderRadius: 5,
  },
  locsvg: {
  padding:10,
    backgroundColor: "lightgrey",

    margin: 5, 
    borderRadius: 5,
   
  },
  sliderContainer: {
    flex: 1,
    position: "absolute",
    backgroundColor: "transparent",
    bottom: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Map;