import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Profile from '../Profile/index';
import AccessSettings from '../AccessSettings/index';

class AccountMainPage extends Component {
    constructor(props){
        super(props);        

        this.stateEnum = Object.freeze({"Profile": 0,  "Access": 1, "Messages": 2});

        this.state = { 
            activeForm: this.stateEnum.Profile,
            userData: props.userData,
            language: props.language
        };

        this.loadLanguage(this.state.language);
        this.refProfileBlock = React.createRef();
        this.refAccessSettings = React.createRef();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    changeLanguageFromParent(langCode) {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
        if(this.refProfileBlock.current) {
            this.refProfileBlock.current.changeLanguageFromParent(langCode);
        }
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    menuProfileClick(e) {
        this.setState({activeForm: this.stateEnum.Profile});
    }

    menuMessagesClick(e) {
        this.setState({activeForm: this.stateEnum.Messages});
    }

    menuAccessClick(e) {
        this.setState({activeForm: this.stateEnum.Access});
    }

    render() {
        // Menu
        const menu = (
            <div>
                <button className={this.state.activeForm === this.stateEnum.Profile ? "btn btn-primary" : "btn btn-dark"}
                    onClick={this.menuProfileClick.bind(this)}>{this.lang.Profile}</button>
                <button className={this.state.activeForm === this.stateEnum.Access ? "btn btn-primary ml-2" : "btn btn-dark ml-2"}
                    onClick={this.menuAccessClick.bind(this)}>{this.lang.Access}</button>
                <button className={this.state.activeForm === this.stateEnum.Messages ? "btn btn-primary ml-2" : "btn btn-dark ml-2"}
                    onClick={this.menuMessagesClick.bind(this)}>{this.lang.Messages}</button>
            </div>
        );

        const profileBlock = (this.state.activeForm === this.stateEnum.Profile && 
            <Profile userData={this.state.userData} 
                ref={this.refProfileBlock} 
                language={this.state.language}/>);

        const accessSettingsBlock = (this.state.activeForm === this.stateEnum.Access &&
            <AccessSettings ref={this.refAccessSettings}
                            userAccessUrls={this.state.userData.accessUrls} />
        );

        // Return all JSX
        return (
            <div>
                {menu}
                {profileBlock}{accessSettingsBlock}
            </div>
        );
    }
}

export default AccountMainPage;