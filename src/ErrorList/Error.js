import React from 'react';
export default function Error({error, remove}) {
    return (<div className="bg-red-light border-2 border-red rounded shadow-md my-2 flex justify-between">
        <div>
            <div className="text-sm md:text-lg font-bold">
                {error.code + " " + error.statusText}
            </div>
            <div className="text-xs md:text-base">
                {error.details}
            </div>
        </div>
        <div className="px-2 flex flex-col justify-center">
            <i className="fa fa-remove p-1 hover:bg-white hover:text-red rounded"
                onClick={() => remove(error.id)}    
            />
        </div>
    </div>)
}