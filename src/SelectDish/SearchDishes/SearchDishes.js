import React, {Component} from 'react';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';


class SearchDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL'
        }
    }

    componentDidMount = () => {
        this.props.model.getAllDishes('All', '')
            .then(dishes => {
                if (dishes) {
                    this.setState({
                        status: 'LOADED',
                        dishes: dishes
                    });
                } else {
                    this.setState({
                        status: 'ERROR'
                    });
                }
            });
    }

    render() {
        let dishesList = null;
        
        switch (this.state.status) {
            case 'INITIAL':
                dishesList = <Spinner/>
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

        return (<div id="dishSearchContainer" className="flex-3 border flex-col flex">
            <div id="inputContainer" className="border p-4">
                    <div className="text-xl font-bold pb-3">FIND A DISH</div>
                    <div className="flex flex-wrap -ml-2">
                            <input id="textFilter" type="text" className="border flex-1 mx-2" placeholder="Enter key words"/>
                            <select id="typeFilter" className="border flex-1 mx-2"></select>
                            <Button id="searchBtn" text="Search"/>
                    </div>
            </div>
            <div id="resultContainer" className=" flex justify-center flex-wrap relative h-full">
                {dishesList}
            </div>
        </div>
        );
    }
}

export default SearchDishes;
