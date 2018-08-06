import React, { Component } from 'react';
import './App.css';
import { render } from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyBQzDYeihQyVFS3NhEU0pruH4DiKrKjrC0&v=3&callback=initMap`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  initMap = () => {
    const map = new window.google.maps.Map(
      document.querySelector('googleMap'),
      {
        zoom: 17,
        center: { lat: 37.511260, lng: 127.056780 }
      }
    );
    const marker = new window.google.maps.Marker({
      position: {lat: 37.5123397, lng: 127.0585714},
      map: map
    });
  };
  render() {
    return (
      <Map
        id="googleMap"
        options={{
          zoom: 17,
          center: { lat: 37.511260, lng: 127.056780 }
        }}
        onMapLoad = {(map) => {
          const marker = new window.google.maps.Marker({
            position: {lat: 37.5123397, lng: 127.0585714},
            map: map
          });
        }}
      />
    );
  }
}

export default App;
