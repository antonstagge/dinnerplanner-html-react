import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import ErrorList from './ErrorList/ErrorList';
import Sidebar from './Sidebar/Sidebar';
import SearchDishes from './SearchDishes/SearchDishes';
import DishDetails from './DishDetails/DishDetails';

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
            <ErrorList model={modelInstance}/>
            <h1 className="header text-center bg-orange-light flex flex-col justify-center">
                Dinner planner
            </h1>
            <div className="body">
                <Route exact path="/" component={Welcome}/>
                <Route path="/search" render={() => 
                    <div className="flex-when-big">
                        <Sidebar model={modelInstance}/>
                        <SearchDishes model={modelInstance}/>
                    </div>}
                />
                <Route path="/details/:id" render={({match}) => 
                    <div className="flex-when-big">
                        <Sidebar model={modelInstance}/>
                        <DishDetails model={modelInstance} id={match.params.id}/>
                    </div>}
                />
            </div>
        </div>
        );
    }
}
