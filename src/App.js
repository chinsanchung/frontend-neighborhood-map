import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css'

let locations = [
  {title: 'Queen Elizabeth Park', id: '4bdf6cddffdec9287a09eca1', location: {lat: 49.24156455524772, lng: -123.11335520540814}},
  {title: 'Dude Chilling Park', id: '50f1dd8ee4b0ee8fd93bbfff', location:  {lat: 49.26372990146711, lng: -123.09679627418517}},
  {title: 'Willingdon Heights Park', id: '4cacca6c97c8a1cd34f2a3a5', location:  {lat: 49.27118318812597, lng: -123.01172433220292}},
  {title: 'Montrose Park', id: '515218f2e4b0b679251d346f', location: {lat: 49.29277990267122, lng: -123.01411737341326}},
  {title: 'Sunset Park', id: '4d36aaa25f8fa090307de68b', location: {lat: 49.22177935804178, lng: -123.1004339379766}},
  {title: 'Deer Lake Park', id: '4c8980ea2e33370437b7bb41', location: {lat: 49.239344988615166, lng: -122.97048568725586}},
  {title: 'Pacific Spirit Regional Park', id: '4b368eeff964a520f83725e3', location: {lat: 49.24926287964058, lng: -123.21136951446533}},
  {title: 'Vanier Park', id: '4aad7ad6f964a520836020e3', location: {lat: 49.27581284594059, lng: -123.14214706420898}},
  {title: 'Harbour Green Park', id: '4c474fc476d72d7fa3c03c4d', location: {lat: 49.290062155858095, lng: -123.12171936035156}},
  {title: 'Everett Crowley Park', id: '4bbbe9dfe436ef3b410c5664', location: {lat: 49.21342955433354, lng: -123.02829934550388}},
  {title: 'Central Park', id: '4b68638df964a5207e752be3', location: {lat: 49.22757541544695, lng: -123.01769256591797}}
];
let map;
let markers = [];
//variables for infowindow
let largeInfowindow;
let api;
let address;
let canonicalUrl;

class App extends Component {

  initMap() {
    let styles = [

    ]
    map = new window.google.maps.Map(document.querySelector('.myMap'), {
      center: { lat: 49.2772639, lng: -123.1243984 },
      zoom: 11,

      mapTypeControl: false
    });

    //Make marker with locations array
    largeInfowindow = new window.google.maps.InfoWindow();
    for (let i = 0; i < locations.length; i++) {
      let position = locations[i].location;
      let title = locations[i].title;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: locations[i].id
      });
      markers.push(marker);
      marker.addListener('click', () => {
        this.createInfoWindow(marker, largeInfowindow)
      }, {passive: true});
    }
  }

  // let client_id = EKTTGCNFBQA4PWPHF0T4OHBXMKBLMQEGCXEHDSVDCL4X2VF4;
  // let client_secret = 3WTGE0UZLTWFNZOQ1DNG3J1PC4DNRCS2PXEXJOGWKOI0C5WP;

  getDetails(marker) {
    api = `https://api.foursquare.com/v2/venues/${marker.id}?client_id=EKTTGCNFBQA4PWPHF0T4OHBXMKBLMQEGCXEHDSVDCL4X2VF4&client_secret=3WTGE0UZLTWFNZOQ1DNG3J1PC4DNRCS2PXEXJOGWKOI0C5WP&v=20180813`;
    fetch(api, {
      method: 'GET'
    }).then(res => {
      console.log(res);
      let data = res.json().then(data => {
        console.log(data)
        address = data.response.venue.location.address;
        canonicalUrl = data.response.venue.canonicalUrl;
      })
    })
  }

  //Create InfoWindow about marker
  createInfoWindow(marker, infowindow) {
    if(infowindow.marker !== marker) {
      this.getDetails(marker);
      infowindow.marker = marker;

      infowindow.setContent(
        `<div>
          <h5>${marker.title}</h5>
          <h6>Address: ${address}</h6>
          <a href="${canonicalUrl}">Details about ${marker.title}</a>
        </div>`
      );
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

  //sideBar section


  render() {
    return (
      <div className="App">
        <div className="sideBar">
          <h2 className="title">Parks in Vancouver</h2>
          <form id="searchForm">
            <input type="text" id="searchText" placeholder="test"/>
            <input type="button" id="submit" value="Zoom"/>
          </form>
        </div>
        <div className="myMap" />
      </div>
    );
  }
}

export default App;
