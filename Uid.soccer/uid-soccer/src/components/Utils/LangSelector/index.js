import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import sc from '../../../soccer-codification.json';

class LangSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: props.language ?? sc.lang.en
        };

        this.loadLanguage(this.state.language);
        this.onChangeLangEvent = props.handleChangeLang;
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    handleChangeLanguage = (event) => {
        const newLang = event.target.value;
        this.loadLanguage(newLang);
        this.setState({ language: newLang });
        this.onChangeLangEvent(newLang);
    }

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">{this.lang.Language}</label>
                </div>
                <select className="custom-select" 
                        id="inputGroupSelect01" 
                        defaultValue={this.state.language} 
                        onChange={this.handleChangeLanguage}>
                    <option value={sc.lang.en}>{this.lang.English}</option>
                    <option value={sc.lang.es}>{this.lang.Spanish}</option>
                    <option value={sc.lang.de}>{this.lang.German}</option>
                    <option value={sc.lang.ru}>{this.lang.Russian}</option>
                </select>
            </div>
        );
    }
}

export default LangSelector;