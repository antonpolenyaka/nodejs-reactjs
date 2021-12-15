import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import db from '../../../countries'
import sc from '../../../soccer-codification.json';

class CountrySelector extends Component {
    constructor(props){
        super(props);

        this.state = { 
            language: props.language ?? sc.lang.en,
            country: props.country ?? 'US'
        };

        this.loadLanguage(this.state.language);
        this.onChangeCountryEvent = props.handleChangeCountry;
    }

    changeLanguageFromParent(langCode) {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    handleChangeCountry = (event) => {
        const newCountry = event.target.value;
        this.setState({ country: newCountry });
        this.onChangeCountryEvent(newCountry);
    }

    render() {
        const options = db.map((data) =>
            <option key={data.code} value={data.code}>{data.name}</option>
        );

        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect03">{this.lang.Country}</label>
                </div>
                <select className="custom-select" 
                        id="inputGroupSelect03" 
                        defaultValue={this.state.country} 
                        onChange={this.handleChangeCountry}>
                    <option value="default">{this.lang.Choose}...</option>
                    {options}
                </select>
            </div>
        );
    }
}

export default CountrySelector;