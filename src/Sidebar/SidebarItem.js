import React from 'react';

const SidebarItem = ({dish, price, remove}) => {
    return (
        <div className="flex justify-between bg-orange m-1 p-1 border border-black">
            <div className="flex-1">{dish.title}</div>
            <div>{price}</div>
            <div className="w-10 flex justify-end">
                <button onClick={()=> remove(dish.id)} className="w-5 bg-red text-white rounded hover:bg-white hover:text-red hover:shadow-inner border border-orange hover:border-red">
                    <i className="fa fa-trash"/>
                </button>
            </div>
        </div>
    )
}

export default SidebarItem;