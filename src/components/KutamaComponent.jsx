// import {React,  Component} from 'react'
// import InfoDataService from '../api/InfoDataService'
// import AuthenticationService from './AuthenticationService.js'
// import './kutama.css';
// import Table from '@mui/material/Table';
// import TableContainer from '@mui/material/TableContainer';
// import CircleIcon from '@mui/icons-material/Circle';
// import moment from 'moment'
// import Drawer from './Drawer/Drawer'
// import {
//   Card,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";
// import './Drawer/drawer.css'
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


// const data = [
//   { name: "Jan", Total: 1200 },
//   { name: "Feb", Total: 2100 },
//   { name: "Mar", Total: 800 },
//   { name: "Apr", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "Jun", Total: 170 },
//   { name: "Jul", Total: 500 },
//   { name: "Aug", Total: 120 },
//   { name: "Sep", Total: 360 },
//   { name: "Oct", Total: 180 },
//   { name: "Nov", Total: 123 },
//   { name: "Dec", Total: 984 },
// ];

// const piedata = [
//   { name: "Working", value: 400 },
//   { name: "Not Working", value: 700 },
// ];

// const COLORS = ["#00C49F", "#db9942fa"];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// class KutamaComponent extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       infos: [],
//       message: null,
//     }
//     this.updateInfoClicked = this.updateInfoClicked.bind(this)
//     this.deleteInfoClicked = this.deleteInfoClicked.bind(this)
//     this.refreshInfos = this.refreshInfos.bind(this)
//   }

//   componentWillUnmount() {
//     console.log('componentWillUnmount')
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('shouldComponentUpdate')
//     console.log(nextProps)
//     console.log(nextState)
//     return true
//   }

//   componentDidMount() {
//     console.log('componentDidMount')
//     this.refreshInfos();
//     console.log(this.state)
//   }

//   refreshInfos() {
//     let username = AuthenticationService.getLoggedInUser()
//     InfoDataService.retrieveAllInfos(username)
//       .then(
//         response => {
//           this.setState({ infos: response.data })
//         }
//       )
//   }

//   updateInfoClicked(id) {
//     // console.log('update ' + id)
//     this.props.navigate(`/kutama/${id}`)
//   }

//   // LOOK AT THE BACK END CODE AND CHANGE TO THIS COMPONENT 
//   // AND UPDATE ELIM COMPONENT!!

//   addTodoClicked() {
//     console.log('button clicked')
//   }
//   deleteInfoClicked(id) {
//     let username = AuthenticationService.getLoggedInUser()
//     console.log(id + " " + username);
//     InfoDataService.deleteInfo(username, id)
//       .then(
//         response => {
//           this.setState({ message: `Delete Successful` })
//           this.refreshInfos()
//         }
//       )
//   }

//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           <Col md="12">
//             <Card className="strpied-tabled-with-hover">
//               <Card.Header>
//                 <Card.Title as="h3">Kutama Borehole</Card.Title>
//                 {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
//               </Card.Header>
//               <Card.Body className="table-full-width table-responsive px-0">
//                 <div className='single'>
//                   <div className='singleContainer'>
//                     <div className="top">
//                       <div className="left">
//                         <div className="title">PROGRESS MONTHLY</div>
//                         <ResponsiveContainer width="100%" aspect={4 / 3}>
//                           <AreaChart
//                             width={730}
//                             height={250}
//                             data={data}
//                             margin={{
//                               top: 10,
//                               right: 38,
//                               left: 0,
//                               bottom: 8
//                             }}>
//                             <CartesianGrid strokeDasharray="3 3" className='chartGrid' />
//                             <XAxis dataKey="name" stroke='gray' />
//                             <YAxis />
//                             <Tooltip />
//                             <Area type="monotone" dataKey="Total" stroke="#8884d8" fill="#8884d8" />
//                           </AreaChart>
//                         </ResponsiveContainer>
//                       </div>
//                       <div className="right">
//                         <div className="container">
//                           <div className="pchart">
//                             <div className="pielegend">
//                               <ul >
//                                 <CircleIcon className='greenCircleIcon'
//                                 />
//                                 Working
//                                 <hr></hr>
//                                 <CircleIcon className='redCircleIcon'
//                                 />
//                                 Not Working
//                               </ul>
//                             </div>
//                             <PieChart width={400} height={400}>
//                               <Pie
//                                 data={piedata}
//                                 cx={200}
//                                 cy={200}
//                                 labelLine={false}
//                                 label={renderCustomizedLabel}
//                                 outerRadius={80}
//                                 fill="#8884d8"
//                                 dataKey="value"
//                               >
//                                 {piedata.map((entry, index) => (
//                                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                               </Pie>
//                             </PieChart>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='tableContainer'>
//                   <Drawer />
//                   <TableContainer>
//                     <Table className="table-hover table-striped">
//                       <thead>
//                         <tr>
//                           <th className="border-0">Village</th>
//                           <th className="border-0">Borehole</th>
//                           <th className="border-0">Condition</th>
//                            <th className="border-0">Last Updated</th>
//                           <th className="border-0">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {
//                           this.state.infos.map(
//                             info =>
//                               <tr key={info.id}>
//                                 <td>{info.village}</td>
//                                 <td>{info.boreholeNum}</td>
//                                 <td>{info.challenge}</td>
//                                 <td>{moment(info.targetDate).format('YYYY-MM-DD')}</td>
//                                 <td>{info.option}</td>
//                               </tr>
//                           )
//                         }
//                       </tbody>
//                     </Table>
//                   </TableContainer>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container >
//     )
//   }
// }
// export default KutamaComponent


import React, { Component } from 'react'
import InfoDataService from '../api/InfoDataService'
import AuthenticationService from './AuthenticationService.js'
import './kutama.css';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
// import Drawer from './Drawer/Drawer'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { Button } from '@mui/material'
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import CircleIcon from '@mui/icons-material/Circle';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';


const data = [
  { name: "Jan", Total: 1200 },
  { name: "Feb", Total: 2100 },
  { name: "Mar", Total: 800 },
  { name: "Apr", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "Jun", Total: 170 },
  { name: "Jul", Total: 500 },
  { name: "Aug", Total: 120 },
  { name: "Sep", Total: 360 },
  { name: "Oct", Total: 180 },
  { name: "Nov", Total: 123 },
  { name: "Dec", Total: 984 },
];

// pie data value
const piedata = [
  { name: "Working", value: 400 },
  { name: "Not Working", value: 700 },
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

class KutamaComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infos: [],
      message: null,
    }
    this.updateInfoClicked = this.updateInfoClicked.bind(this)
    this.deleteInfoClicked = this.deleteInfoClicked.bind(this)
    // this.addInfoClicked = this.addInfoClicked.bind(this)
    this.refreshInfos = this.refreshInfos.bind(this)
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
    this.refreshInfos();
    console.log(this.state)
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

  updateInfoClicked(id) {
    // console.log('update ' + id)
    this.props.navigate(`/kutama/${id}`)
    // let username = AuthenticationService.getLoggedInUser()


  }

  // LOOK AT THE BACK END CODE AND CHANGE TO THIS COMPONENT 
  // AND UPDATE ELIM COMPONENT!!

  addTodoClicked() {
    console.log('button clicked')
    // this.props.navigate(`/todos/-1`)
  }

  //   addInfoClicked() {
  //     this.props.navigate(`/kutama/-1`)
  //     console.log("add")
  // }

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
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h3">Kutama Borehole</Card.Title>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div className='single'>
                  {/* <Sidebar /> */}
                  <div className='singleContainer'>
                    {/* <Navbar /> */}
                    <div className="top">
                      <div className="left">
                        {/* <div className="editButton">Edit</div>
            <h1 className="title">Information</h1> */}
                        {/* <Chart /> */}

                        {/* <div className="title">{title}</div> */}
                        <div className="title">Kutama Area Chart</div>
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
                        <div className="title">Kutama PieChart</div>
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
                  {/* <Datatable/> */}
                  {/* <Drawer /> */}
                  <TableContainer>
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">Village</th>
                          <th className="border-0">Borehole</th>
                          <th className="border-0">Challenge</th>
                          <th className="border-0">Status</th>
                          {/* <th className="border-0"></th>
                        <th className="border-0"></th> */}

                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.state.infos.map(
                            info =>
                              <tr key={info.id}>
                                <td>{info.village}</td>
                                <td>{info.boreholeNum}</td>
                                <td>{info.challenge}</td>
                                <td style={info.option === "Working" ? green : red}>{info.option}</td>
                                <td> <EditIcon onClick={() => this.updateInfoClicked(info.id)}
                                  className="editicon" /></td>
                                <td>
                                  {/* <DeleteIcon onClick={() => this.deleteInfoClicked(info.id)}
                                  className="deleteicon" /> */}
                                        <td>
                                  <DeleteIcon onClick={() => this.deleteInfoClicked(info.id)}
                                  className="deleteicon" />
                                  {/* <Button
                                        className="editicon"
                                        id='editicon'
                                            variant="contained"
                                            endIcon={<EditIcon />}>
                                        </Button> */}
                                        </td>
                                  {/* <Button
                                        className="deleteicon"
                                        id='deleteicon'
                                            variant="contained"
                                            endIcon={<DeleteIcon />}>
                                        </Button> */}
                                        </td>
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
      </Container >
    )
  }
}
export default KutamaComponent

const red = {
  color: 'red',
  backgroundColor: ' rgba(189, 189, 3, 0.103)'
  // backgroundColor: 'red   '
}

const green = {
  color: ' green',
  backgroundColor: 'rgba(0, 128, 0, 0.151)'
}