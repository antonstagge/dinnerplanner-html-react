import React, {Component} from 'react';
import Error from './Error';

export default class ErrorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: props.model.getErrors(),
        }
    }
    componentDidMount = () => {
        this.props.model.addObserver({update: this.update, id: 'ERROR-LIST'});
    }
        
    componentWillUnmount = () => {
        this.props.model.removeObserver("ERROR-LIST");
    }
        
    update = () => {
        this.setState({errors: this.props.model.getErrors()});
    }
    
    render() {
        return (<div className="fixed pin-t pin-r w-48 md:w-64 text-white z-10">
            {this.state.errors.map(e => {
                return <Error key={e.id} error={e} remove={(id) => this.props.model.removeError(id)}/>
            })}
        </div>)
    }
}