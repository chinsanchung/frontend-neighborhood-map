import React, { Component } from 'react';
import Map from './Map';
import SideBar from './SideBar';
import './App.css';

//variables for google map

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    markers: [],
    filter: 'parks'
  }
  //initMap function from Map component. I used refs to get reference from Map.js.
  initMap = () => {
    this.child.current.initMap();
  }
  //To store markers from Map component. It is used to show sideBar component.
  inputMarkers(value) {
    this.setState({ markers: value });
  }

  createInfoWindow = () => {
    this.child.current.createInfoWindow();
  }
  getDetails = () => {
    this.child.current.getDetails();
  }


  //Icon to input filter and filtering lists.
  async changeFilter(value) {
    console.log(value)
    await this.setState({ markers: [], filter: value });
    console.log('filter ' + this.state.filter)
    this.initMap();
  }

  render() {
    return (
      <div className="App">
        <div><nav className="title" role="banner">Places at Vancouver</nav></div>
        <div className="sideButton"
         role="button" aria-labelledby="sideMenu"
         onClick={this.changeSide}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <SideBar
          ref={this.child}
          markers={this.state.markers}
          filter={this.state.filter}
          changeFilter={this.changeFilter.bind(this)}
          getDetails={this.getDetails}
          createInfoWindow={this.createInfoWindow}
        />
        <Map
          ref={this.child}
          markers={this.state.markers}
          filter={this.state.filter}
          inputMarkers={this.inputMarkers.bind(this)}
          getDetails={this.getDetails}
        />
      </div>
    );
  }
}

export default App;
