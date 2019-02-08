import React from 'react';
import {Link} from 'react-router-dom';
import DishItem from '../shared/DishItem';
import Button from '../shared/Button';

const Overview = ({model}) => {
    return (
        <div className="h-full">
            <div  className="flex flex-wrap m-5 p-5 border-b-4 border-black">
                <div className="flex-3 flex flex-wrap justify-end">
                    {model.getFullMenu().map(dish => <div key={dish.id}>
                        <DishItem dish={dish}/>
                        <div className="text-right pr-6">{model.getDishPrice(dish)}</div>
                    </div>)}
                </div>
                <div className="flex-1 flex flex-col justify-end border-l-4 border-black pl-3">
                    <div>
                        Total:
                    </div>
                    <div>
                        {model.getTotalMenuPrice() + " SEK"} 
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Link to="/print">
                    <Button
                        text="Print menu"
                    />
                </Link>
            </div>
        </div>
    )
}

export default Overview;