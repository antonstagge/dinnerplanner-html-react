import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
        }
    }
    componentDidMount() {
        this.props.model.addObserver({update:this.update, id:"SIDEBAR"})
    }
    componentWillUnmount() {
        this.props.model.removeObserver("SIDEBAR")
    }

    update = () => {
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests()
        });
    }
    onNumberOfGuestsChanged = (e) => {
        this.props.model.setNumberOfGuests(+e.target.value)
    }

    render() {
        return (<div id="sidebarContainer" className="flex-1 ">
            <div id="sidebarHeaderContainer" className="flex border-l border-r border-t border-black">
                <div className="flex-1 p-2 text-lg">
                        My Dinner
                </div>
                <button id="hamburgerToggle" 
                    className={" bg-orange-light hover:bg-orange border-2 hover:shadow-inner shadow rounded border-orange hover:border-orange-light p-2 only-small"}>
                    {/* TODO */}
                    <span id="barsIcon"className="fa fa-bars"></span>
                </button>
            </div>
            <div id="sidebarContent" className="bg-white border-l border-r border-b border-black shadow">
                <div id="numberOfGuestsSelectorContainer" className="flex pl-2 pb-2">
                        <div className="flex flex-col justify-center pr-1">
                                <div>
                                    People
                                </div>
                        </div>
                        <input id="numberOfGuestsInput" type="number" step="1" value={this.state.numberOfGuests} min="1"
                            className="w-12 border pl-2"
                            onChange={this.onNumberOfGuestsChanged}
                        />
                </div>
                <div id="selectedDishesHeader" className="flex border justify-between bg-orange-lighter p-2">
                        <div className="flex-1">
                            Dish name
                        </div>
                        <div className="">
                            Cost
                        </div>
                        <div className="w-10"></div>
                </div>
                <div id="selectedDishesNameAndPriceContainer">
                        {/* TODO: <!-- Populated by dishSearchView.js--> */}
                </div>
                <div id="totalCost" className="text-right pr-12">

                </div>
                <div className="flex justify-center pt-6 pb-6">
                    <Link to="/search">
                        <Button
                            text="Confirm dinner"
                        />
                    </Link>
                </div>
            </div>
        </div>
        );
    }
}

export default Sidebar;
