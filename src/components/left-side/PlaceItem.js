import React from 'react';
import { PHOTO_LINK, MAP_KEY } from '../../assets/API';

function PlaceItem(props) {
    const { place_id, name, location, photo_reference, rating, onDeletePlace } = props;

    const showInfoWindow = () => {
        console.log(location.lat);
    }

    return (
        <div
            onClick={showInfoWindow}
            className="place-item list-group-item list-group-item-action list-group-item-primary">
            <div className="d-flex w-100">
                <small style={{ display: 'inline-block' }}>{name}</small>
                <small style={{ display: 'inline-block' }}>{rating} / 5.0</small>
                <img src={`${PHOTO_LINK}=${photo_reference}&key=${MAP_KEY}`} alt="name" className="img-thumbnail" />
            </div>
        </div>
    )
}

export default PlaceItem;