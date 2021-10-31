import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

import classes from './GoogleMaps.css';

const GoogleMaps = props => {

    const [mapLocation, setMapLocation] = useState({
        data: [],
        loc_x: 0,
        loc_y: 0,
        locRendered: false,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        redirect: false,
        redirectId: 0
    });

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }
    }

    const showPosition = position => {
        setMapLocation({ 
            loc_x: position.coords.latitude,
            loc_y: position.coords.longitude,
            locRendered: true
        })
    }

    useEffect(() => {
        getUserLocation()
        },[]);

    return (
        <div className={classes.Map}>
            {mapLocation}
        </div>
        // <Map
        //   google={props.google}
        //   zoom={11}
        //   className={classes.Map}
        //   initialCenter={{ lat: 47.444, lng: -122.176}}
        // />
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA9p0vGSmFYT0cj5IW-5BNkwIS_21Md1qs'
})(GoogleMaps);