import React, { Component } from 'react';

let changeArray = [];
let map;

//JSON data from ''./src/data'
let parks = require('./data/locations.json').parks;
let cafes = require('./data/locations.json').cafes;
let restaurants = require('./data/locations.json').restaurants;

class Map extends Component {
  //Setting marker at switch loop.
  setMarker(value) {
    for (let i = 0; i < value.length; i++) {
      let position = value[i].location;
      let title = value[i].title;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: value[i].id
      });
      changeArray.push(marker);
      this.props.inputMarkers(changeArray);
      //onclick event to open infowindow
      marker.addListener('click', () => {
        this.props.closeInfo();
        this.props.getDetails(map, marker);
        marker.setAnimation(null);
      }, {passive: true});
      marker.addListener('keypress', (e) => {
        if(e.key === 'Enter') {
          this.props.closeInfo();
          this.props.getDetails(map, marker);
          marker.setAnimation(null);
        }
      })
    }
  }

  initMap() {
    console.log('init ' + this.props.filter);
    map = new window.google.maps.Map(document.querySelector('.myMap'), {
      center: { lat:  49.262782, lng:  -123.126014 },
      zoom: 11,
      mapTypeControl: false
    });
    this.props.storeMap(map);
    switch(this.props.filter) {
      case 'parks':
        changeArray = [];
        this.setMarker(parks);
        break;
      case 'cafes':
        changeArray = [];
        this.setMarker(cafes);
        break;
      case 'restaurants':
        changeArray = [];
        this.setMarker(restaurants);
        break;
      case 'all' :
        changeArray = [];
        this.setMarker(parks);
        this.setMarker(restaurants);
        this.setMarker(cafes);
        break;
      default:
        console.log('Now there is no filter')
        break;
    }
  }
  /* Refered by http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/ */
  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = `https://maps.google.com/maps/api/js?key=KEY`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', e => {
        this.initMap();
      })
      s.addEventListener('error', e => {
        alert('Failed to load goolge maps from script')
      })
    } else {
      window.onerror = () => alert('Failed to load goolge maps')
    }
  }

  render() {
    return (
      <div className="myMap" />
    )
  }
}

export default Map;
