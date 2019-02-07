import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import ErrorList from './ErrorList/ErrorList';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Dinner Planner',
        }
    }

    render() {
        return (
        <div className="h-screen">
            <ErrorList/>
            <h1 class="header text-center bg-orange-light flex flex-col justify-center">
                Dinner planner
            </h1>
            <div class="body">
                <Route exact path="/" component={Welcome}/>
                <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
            </div>
        </div>
        );
    }
}
