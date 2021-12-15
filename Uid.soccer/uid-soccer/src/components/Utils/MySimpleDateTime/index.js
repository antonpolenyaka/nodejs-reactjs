import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import sc from '../../../soccer-codification.json';

class MySimpleDateTime extends Component {
    constructor(props){
        super(props);

        const year18 = (new Date()).getFullYear() - 18;

        this.state = { 
            language: props.language ?? sc.lang.en,
            day: 1,
            month: 1,
            year: year18
        };

        this.loadLanguage(this.state.language);
    }

    handleChange(data) {        
        this.props.onChange(data);
    }

    changeLanguageFromParent = (langCode) => {
        this.loadLanguage(langCode);
        this.setState({ language: langCode });
    }

    loadLanguage(langCode) {
        this.lang = require('../../../locale/' + langCode + '/other.json');
    }

    checkLeapYear(year) {
        return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    }

    changeDay = (event) => {
        const dayValue = parseInt(event.target.value);
        const isLeapYear = this.checkLeapYear(this.state.year);
        let dayResult = dayValue;
        switch(dayValue) {
            case 29:
                // Good month: 1,2(leap-year),3-12
                if(this.state.month === 2 && !isLeapYear) {
                    dayResult = 28;
                }
                break;
            case 30:
                // Good month: 1,3-12
                if(this.state.month === 2) {
                    dayResult = isLeapYear ? 29 : 28;
                }
                break;
            case 31:
                // Good month: 1,3,5,7,8,10,12
                if(this.state.month === 2) {
                    dayResult = isLeapYear ? 29 : 28;
                } else if (this.state.month === 4 || this.state.month === 6 || this.state.month === 9 || this.state.month === 11) {
                    dayResult = 30;
                }
                break;
            default:
                // do nothing
                break;
        }
        this.setState({ day: dayResult });
        let data = new Date(this.state.year, this.state.month - 1, dayResult);
        this.handleChange(data);
    }

    changeMonth = (event) => {
        const monthValue = parseInt(event.target.value);
        let dayResult = this.state.day;
        switch(monthValue) {
            case 2:
                // 28 days/29(leap-year) days
                const isLeapYear = this.checkLeapYear(this.state.year);
                if(this.state.day === 30 || this.state.day === 31) {
                    dayResult = isLeapYear ? 29 : 28 ;
                } else if(this.state.day === 29 && !isLeapYear) {
                    dayResult = 28;
                }
                break;
            case 4:
            case 6:
            case 9:            
            case 11:
                // 30 days
                if(this.state.day === 31) {
                    dayResult = 30;
                }
                break;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
            default:
                // 31 days
                // do nothing
                break;
        }
        this.setState({ month: monthValue, day: dayResult });
        let data = new Date(this.state.year, monthValue - 1, dayResult);
        this.handleChange(data);
    }

    changeYear = (event) => {
        const yearValue = parseInt(event.target.value);
        let dayResult = this.state.day;
        if(this.state.month === 2) {
            const isLeapYear = this.checkLeapYear(yearValue);
            if(this.state.day === 30 || this.state.day === 31) {
                dayResult = isLeapYear ? 29 : 28;
            } else if (this.state.day === 29 && !isLeapYear) {
                dayResult = 28;
            }
        }
        this.setState({ year: yearValue, day: dayResult });
        let data = new Date(yearValue, this.state.month - 1, dayResult);
        this.handleChange(data);
    }

    render() {
        let years = [];
        const lastYear = (new Date()).getFullYear(); 
        for (let year = lastYear; year > (lastYear - 100); year--){
            years.push(<option key={"year" + year.toString()} value={year}>{year}</option>);
        }

        return (
            <div className="container">
                <div className="form-inline row">
                    <label className="sr-only">Date</label>
                    <select className="custom-select text-center col-3" value={this.state.day} onChange={this.changeDay.bind(this)}>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                    </select>
                    <select className="custom-select ml-2 col-4" value={this.state.month} onChange={this.changeMonth.bind(this)}>
                        <option value="1">{this.lang.January}</option>
                        <option value="2">{this.lang.February}</option>
                        <option value="3">{this.lang.March}</option>
                        <option value="4">{this.lang.April}</option>
                        <option value="5">{this.lang.May}</option>
                        <option value="6">{this.lang.June}</option>
                        <option value="7">{this.lang.July}</option>
                        <option value="8">{this.lang.August}</option>
                        <option value="9">{this.lang.September}</option>
                        <option value="10">{this.lang.October}</option>
                        <option value="11">{this.lang.November}</option>
                        <option value="12">{this.lang.December}</option>
                    </select>
                    <select className="custom-select ml-2 col-4" value={this.state.year} onChange={this.changeYear.bind(this)}>
                        {years}
                    </select>
                </div>
            </div>
        )
    }
}

export default MySimpleDateTime;