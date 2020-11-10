import React, { Component } from 'react';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Param from '../_components/param';
import logo from '../_assets/logo.jpg';
import _ from 'lodash';

class Page extends Component{
    constructor(props) {
        super(props);
        this.state = {
            params: {
                sizeOne: { value: '', placeholder: 'Outside diameter 1', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                sizeTwo: { value: '', placeholder: 'Outside diameter 2', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                sizeThree: { value: '', placeholder: 'Outside diameter 3', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                wtOne: { value: '', placeholder: 'Wall thickness 1', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                wtTwo: { value: '', placeholder: 'Wall thickness 2', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                type: { value: '', placeholder: 'Article type', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'type', _length: 3 },
                spec: { value: '', placeholder: 'Specification', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'spec', _length: 3 },
                grade: { value: '', placeholder: 'Material grade', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'grade', _length: 3 },
                heat: { value: '', placeholder: 'Heat treatment', selection: { _id: 'FF', name: ''}, options: [], hover: '', page: 0, path: 'heat', _length: 2 },
                length: { value: '', placeholder: 'Length', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'length', _length: 3 },
                end: { value: '', placeholder: 'Ends', selection: { _id: 'FF', name: ''}, options: [], hover: '', page: 0, path: 'end', _length: 2 },
                surface: { value: '', placeholder: 'Surface treatment', selection: { _id: 'FF', name: ''}, options: [], hover: '', page: 0, path: 'surface', _length: 2 },
                cdi: { value: '', placeholder: 'CDI', selection: { _id: 'F', name: ''}, options: [], hover: '', page: 0, path: 'cdi', _length: 1 },
                supplier: { value: '', placeholder: 'Supplier', selection: { _id: 'F', name: ''}, options: [], hover: '', page: 0, path: 'supplier', _length: 1 },
                certificate: { value: '', placeholder: 'Certificate', selection: { _id: 'F', name: ''}, options: [], hover: '', page: 0, path: 'certificate', _length: 1 },
                other: { value: '', placeholder: 'Other', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'other', _length: 3 },
            },
            lunar: '',
            feedback: '',
            focused: '',
            loading: false,
            // expanded: false,
            alert: {
                type: '',
                message: ''
            }
        }
        this.clearFields = this.clearFields.bind(this);
        this.copyLunar = this.copyLunar.bind(this);
        // this.copyDescription = this.copyDescription.bind(this);
        this.handleTranslate = this.handleTranslate.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTranslate = this.handleChangeTranslate.bind(this);
        this.handleClearTranslate = this.handleClearTranslate.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusTemplate = this.onFocusTemplate.bind(this);
        this.onHover = this.onHover.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    componentDidMount() {
        const { params } = this.state;
        const fields = document.getElementById('fields');
        fields.addEventListener("keydown", event => {
            if (Object.keys(params).includes(event.target.id)) {
                let name = event.target.id;
                switch(event.key) {
                    case "ArrowDown":
                        if (!_.isEmpty(this.state.params[name].options)) {
                            let selectedIndex = this.state.params[name].options.findIndex(element => _.isEqual(element._id, this.state.params[name].hover));
                            if (selectedIndex === -1) {
                                this.setState({
                                    params: {
                                        ...this.state.params,
                                        [name]: {
                                            ...this.state.params[name],
                                            selection: {
                                                _id: this.state.params[name].options[0]._id,
                                                name: this.state.params[name].options[0].name
                                            },
                                            hover: this.state.params[name].options[0]._id
                                        }
                                    },
                                });
                            } else if (selectedIndex < this.state.params[name].options.length - 1) {
                                this.setState({
                                    params: {
                                        ...this.state.params,
                                        [name]: {
                                            ...this.state.params[name],
                                            selection: {
                                                _id: this.state.params[name].options[selectedIndex + 1]._id,
                                                name: this.state.params[name].options[selectedIndex + 1].name
                                            },
                                            hover: this.state.params[name].options[selectedIndex + 1]._id
                                        }
                                    },
                                });
                            }
                        }
                        break;
                    case "ArrowUp":
                        if (!_.isEmpty(this.state.params[name].options)) {
                            let selectedIndex = this.state.params[name].options.findIndex(element => _.isEqual(element._id, this.state.params[name].hover));
                        if (selectedIndex > 0) {
                                this.setState({
                                    params: {
                                        ...this.state.params,
                                        [name]: {
                                            ...this.state.params[name],
                                            selection: {
                                                _id: this.state.params[name].options[selectedIndex - 1]._id,
                                                name: this.state.params[name].options[selectedIndex - 1].name
                                            },
                                            hover: this.state.params[name].options[selectedIndex - 1]._id
                                        }
                                    },
                                });
                            }
                        }
                        break;
                    case "Enter":
                        let selected = this.state.params[name].options.find(element => _.isEqual(element._id, this.state.params[name].hover));
                        if (!_.isUndefined(selected)) {
                            this.setState({
                                params: {
                                    ...this.state.params,
                                    [name]: {
                                        ...this.state.params[name],
                                        options: [],
                                        value: '',
                                        selection: {
                                            _id: selected._id,
                                            name: selected.name
                                        },
                                        hover: ''
                                    }
                                },
                                focused: '',
                            });
                            let myInput = document.getElementById(name);
                            myInput.blur();
                        }
                        break;
                    case "Escape":
                        this.setState({
                            params: {
                                ...this.state.params,
                                [name]: {
                                    ...this.state.params[name],
                                    options: [],
                                    value: '',
                                    selection: {
                                        _id: 'F'.repeat(this.state.params[name]._length),
                                        name: ''
                                    },
                                    hover: '',
                                }
                            },
                            focused: '',
                        });
                        let myInput = document.getElementById(name);
                        myInput.blur();
                        break;
                    default: // do nothing;
                        break;
                }
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.params.sizeOne.value !== prevState.params.sizeOne.value) this.handleGet('sizeOne', 0);
        if (this.state.params.sizeTwo.value !== prevState.params.sizeTwo.value) this.handleGet('sizeTwo', 0);
        if (this.state.params.sizeThree.value !== prevState.params.sizeThree.value) this.handleGet('sizeThree', 0);
        if (this.state.params.wtOne.value !== prevState.params.wtOne.value) this.handleGet('wtOne', 0);
        if (this.state.params.wtTwo.value !== prevState.params.wtTwo.value) this.handleGet('wtTwo', 0);
        if (this.state.params.type.value !== prevState.params.type.value) this.handleGet('type', 0);
        if (this.state.params.spec.value !== prevState.params.spec.value) this.handleGet('spec', 0);
        if (this.state.params.grade.value !== prevState.params.grade.value) this.handleGet('grade', 0);
        if (this.state.params.heat.value !== prevState.params.heat.value) this.handleGet('heat', 0);
        if (this.state.params.length.value !== prevState.params.length.value) this.handleGet('length', 0);
        if (this.state.params.end.value !== prevState.params.end.value) this.handleGet('end', 0);
        if (this.state.params.surface.value !== prevState.params.surface.value) this.handleGet('surface', 0);
        if (this.state.params.cdi.value !== prevState.params.cdi.value) this.handleGet('cdi', 0);
        if (this.state.params.supplier.value !== prevState.params.supplier.value) this.handleGet('supplier', 0);
        if (this.state.params.certificate.value !== prevState.params.certificate.value) this.handleGet('certificate', 0);
        if (this.state.params.other.value !== prevState.params.other.value) this.handleGet('other', 0);
    }

    copyLunar(event) {
        event.preventDefault();
        let pre = document.getElementById("pre").innerHTML;
        function listener(e) {
            e.clipboardData.setData("text/html", pre);
            e.clipboardData.setData("text/plain", pre);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
    }

    // copyDescription(event) {
    //     event.preventDefault();
    // }

    handleTranslate(event) {
        event.preventDefault();
        const { lunar } = this.state;
        this.setState({
            loading: true
        }, () => {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            return fetch(`https://lcg-server.herokuapp.com/lunar/translate?lunar=${encodeURI(lunar)}`, requestOptions)
            .then(response => response.text().then(text => {
                this.setState({
                    loading: false,
                }, () => {
                    const data = text && JSON.parse(text);
                    if (response.status === 200) {
                        this.setState({
                            params: {
                                sizeOne: { value: '', placeholder: 'Outside diameter 1', selection: { _id: data.sizeOne._id, name: data.sizeOne.name}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                                sizeTwo: { value: '', placeholder: 'Outside diameter 2', selection: { _id: data.sizeTwo._id, name: data.sizeTwo.name}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                                sizeThree: { value: '', placeholder: 'Outside diameter 3', selection: { _id: data.sizeThree._id, name: data.sizeThree.name}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                                wtOne: { value: '', placeholder: 'Wall thickness 1', selection: { _id: data.wtOne._id, name: data.wtOne.name}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                                wtTwo: { value: '', placeholder: 'Wall thickness 2', selection: { _id: data.wtTwo._id, name: data.wtTwo.name}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                                type: { value: '', placeholder: 'Article type', selection: { _id: data.type._id, name: data.type.name}, options: [], hover: '', page: 0, path: 'type', _length: 3 },
                                spec: { value: '', placeholder: 'Specification', selection: { _id: data.spec._id, name: data.spec.name}, options: [], hover: '', page: 0, path: 'spec', _length: 3 },
                                grade: { value: '', placeholder: 'Material grade', selection: { _id: data.grade._id, name: data.grade.name}, options: [], hover: '', page: 0, path: 'grade', _length: 3 },
                                heat: { value: '', placeholder: 'Heat treatment', selection: { _id: data.heat._id, name: data.heat.name}, options: [], hover: '', page: 0, path: 'heat', _length: 2 },
                                length: { value: '', placeholder: 'Length', selection: { _id: data.length._id, name: data.length.name}, options: [], hover: '', page: 0, path: 'length', _length: 3 },
                                end: { value: '', placeholder: 'Ends', selection: { _id: data.end._id, name: data.end.name}, options: [], hover: '', page: 0, path: 'end', _length: 2 },
                                surface: { value: '', placeholder: 'Surface treatment', selection: { _id: data.surface._id, name: data.surface.name}, options: [], hover: '', page: 0, path: 'surface', _length: 2 },
                                cdi: { value: '', placeholder: 'CDI', selection: { _id: data.cdi._id, name: data.cdi.name}, options: [], hover: '', page: 0, path: 'cdi', _length: 1 },
                                supplier: { value: '', placeholder: 'Supplier', selection: { _id: data.supplier._id, name: data.supplier.name}, options: [], hover: '', page: 0, path: 'supplier', _length: 1 },
                                certificate: { value: '', placeholder: 'Certificate', selection: { _id: data.certificate._id, name: data.certificate.name}, options: [], hover: '', page: 0, path: 'certificate', _length: 1 },
                                other: { value: '', placeholder: 'Other', selection: { _id: data.other._id, name: data.other.name}, options: [], hover: '', page: 0, path: 'other', _length: 3 },
                            },
                            feedback: '',
                            focused: ''
                        });
                    } else if (data.hasOwnProperty('message')) {
                        console.log(data.message);
                        this.setState({feedback: data.message});
                    }
                });
            }));
        });
    }

    clearFields(event) {
        event.preventDefault();
        this.setState({
            params: {
                sizeOne: { value: '', placeholder: 'Outside diameter 1', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                sizeTwo: { value: '', placeholder: 'Outside diameter 2', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                sizeThree: { value: '', placeholder: 'Outside diameter 3', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                wtOne: { value: '', placeholder: 'Wall thickness 1', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                wtTwo: { value: '', placeholder: 'Wall thickness 2', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'size', _length: 3 },
                type: { value: '', placeholder: 'Article type', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'type', _length: 3 },
                spec: { value: '', placeholder: 'Specification', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'spec', _length: 3 },
                grade: { value: '', placeholder: 'Material grade', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'grade', _length: 3 },
                heat: { value: '', placeholder: 'Heat treatment', selection: { _id: 'FF', name: ''}, options: [], hover: '', page: 0, path: 'heat', _length: 2 },
                length: { value: '', placeholder: 'Length', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'length', _length: 3 },
                end: { value: '', placeholder: 'Ends', selection: { _id: 'FF', name: ''}, options: [], hover: '', page: 0, path: 'end', _length: 2 },
                surface: { value: '', placeholder: 'Surface treatment', selection: { _id: 'FF', name: ''}, options: [], hover: '', page: 0, path: 'surface', _length: 2 },
                cdi: { value: '', placeholder: 'CDI', selection: { _id: 'F', name: ''}, options: [], hover: '', page: 0, path: 'cdi', _length: 1 },
                supplier: { value: '', placeholder: 'Supplier', selection: { _id: 'F', name: ''}, options: [], hover: '', page: 0, path: 'supplier', _length: 1 },
                certificate: { value: '', placeholder: 'Certificate', selection: { _id: 'F', name: ''}, options: [], hover: '', page: 0, path: 'certificate', _length: 1 },
                other: { value: '', placeholder: 'Other', selection: { _id: 'FFF', name: ''}, options: [], hover: '', page: 0, path: 'other', _length: 3 },
            },
            focused: '',
        });
    }

    handleGet(key, page) {
        const { focused } = this.state;
        this.setState({
            loading: true
        }, () => {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            return fetch(`https://lcg-server.herokuapp.com/${this.state.params[key].path}/find?name=${encodeURI(this.state.params[key].value)}&page=${encodeURI(page)}`, requestOptions)
            .then(response => response.text().then(text => {
                this.setState({
                    loading: false,
                }, () => {
                    const data = text && JSON.parse(text);
                    if (response.status === 200 && data.hasOwnProperty('options')) {
                        this.setState({
                            params: {
                                ...this.state.params,
                                [key]: {
                                    ...this.state.params[key],
                                    options: !_.isEqual(key, focused) ? [] : page !== 0 ? [...this.state.params[key].options, ...data.options] : data.options,
                                    page
                                }
                            }
                        });
                    }
                });
            }));
        });
    }

    handleNext(key) {
        this.setState({
            params: {
                ...this.state.params,
                [key]: {
                    ...this.state.params[key],
                    page: this.state.params[key].page + 1
                }
            }
        }, () => {
            this.handleGet(key, this.state.params[key].page)
        });
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;

        this.setState({
            params: {
                ...this.state.params,
                [name]: {
                    ...this.state.params[name],
                    value: value,
                    selection: {
                        _id: 'F'.repeat(this.state.params[name]._length),
                        name: ''
                    }
                }
            }
        });
    }

    handleChangeTranslate(event) {
        event.preventDefault();
        this.setState({
            lunar: event.target.value,
            feedback: ''
        });
    }

    handleClearTranslate(event) {
        event.preventDefault();
        this.setState({
            lunar: '',
            focused: '',
            feedback: ''
        });
    }

    handleSelect(event, name, selectionId, selectionName) {
        event.preventDefault();
        this.setState({
            params: {
                ...this.state.params,
                [name]: {
                    ...this.state.params[name],
                    value: '',
                    options: [],
                    selection: {
                        _id: selectionId,
                        name: selectionName
                    },
                    hover: '',
                }
            }, focused: ''
        })
        let myInput = document.getElementById(name);
        myInput.blur();
    }

    onFocus(event) {
        const { name } = event.target;
        const { focused } = this.state;
        if (!!focused && focused !== 'lunar') {
            this.setState({
                params: {
                    ...this.state.params,
                    [name]: {
                        ...this.state.params[name],
                        options: [],
                        value: this.state.params[name].selection.name,
                        hover: ''
                    },
                    [focused]: {
                       ...this.state.params[focused],
                       options: [],
                       value: '',
                       hover: ''
                    },
                },
                focused: name, //
            }, () => this.handleGet(name, 0));
        } else {
            this.setState({
                params: {
                    ...this.state.params,
                    [name]: {
                        ...this.state.params[name],
                        options: [],
                        value: this.state.params[name].selection.name,
                        hover: ''
                    }
                },
                focused: name,
            }, () => this.handleGet(name, 0));
        }
    }

    onFocusTemplate(event) {
        event.preventDefault();
        const { focused } = this.state;
        if (!!focused && focused !== 'lunar') {
            this.setState({
                params: {
                    ...this.state.params,
                    [focused]: {
                       ...this.state.params[focused],
                       options: [],
                       value: '',
                       hover: ''
                    },
                },
                focused: 'lunar', //
            });
        } else {
            this.setState({focused: 'lunar'});
        }
    }

    onHover(event, name, _id) {
        event.preventDefault();
        this.setState({
            params: {
                ...this.state.params,
                [name]: {
                    ...this.state.params[name],
                    hover: _id
                }
            }
        });
    }

    toggleDropDown(event, name) {
        event.preventDefault();
        const { params, focused } = this.state;
        if (!!_.isEqual(focused, name) || !!params[name].selection.name) {
            this.setState({
                params: {
                    ...params,
                    [name]: {
                        ...params[name],
                        options: [],
                        value: '',
                        selection: {
                            _id: 'F'.repeat(params[name]._length),
                            name: ''
                        },
                        hover: ''
                    }
                },
                focused: '',
            });
            let myInput = document.getElementById(name);
            myInput.blur();
        } else {
            let myInput = document.getElementById(name);
            myInput.focus();
            myInput.select();
        }
    }

    render() {
        const { params, focused, lunar, feedback } = this.state;
        return(
            <div style={{minHeight: '100vh'}}>
                <header>
                    <div id="topbar">
                        <div className="container-xl topbar-container">
                            <div className="row topbar-row">
                                <div className="col-6 topbar-col">
                                    <h1><a href="http://www3.infinet.nl/" target="_blank" rel="noopener noreferrer">Infinet</a></h1>
                                </div>
                                <div className="col-6 topbar-col logo">
                                    <img src={logo} alt="logo" id="logo" width="210" height="30"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-nav">
                        <div className="container-xl" style={{height: '100%', padding: '0px'}}>
                            <ul className="nav" style={{height: '100%'}}>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/Vlunar+code+generatior+User+Manual+version+01.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        User Manual
                                    </a>
                                </li>
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Encoding Standards</a>
                                    <div className="dropdown-menu" style={{display: "block", width: '100%'}}>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Bars++Cylinders.pdf" target="_blank" rel="noopener noreferrer">Bars Cylinders</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Blind+flanges.pdf" target="_blank" rel="noopener noreferrer">Blind flanges</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Elbows.pdf" target="_blank" rel="noopener noreferrer">Elbows</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Fittings.pdf" target="_blank" rel="noopener noreferrer">Fittings</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Flat+welding+flanges.pdf" target="_blank" rel="noopener noreferrer">Flat welding flanges</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Hollow+sections.pdf" target="_blank" rel="noopener noreferrer">Hollow sections</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Reducers.pdf" target="_blank" rel="noopener noreferrer">Reducers</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Sizes.pdf" target="_blank" rel="noopener noreferrer">Sizes</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Socket+Weld+flanges.pdf" target="_blank" rel="noopener noreferrer">Socket Weld flanges</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tees.pdf" target="_blank" rel="noopener noreferrer">Tees</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Threaded+flanges.pdf" target="_blank" rel="noopener noreferrer">Threaded flanges</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tubes+ANSI.pdf" target="_blank" rel="noopener noreferrer">Tubes ANSI</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tubes+EN.pdf" target="_blank" rel="noopener noreferrer">Tubes EN</a>
                                        <a className="dropdown-item" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Welding+Neck+flanges.pdf" target="_blank" rel="noopener noreferrer">Welding Neck flanges</a>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </header>
                <div id="titlebar">
                    <div className="container-xl titlebar-container">
                        <h2>Vlunar Code Generator</h2>
                    </div>
                </div>
                <div className="container-xl main-container">
                    <section>
                        <h3>Translate</h3>
                        <div type="button" className="button-left" onClick={event => this.handleTranslate(event)}>Submit</div>
                        <div className="row">
                            <div className="col">
                                <label className={_.isEqual(focused, "lunar") || !!lunar ? "small" : ""} htmlFor="lunar">Vlunar</label>
                                <div className="form-group" style={feedback ? {marginBottom: '0px'} : {marginBottom: '16px'}}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id='lunar'
                                        name='lunar'
                                        value={lunar}
                                        onChange={this.handleChangeTranslate}
                                        onFocus={this.onFocusTemplate}
                                        aria-describedby="feedback"
                                    />
                                    {lunar && 
                                        <div type="button" className="mdb-icon" onClick={event => this.handleClearTranslate(event)}>
                                            <svg><FontAwesomeIcon icon={faTimes} /></svg>
                                        </div>
                                    }
                                    {feedback && <small id="feedback" className="form-text text-danger">{feedback}</small>}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="fields">
                        <h3>Fields</h3>
                        <div type="button" className="button-left" onClick={this.clearFields}>Clear</div>
                        <div className="row row-cols-1 row-cols-md-2">
                            {Object.keys(params).map(key => 
                                <Param
                                    key={key}
                                    name={key}
                                    isFocused={params[key].isFocused}
                                    focused={focused}
                                    value={params[key].value}
                                    placeholder={params[key].placeholder}
                                    selection={params[key].selection}
                                    options={params[key].options}
                                    hover={this.state.params[key].hover}
                                    page={params[key].page}
                                    onChange={this.handleChange}
                                    handleNext={this.handleNext}
                                    handleSelect={this.handleSelect}
                                    onFocus={this.onFocus}
                                    onHover={this.onHover}
                                    toggleDropDown={this.toggleDropDown}
                                />
                            )}
                        </div>
                    </section>
                    <section>
                        <h3>Result</h3>
                        <div type="button" className="button-left" onClick={this.copyLunar}>Copy</div>
                        <div className="result-area">
                            <pre id="pre">{`${Object.keys(params).map(key => params[key].selection._id).join('')}1`}</pre>
                        </div>
                        <div className="result-area">
                            <pre id="pre">{`${Object.keys(params).map(key => key !== 'cdi' && params[key].selection.name !== '' ? ['sizeTwo', 'sizeThree', 'wtOne', 'wtTwo'].includes(key) ? `x ${params[key].selection.name.split(' | ')[0]}` : params[key].selection.name.split(' | ')[0] : '').filter(n => n).join(' ')}`}</pre>
                        </div>
                    </section>
                    <section>
                        <h3>Encoding standards</h3>
                        <div className="list-group" style={{marginBottom: '16px'}}>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Bars++Cylinders.pdf" target="_blank" rel="noopener noreferrer">Bars Cylinders</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Blind+flanges.pdf" target="_blank" rel="noopener noreferrer">Blind flanges</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Elbows.pdf" target="_blank" rel="noopener noreferrer">Elbows</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Fittings.pdf" target="_blank" rel="noopener noreferrer">Fittings</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Flat+welding+flanges.pdf" target="_blank" rel="noopener noreferrer">Flat welding flanges</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Hollow+sections.pdf" target="_blank" rel="noopener noreferrer">Hollow sections</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Reducers.pdf" target="_blank" rel="noopener noreferrer">Reducers</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Sizes.pdf" target="_blank" rel="noopener noreferrer">Sizes</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Socket+Weld+flanges.pdf" target="_blank" rel="noopener noreferrer">Socket Weld flanges</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tees.pdf" target="_blank" rel="noopener noreferrer">Tees</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Threaded+flanges.pdf" target="_blank" rel="noopener noreferrer">Threaded flanges</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tubes+ANSI.pdf" target="_blank" rel="noopener noreferrer">Tubes ANSI</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tubes+EN.pdf" target="_blank" rel="noopener noreferrer">Tubes EN</a>
                            <a className="list-group-item list-group-item-action py-2" href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Welding+Neck+flanges.pdf" target="_blank" rel="noopener noreferrer">Welding Neck flanges</a>
                        </div>
                    </section>
                    
                </div>
            </div>
            
        );
    }
}

export default Page;