import React from 'react';

function PlaceItem(props) {
    const { id, name, onDeletePlace } = props;

    return (
        <li
            key={id}
            className="list-group-item">
            {name}
        </li>
    )
}

export default PlaceItem;