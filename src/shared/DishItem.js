import { Link } from 'react-router-dom';
import React from 'react';

export default function DishItem({dish}) {
    return (
        <Link to={"details/" + dish.id} className="smallImageContainer p-6 cursor-pointer text-black no-underline">
            <div className="imageContainer flex justify-center border-2 border-black">
                <img className="h-full w-full"
                    src={"https://spoonacular.com/recipeImages/" + dish.id + "-312x150.jpg"}
                    alt={dish.title}
                />
            </div>
            <div className="imageText border-2 border-black text-center truncate text-sm">
                {dish.title}
            </div>
        </Link>
    )
}