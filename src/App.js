import React, { Component } from 'react';
import './App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

class App extends Component {

  state = {
    locations: [
      {title: 'Starfield Coex', location: {lat: 37.5123397, lng: 127.0585714}},
      {title: 'Le Saigong', location: {lat: 37.5113763, lng: 127.0574133}},
      {title: 'Villa guerrero', location: {lat: 37.5113607, lng: 127.0544996}},
      {title: 'Megabox Coex Theater', location: {lat: 37.5124447, lng: 127.0582433}},
      {title: 'Lunaasia restaurant', location: {lat: 37.5098951, lng: 127.0543984}}
    ],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  createMarker = () => {
    for(const m of this.state.locations) {
      <Marker
        title={m.title}
        position={m.position}
      />
    }
  };

  markerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  mapClick = (props) => {
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {
    const mapStyle = {width: '100%'};
    const {locations} = this.state;

    return (
      <Map
        google={this.props.google}
        style={mapStyle}
        onClick={this.mapClick}
        initialCenter={{
          lat: 37.511150,
          lng: 127.056844
        }}
        zoom={17}>
        {locations.map((marker) => (
          <Marker
            title={marker.title}
            position={marker.location}
            onClick={this.markerClick}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.title}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBQzDYeihQyVFS3NhEU0pruH4DiKrKjrC0")
})(App);
