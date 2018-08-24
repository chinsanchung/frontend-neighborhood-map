import React, { Component } from 'react';

let changeArray = [];
let map;
//variables for infowindow
let api;
let data;
let name;
let prefix;
let suffix;
let address;
let canonicalUrl;
let largeInfowindow;
//JSON data from ''./src/data'
let parks = require('./data/locations.json').parks;
let cafes = require('./data/locations.json').cafes;
let restaurants = require('./data/locations.json').restaurants;

class Map extends Component {

  initMap() {
    console.log('init ' + this.props.filter);
    map = new window.google.maps.Map(document.querySelector('.myMap'), {
      center: { lat:  49.262782, lng:  -123.126014 },
      zoom: 11,
      mapTypeControl: false
    });
    largeInfowindow = new window.google.maps.InfoWindow();
    switch(this.props.filter) {
      case 'parks':
        changeArray = [];
        console.log(parks.length)
        for (let i = 0; i < parks.length; i++) {
          let position = parks[i].location;
          let title = parks[i].title;
          let marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: parks[i].id
          });
          changeArray.push(marker);
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
          marker.addListener('keypress', (e) => {
            if(e.key === 'Enter') {
              console.log('a')
              this.getDetails(marker, largeInfowindow);
              marker.setAnimation(null);
            }
          })
        }
        this.props.inputMarkers(changeArray);
        break;
      case 'cafes':
        changeArray = [];
        for (let i = 0; i < cafes.length; i++) {
          let position = cafes[i].location;
          let title = cafes[i].title;
          let marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: cafes[i].id
          });
          changeArray.push(marker);
          this.props.inputMarkers(changeArray);
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
        }
        break;
      case 'restaurants':
        changeArray = [];
        for (let i = 0; i < restaurants.length; i++) {
          let position = restaurants[i].location;
          let title = restaurants[i].title;
          let marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: restaurants[i].id
          });
          changeArray.push(marker);
          this.props.inputMarkers(changeArray);
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
        }
        break;
      case 'all' :
        changeArray = [];
        for (let i = 0; i < parks.length; i++) {
          let position = parks[i].location;
          let title = parks[i].title;
          let marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: parks[i].id
          });
          changeArray.push(marker);
          this.props.inputMarkers(changeArray);
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
        }
        for (let i = 0; i < cafes.length; i++) {
          let position = cafes[i].location;
          let title = cafes[i].title;
          let marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: cafes[i].id
          });
          changeArray.push(marker);
          this.props.inputMarkers(changeArray);
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
        }
        for (let i = 0; i < restaurants.length; i++) {
          let position = restaurants[i].location;
          let title = restaurants[i].title;
          let marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            id: restaurants[i].id
          });
          changeArray.push(marker);
          this.props.inputMarkers(changeArray);
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
        }
        break;
      default:
        console.log('Now there is no filter')
        break;
    }
  }
  // AIzaSyBQzDYeihQyVFS3NhEU0pruH4DiKrKjrC0
  /* Refered by http://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/ */
  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBQzDYeihQyVFS3NhEU0pruH4DiKrKjrC0`;
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

  //Create InfoWindow about marker
  createInfoWindow(marker, infowindow) {
    if(infowindow.marker !== marker) {
      infowindow.marker = marker;

      infowindow.addListener('closeclick', () => {
        infowindow.marker = null;
      });
      infowindow.setContent(`<div>
        <h2 tabIndex="0">${name}</h2>
        <img tabIndex="0" src="${prefix}240x130${suffix}" alt="best photo of ${name}" />
        <h3 tabIndex="0">Address : ${address}</h3>
        <a href="${canonicalUrl}" target="_blank" tabIndex="0">Visit Foursquare page</a>
        </div>`)
      infowindow.open(map, marker);
    }
  }

  //Get data of Foursquare and store them in variables EKTTGCNFBQA4PWPHF0T4OHBXMKBLMQEGCXEHDSVDCL4X2VF4
  getDetails(marker, infowindow) {
    api = `https://api.foursquare.com/v2/venues/${marker.id}?client_id=EKTTGCNFBQA4PWPHF0T4OHBXMKBLMQEGCXEHDSVDCL4X2VF4&client_secret=3WTGE0UZLTWFNZOQ1DNG3J1PC4DNRCS2PXEXJOGWKOI0C5WP&v=20180813`;
    fetch(api, {
      method: 'GET'
    }).then(res => {
      if(res.status === 200) {
        data = res.json().then(data => {
          name = data.response.venue.name;
          address = data.response.venue.location.address;
          canonicalUrl = data.response.venue.canonicalUrl;
          prefix = data.response.venue.bestPhoto.prefix;
          suffix = data.response.venue.bestPhoto.suffix;
          console.log('fetch successed: address= ' + address + ' url=' + canonicalUrl);
          //run createInfoWindow function
          this.createInfoWindow(marker, infowindow);
        })
      } else {
        alert('Foursquare error from fetch status. Check client_id or client_secret.' );
      }
    })
  }
  render() {
    return (
      <div className="myMap" />
    )
  }
}

export default Map;
