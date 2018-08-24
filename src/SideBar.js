import React, { Component } from 'react';

class SideBar extends Component {

  //Change marker's CSS..how to connect sideBar's item with marker
  markerAnimation(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      window.setTimeout(() => { marker.setAnimation(null) }, 700);
    }
  }
  //SideBar changing action
  changeSide() {
    document.querySelector('.sideBar').classList.toggle('show');
    document.querySelector('.sideButton').classList.toggle('hide');
  }
  //Event for list item of sideBar
  handleKeyPress = (event, marker) => {
    if(event.key === 'Enter') {
      this.markerAnimation(marker);

    }
  }

  render() {
    const { markers, filter, changeFilter } = this.props;
    return (
      <div className="sideBar">
        <span onClick={this.changeSide} aria-labelledby="Close" className="closeButton">&#8678;</span>
        <div className="filter" role="tablist">
          <span className="filterButton" role="tab" tabIndex="0">
            {filter === 'cafes' ?
              <img className="icon" alt="Cafe lists activated" src="https://png.icons8.com/ios/34/2c3e50/tea-cup-filled.png" />
              : <img className="icon" onClick={() => changeFilter('cafes')} alt="Cafe lists button" src="https://png.icons8.com/ios/34/2c3e50/tea-cup.png" />
            }
          </span>
          <span className="filterButton" role="tab" tabIndex="0">
            {filter === 'restaurants' ?
              <img className="icon" alt="Restaurant lists activated" src="https://png.icons8.com/ios/34/2c3e50/food-and-wine-filled.png" />
              : <img className="icon" onClick={() => changeFilter('restaurants')} alt="Restaurant lists button" src="https://png.icons8.com/ios/34/2c3e50/food-and-wine.png" />
            }
          </span>
          <span className="filterButton" role="tab" tabIndex="0">
            {filter === 'parks' ?
              <img className="icon" alt="Park lists activated" src="https://png.icons8.com/ios/34/2c3e50/city-bench-filled.png" />
              : <img className="icon" onClick={() => changeFilter('parks')} alt="Park lists button" src="https://png.icons8.com/ios/34/2c3e50/city-bench.png" />
            }
          </span>
          <span className="filterButton" role="tab" tabIndex="0">
            {filter === 'all' ?
              <img className="icon" alt="All lists activated" src="https://png.icons8.com/material-rounded/34/2c3e50/summary-list.png" />
              : <img className="icon" onClick={() => changeFilter('all')} alt="Park lists button" src="https://png.icons8.com/material-outlined/34/000000/summary-list.png" />
            }
          </span>
        </div>
        <ul className="locationList">
          {/* Show lists of places */}
          {markers.map((marker, i) => (
            <li key={i} className="location" tabIndex="0" role="menuitem" aria-labelledby="menuitem"
             onClick={() => {
               this.markerAnimation(marker)
               this.props.getDetails()
             }}
             onKeyPress={(event) => this.handleKeyPress(event, marker)}>
              {marker.title}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SideBar;
