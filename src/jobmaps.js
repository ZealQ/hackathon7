import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

let AnyReactComponent = ({text}) => <div>{text}</div>;

const GoogleMapConfig = { key:"AIzaSyBg5NgQ-B_PwxOWvFkc1_gf1iLTW9wBpLU"

}

class JobMaps extends Component {
    static defaultProps = {
        center: { lat: 32.7157, lng: -117.1611 },
        lat: 32.7157,
        lng: -117.1611,
        zoom: 11
    };
    render() {
        return (
            <GoogleMapReact
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            >
                <AnyReactComponent
                    lat={this.props.lat}
                    lng={this.props.lng}
                    text={<i className="fa fa-black-tie fa-3x"></i>}
                />
            </GoogleMapReact>
        );

    }
}
export default JobMaps;