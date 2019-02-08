import React, { Component } from 'react';
import {modelInstance as model} from '../../data/DinnerModel';
class Sidebar extends Component {

    constructor(props) {
        super(props)

        // we put on state the properties we want to use and modify in the component
        this.state = {
        numberOfGuests: model.getNumberOfGuests()
        }
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to setup model observer
    componentDidMount() {
        model.addObserver({view:this, id:"SIDEBAR"})
    }

    // this is called when component is removed from the DOM
    // good place to remove observer
    componentWillUnmount() {
        model.removeObserver("SIDEBAR")
    }

    // in our update function we modify the state which will
    // cause the component to re-render
    update() {
        this.setState({
        numberOfGuests: model.getNumberOfGuests()
        })
    }

    // our handler for the input's on change event
    onNumberOfGuestsChanged = (e) => {
        model.setNumberOfGuests(+e.target.value)
    }

    render() {
        return (
        <div className="Sidebar">
            <h3>This is the sidebar</h3>
            <p>
            People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
            <br/>
            Total number of guests: {this.state.numberOfGuests}
            </p>
        </div>
        );
    }
}

export default Sidebar;
