import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { MAP_KEY } from '../assets/API';
import axios from 'axios';
import PlaceListContainer from '../containers/PlaceListContainer';


function LeftNav(props) {
    const { places, onSavePlace } = props;
    const [value, setValue] = useState('');

    // const Navbar = styled.div`
    //     background: #de234d;
    //     /* ${(props) => props.showNav && css`
    //         background: #dddddd;
    //     `} */
    // `
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        onSavePlace({
            id: value,
            name: value
        })
        setValue('');
    };

    return (
        <>
            <div className="col-12 col-sm-3 col=md-3 LeftNav">
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <form onSubmit={onSubmit}>
                                <div className="form-group row">
                                    <input type="text"
                                        id="search"
                                        className="form-control"
                                        name="search"
                                        value={value}
                                        onChange={onChange}
                                    />
                                    <MdSearch className="search-icon" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <PlaceListContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftNav;