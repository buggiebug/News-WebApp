import React, { Component } from 'react';
import loading from "./loading.gif";

export default class Spineer extends Component {
    render() {
        return (
            <div className="text-center">
                <img src={loading} alt="loading" />
            </div>
        )
    }
}
