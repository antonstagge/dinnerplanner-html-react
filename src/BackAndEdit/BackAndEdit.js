import React, {useState, useEffect} from 'react'; 
import {Link} from 'react-router-dom';
import Button from '../shared/Button';

const Overview = ({model}) => {
    const [numberOfGuests, setNumberOfGuests] = useState(model.getNumberOfGuests());

    useEffect(() => {
        setNumberOfGuests(model.getNumberOfGuests());
    }, [numberOfGuests])


    return <div id="backAndEditContainer" className="flex border-b-4 border-black p-3">
            <div className="flex-1 flex lg:text-xl font-bold p-2">
                    <div>
                            My dinner:&nbsp;
                    </div>
                    <div id="numberOfGuests">{numberOfGuests}</div>
                    <div>
                            &nbsp;people
                    </div>
            </div>
            <div>
                <Link to="/search">
                    <Button
                        text="Back and edit"
                    />
                </Link>
            </div>
    </div>
}
export default Overview;