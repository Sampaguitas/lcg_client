import React, { Component } from 'react';
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
            focused: '',
            loading: false,
            alert: {
                type: '',
                message: ''
            }
        }
        this.clearFields = this.clearFields.bind(this);
        this.copyLunar = this.copyLunar.bind(this);
        this.handleGet = this.handleGet.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onHover = this.onHover.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
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
        console.log(pre);
        function listener(e) {
            e.clipboardData.setData("text/html", pre);
            e.clipboardData.setData("text/plain", pre);
            e.preventDefault();
        }
        document.addEventListener("copy", listener);
        document.execCommand("copy");
        document.removeEventListener("copy", listener);
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
        const { params, focused } = this.state;
        this.setState({
            loading: true
        }, () => {
            const requestOptions = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            };
            return fetch(`https://lcg-server.herokuapp.com/${params[key].path}/find?name=${encodeURI(params[key].value)}&page=${encodeURI(page)}`, requestOptions)
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
        const { params } = this.state;

        this.setState({
            params: {
                ...params,
                [name]: {
                    ...params[name],
                    value: value,
                    selection: {
                        _id: 'F'.repeat(params[name]._length),
                        name: ''
                    }
                }
            }
        }); 
    }

    handleSelect(event, name, selectionId, selectionName) {
        event.preventDefault();
        console.log(name, selectionId, selectionName);
        event.preventDefault();
        const { params } = this.state;
        this.setState({
            params: {
                ...params,
                [name]: {
                    ...params[name],
                    selection: {
                        _id: selectionId,
                        name: selectionName
                    }
                }
            }, focused: ''
        })
    }

    onFocus(event) {
        const { name } = event.target;
        const { params } = this.state;
        
        this.setState({
            params: {
                ...params,
                [name]: {
                    ...params[name],
                    options: [],
                    value: params[name].selection.name
                }
            },
            focused: name, //
        }, () => this.handleGet(name, 0));
    }

    onBlur(event) {
        const { name } = event.target;
        setTimeout(() => {
            this.setState({
                params: {
                    ...this.state.params,
                    [name]: {
                        ...this.state.params[name],
                        value: '',
                    }
                }
            }); 
        }, 1);
    }

    onHover(event, name, _id) {
        event.preventDefault();
        const { params } = this.state;
        this.setState({
            params: {
                ...params,
                [name]: {
                    ...params[name],
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
                        }
                    }
                },
                focused: '',
            });
        } else {
            let myInput = document.getElementById(name);
            myInput.focus();
            myInput.select();
        }
    }

    render() {
        const { params, focused } = this.state;
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
                        {/* <div className="container-xl">
                        </div> */}
                    </div>
                </header>
                <div id="titlebar">
                    <div className="container-xl titlebar-container">
                        <h2>Vlunar Code Generator</h2>
                        
                    </div>
                </div>
                <div className="container-xl main-container">
                    <section>
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
                                    onBlur={this.onBlur}
                                    onHover={this.onHover}
                                    toggleDropDown={this.toggleDropDown}
                                />
                            )}
                        </div>
                    </section>
                    <section>
                        <h3>Vlunar</h3>
                        <div type="button" className="button-left" onClick={this.copyLunar}>Copy</div>
                        <div className="result-area">
                            <pre id="pre">{`${Object.keys(params).map(key => params[key].selection._id).join('')}1`}</pre>
                        </div>
                    </section>
                    {/* <section>
                        <h3>Encoding standards</h3>
                        <ul className="visible">
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Bars++Cylinders.pdf" target="_blank" rel="noopener noreferrer">Bars Cylinders</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Blind+flanges.pdf" target="_blank" rel="noopener noreferrer">Blind flanges</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Elbows.pdf" target="_blank" rel="noopener noreferrer">Elbows</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Fittings.pdf" target="_blank" rel="noopener noreferrer">Fittings</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Flat+welding+flanges.pdf" target="_blank" rel="noopener noreferrer">Flat welding flanges</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Hollow+sections.pdf" target="_blank" rel="noopener noreferrer">Hollow sections</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Reducers.pdf" target="_blank" rel="noopener noreferrer">Reducers</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Sizes.pdf" target="_blank" rel="noopener noreferrer">Sizes</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Socket+Weld+flanges.pdf" target="_blank" rel="noopener noreferrer">Socket Weld flanges</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tees.pdf" target="_blank" rel="noopener noreferrer">Tees</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Threaded+flanges.pdf" target="_blank" rel="noopener noreferrer">Threaded flanges</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tubes+ANSI.pdf" target="_blank" rel="noopener noreferrer">Tubes ANSI</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Tubes+EN.pdf" target="_blank" rel="noopener noreferrer">Tubes EN</a></li>
                            <li><a href="https://vanleeuwenlcg.s3.eu-west-3.amazonaws.com/VLUNAR+-+Welding+Neck+flanges.pdf" target="_blank" rel="noopener noreferrer">Welding Neck flanges</a></li>
                        </ul>
                    </section> */}
                    
                </div>
            </div>
            
        );
    }
}

export default Page;