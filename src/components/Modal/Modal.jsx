import React, { Component } from 'react'

export default class Modal extends Component {
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
            this.props.onClose();
        }
    }
    render() {
        return (
            <div className="Overlay">
                <div className="Modal">
                  {this.props.children}  
                </div>
            </div>
        )
    }
}
