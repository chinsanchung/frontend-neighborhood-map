import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { MAP_KEY } from '../assets/API'

function MapContainer() {
    return (
        <Map
            id="myMap"
            className="col-12 col-sm-7"
            google={window.google}
            zoom={16}
            initialCenter={{ lat: 37.570148, lng: 126.976816 }}
            style={{ width: '100%', height: '90vh' }}
            disableDefaultUI
        />

    )
}

export default GoogleApiWrapper({
    apiKey: MAP_KEY
})(MapContainer);