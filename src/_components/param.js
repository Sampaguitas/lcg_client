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
        const { name, focused, value, placeholder, onChange, onFocus, onHover, options, hover, selection, handleSelect, toggleDropDown } = this.props;
        return(
            <div className="col">
                <label className={_.isEqual(focused, name) || !!selection.name ? "small" : ""} htmlFor={name}>{placeholder}</label>
                <p hidden={!!_.isEqual(focused, name) || selection.name === ''}><span className="option-id">{selection._id}</span>{selection.name}</p>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                    />
                    <div type="button" className="mdb-icon" onClick={event => toggleDropDown(event, name)}>
                        <svg><FontAwesomeIcon icon={!!_.isEqual(focused, name) || !!selection.name ? faTimes : faChevronDown} /></svg>
                    </div>
                    <ul id={`list_${name}`} className={!_.isEmpty(options) && _.isEqual(focused, name) ? "ul_visible" : "ul"}>
                        {options.map((option, index) =>
                            <li
                                key={index}
                                type="button"
                                onMouseEnter={event => onHover(event, name, option._id)}
                                onClick={event => handleSelect(event, name, option._id, option.name)}
                                className={option._id === hover ? "li_selected" : "li"}
                                selected={option._id === hover ? "selected" : ""}
                            >
                                <span className="option-id">{option._id}</span>{option.name}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            
        );
    }
}

export default Param;