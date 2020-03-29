import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as place_reducer from '../modules';
import LeftNav from '../components/LeftNav';


function LeftNavContainer() {
    const places = useSelector(state => state.placeReducer, []);
    const dispatch = useDispatch();

    const onSavePlace = data => {
        dispatch(place_reducer.save_place(data));
        console.log(places)
    };

    return (
        <LeftNav
            places={places}
            onSavePlace={onSavePlace}
        />
    )
}

export default LeftNavContainer;