import React, { Component } from 'react';

export default class SearchForm extends Component {
    state = { inputValue: '' };

    handleChange = (e) => {  
        console.log(e.target.value);
        this.setState  ({ inputValue: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log('submit',this.state.inputValue);
        this.props.onSubmit(this.state.inputValue);
        //в App мы передаем проп = onSubmit - который получит параметр
        //query - это то значение которое мы вводим в поле инпут this.state.inputValue в файле SearchForm.jsx

        // this.setState({inputValue: '' });
        //поле инпут очищалось
    }

    render() {
        return (
            <header className="Searchbar">
            <form className="SearchForm" 
                  onSubmit = {this.handleSubmit}    >
                      <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>
                
                    <input className="SearchForm-input"
                     type="text"
                     autoComplete="off"
                     autoFocus
                     placeholder="Search images and photos"
                    value={this.state.inputValue}
                    onChange = {this.handleChange}             
                    />
            </form>
            </header>
        );
    }
}

