import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';

export default class Welcome extends Component {
    render() {
        return (<div id="homeView" class="h-full flex flex-col justify-center">
            <div class="text-center">
                <div class="homeText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div class="flex-1">
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