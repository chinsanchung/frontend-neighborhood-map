import React, { useEffect } from 'react';
import PlaceItem from './PlaceItem';

function PlaceList(props) {
    const { places, onDeletePlace } = props;

    return (
        <>
            <div className="list-group list-group-flush">
                {places.map(place => (
                    <PlaceItem
                        key={place.place_id}
                        place_id={place.place_id}
                        name={place.name}
                        location={place.geometry.location}
                        photo_reference={place.photos[0].photo_reference}
                        rating={place.rating}
                        onDeletePlace={onDeletePlace}
                    />
                ))}
            </div>
        </>
    )
}

export default PlaceList;