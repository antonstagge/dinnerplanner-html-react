import React, {Component} from 'react';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import DishItem from '../../shared/DishItem';


class SearchDishes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'INITIAL',
            type: 'all',
            filter: ''

        }
    }

    componentDidMount = () => {
        this.search()
    }

    search = () => {
        console.log(this.state.type, this.state.filter)
        this.props.model.getAllDishes(this.state.type, this.state.filter)
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.search();
    }

    render() {
        let dishesList = null;
        
        switch (this.state.status) {
            case 'INITIAL':
                dishesList = <Spinner/>
                break;
            case 'LOADED':
                dishesList = this.state.dishes.map((dish) =>
                    <DishItem 
                        key={dish.id}
                        dish={dish}
                    />
                )
                break;
            default:
                dishesList = <b>Failed to load data, please try again</b>
                break;
        }

        return (<div id="dishSearchContainer" className="flex-3 border flex-col flex">
            <div id="inputContainer" className="border p-4">
                    <div className="text-xl font-bold pb-3">FIND A DISH</div>
                    <form className="flex flex-wrap -ml-2" onSubmit={this.handleSubmit}>
                            <input id="textFilter" 
                                type="text" 
                                className="border flex-1 mx-2" 
                                placeholder="Enter key words"
                                value={this.state.filter}
                                onChange={e => this.setState({filter: e.target.value})}
                            />
                            <select id="typeFilter" 
                                className="border flex-1 mx-2"
                                onChange={e => this.setState({type: e.target.value})}
                            >
                                {this.props.model.getTypes().map(type => <option key={type}>{type}</option>)}
                            </select>
                            <Button id="searchBtn" text="Search"/>
                    </form>
            </div>
            <div id="resultContainer" className=" flex justify-center flex-wrap relative h-full">
                {dishesList}
            </div>
        </div>
        );
    }
}

export default SearchDishes;
