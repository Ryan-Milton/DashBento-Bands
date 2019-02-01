import React, { Component } from 'react';
import './App.css';

import superagent from 'superagent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bands: null,
    }
  }

  getBands() {
    let url = "https://beta.dashbento.com/1.0/band";
    superagent.get(url)
      .then(res => {
        console.log(res.body);
        this.setState({ bands: res.body.band });
      })
      .catch(err => console.error(err));
  }

  componentWillMount() {
    this.getBands();
  }

  clicked(e) {
    console.log('clicked', e.target);
  }

  render() {
    if( this.state.bands !== null ) {
      return (
        <div className="App">
          {console.log(this.state)}
          {this.state.bands.map( (item, i) =>(
            <li value={item.bandName} key={i} onClick={(e) => this.clicked(e)}>{item.bandName}</li>
            ))}
        </div>
      )
    } else {
      return (
        <div className="App">
          {console.log('no bands')}
        </div>
      )
    }
  }
}

export default App;
