import React, { useState } from 'react';
import PlaceListContainer from '../containers/PlaceListContainer';
import SearchForm from '../components/left-side/SearchForm';

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
            <div className="col-12 col-sm-4 col=md-4 leftNav">
                <div className="container">
                    <div className="row">
                        <div className="col-11">
                            <SearchForm
                                value={value}
                                onSubmit={onSubmit}
                                onChange={onChange}
                            />
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