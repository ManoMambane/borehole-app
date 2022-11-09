import React, { Component } from 'react'
import ElimDataService from '../api/ElimDataService'
import AuthenticationService from './AuthenticationService.js'
import './kutama.css';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import CircleIcon from '@mui/icons-material/Circle';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';

const data = [
  { name: "Jan", Total: 123 },
  { name: "Feb", Total: 120 },
  { name: "Mar", Total: 984 },
  { name: "Apr", Total: 1600 },
  { name: "May", Total: 123 },
  { name: "Jun", Total: 170 },
  { name: "Jul", Total: 500 },
  { name: "Aug", Total: 120 },
  { name: "Sep", Total: 360 },
  { name: "Oct", Total: 180 },
  { name: "Nov", Total: 123 },
  { name: "Dec", Total: 984 },
];

const piedata = [
  { name: "Working", value: 900 },
  { name: "Not Working", value: 300 },
];

const COLORS = ["#db9942fa", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ElimComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eliminfos: [],
      message: null,
    }
    this.updateElimInfoClicked = this.updateElimInfoClicked.bind(this)
    this.deleteElimInfoClicked = this.deleteElimInfoClicked.bind(this)
    // this.addElimClicked = this.addElimClicked.bind(this)
    this.refreshElimInfos = this.refreshElimInfos.bind(this)
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

  componentDidMount() {
    console.log('componentDidMount')
    this.refreshElimInfos();
    console.log(this.state)
  }

  refreshElimInfos() {
    let username = AuthenticationService.getLoggedInUser()
    ElimDataService.retrieveAllElimInfos(username)
      .then(
        response => {
          // console.log(response)
          this.setState({ eliminfos: response.data })
        }
      )
  }

  updateElimInfoClicked(id) {
    // console.log('update ' + id)
    this.props.navigate(`/elim-satellite/${id}`)
    // let username = AuthenticationService.getLoggedInUserName()

  }

  deleteElimInfoClicked(id) {
    let username = AuthenticationService.getLoggedInUser()
    console.log(id + " " + username);
    ElimDataService.deleteElimInfo(username, id)
      .then(
        response => {
          this.setState({ message: `Delete Successful` })
          this.refreshElimInfos()
        }
      )
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h3">Elim Satellite Borehole</Card.Title>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {/* <Single/> */}
                <div className='single'>
                  {/* <Sidebar /> */}
                  <div className='singleContainer'>
                    {/* <Navbar /> */}
                    <div className="top">
                      <div className="left">
                        <div className="title">Elim Satellite Area Chart</div>
                        <ResponsiveContainer width="100%" aspect={4 / 3}>
                          <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{
                              top: 10,
                              right: 38,
                              left: 0,
                              bottom: 8
                            }}>
                            <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
                            <XAxis dataKey="name" stroke='gray' />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="Total" stroke="#8884d8" fill="#8884d8" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="right">
                        <div className="container">
                        <div className="title">Elim Satellite PieChart</div>
                          <div className="pchart">
                            <div className="pielegend">
                              <ul >
                                <CircleIcon className='greenCircleIcon'
                                />
                                Working
                                <hr></hr>
                                <CircleIcon className='redCircleIcon'
                                />
                                Not Working
                              </ul>
                            </div>
                            <PieChart width={400} height={400}>
                              <Pie
                                data={piedata}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {piedata.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                            </PieChart>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='tableContainer'>
                  {/* <ElimDrawer /> */}
                  <TableContainer>
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Village</th>
                          <th className="border-0">Borehole</th>
                          <th className="border-0">Challenge</th>
                          <th className="border-0">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.eliminfos.map(
                            eliminfo =>
                              <tr key={eliminfo.id}>
                                <td>{eliminfo.village}</td>
                                <td>{eliminfo.boreholeNum}</td>
                                <td>{eliminfo.challenge}</td>
                                <td style={eliminfo.option === "Working" ? green : red}>{eliminfo.option}</td>
                                <td>{moment(eliminfo.targetDate).format('YYYY-MM-DD')}</td>
                                <td> <EditIcon onClick={() => this.updateElimInfoClicked(eliminfo.id)}
                                  className="editicon" /></td>
                                <td> <DeleteIcon onClick={() => this.deleteElimInfoClicked(eliminfo.id)}
                                  className="deleteicon" /></td>
                              </tr>
                          )
                        }
                      </tbody>
                    </Table>
                  </TableContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default ElimComponent

const red = {
  color: 'red',
  backgroundColor: ' rgba(189, 189, 3, 0.103)'
  // backgroundColor: 'red   '
}

const green = {
  color: ' green',
  backgroundColor: 'rgba(0, 128, 0, 0.151)'
}

// const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };