import React from 'react'; 
import axios from 'axios'; 
import './signin.css';

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    };

    render () {
        return (          
            <form onSubmit={this.submitHandler} className="signinForm">   
                <div>
                    <label>Username</label>
                    <input 
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        name="username"
                        type="text"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        name="password"
                        type="password"
                    />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        );
    }

    submitHandler = event => {
        event.preventDefault();

        axios  
            .post('http://localhost:5500/api/login', this.state)
            .then(response => {
                localStorage.setItem('jwt', response.data.token); 

                console.log('signing props', this.props);
                this.props.history.push('/users');
            })
            .catch(err => console.log('error signing in!'));
    };

    inputChangeHandler = event => {
        const { name, value } = event.target; 

        this.setState({ [name]: value });
    };
}

export default Signin; 
