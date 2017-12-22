import React, { Component } from 'react';
import JobMaps from "./jobmaps";
import Work from "./work";
import axios from "axios";
import allStates from "./allstates.json"
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: " ",
      location: " ",
      stateSelect:[]
    }
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.selectOnChange = this.selectOnChange.bind(this)
    this.axiosCall = this.axiosCall.bind(this)
  }
  handleStateChange(e) {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  axiosCall() {
    let site = `https://jobs.github.com/positions.json?description=${this.state.search}&location=${this.state.location}`
    axios.get(site)
      .then((response) => {
        let jdata = [];

        response.data.places.foreach((place) => {
          const info = {
            id: place.unique_id,
            name: place.name,
            directions: place.directions,
            lat: place.lat,
            lon: place.lon,
            city: place.city,
            state: place.state,

            career: {
              id: place.careers[0].unique_id,
              name: place.careers[0].name,
              description: place.careers[0].description,
              url: place.careers[0].url
            }
          }
          jdata.push(info);
        });
        this.setState({
          jobs: jdata
        });
      });
  }

  componentDidMount(){
    let states = []
    for (let i = 0; i<allStates.length;i++) {
      let theState = allStates[i].toLowerCase().replace("","-");
      states.push(
        <option
        key={theState}
        value={theState}
        >
        {allStates[i]}
        </option>);
        this.setState({
          stateSelect:states
        })
    }
  }
  handleClick(e) {
    this.axiosCall()






    let job = this.state.jobs.find((job) => job.id === parseInt(this.state.search, 10));
    this.setState({ selectjob: job });
  }
  selectOnChange(e) {
    this.setState({ select: e.currentTarget.value });
  }

  render() {
    return (
      <div className="container mt-5">
        <header>
          <h1 className="text-black font-weight-bold text-center">Welcome to Jobs of The Future</h1>
          <p className="text-black font-weight-light text-center">Come surch for your next job today</p>
        </header>
        <hr />
        <div className="row">
          <div className="col=4">
            <div className="card bg-white" name="card text-left">
              <h2 className="card-header pl-3 pt-3">Your Career Awaits</h2>
              <div className="card-block">
                <h2 className="fort-weight-bold">Job</h2>

                <div className="Control">
                  <input
                  id="search"
                    type="text"
                    value={this.state.value}
                    // onChange={this.handleChange}
                     placeholder="Filter by title, benefits, companies, expertise"
                   />
                </div>
                <h2 className="fornt-weight-bold">Locations</h2>
                <div className="control">
                <select name="state"
                className="form-control px-4 where  are they?"
                onChange={this.handleStateChange}
                >
                {this.state.stateSelect}
                </select>

                  {/* {
                      this.state.jobs &&
                      this.state.jobs.map((job) => {
                        return <option vlaue={job.id}>{job.name}</option>
                      })
                    }
                  </input> */}
                </div>
                <button className="btn btn-success btn btn-block create-todo" value="submit" onClick={this.hanleClick}>
                  Search Now
                </button>
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="card mb-5" style={{ overflow: "hidden" }}>
              <h2 className="card-header text-center">MAP</h2>
              <div>
                <div className="border round" style={{ height: "300px", width: "728px" }}>
                  <JobMaps
                    lat={this.state.selectJob && this.state.selectJob.lat}
                    lng={this.state.selectJob && this.state.selectJob.log}
                    job={this.state.selectJob && this.state.selectJob} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <pre>
              {this.state.selectJob &&
                <Work
                  key={this.state.selectJob.id}
                  name={this.state.selectJob.name}
                  job={this.state.selectJob}
                  description={this.state.selectJob.career.description}
                  location={[this.state.selectJob.lat, this.state.selectJoblon]} />
              }
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
