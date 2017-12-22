import React, { Component } from "react"

class Work extends Component {
    render() {
        return (
            (<div className="well card mb-4 text-center">
                <h3> {this.props.name} </h3>
                <p>{this.props.job.career.description}</p>
                <a target="_blank" href={"https://maps.google.com/?q=" + this.props.location[0] + "," + this.props.location[1]}>
            <button type="button" className="btn btn-primary mb-3">Directions</button>
                </a>
            </div>
            )
        );
    }
}
export default Work;