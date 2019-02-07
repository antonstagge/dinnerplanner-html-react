import React, {Component} from 'react';

export default class Button extends Component {
    render() {
        return <button className="bg-orange-light hover:bg-orange border-2 hover:shadow-inner shadow rounded border-orange hover:border-orange-light p-2">{this.props.text}</button>
    }
}