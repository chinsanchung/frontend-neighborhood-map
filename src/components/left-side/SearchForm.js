import React from 'react';
import { MdSearch } from 'react-icons/md';

function SearchForm(props) {
    const { value, onSubmit, onChange } = props;

    return (
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
    )
}

export default SearchForm;