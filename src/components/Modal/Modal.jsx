import React, { Component } from 'react'

export default class Modal extends Component {
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
            <div className="Overlay" onClick={this.handleModalClick}>
                <div className="Modal">
                  {this.props.children}  
                </div>
            </div>
        )
    }
}
