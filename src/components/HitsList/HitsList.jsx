import React from 'react';
import PropTypes from 'prop-types';
import styles from "./HistList.module.css";

export default function HitsList ({hits, onShowModal}) {
    return(
        <ul className={styles.ImageGallery}>
            {hits.map(({id, webformatURL, tags, largeImageURL}) => (
                <li className={styles.ImageGalleryItem} key={id} onClick={onShowModal}>
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

HitsList.propTypes ={
    hits: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,   
        })
    ),
    onShowModal: PropTypes.func.isRequired 
}