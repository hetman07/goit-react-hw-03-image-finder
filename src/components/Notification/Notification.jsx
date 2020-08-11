import React from 'react';
export default function Notification({message}) {
    return(
        <p>Whoops, something went wrong: {message}</p>
    )
}