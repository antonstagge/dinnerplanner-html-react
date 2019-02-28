import React, {useEffect, useState} from 'react';
import Spinner from '../shared/Spinner';
import Button from '../shared/Button';
import {Link} from 'react-router-dom';

const DishDetails = ({model, id}) => {
    const [dish, setDish] = useState({id: 0});

    useEffect(() => {
       
        model.getDish(id).then(dish => setDish(dish));
        return () => {
            model.removeObserver("DETAILS");
        }
    }, [])

    if (dish.id === 0) {
        return <div className="flex-3 border relative"><Spinner/></div>
    }
    return (<div className="flex-3 border relative">
        <div className="flex flex-wrap">
                <div id="dishOverviewContainer" className="flex-1 p-6">
                        <div className="text-xl font-bold pb-3">{dish.title.toUpperCase()}</div>
                        <div className="mb-2">
                            <img src={dish.image} alt={dish.title}/>
                        </div>
                        <div className="mb-2">{"Ready in " + dish.readyInMinutes + " minutes"}</div>
                        <Link to="/search">
                            <Button
                                text="Back to search"
                            />
                        </Link>
                </div>
                <div className="border-2 border-black bg-orange-lighter flex-1 flex flex-col m-6">
                        <div id="dishRecipeContainer" className="flex-1 whitespace-no-wrap">
                            <div className="text-center font-bold py-2">
                                {"INGREDIENTS FOR " + model.getNumberOfGuests() + " PEOPLE"}
                            </div>
                            {dish.extendedIngredients.map((ingredient) => {
                                var quantityNumber = Math.round(ingredient.amount*model.getNumberOfGuests());
                                var priceNumber = quantityNumber;
                                return <div key={ingredient.id} className="flex px-4">
                                    <div className="flex-1">{quantityNumber + " " + ingredient.measures.metric.unitShort}</div>
                                    <div className="flex-2 pl-1">{ingredient.name}</div>
                                    <div className="text-right pr-1">{priceNumber}</div>
                                    <div >{" SEK"}</div>
                                </div>

                            })}
                        </div>
                        <div className="m-2 border-black border"></div>
                        <div className="flex justify-between p-2">
                                <Button text="Add to menu" onClick={() => model.addDishToMenu(dish)}/>
                                <div id="totalCost" className="pr-2">
                                    {"Total cost: " + dish.extendedIngredients.map(ingred => ingred.amount*model.getNumberOfGuests()).reduce((a,b) => a+b, 0)}
                                </div>
                        </div>
                </div>
        </div>
        <div className="mt-8 text-xl font-bold px-6">PREPARATIONS:</div>
        <div className="px-6">
            {dish.instructions}
        </div>
    </div>)
}

export default DishDetails;