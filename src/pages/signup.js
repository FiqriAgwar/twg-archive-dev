import React, {Component} from 'react';
import '../design/form.css';

class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            fullname : ''
        }
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.id] : event.target.value
        });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="title">
                        Sign Up
                    </div>
                    <div className="input-field">
                        <label htmlFor="fullname">Full Name</label><br></br>
                        <input 
                            className="input"
                            type="text" 
                            id="fullname" 
                            required
                            value={this.state.fullname}  
                            onChange={this.handleChange.bind(this)} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="username">Username</label><br></br>
                        <input 
                            className="input"
                            type="text" 
                            id="username" 
                            required
                            value={this.state.username}  
                            onChange={this.handleChange.bind(this)} 
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label><br></br>
                        <input 
                            className="input"
                            type="password" 
                            id="password" 
                            required
                            value={this.state.password}  
                            onChange={this.handleChange.bind(this)} 
                        />
                    </div>
                    <div className="submit-wrap">
                        <button type="submit" className="btn-submit" onClick={this.handleSubmit.bind(this)}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;