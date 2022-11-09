import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import '../css/login.css'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Button from '@mui/material/Button';


class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then(
                (response) => {
                    AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                    this.props.navigate(`/welcome/${this.state.username}`)
                }
            ).catch(
                () => {
                    this.setState({ showSuccessMessage: false })
                    this.setState({ hasLoginFailed: true })
                }
            )
    }

    render() {
        return (
            <div className='container'>
                <div className='loginlogo'>
                    <h1>LOGIN</h1>
                </div>
                <div >
                    {this.state.hasLoginFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    <div className='username' >Username: <input type='text' name='username' value={this.state.username} onChange={this.handleChange} /></div>
                    <div className='password'>Password: <input type='password' name='password' value={this.state.password} onChange={this.handleChange} /></div>
                    <Button
                        onClick={this.loginClicked}
                        variant="contained"
                        endIcon={<VpnKeyIcon />}>
                        Login
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginComponent