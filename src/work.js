import React, { Component } from "react"

class Work extends Component {
    render() {
        return (<div className=" card mb-4">
                    <div className="card-body">
                        <h3 className="card-title"> {this.props.company} </h3>
                        <p className="card-text" id="des"> {this.props.description}</p>
                        <a target="_blank" href={"https://maps.google.com/?q=" +encodeURI(this.props.company) + "+in+" + encodeURI(this.props.location) }>
                    <button type="button" className="btn btn-primary mb-3">Location</button>
                        </a>
                        </div>
            </div>
            
        );
    }
}
export default Work;