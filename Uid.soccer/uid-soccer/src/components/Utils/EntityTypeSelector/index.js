import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import sc from '../../../soccer-codification.json';

class EntityTypeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: props.language ?? sc.lang.en,
            entityType: props.entityType ?? sc.entityTypes.pl
        };

        this.loadLanguage(this.state.language);
        this.onChangeEntityTypeEvent = props.handleChangeEntityType;
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    changeLanguageFromParent(langCode) {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
    }

    handleChangeEntityType = (event) => {
        const newEntityType = event.target.value;
        this.setState({ entityType: newEntityType });
        this.onChangeEntityTypeEvent(newEntityType);
    }

    // - pl - player
    // - co - coach
    // - sf - soccer field
    // - fc - soccer club (football club)
    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">{this.lang.EntityType}</label>
                </div>
                <select className="custom-select" id="inputGroupSelect02" defaultValue={this.state.entityType} onChange={this.handleChangeEntityType}>
                    <option value={sc.entityTypes.pl}>{this.lang.Player}</option>
                    <option value={sc.entityTypes.co}>{this.lang.Coach}</option>
                    <option value={sc.entityTypes.sf}>{this.lang.SoccerField}</option>
                    <option value={sc.entityTypes.fc}>{this.lang.FootballClub}</option>
                </select>
            </div>
        );
    }
}

export default EntityTypeSelector;