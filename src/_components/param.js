import React, { Component } from 'react';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import '../_styles/main.css';

class Param extends Component{

    componentDidMount() {
        const { name, handleNext } = this.props;
        let thisList = document.getElementById(`list_${name}`);
        thisList.addEventListener('scroll', (e) => {
            if (thisList.scrollTop / (thisList.scrollHeight - thisList.clientHeight ) === 1) {
                handleNext(name);
            }
        });
    }

    render() {
        const { name, isFocused, value, placeholder, onChange, onFocus, onBlur, onHover, options, hover } = this.props;
        return(
            <div className="col">
                {/* <div className="mdb-input"> */}
                    {/* <label className="text"> */}
                        <label className={isFocused ? "small" : ""} htmlFor={name}>{placeholder}</label> 
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id={name} name={name}
                                value={value}
                                // placeholder={placeholder}
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                            />
                            <div className="mdb-icon">
                                <svg><FontAwesomeIcon icon={faChevronDown} /></svg>
                            </div>
                            <ul id={`list_${name}`} className={!_.isEmpty(options) ? "visible" : ""}>
                                {options.map((option, index) =>
                                    <li
                                        key={index}
                                        onMouseEnter={event => onHover(event, name, option._id)}
                                        className={option._id === hover ? "selected" : ""}
                                    >
                                        {option.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                    {/* </label> */}
                {/* </div> */}
            </div>
            
        );
    }
}

export default Param;