import React, {Component} from 'react'
import './App.css';
import BoreholeApp from './components/BoreholeApp';
import './bootstrap.css';
// import './Borehole.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BoreholeApp />
      </div>
    );
  }
}

export default App;