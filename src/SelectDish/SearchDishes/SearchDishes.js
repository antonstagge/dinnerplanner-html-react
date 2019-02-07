import React, {Component} from 'react';
import Button from '../../shared/Button';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
import {modelInstance} from '../../data/DinnerModel';


class SearchDishes extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error 
        this.state = {
        status: 'INITIAL'
        }
    }

    // this methods is called by React lifecycle when the 
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount = () => {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        modelInstance.getAllDishes('All', '').then(dishes => {
        this.setState({
            status: 'LOADED',
            dishes: dishes
        });
        }).catch(() => {
        this.setState({
            status: 'ERROR'
        })
        })
    }

    render() {
        let dishesList = null;
        
        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned dishes
        switch (this.state.status) {
        case 'INITIAL':
            dishesList = <em>Loading...</em>
            break;
        case 'LOADED':
            dishesList = this.state.dishes.map((dish) =>
            <li key={dish.id}>{dish.title}</li>
            )
            break;
        default:
            dishesList = <b>Failed to load data, please try again</b>
            break;
        }

        return (<div id="dishSearchContainer" class="flex-3 border flex-col flex">
            <div id="inputContainer" class="border p-4">
                    <div class="text-xl font-bold pb-3">FIND A DISH</div>
                    <div class="flex flex-wrap -ml-2">
                            <input id="textFilter" type="text" class="border flex-1 mx-2" placeholder="Enter key words"/>
                            <select id="typeFilter" class="border flex-1 mx-2"></select>
                            <Button id="searchBtn" text="Search"/>
                    </div>
            </div>
            <div id="resultContainer" class=" flex justify-center flex-wrap relative h-full">
                {dishesList}
            </div>
        </div>
        );
    }
}

export default SearchDishes;
