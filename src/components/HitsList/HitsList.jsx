import React from 'react';

export default function HitsList ({hits, onShowModal}) {
    return(
        <ul className="ImageGallery">
            {hits.map(({id, webformatURL, tags, largeImageURL}) => (
                <li className="ImageGalleryItem" key={id} onClick={onShowModal}>
                    <img src={webformatURL} 
                    width="640" 
                    alt={tags} 
                    data-modal={largeImageURL} 
                    className="ImageGalleryItem-image" />
                </li>
            ))}
        </ul>
    )
}