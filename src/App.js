import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import ErrorList from './ErrorList/ErrorList';
import Sidebar from './Sidebar/Sidebar';
import SearchDishes from './SearchDishes/SearchDishes';
import DishDetails from './DishDetails/DishDetails';
import BackAndEdit from './BackAndEdit/BackAndEdit';
import Overview from './Overview/Overview';
import Printout from './Printout/Printout';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Dinner Planner',
        }
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleCookies)
    }
    componentWillUnmount() {
        window.removeEventListener('beforeunload');
    }

    handleCookies = () => {
        const cookies = new Cookies();
        cookies.set('numberOfGuests', modelInstance.getNumberOfGuests(), {path: '/'});
        const temp = modelInstance.getFullMenu().map(dish => {
            return {
                id: dish.id,
                title: dish.title,
                readyInMinutes: dish.readyInMinutes,
                extendedIngredients: dish.extendedIngredients,
                instructions: dish.instructions
            }
        })
        const test = JSON.stringify(temp);
        cookies.set('menu', test , {path: '/'});
        // TODO: just have cookies.set('menu', JSON.stringify(modelInstance.getFullMenu()) , {path: '/'});
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
                <Route path="/overview" render={() => 
                    [
                        <BackAndEdit key="BackAndEdit" model={modelInstance}/>, 
                        <Overview key="Overview" model={modelInstance}/>
                    ]}
                />
                <Route path="/print" render={() => 
                    [
                        <BackAndEdit key="BackAndEdit" model={modelInstance}/>, 
                        <Printout key="Printout" model={modelInstance}/>
                    ]}
                />
            </div>
        </div>
        );
    }
}
