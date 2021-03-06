import React, { Component } from 'react';

import If from './if';

import superagent from 'superagent';

class Bands extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bands: null,
        albums: [1],
        members: [1],
        management: [1],
        clicked: null,
      }
    }
  
    getBands() {
      let url = "https://beta.dashbento.com/1.0/band";
      superagent.get(url)
        .then(res => {
          this.setState({ bands: res.body.band });
        })
        .catch(err => console.error('---ERROR---',err));
    }
  
    componentWillMount() {
      this.getBands();
    }
  
    clicked(e) {
      let band = e.target.value;
      let members = [];
      let albums = [];
      let management = [];
      for(let i = 0; i < this.state.bands.length; i++) {
        if(this.state.bands[i].bandName === band) {
          if(this.state.bands[i].albums) {
            this.state.bands[i].albums.forEach( item => {
              albums.push( `${item.title} (${item.year})` );
            });
          }
          if(this.state.bands[i].bandMember) {
            this.state.bands[i].bandMember.forEach( item => {
              members.push( `${item.firstName} (${item.instrument})` );
            });        }
          if(this.state.bands[i].management) {
            this.state.bands[i].management.forEach( item => {
              management.push( `${item.position}: ${item.firstName} ${item.lastName} (${item.phone})` );
            });
          }
        }
      this.setState({ albums });
      this.setState({ management });
      this.setState({ members });
      this.setState({ clicked: true });
      }
      
    }
  
    render() {
      if( this.state.bands !== null ) {
        return (
            <div className='container'>
              <div className='bands'>
                {this.state.bands.map( (item, i) =>(
                  <button value={item.bandName} key={i} onClick={(e) => this.clicked(e)}>{item.bandName}</button>
                ))}
              </div>
              <div className='info'>
              <If condition={this.state.clicked}>
                <p>Discography</p>
                  {this.state.albums.map( (item, i) =>(
                    <li key={i}>{item}</li>
                  ))}
                <p>Management</p>
                {this.state.management.map( (item, i) =>(
                  <li key={i}>{item}</li>
                ))}
                <p>Members</p>
                {this.state.members.map( (item, i) =>(
                  <li key={i}>{item}</li>
                ))}
              </If>
              </div>
            </div>
        )
      }
    }
  }
  
  export default Bands;