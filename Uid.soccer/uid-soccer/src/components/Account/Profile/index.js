import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import sc from '../../../soccer-codification.json'; // codification in soccer eco-system
import countries from '../../../countries'

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = { 
            userData: props.userData,
            language: props.language || 'en'
        };

        this.loadLanguage(this.state.language);
    }

    changeLanguageFromParent(langCode) {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    entityTypeToText(code) {
        let text = '';
        switch(code) {
            case sc.entityTypes.pl:
                text = this.lang.Player;
                break;
            case sc.entityTypes.co:
                text = this.lang.Coach;
                break;
            case sc.entityTypes.sf:
                text = this.lang.SoccerField;
                break;
            case sc.entityTypes.fc:
                text = this.lang.FootballClub;
                break;
            default:
                text = '';
                break;
        }
        return text;
    }

    epochToDateTimeText(tick) {
        let dateTemp = new Date(tick);
        let dd = dateTemp.getDate();
        let mm = dateTemp.getMonth() + 1;
        let yyyy = dateTemp.getFullYear();
        if (dd < 10) { 
            dd = '0' + dd; 
        } 
        if (mm < 10) { 
            mm = '0' + mm; 
        } 
        let text = dd + '/' + mm + '/' + yyyy;
        return text;
    }

    langCodeToText(langCode) {
        let text = '';
        switch(langCode) {
            case sc.lang.en:
                text = this.lang.English;
                break;
            case sc.lang.es:
                text = this.lang.Spanish;
                break;
            case sc.lang.de:
                text = this.lang.German;
                break;
            case sc.lang.ru:
                text = this.lang.Russian;
                break;
            default:
                text = '';
                break;
        }
        return text;
    }

    countryCodeToText(countryCode) {
        let text = '';
        for(let i = 0; i < countries.length; i++) {
            if(countries[i].code === countryCode) {
                text = countries[i].name;
                break;
            }
        }
        return text;
    }

    render() {
        const leftClass = "col-5 bg-dark rounded-left text-right";
        const rightClass = "col-7 bg-success rounded-right text-left";

        return (
            <div className="content mt-3">
                <div className="row">
                    <div className={leftClass}><label>{this.lang.FullName}</label></div>
                    <div className={rightClass}><label>{this.state.userData.fullName}</label></div>
                </div> 
                <div className="row mt-2">
                    <div className={leftClass}><label>{this.lang.EntityType}</label></div>
                    <div className={rightClass}><label>{this.entityTypeToText(this.state.userData.entityType)}</label>
                    </div>
                </div> 
                <div className="row mt-2">
                    <div className={leftClass}><label>{this.lang.DateOfBirth}</label></div>
                    <div className={rightClass}><label>{this.epochToDateTimeText(this.state.userData.birthday)}</label></div>
                </div>  
                <div className="row mt-2">
                    <div className={leftClass}><label>{this.lang.Email}</label></div>
                    <div className={rightClass}><label>{this.state.userData.email}</label></div>
                </div>  
                <div className="row mt-2">
                    <div className={leftClass}><label>{this.lang.Phone}</label></div>
                    <div className={rightClass}><label>{this.state.userData.phone}</label></div>
                </div>
                <div className="row mt-2">
                    <div className={leftClass}><label>{this.lang.Country}</label></div>
                    <div className={rightClass}><label>{this.countryCodeToText(this.state.userData.country)}</label></div>
                </div> 
                <div className="row mt-2">
                    <div className={leftClass}><label>{this.lang.Language}</label></div>
                    <div className={rightClass}><label>{this.langCodeToText(this.state.userData.language)}</label></div>
                </div>    
            </div>
        );
    }
}

export default Profile;