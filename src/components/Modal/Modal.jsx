import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./Modal.module.css";

export default class Modal extends Component {
    static propTypes = {
        state: PropTypes.shape({
            srcModal: PropTypes.string,
            }),
        handleKeyDown: PropTypes.func,
        handleModalClick: PropTypes.func,
    }

    state = {
        srcModal: "",
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    //создаем метод класса на создание слушателя для того что бы можно
    //было почистить в componentWillUnmount ДОЛЖНА БЫТЬ ОДНА ССЫЛКА

    handleKeyDown = e => {
        if(e.code === 'Escape') {
            this.props.onCloseModal();
        }
    }

    handleModalClick = e => {
        if (e.target.nodeName !== 'IMG') {
            this.props.onCloseModal(); 
        }
    }

    render() {
        return (
            <div className={styles.Overlay} onClick={this.handleModalClick}>
                <div className={styles.Modal}>
                  {this.props.children}  
                </div>
            </div>
        )
    }
}
