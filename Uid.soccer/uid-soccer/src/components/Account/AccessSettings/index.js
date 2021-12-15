import React, {Component} from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import sc from '../../../soccer-codification.json'

class AccessSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            language: props.language || sc.lang.en,
            userAccessUrls: props.userAccessUrls || []
        };

        this.allUrls = [
            'cv.soccer',
            'soccerbarcelona.com',
            'platform.soccer',
            'soccerworldacademy.com',
            'of.soccer',
            'fc.soccer'
        ].sort();
    }

    showUrlConfig(url, index) {
        return (
            <div key={"url" + index} className="mt-2 px-5 py-2 rounded custom-control custom-switch bg-dark rounded-left">
                <input type="checkbox" 
                    className="custom-control-input" 
                    id={"customSwitch" + index}
                    value={url} 
                    checked={this.state.userAccessUrls.includes(url)} 
                    onChange={this.handleCheckboxChange.bind(this)} />
                <label className="custom-control-label" htmlFor={"customSwitch" + index}>{url}</label>
            </div>
        );
    }

    handleCheckboxChange(e) {
        const url = e.currentTarget.value;
        let arr = this.state.userAccessUrls;
        if(this.state.userAccessUrls.includes(url)) {
            arr = arr.filter(i => i !== url);
        } else {
            arr.push(url);
        }        
        this.setState({userAccessUrls: arr});
    }

    render() {
        return (
            <div className="mt-3 text-left mx-3">
                {this.allUrls.map((url, index) => this.showUrlConfig(url, index))}
            </div>
        );
    }
}

export default AccessSettings;