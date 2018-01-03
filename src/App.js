import React, { Component } from 'react';
import JobMaps from "./jobmaps";
import Work from "./work";
import axios from "axios";
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: "",
      location: "",

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.axiosCall = this.axiosCall.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  axiosCall() {
    let encodeSearch = encodeURI(this.state.search)
    let encodeLocation = encodeURI(this.state.location)
    let site = `https://jobs.github.com/positions.json?description=${encodeSearch}&location=${encodeLocation}`
    axios.get(site)
      .then((response) => {
        let jdata = [];
        response.data.forEach((job) => {
          const info = {
            id: job.id,
            company: job.company,
            company_url: job.company_url,
            description: job.description.replace(/<[^>]*>/g, ""),
            location: job.location,
            type: job.type
          }
          jdata.push(info);
        });
        this.setState({
          jobs: jdata
        });
        console.log(jdata)
      });

  }

  handleClick(e) {
    this.axiosCall()
  }

  render() {
    return (
      <div className="container mt-5">
        <header>
          <h1 className="text-black font-weight-bold text-center">Welcome to Jobs of The Future</h1>
          <p className="text-black font-weight-light text-center">Come search for your next job today</p>
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
                    name="search"
                    id="search"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Filter by title, benefits, companies, expertise"
                  />
                </div>
                <h2 className="fornt-weight-bold">Locations</h2>
                <div className="control">

                  <input name="location"
                    type="number"
                    className="form-control px-4 where  are they?"
                    placeholder="Zip Code"
                    onChange={this.handleChange}
                  >
                  </input>
                </div>
                <button className="btn btn-success btn btn-block create-todo" value="submit" onClick={this.handleClick}>
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
                    lat={this.state.location && this.state.location.lat}
                    lng={this.state.location && this.state.location.log}
                    jobs={this.state.location && this.state.location} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <pre>
              {this.state.jobs &&
                this.state.jobs.map(job => {
                  return (
                    
                      <Work
                        key={job.id}
                        company={job.company}
                        type={job.type}
                        description={job.description}
                        location={job.location} />
                   
                  )
                })
              }
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
