import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css'

//data of locations
let parks = [
  {title: 'Queen Elizabeth Park', id: '4bdf6cddffdec9287a09eca1', location: {lat: 49.24156455524772, lng: -123.11335520540814}},
  {title: 'Dude Chilling Park', id: '50f1dd8ee4b0ee8fd93bbfff', location:  {lat: 49.26372990146711, lng: -123.09679627418517}},
  {title: 'Willingdon Heights Park', id: '4cacca6c97c8a1cd34f2a3a5', location:  {lat: 49.27118318812597, lng: -123.01172433220292}},
  {title: 'Montrose Park', id: '515218f2e4b0b679251d346f', location: {lat: 49.29277990267122, lng: -123.01411737341326}},
  {title: 'Sunset Park', id: '4d36aaa25f8fa090307de68b', location: {lat: 49.22177935804178, lng: -123.1004339379766}},
  {title: 'Vanier Park', id: '4aad7ad6f964a520836020e3', location: {lat: 49.27581284594059, lng: -123.14214706420898}},
  {title: 'Harbour Green Park', id: '4c474fc476d72d7fa3c03c4d', location: {lat: 49.290062155858095, lng: -123.12171936035156}},
  {title: 'Everett Crowley Park', id: '4bbbe9dfe436ef3b410c5664', location: {lat: 49.21342955433354, lng: -123.02829934550388}},
  {title: 'Central Park', id: '4b68638df964a5207e752be3', location: {lat: 49.22757541544695, lng: -123.01769256591797}},
  {title: 'John Hendry Park', id:'51772465e4b00a8e579d66e5', location: {lat: 	49.256151959732335, lng: -123.06313290541483}}
];
let cafes = [
  {title: 'BAKER & TABLE Cafe', id: '58967ecd6cda1c3ed2a5a1db', location: {lat: 49.22633919601084, lng: -123.09071124288322}},
  {title: 'Le Marché St. George', id: '4d10e635e236548135997aea', location: {lat: 49.245693319217736, lng: -123.09425651520488}},
  {title: 'DAVIDsTEA', id: '4d0d6ab995c1a1cd5f3d02ff', location: {lat: 49.232683123192075, lng: -123.11807422571168}},
  {title: 'Elysian Coffee', id: '5478ca03498e3bbc45e6ce54', location: {lat: 49.26462056353454, lng: -123.10496259408076}},
  {title: 'Second Cup', id: '4b0f1955f964a520245f23e3', location: {lat: 49.28571875469118, lng: -123.11998366306815}},
  {title: 'The Uncommon Cafe', id: '561febcf498ed6af8652c4eb', location: {lat: 49.2831588344176, lng: -123.0937146034284}},
  {title: 'Musette Caffè', id: '5867c5c00e0a1e3ff7270cec', location: {lat: 49.2778200632577, lng: -123.13142182774794}}
]
let restaurants = [
  {title: 'So Hyang Korean Cuisine', id: '55ae2dba498e655d66b8891a', location: {lat: 49.22701912249385, lng: -123.09084195808964}},
  {title: 'Grand Honour Restaurant', id: '4cbb45c5f50e224b51b9f8fb', location: {lat: 49.2343145994551, lng: -123.1399634664646}},
  {title: 'Kissa Tanto', id: '57242c7ecd1040df61be5d0b', location: {lat: 49.28041177451172, lng: -123.09813308998554}},
  {title: 'Nightingale', id: '572e921e498ea744e2e8a8b0', location: {lat: 49.28734262115165, lng: -123.11767449605726}},
  {title: 'Sula', id: '5256c3bf498e4a720085f2cf', location: {lat: 49.27459488485478, lng: 	-123.06953430175781}},
  {title: 'Kuma Japanese Restaurant', id: '522bea74498ede28e9a5b2d5', location: {lat: 49.25614232341938, lng: -123.18494160924303}},
  {title: 'Giardino Restaurant', id: '55515c40498e96daea31c933', location: {lat: 49.27703806011903, lng: -123.130122900779}}
]
//variables for google map
let map;
let changeArray = [];
//variables for infowindow
let largeInfowindow;
let api;
let data;
let name;
let prefix;
let suffix;
let address;
let canonicalUrl;

class App extends Component {
  state = {
    markers: [],
    filter: 'parks'
  }
  initMap() {
    console.log('init ' + this.state.filter)
    map = new window.google.maps.Map(document.querySelector('.myMap'), {
      center: { lat:  49.262782, lng:  -123.126014 },
      zoom: 11,
      mapTypeControl: false
    });

    largeInfowindow = new window.google.maps.InfoWindow();
    switch(this.state.filter) {
      case 'parks':
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
          this.setState({ markers: changeArray });
          //onclick event to open infowindow
          marker.addListener('click', () => {
            this.getDetails(marker, largeInfowindow);
            marker.setAnimation(null);
          }, {passive: true});
        }
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
          this.setState({ markers: changeArray });
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
          this.setState({ markers: changeArray });
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
          this.setState({ markers: changeArray });
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
          this.setState({ markers: changeArray });
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
          this.setState({ markers: changeArray });
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

//Making marker loop for case 'all' It doesn't work..So case 'all' looks so heavy.
  switchloop(filter) {
    for (let i = 0; i < filter.length; i++) {
      let position = filter[i].location;
      let title = filter[i].title;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: filter[i].id
      });
      changeArray.push(marker);
      this.setState({ markers: changeArray });
      //onclick event to open infowindow
      marker.addListener('click', () => {
        this.getDetails(marker, largeInfowindow);
        marker.setAnimation(null);
      }, {passive: true});
    }
  }

  //Change marker's CSS..how to connect sideBar's item with marker
  markerAnimation(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
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
        <h3>${name}</h3>
        <img src="${prefix}210x110${suffix}" alt="best photo of ${name}" />
        <h4>Address : ${address}</h4>
        <a href="${canonicalUrl}" target="_blank">Visit Foursquare page</a>
        </div>`)
      infowindow.open(map, marker);
    }
  }
  //Get data of Foursquare and store them in variables
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
      }
    }).catch(error => {
      alert('Error occurred : ' + error);
    })
  }
  //SideBar changing action
  changeSide() {
    document.querySelector('.sideBar').classList.toggle('show');
    document.querySelector('.sideButton').classList.toggle('hide');
  }
  //Icon to input filter and filtering lists
  async changeFilter(value) {
    console.log('value ' + value)
    await this.setState({ markers: [], filter: value });
    console.log('filter ' + this.state.filter)
    this.initMap();
  }

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
    } else {
      this.initMap();
    }
  }

  //Event for list item of sideBar
  handleKeyPress = (event, marker) => {
    if(event.key == 'Enter') {
      this.markerAnimation(marker);
    }
  }

  render() {
    return (
      <div className="App">
        <div><nav className="title" role="banner">Places at Vancouver</nav></div>
        <div className="sideButton"
         tabIndex="0" role="button" aria-labelledby="sideMenu"
         onClick={this.changeSide}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div className="sideBar">
          <span onClick={this.changeSide} aria-labelledby="Close" className="closeButton" tabIndex="0">&#8678;</span>
          <div className="filter" role="tablist">
            <span className="filterButton" role="tab" tabIndex="0">
              {this.state.filter === 'cafes' ?
                <img className="icon" alt="Cafe lists button" src="https://png.icons8.com/ios/34/2c3e50/tea-cup-filled.png" />
                : <img className="icon" onClick={() => this.changeFilter('cafes')} alt="Cafe lists button" src="https://png.icons8.com/ios/34/2c3e50/tea-cup.png" />
              }
            </span>
            <span className="filterButton" role="tab" tabIndex="0">
              {this.state.filter === 'restaurants' ?
                <img className="icon" alt="Restaurant lists button" src="https://png.icons8.com/ios/34/2c3e50/food-and-wine-filled.png" />
                : <img className="icon" onClick={() => this.changeFilter('restaurants')} alt="Restaurant lists button" src="https://png.icons8.com/ios/34/2c3e50/food-and-wine.png" />
              }
            </span>
            <span className="filterButton" role="tab" tabIndex="0">
              {this.state.filter === 'parks' ?
                <img className="icon" alt="Park lists button" src="https://png.icons8.com/ios/34/2c3e50/city-bench-filled.png" />
                : <img className="icon" onClick={() => this.changeFilter('parks')} alt="Park lists button" src="https://png.icons8.com/ios/34/2c3e50/city-bench.png" />
              }
            </span>
            <span className="filterButton" role="tab" tabIndex="0">
              {this.state.filter === 'all' ?
                <img className="icon" alt="All lists button" src="https://png.icons8.com/material-rounded/34/2c3e50/summary-list.png" />
                : <img className="icon" onClick={() => this.changeFilter('all')} alt="Park lists button" src="https://png.icons8.com/material-outlined/34/000000/summary-list.png" />
              }
            </span>
          </div>
          <ul className="filterUl">
            {/* Show lists of places */}
            {this.state.markers.map((marker, i) => (
              <li key={i} className="filterLi" tabIndex="0" role="menuitem" aria-labelledby="menuitem"
               onClick={() => this.markerAnimation(marker)}
               onKeyPress={(event) => this.handleKeyPress(event, marker)}>
                {marker.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="myMap" />
      </div>
    );
  }
}

export default App;
