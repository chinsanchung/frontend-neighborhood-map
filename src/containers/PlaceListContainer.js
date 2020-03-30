import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as placeReducer from '../modules/place';
import PlaceList from '../components/left-side/PlaceList';

function PlaceListContainer() {
    const places = useSelector(state => state.placeReducer, []);
    const dispatch = useDispatch();

    const onDeletePlace = id => dispatch(placeReducer.delete_place(id));

    return (
        <PlaceList
            places={places}
            onDeletePlace={onDeletePlace}
        />
    )
}

export default PlaceListContainer;