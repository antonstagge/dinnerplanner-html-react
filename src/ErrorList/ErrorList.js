import React, {useState, useEffect} from 'react';
import Error from './Error';

export default function ErrorList({model}) {
    const [errors, setErrors] = useState(model.getErrors());

    useEffect(() => {
        model.addObserver({update, id: 'ERROR-LIST'});
        return () => {
            model.removeObserver("ERROR-LIST");
        }
    })

    function update() {
        setErrors(model.getErrors());
        console.log(errors)
    }
    
    return (<div className="fixed pin-t pin-r w-48 md:w-64 text-white z-10">
        {errors.map(e => {
            console.log("ehre")
            return <Error data={e}/>
        })}
    </div>)
}