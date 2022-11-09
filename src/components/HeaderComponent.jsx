import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import '../css/header.css'

class HeaderComponent extends Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <div className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="wrapper">
                        <div className="top">
                                <span className="logo">BOREHOLE LITE</span>
                        </div>
                        <div className="items">
                            <div className="item">
                                <ul className='navbar-nav'>
                                    {isUserLoggedIn && <li ><Link className='nav-link' to='/welcome/eddy'>
                                        <HomeIcon className='icon' />
                                        Home
                                    </Link></li>}
                                    {isUserLoggedIn && <li ><Link className='nav-link' to='/kutama'>
                                        <DashboardIcon className='icon' />
                                        Kutama</Link></li>}
                                    {isUserLoggedIn && <li ><Link className='nav-link' to='/elim-satellite'>
                                        <DashboardIcon className='icon' />
                                        Elim Satellite</Link></li>}
                                </ul>
                                <ul className='navbar-nav navbar-collapse justify-content-end'>
                                    {!isUserLoggedIn && <li >
                                        <Link className='nav-link' to='/login'>
                                            <LoginRoundedIcon className='icon' />
                                            Login
                                        </Link>
                                    </li>}
                                    {isUserLoggedIn && <li >
                                        <Link className='nav-link' to='/login' onClick={AuthenticationService.logout}>
                                        <LogoutRoundedIcon className='icon' />
                                            Logout
                                        </Link>
                                    </li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default HeaderComponent
