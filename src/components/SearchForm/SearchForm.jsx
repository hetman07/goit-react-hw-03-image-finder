import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./SearchForm.module.css";

export default class SearchForm extends Component {
    static propTypes = {
        state: PropTypes.shape({
            inputValue: PropTypes.string
        }),
        handleChange: PropTypes.func,
        handleSubmit: PropTypes.func,
    }
    
    state = { inputValue: '' };

    handleChange = (e) => {  
        
        this.setState  ({ inputValue: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
       
        this.props.onSubmit(this.state.inputValue);
        //в App мы передаем проп = onSubmit - который получит параметр
        //query - это то значение которое мы вводим в поле инпут this.state.inputValue в файле SearchForm.jsx

        // this.setState({inputValue: '' });
        //поле инпут очищалось
    }

    render() {
        return (
            <header className={styles.Searchbar}>
            <form className={styles.SearchForm} 
                  onSubmit = {this.handleSubmit}    >
                      <button type="submit" className={styles.SearchFormButton}>
      <span className={styles.SearchFormButtonLabel}>Search</span>
    </button>
                
                    <input className={styles.SearchFormInput}
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

