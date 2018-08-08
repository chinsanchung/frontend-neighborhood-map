import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map'
import InfoWindow from './InfoWindow'

class App extends Component {

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
        content: '<div id="infoWindow" />',
        position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener('domready', e => {
      render(<InfoWindow />, document.getElementById('infoWindow'))
    })
    infoWindow.open(map)
  }

  render() {
    const style= {
      bottom: '0px',
      height: '100%',
      left: '30%',
      position: 'absolute',
      right: '0px'
    }
    const locations = [
      {title: 'Starfield Coex', location: {lat: 37.5123397, lng: 127.0585714}},
      {title: 'Le Saigong', location: {lat: 37.5113763, lng: 127.0574133}},
      {title: 'Villa guerrero', location: {lat: 37.5113607, lng: 127.0544996}},
      {title: 'Megabox Coex Theater', location: {lat: 37.5124447, lng: 127.0582433}},
      {title: 'Lunaasia', location: {lat: 37.5098951, lng: 127.0543984}}
    ]
    return (
      <Map
        id="myMap"
        options={{
          center: { lat: 41.0082, lng: 28.9784 },
          zoom: 8
        }}
        onMapLoad={map => {
          const marker = new window.google.maps.Marker({
            position: { lat: 41.0082, lng: 28.9784 },
            map: map,
            title: 'Hello Istanbul!'
          });
          marker.addListener('click', e => {
            this.createInfoWindow(e, map)
          })
        }}
      />
    );
  }
}

export default App;
