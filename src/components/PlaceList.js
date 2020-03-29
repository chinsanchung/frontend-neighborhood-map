import React, { useEffect } from 'react';
import PlaceItem from './PlaceItem';

function PlaceList(props) {
    const { places, onDeletePlace } = props;

    return (
        <div>
            <ul className="list-group list-group-flush">
                {places.map(place => (
                    <PlaceItem
                        id={place.id}
                        name={place.name}
                        onDeletePlace={onDeletePlace}
                    />
                ))}
            </ul>
        </div>
    )
}

export default PlaceList;