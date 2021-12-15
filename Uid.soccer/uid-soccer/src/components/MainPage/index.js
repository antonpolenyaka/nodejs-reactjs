import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import CountrySelector from '../Utils/CountrySelector/index';
import IntlTelInput from 'react-bootstrap-intl-tel-input';
import MySimpleDateTime from '../Utils/MySimpleDateTime/index';
import LangSelector from '../Utils/LangSelector/index';
import EntityTypeSelector from '../Utils/EntityTypeSelector/index';
import sc from '../../soccer-codification.json'; // codification in soccer eco-system
import cnf from '../../config.json'; // config of web
import axios from 'axios'; // for post request
import soccerCheck from '../../soccer-utils/check-data-utils';
import AccountMainPage from '../Account/AccountMainPage/index';
import RegistrationEndPage from '../Registration/RegistrationEndPage/index';
import LoginMainPage from '../LoginMainPage/index';

class MainPage extends Component {
    constructor(props){
        super(props);

        this.persons = sc.entityTypes.persons; // or we have other entities 'fc', 'sf'
        this.stateEnum = Object.freeze({"Login": 0,  "Register": 1, "Account": 2, "RegisterEnd": 3});

        this.state = { 
            // user data to register
            language: sc.lang.en,
            entityType: sc.entityTypes.pl,
            fullName: '',
            country: sc.countries.us,
            phone: '+1 555-555-5555',
            email: '',
            birthday: new Date(2002, 1, 1, 2, 0, 0, 0),
            uid: 'pl5e9ba2b789cf426a2c9e54f6FE',
            password: 'pswtest',
            
            // Manipulation of forms
            activeForm: this.stateEnum.Login,

            // Data from server
            serverResponse: {message: '', error: false},
            userServer: null
        };

        this.loadLanguage(this.state.language);
        this.refCountrySelector = React.createRef();
        this.refMySimpleDateTime = React.createRef();
        this.refEntityTypeSelector = React.createRef();
        this.refInputPassword = React.createRef();
        this.refAccountPage = React.createRef();
        this.refRegistrationEndPage = React.createRef();
        this.refLoginMainPage = React.createRef();
    }

    loadLanguage(langCode) {
        this.lang = require('../../locale/' + langCode + '/other.json');
    }

    callAPIRegister(postData) {
        // Check data to send
        let isValid = soccerCheck.checkRegistrationData(postData);

        if(!isValid) {
            return;
        }
        
        axios.post(cnf.urlBase + '/v1/uid/', postData)
            .then(res => {
                this.setState({ serverResponse: {
                    message: res.data.message,
                    error: !res.data.ok
                }});
                if(res.data.ok) {
                    this.setState({
                        activeForm: this.stateEnum.RegisterEnd, 
                        userServer: res.data.result
                    });
                }
            })
            .catch(err => {
                console.error('catch error', err);
            });
    }

    handleLogin = () => {
        if (this.state.activeForm === this.stateEnum.RegisterEnd) {
            // Go to panel of login
            this.setState({ 
                activeForm: this.stateEnum.Login, 
                uid: this.state.userServer.uid, 
                password: '' });   
        } else {
            // Go to panel of login
            this.setState({ activeForm: this.stateEnum.Login });        
        }        
    }
    
    handleRegister = () => {
        if(this.state.activeForm === this.stateEnum.Register) {
            let postData = {
                password: this.state.password,
                entityType: this.state.entityType,
                language: this.state.language,
                country: this.state.country,
                birthday: this.state.birthday,
                email: this.state.email,
                fullName: this.state.fullName,
                phone: this.state.phone
            };
            
            this.callAPIRegister(postData);
        } else {
            this.setState({ 
                serverResponse: { message: '', error: false }, 
                activeForm: this.stateEnum.Register
            });
        }        
    }

    handleCancelRegister = () => {
        this.setState({ activeForm: this.stateEnum.Login });
    }

    handleLogout = () => {
        this.setState({ activeForm: this.stateEnum.Login, userServer: null});
    }

    handleLoginUserOk = (userServer) => {
        this.setState({activeForm: this.stateEnum.Account, userServer: userServer});
    }

    handleGoToRegister = () => {
        this.setState({ 
            serverResponse: { message: '', error: false }, 
            activeForm: this.stateEnum.Register
        });
    }

    handleChangeLang = (newLang) => {
        this.loadLanguage(newLang);
        this.setState({ language: newLang });
        if(this.refCountrySelector.current) {
            this.refCountrySelector.current.changeLanguageFromParent(newLang);
        }
        if(this.refMySimpleDateTime.current) {
            this.refMySimpleDateTime.current.changeLanguageFromParent(newLang);
        }  
        if(this.refEntityTypeSelector.current) {
            this.refEntityTypeSelector.current.changeLanguageFromParent(newLang);
        } 
        if(this.refAccountPage.current) {
            this.refAccountPage.current.changeLanguageFromParent(newLang);
        }
        if(this.refRegistrationEndPage.current) {
            this.refRegistrationEndPage.current.changeLanguageFromParent(newLang);
        }
        if(this.refLoginMainPage.current) {
            this.refLoginMainPage.current.changeLanguageFromParent(newLang);
        }
    }

    handleChangePhone = (e) => {
        this.setState({phone: e.intlPhoneNumber});
    }

    handleChangeEntityType = (value) => {
        this.setState({entityType: value});
    }

    handleChangeBirthdate = (value) => {
        this.setState({birthday: value});
    }

    handleChangeCountry = (value) => {
        this.setState({country: value});
    }

    handleChange = (e, alternativeName, alternativeValue) => {
        let target = e?.currentTarget;
        let value = target?.value || alternativeValue;
        if(typeof value === "undefined") {
            value = "";
        }
        let name = target?.name || alternativeName;
        switch(name) {
            case "fullName":
                this.setState({fullName: value});
                break;
            case "password":
                this.setState({password: value});
                break;
            case "email":
                this.setState({email: value});
                break;
            default:
                break;
        }
    }

    render() {
        // Input rows

        // Lang changer
        const rowLang = (<LangSelector 
                            language={this.state.language} 
                            handleChangeLang={this.handleChangeLang} />);

        // Server response
        const rowServerResponse = (this.state.serverResponse.error &&
            <div className="alert alert-danger" role="alert">
                {this.state.serverResponse.message}
            </div>);

        // Entity type
        const rowEntityType = (this.state.activeForm === this.stateEnum.Register && 
            <EntityTypeSelector 
                ref={this.refEntityTypeSelector} 
                language={this.state.language} 
                entityType={this.state.entityType} 
                handleChangeEntityType={this.handleChangeEntityType.bind(this)} />);

        // Password
        const rowPassword = (this.state.activeForm === this.stateEnum.Register &&
            <div className="form-group">
                <label className="sr-only">{this.lang.Password}</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder={this.lang.Password} 
                    onChange={this.handleChange.bind(this)} 
                    ref={this.refInputPassword} 
                    name="password"
                    value={this.state.password} />
            </div>);

        // Full Name    
        const rowFullName = (this.state.activeForm === this.stateEnum.Register && 
            <div className="form-group">
                <label className="sr-only">{this.lang.FullName}</label>
                <input type="text" className="form-control" 
                    name="fullName" 
                    onChange={this.handleChange.bind(this)}
                    placeholder={this.persons.includes(this.state.entityType) ? this.lang.FullName : this.lang.Title} />
            </div>);

        // Country
        const rowCountry = (this.state.activeForm === this.stateEnum.Register && 
            <CountrySelector 
                ref={this.refCountrySelector} 
                language={this.state.language} 
                name="country"
                handleChangeCountry={this.handleChangeCountry} />);

        // Phone
        const rowTel = (this.state.activeForm === this.stateEnum.Register && 
            <IntlTelInput
                preferredCountries={[sc.countries.us, sc.countries.gb, sc.countries.es, sc.countries.ru]}
                defaultCountry={sc.countries.us}
                defaultValue={'+1 555-555-5555'}
                onChange={this.handleChangePhone.bind(this)} />);
        
        // E-mail
        const rowEmail = (this.state.activeForm === this.stateEnum.Register && 
            <div className="form-group">
                <label className="sr-only">{this.lang.Email}</label>
                <input 
                    type="text" 
                    className="form-control mt-2" 
                    placeholder={this.lang.Email} 
                    name="email" 
                    onChange={this.handleChange.bind(this)} />
            </div>);

        // Birthdate
        const rowDate = (this.state.activeForm === this.stateEnum.Register && this.persons.includes(this.state.entityType) &&
            <div className="pl-0 container">
                <div className="row">
                    <div className="col-12">
                        <label className="d-flex align-self-start">{this.lang.DateOfBirth}:</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="mx-auto">
                            <MySimpleDateTime 
                                ref={this.refMySimpleDateTime}
                                onChange={this.handleChangeBirthdate} />
                        </div>                        
                    </div>                
                </div>
            </div>);

        // Buttons

        // Login
        const btnLogin = ((this.state.activeForm === this.stateEnum.RegisterEnd) && 
            <button className="btn btn-primary btn-lg"
                onClick={this.handleLogin}>
                    {this.lang.Login}
            </button>);
        
        // Register
        const btnRegister = ((this.state.activeForm === this.stateEnum.Register) &&
            <button className={"btn " + (this.state.activeForm === this.stateEnum.Login ? 'btn-secondary' : 'btn-success') + " btn-lg ml-3"}
                onClick={this.handleRegister}>
                    {this.lang.Register}
            </button>)

        // Cancel
        const btnCancel = (this.state.activeForm === this.stateEnum.Register && 
            <button className="btn btn-secondary btn-lg" 
                onClick={this.handleCancelRegister}>
                    {this.lang.Cancel}
            </button>);

        // Logout
        const btnLogout = (this.state.activeForm === this.stateEnum.Account  && 
            <button className="btn btn-warning btn-lg" 
                onClick={this.handleLogout}>
                    {this.lang.Logout}
            </button>);

        // Blocks
        const accountBlock = (this.state.activeForm === this.stateEnum.Account &&
            <AccountMainPage 
                userData={this.state.userServer} 
                language={this.state.language} 
                ref={this.refAccountPage} />);
            
        const RegistrationEndPageBlock = (this.state.activeForm === this.stateEnum.RegisterEnd && 
            <RegistrationEndPage
                userData={this.state.userServer} 
                language={this.state.language} 
                ref={this.refRegistrationEndPage} />);

        const loginBlock = (this.state.activeForm === this.stateEnum.Login &&
            <LoginMainPage
                password={this.state.password}
                uid={this.state.uid}
                language={this.state.language} 
                ref={this.refLoginMainPage}
                handleLoginUserOk={this.handleLoginUserOk.bind(this)} 
                handleGoToRegister={this.handleGoToRegister.bind(this)} />);
        
        // Return all JSX
        return (
            <section id="cover" className="min-vh-100">
                <div id="cover-caption">
                    <div className="container">
                        <div className="row text-white">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4 well rounded">
                                <h1 className="display-4 py-2 text-truncate">UID.soccer</h1>
                                <div className="px-2">
                                    <div className="justify-content-center">
                                        {rowLang}
                                        {rowServerResponse}
                                        {loginBlock}{accountBlock}{RegistrationEndPageBlock}
                                        {rowEntityType}
                                        {rowFullName}
                                        {rowCountry}
                                        {rowTel}
                                        {rowEmail}
                                        {rowPassword}
                                        {rowDate}
                                        <div className="mt-3">
                                            {btnLogin}{btnCancel}{btnRegister}{btnLogout}
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default MainPage;