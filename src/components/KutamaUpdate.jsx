// import { React, Component } from 'react'
// import { Form, Formik } from 'formik'
// import InfoDataService from '../api/InfoDataService'
// import AuthenticationService from './AuthenticationService'
// import moment from 'moment'
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import SendIcon from '@mui/icons-material/SendOutlined'
// import { Button } from '@mui/material'

// class KutamaUpdate extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             id: this.props.params.id,
//             challenge: '',
//             boreholeNum: '',
//             village: '',
//             targetDate: moment(new Date()).format('YYYY-MM-DD'),
//             option: ''
//         }
//         this.onSubmit = this.onSubmit.bind(this)
//         this.validate = this.validate.bind(this)
//     }

//     componentDidMount() {
//         let username = AuthenticationService.getLoggedInUser()
//         InfoDataService.retrieveInfo(username, this.state.id)
//             .then(response => this.setState({
//                 challenge: response.data.challenge,
//                 boreholeNum: response.data.boreholeNum,
//                 village: response.data.village,
//                 targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
//                 option: response.data.option
//             }))
//     }
//     validate(values) {
//         let errors = {}
//         if (!values.challenge) {
//             errors.challenge = 'Enter a Description'
//         } else if (values.challenge.length < 5) {
//             errors.challenge = 'Enter aleast 5 Characters in Description'
//         }

//         if (!moment(values.targetDate).isValid()) {
//             errors.targetDate = 'Enter a valid Target Date'
//         }

//         return errors
//     }

//     onSubmit(values) {
//         let username = AuthenticationService.getLoggedInUser()
//         InfoDataService.updateInfo(username, this.state.id
//             , {
//                 id: this.state.id,
//                 boreholeNum: values.boreholeNum,
//                 village: values.village,
//                 challenge: values.challenge,
//                 targetDate: values.targetDate,
//                 option: values.option
//             }).then(
//                 () => { this.props.navigate('/kutama-edit') }
//             )
//     }

//     render() {
//         let challenge = this.state.challenge //watch out for challeng in (this.state)
//         let boreholeNum = this.state.boreholeNum
//         let village = this.state.village
//         let targetDate = this.state.targetDate
//         let option = this.state.option

//         return (
//             <div className='container'>
//                 <h1>Kutama</h1>
//                 <div className='container'>
//                     <Formik
//                         initialValues={{ challenge, boreholeNum, village, targetDate, option }}
//                         onSubmit={this.onSubmit}
//                         validate={this.validate}
//                         validateOnBlur={false}
//                         validateOnChange={false}
//                         enableReinitialize={true}
//                     >
//                         {
//                             (props) => (
//                                 <Form>
//                                     <div className='formGroup'>
//                                         <TextField
//                                             label="Village"
//                                             id="village"
//                                             sx={{ m: 1, width: '50ch' }}
//                                             value={this.state.village}
//                                             disabled
//                                         />
//                                         <TextField
//                                             label="Borehole"
//                                             id="boreholeNum"
//                                             sx={{ m: 1, width: '50ch' }}
//                                             value={this.state.boreholeNum}
//                                             disabled
//                                         />

//                                         <TextField
//                                             id="date"
//                                             label="Date"
//                                             type="date"
//                                             value={this.state.targetDate}
//                                             onChange={(e) => this.setState({ targetDate: e.target.value })}
//                                             sx={{ m: 1, width: '50ch' }}
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                         />
//                                         <FormControl sx={{ m: 1, width: '50ch' }}>
//                                             <Select
//                                                 labelId="demo-simple-select-label"
//                                                 id="demo-simple-select"
//                                                 value={this.state.option}
//                                                 label="Status"
//                                                 onChange={(e) => this.setState({ option: e.target.value })}
//                                             >
//                                                 <MenuItem value='Working' >Working</MenuItem>
//                                                 <MenuItem value='Not Working' >Not Working</MenuItem>
//                                             </Select>
//                                         </FormControl>

//                                         <FormControl fullWidth>
//                                             <TextField
//                                                 label="condition"
//                                                 id="Condition"
//                                                 value={this.state.challenge}
//                                                 onChange={(e) => this.setState({ challenge: e.target.value })}
//                                             />
//                                         </FormControl>

//                                         <Button
//                                             type='submit'
//                                             variant="contained"
//                                             endIcon={<SendIcon />}>
//                                             Save
//                                         </Button>
//                                     </div>

//                                 </Form>
//                             )
//                         }
//                     </Formik>
//                 </div>
//             </div>
//         )
//     }
// }

// export default KutamaUpdate

import React, { Component } from 'react'
import { Form, Formik } from 'formik'
import InfoDataService from '../api/InfoDataService'
import AuthenticationService from './AuthenticationService'
import { Link } from 'react-router-dom'
import moment from 'moment'

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/SendOutlined'
import { Button } from '@mui/material'
import './kutama.css'
import { Card } from "react-bootstrap";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';

class KutamaUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            challenge: '',
            boreholeNum: '',
            village: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD'),
            option: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.deleteInfoClicked = this.deleteInfoClicked.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        InfoDataService.retrieveInfo(username, this.state.id)
            .then(response => this.setState({
                challenge: response.data.challenge,
                boreholeNum: response.data.boreholeNum,
                village: response.data.village,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
                option: response.data.option
            }))
    }

    validate(values) {
        let errors = {}
        if (!values.challenge) {
            errors.challenge = 'Enter a Description'
        } else if (values.challenge.length < 5) {
            errors.challenge = 'Enter aleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser()
        InfoDataService.updateInfo(username, this.state.id
            , {
                id: this.state.id,
                boreholeNum: values.boreholeNum,
                village: values.village,
                challenge: values.challenge,
                targetDate: values.targetDate,
                option: values.option
            }).then(
                () => { this.props.navigate('/kutama') }
            )
        // console.log(values);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
      }

    
      refreshInfos() {
        let username = AuthenticationService.getLoggedInUser()
        InfoDataService.retrieveAllInfos(username)
          .then(
            response => {
              // console.log(response)
              this.setState({ infos: response.data })
            }
          )
      }

    deleteInfoClicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        console.log(id + " " + username);
        InfoDataService.deleteInfo(username, id)
          .then(
            response => {
              this.setState({ message: `Delete Successful` })
              this.refreshInfos()
            }
          )
      }

    render() {
        let challenge = this.state.challenge //watch out for challeng in (this.state)
        let boreholeNum = this.state.boreholeNum
        let village = this.state.village
        let targetDate = this.state.targetDate
        let option = this.state.option

        return (
            <div className='container'>
                <div className="headerContainer">
                            <div className="headerButtons">
                                    {/* <ButtonGroup variant="contained" aria-label="outlined primary button group"> */}
                                    <Link className='nav-link' to='/kutama'>
                                        <Button>
                                            <ChevronLeftIcon />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="headerDivide">
                                    <Card.Title as="h4">Kutama Borehole</Card.Title>
                                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                                </div>
                            </div>
                <div className='container'>
                    <Formik
                        initialValues={{ challenge, boreholeNum, village, targetDate, option }}
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnBlur={false}
                        validateOnChange={false}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <div className='formGroup'>
                                        <TextField
                                            label="Village"
                                            id="village"
                                            sx={{ m: 1, width: '50ch' }}
                                            value={this.state.village}
                                            disabled
                                        />
                                        <TextField
                                            label="Borehole"
                                            id="boreholeNum"
                                            sx={{ m: 1, width: '50ch' }}
                                            value={this.state.boreholeNum}
                                            disabled
                                        />

                                        <TextField
                                            id="date"
                                            label="Date"
                                            type="date"
                                            value={this.state.targetDate}
                                            onChange={(e) => this.setState({ targetDate: e.target.value })}
                                            sx={{ m: 1, width: '50ch' }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <FormControl sx={{ m: 1, width: '50ch' }}>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.option}
                                                label="Status"
                                                onChange={(e) => this.setState({ option: e.target.value })}
                                            >
                                                <MenuItem value='Working' >Working</MenuItem>
                                                <MenuItem value='Not Working' >Not Working</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <TextField
                                                label="condition"
                                                id="Condition"
                                                value={this.state.challenge}
                                                onChange={(e) => this.setState({ challenge: e.target.value })}
                                            />
                                        </FormControl>

                                        <Button
                                        className="deleteButton"
                                        id='deletebutton'
                                            variant="contained"
                                            endIcon={<DeleteIcon />}>
                                            Delete
                                        </Button>
                                        <Button
                                        className="saveButton"
                                        id='savebutton'
                                            type='submit'
                                            variant="contained"
                                            endIcon={<SendIcon />}>
                                            Save
                                        </Button>
                                    </div>

                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default KutamaUpdate