import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css'

let locations = [
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
let map;
let markers = [];
let largeInfowindow;

class App extends Component {

  initMap() {
    let styles = [

    ]
    map = new window.google.maps.Map(document.querySelector('.myMap'), {
      center: { lat: 49.2772639, lng: -123.1243984 },
      zoom: 11,

      mapTypeControl: false
    });

    largeInfowindow = new window.google.maps.InfoWindow();

    for (let i = 0; i < locations.length; i++) {
      let position = locations[i].location;
      let title = locations[i].title;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: i
      });
      markers.push(marker);
      marker.addListener('click', () => {
        this.createInfoWindow(marker, largeInfowindow)
      });
    }
  }

  createInfoWindow(marker, infowindow) {
    if(infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);

      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
      });
    }
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBQzDYeihQyVFS3NhEU0pruH4DiKrKjrC0`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.initMap()
      })
    } else {
      this.initMap()
    }
  }



  render() {
    return (
      <div className="myMap" />
    );
  }
}

export default App;
