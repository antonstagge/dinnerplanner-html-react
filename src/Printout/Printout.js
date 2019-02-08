import React from 'react';
const Printout = ({model}) => (
    <div>
        {model.getFullMenu().map(dish =>
            <div key={dish.id} className="flex flex-wrap">
                <div className="sm:flex-auto md:flex-1 flex m-6">
                    <img src={dish.image} alt={dish.title} className="w-2/3 h-2/3"/>
                    <div className="flex-1 flex flex-col ml-4">
                        <div className="text-xl font-bold">{dish.title.toUpperCase()}</div>
                        <div className="pt-1 font-bold">{"Ready in " + dish.readyInMinutes + " minutes"}</div>
                    </div>
                </div>
                <div className="flex-1 m-6">
                    <div className="font-bold text-xl">PREPARATIONS</div>
                    <div className="pt-1">{dish.instructions}</div>
                </div>
            </div>
        )}
    </div>
)
export default Printout;