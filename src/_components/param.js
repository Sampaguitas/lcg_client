import React, { Component } from 'react';
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import '../_styles/main.css';

class Param extends Component{

    componentDidMount() {
        const { name, handleNext } = this.props;
        let thisList = document.getElementById(`list_${name}`);
        thisList.addEventListener('scroll', (e) => {
            if (thisList.scrollTop / (thisList.scrollHeight - thisList.clientHeight ) > 0.9) {
                handleNext(name);
            }
        });
    }

    render() {
        const { name, focused, value, placeholder, onChange, onFocus, onBlur, onHover, options, hover, selection, handleSelect, toggleDropDown } = this.props;
        return(
            <div className="col">
                <label className={_.isEqual(focused, name) || !!selection.name ? "small" : ""} htmlFor={name}>{placeholder}</label>
                <p hidden={!!_.isEqual(focused, name) || selection.name === ''}>{selection.name}</p>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                    <div type="button" className="mdb-icon" onClick={event => toggleDropDown(event, name)}>
                        <svg><FontAwesomeIcon icon={!!_.isEqual(focused, name) || !!selection.name ? faTimes : faChevronDown} /></svg>
                    </div>
                    <ul id={`list_${name}`} className={!_.isEmpty(options) && _.isEqual(focused, name) ? "visible" : ""}>
                        {options.map((option, index) =>
                            <li
                                key={index}
                                type="button"
                                onMouseEnter={event => onHover(event, name, option._id)}
                                onClick={event => handleSelect(event, name, option._id, option.name)}
                                className={option._id === hover ? "selected" : ""}
                                // selected={option._id === hover ? "selected" : ""}
                            >
                                {option.name}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default Param;