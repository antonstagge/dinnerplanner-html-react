import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';

export default class Welcome extends Component {
    render() {
        return (<div id="homeView" className="h-full flex flex-col justify-center">
            <div className="text-center">
                <div className="homeText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className="flex-1">
                    <Link to="/search">
                        <Button
                            text="Start planning"
                        />
                    </Link>
                </div>
            </div>
        </div>
        );
    }
}