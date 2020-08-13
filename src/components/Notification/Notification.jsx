import React from 'react';
import PropTypes from 'prop-types';

export default function Notification({message}) {
    return(
        <p>Whoops, something went wrong: {message}</p>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
}