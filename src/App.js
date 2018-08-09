import React, { Component } from 'react';
import { render } from 'react-dom';
import Map from './Map'


class App extends Component {
  state = {
    markers: [
      {title: 'Queen Elizabeth Park', location: {lat: 49.241757, lng: -123.112619}},
      {title: 'Dude Chilling Park', location:  {lat: 49.264107, lng: -123.096414}},
      {title: 'Willingdon Heights Park',  location:  {lat: 49.271739, lng: -123.013138}},
      {title: 'Montrose Park', location: {lat: 49.292512, lng: -123.019125}},
      {title: 'Avondale Park', location: {lat: 49.252357, lng: -123.018648}},
      {title: 'Sunset Park', location: {lat: 49.222761, lng: -123.096660}},
      {title: 'Deer Lake Park', location: {lat: 49.235635, lng: -122.979485}},
      {title: 'Pacific Spirit Regional Park', location: {lat: 49.253286, lng: -123.215603}},
      {title: 'Vanier Park', location: {lat: 49.277288, lng: -123.143550}},
      {title: 'Harbour Green Park', location: {lat: 49.289335, lng: -123.121772}}
    ]
  }

  makeMarker = (map, markers) => {
    for (let i = 0; i < markers.length; i++) {
      let position = markers[i].location;
      let title = markers[i].title;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: i
      });
      marker.addListener('click', e => {
        this.createInfoWindow(e, map)
      })
    }
  };

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow"><p>111</p></div>',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },

    })
    infoWindow.open(map)
  }

  render() {
    return (
      <Map
        id="myMap"
        options={{
          center: { lat: 49.2772639, lng: -123.1243984 },
          zoom: 12
        }}
        onMapLoad = {(map) => {
          this.makeMarker(map, this.state.markers);
        }}
      />
    );
  }
}

export default App;
