import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as placeReducer from '../modules/place';
import LeftNav from '../pages/LeftNav';


function LeftNavContainer() {
    const places = useSelector(state => state.placeReducer, []);
    const dispatch = useDispatch();

    const onSavePlace = data => {
        dispatch(placeReducer.save_place(data));
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