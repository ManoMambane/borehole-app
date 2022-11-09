import React,{ Component } from 'react'
import { Form, Formik } from 'formik'
import ElimDataService from '../api/ElimDataService'
import AuthenticationService from './AuthenticationService'
import moment from 'moment'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/SendOutlined'
import { Button } from '@mui/material'

class ElimUpdate extends Component {

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
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        ElimDataService.retrieveElimInfo(username, this.state.id)
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
        ElimDataService.updateElimInfo(username, this.state.id
            , {
                id: this.state.id,
                boreholeNum: values.boreholeNum,
                village: values.village,
                challenge: values.challenge,
                targetDate: values.targetDate,
                option: values.option
            }).then(
                () => { this.props.navigate('/elim-satellite') }
            )
        // console.log(values);
    }
    render() {
        let challenge = this.state.challenge //watch out for challeng in (this.state)
        let boreholeNum = this.state.boreholeNum
        let village = this.state.village
        let targetDate = this.state.targetDate
        let option = this.state.option

        return (
            <div className='container'>
                <h1>Elim Satellite</h1>
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

export default ElimUpdate