import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as place_reducer from '../modules';
import PlaceList from '../components/PlaceList';

function PlaceListContainer() {
    const places = useSelector(state => state.placeReducer, []);
    const dispatch = useDispatch();

    const onDeletePlace = id => dispatch(place_reducer.delete_place(id));

    return (
        <PlaceList
            places={places}
            onDeletePlace={onDeletePlace}
        />
    )
}

export default PlaceListContainer;