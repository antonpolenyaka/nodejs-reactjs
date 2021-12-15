import React, {Component} from 'react';
import sc from '../../soccer-codification.json';
import soccerUtils from '../../soccer-utils/uid-utils';
import cnf from '../../config.json'; // config of web
import axios from 'axios'; // for post request

class LoginMainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverResponse: { message: '', error: false },
            language: props.language || sc.lang.en,
            password: props.password || '',
            uid: props.uid || ''
        }

        this.refInputUid = React.createRef();
        this.refInputPassword = React.createRef();
        this.loadLanguage(this.state.language);
        this.onLoginUserOkEvent = props.handleLoginUserOk;
        this.onGoToRegister = props.handleGoToRegister;
    }

    loadLanguage(langCode) {
        this.lang = require('../../locale/' + langCode + '/other.json');
    }

    changeLanguageFromParent(langCode) {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
    }

    handleChange = (e) => {
        let target = e?.currentTarget;
        let value = target?.value || "";
        if(typeof value === "undefined") {
            value = "";
        }
        let name = target?.name || "";
        switch(name) {
            case "password":
                this.setState({password: value});
                break;
            case "uid":
                let isValid = soccerUtils.checkValidUID(value);
                console.log("validation uid", isValid, value);
                if (!isValid) {
                    target.className = "form-control is-invalid";
                    target.focus();
                } else {
                    target.className = "form-control is-valid";
                }
                this.setState({uid: value});
                break;
            default:
                break;
        }
    }

    callAPILogin(uid, password) {
        // Check data to send
        let isValid = true;

        if (password.length === 0) {
            this.refInputPassword.current.className = "form-control is-invalid";
            this.refInputPassword.current.focus();
            isValid = false;
        } else {
            this.refInputPassword.current.className = "form-control is-valid";
        }

        if (uid === null || uid.length === 0) {
            this.refInputUid.current.className = "form-control is-invalid";
            this.refInputUid.current.focus();
            isValid = false;
        } else {
            this.refInputUid.current.className = "form-control is-valid";
        }

        if(!isValid) {
            return;
        }
        
        let postData = {uid: uid, password: password};
        axios.post(cnf.urlBase + '/v1/login/', postData)
            .then(res => {
                this.setState({ serverResponse: {
                    message: res.data.message,
                    error: !res.data.ok
                }});
                if(res.data.ok) {
                    this.onLoginUserOkEvent(res.data.result);
                }
            })
            .catch(err => {
                console.error('catch error', err);
            });
    }

    handleLogin = () => {
        // Go to verification
        this.callAPILogin(this.state.uid, this.state.password);
    }
    
    handleRegister = () => {
        this.onGoToRegister();
    }

    render() {
        // UID
        const rowUid = (
            <div className="form-group">
                <label className="sr-only">UID</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="UID" 
                    onChange={this.handleChange.bind(this)} 
                    ref={this.refInputUid} 
                    maxLength="28" 
                    name="uid"
                    value={this.state.uid} />
            </div>);

        // Password
        const rowPassword = (
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

        // Buttons

        // Login
        const btnLogin = (
            <button className="btn btn-primary btn-lg"
                onClick={this.handleLogin}>
                    {this.lang.Login}
            </button>);
        
        // Register
        const btnRegister = (
            <button className={"btn btn-secondary btn-lg ml-3"}
                onClick={this.handleRegister}>
                    {this.lang.Register}
            </button>);

        return (
            <div>
                {rowUid}
                {rowPassword}
                <div className="mt-3">
                    {btnLogin}{btnRegister}
                </div>  
            </div>
        );
    }
}

export default LoginMainPage;