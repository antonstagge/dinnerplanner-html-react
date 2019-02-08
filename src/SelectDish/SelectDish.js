import React, { Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import SearchDishes from './SearchDishes/SearchDishes';

class SelectDish extends Component {
    render() {
        return (
        <div className="flex-when-big">
            <Sidebar model={this.props.model}/>
            <SearchDishes model={this.props.model}/>
        </div>
        );
    }
}

export default SelectDish;
