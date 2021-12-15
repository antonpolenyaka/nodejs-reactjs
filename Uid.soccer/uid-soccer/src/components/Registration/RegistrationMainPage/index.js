import React, {Component} from 'react';
import sc from '../../../soccer-codification.json';

class RegistrationMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: props.language || sc.lang.en
        }

        this.loadLanguage(this.state.language);
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    render() {
        return(
            <div></div>
        );
    }
}

export default RegistrationMainPage;