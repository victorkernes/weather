import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      inputValue: "London"
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&units=imperial&APPID=d3edaf606e8c6083d0b179d22a0e0d17`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          temp: result.main.temp,
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render() {
    console.log(this.state.inputValue);
    const button = <div className="fetch-button" onClick={this.fetchData}>Fetch</div>;

    return (
    <main>
      <div className="temperature">Current temp: {this.state.temp}</div>
      <input type="text" onChange={this.handleInputChange} />
      {button}
    </main>
    )
  }  
}

export default App;
