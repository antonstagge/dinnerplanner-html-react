import React from 'react';
export default function Error({data}) {
    console.log("here")
    return (<div className="">
        {data.code}
    </div>)
}