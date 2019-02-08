import React, {Component} from 'react';

export default class Spinner extends Component {

    render() {
        return(
            <div className="absolute pin bg-white flex flex-col justify-center py-32">
                <div className="flex justify-center">
                    <div className="lds-hourglass flex justify-center"></div>
                </div>
            </div>
        )
    }
}