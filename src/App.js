import React, { Component } from 'react';
import Map from './Map';
import SideBar from './SideBar';
import './styles/css/App.css';


//variables for infowindow
let api;
let name;
let prefix;
let suffix;
let address;
let canonicalUrl;
let infoWindows = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    map: '',
    markers: [],
    filter: 'parks'
  }
  //It saves map variable from Map component to give itself to Sidebar.js
  storeMap(value) {
    this.setState({ map: value });
  }
  //initMap function from Map component. I used refs to get reference from Map.js.
  initMap = () => {
    this.child.current.initMap();
  }
  //To store markers from Map component. It is used to show sideBar component.
  inputMarkers(value) {
    this.setState({ markers: value });
  }
  //Get data of Foursquare and store them in variables. Enter your id and secret.
  getDetails(map, marker) {
    api = `https://api.foursquare.com/v2/venues/${marker.id}?client_id=ID&client_secret=SECRET&v=20180813`;
    fetch(api, {
      method: 'GET'
    }).then(res => {
      if(res.status === 200) {
        res.json().then(data => {
          name = data.response.venue.name;
          address = data.response.venue.location.address;
          canonicalUrl = data.response.venue.canonicalUrl;
          prefix = data.response.venue.bestPhoto.prefix;
          suffix = data.response.venue.bestPhoto.suffix;
          console.log('fetch successed: address= ' + address + ' url=' + canonicalUrl);
          //run createInfoWindow function
          this.createInfoWindow(map, marker);
        })
      } else if(res.status === 401) {
        alert('Foursquare error 401. Check client_id or client_secret.' );
      } else if(res.status === 429) {
        alert('Foursquare error 429. Daily call quota exceeded.')
      }
    }).catch(error => {
      alert('Fetch Foursquare API failed. : ' + error);
    })
  }
  //Store infoWindow at array to show only one infoWindow
  closeInfo() {
    for (let i = 0; i < infoWindows.length; i++) {
      infoWindows[i].close();
    }
  }
  //Create InfoWindow and open it.
  createInfoWindow(map, marker) {
    let infoWindow = new window.google.maps.InfoWindow({
        content: `<div>
          <h2 tabIndex="0">${name}</h2>
          <img tabIndex="0" src="${prefix}240x130${suffix}" alt="best photo of ${name}" />
          <h3 tabIndex="0">Address : ${address}</h3>
          <a href="${canonicalUrl}" target="_blank" tabIndex="0">Foursquare Link</a>
          </div>`
    })
    infoWindows.push(infoWindow);

    infoWindow.open(map, marker);
    //InfoWindow will be closed when click the map.
    window.google.maps.event.addListener(map, 'click', () => {
      infoWindow.close();
    });
    /*InfoWindow will be closed when press ESC key.
    Referenced from https://jsfiddle.net/m9w8m/ */
    document.onkeydown = (e) => {
      e = e || window.event;
      if(e.keyCode === 27) {
        infoWindow.close();
      }
    }
  }
  //Icon to input filter and filtering lists.
  async changeFilter(value) {
    if (value !== this.state.filter) {
      await this.setState({ markers: [], filter: value });
    }
    //It will be run after "this.setState({markers: [], filter: vaule})"
    this.initMap();
  }
  //Button for sideBar when page size is small.
  changeSide() {
    document.querySelector('.sideBar').classList.toggle('show');
    document.querySelector('.sideButton').classList.toggle('hide');
  }

  render() {
    return (
      <div className="App">
        <div>
          <nav className="title" role="banner">
            Places at Vancouver
          </nav>
        </div>
        <div className="sideButton"
         role="button" aria-labelledby="sideMenu"
         onClick={this.changeSide}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <SideBar
          map={this.state.map}
          markers={this.state.markers}
          filter={this.state.filter}
          changeFilter={this.changeFilter.bind(this)}
          getDetails={this.getDetails}
          createInfoWindow={this.createInfoWindow}
          closeInfo={this.closeInfo}
          changeSide={this.changeSide}
        />
        <Map
          ref={this.child}
          storeMap={this.storeMap.bind(this)}
          markers={this.state.markers}
          filter={this.state.filter}
          inputMarkers={this.inputMarkers.bind(this)}
          getDetails={this.getDetails}
          createInfoWindow={this.createInfoWindow}
          closeInfo={this.closeInfo}
        />
      </div>
    );
  }
}

export default App;
