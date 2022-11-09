import React, { Component } from 'react'
import '../css/welcome.css';
import "react-circular-progressbar/dist/styles.css"
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { Link } from 'react-router-dom'

class WelcomeComponent extends Component {
    render() {
        return (
            <div className='featured'>
                <div className="featuredleft">
                    <div className="featuredChart">
                        <div className="span">
                            <div className="hover">
                            <Link className='nav-link' to='/kutama'>
                            <LightbulbIcon sx={{ fontSize: 140 }} />
                            Kutama
                        </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="featuredcenter">
                    <div className="text-box">
                        <h2>
                            WELCOME
                            <br />
                            {this.props.params.name}
                        </h2>
                        <h2>
                            WELCOME
                            <br />
                            {this.props.params.name}
                        </h2>
                    </div>
                </div>
                <div className="featuredright">
                    <div className="featuredChart">
                        <div className="span">
                            <div className="hover">
                                <Link className='nav-link' to='/elim-satellite'>
                                    <LightbulbIcon sx={{ fontSize: 140 }} />
                                    Elim-Satellite
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WelcomeComponent