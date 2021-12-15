import React, { Component } from 'react';
import $ from 'jquery'; // Is necessary for jquery for tooltip in bootstrap
import 'popper.js' // Is necessary for tooltip in bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// get our fontawesome imports
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RegistrationEndPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: props.userData,
            language: props.language,
            showAlert: false
        }

        this.timerAlert = null;

        this.loadLanguage(this.state.language);
    }

    componentDidMount() {
        // Allow tooltips in bootsrap
        $(function () {
            $('[data-toggle="tooltip"]').tooltip('enable');
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timerAlert);
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    changeLanguageFromParent(langCode) {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
    }

    handleClickCopy() {
        // Copy UID to clipboard
        const $body = document.getElementsByTagName('body')[0];
        const secretInfo = document.getElementById('secretInfo').innerHTML;
        const $tempInput = document.createElement('INPUT');
        $body.appendChild($tempInput);
        $tempInput.setAttribute('value', secretInfo.substring(0, 28));
        $tempInput.select();
        document.execCommand('copy');
        $body.removeChild($tempInput);
        
        // Show alert about UID copied
        this.setState({showAlert: true});

        // Show alert only 3 sec
        this.timerAlert = setTimeout(function(){
            this.setState({showAlert: false});
        }.bind(this), 3000);
    }

    render() {
        const blankLink = "#"; // style={{cursor: 'pointer'}}
        const alert = (this.state.showAlert && 
            <div className="alert alert-success" role="alert">
                UID {this.lang.Copied.toLowerCase()}
            </div>);

        return (
            <div>
                <div className="alert alert-info" role="alert">
                    {this.lang.MsgRegistrationEnded}
                </div>
                {alert}
                <div id="secretInfo" className="alert alert-dark" role="alert">
                    {this.state.userData.uid}
                    <a href={blankLink} data-toggle="tooltip" title={this.lang.Copy} data-placement="top">
                        <FontAwesomeIcon className="ml-2" 
                            icon={faCopy} 
                            onClick={this.handleClickCopy.bind(this)} />
                    </a>
                </div>
            </div>
        );
    }
}

export default RegistrationEndPage;