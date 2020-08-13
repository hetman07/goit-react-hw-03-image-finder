import React, { Component } from "react";
import PropTypes from "prop-types";

import Loader from "react-loader-spinner";

import Notification from "./Notification/Notification";
import HitsList from "./HitsList";
import SearchForm from "./SearchForm";
import Button from "./Button";
import Modal from "./Modal";
import pixabayApi from "../service/pixabayApi";

import styles from "./App.module.css";

class App extends Component {
  static propTypes = {
    state: PropTypes.shape({
      hits: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          webformatURL: PropTypes.string.isRequired,
          tags: PropTypes.string.isRequired,
          largeImageURL: PropTypes.string.isRequired,
        }),
      ),
      searchQuery: PropTypes.string,
      page: PropTypes.number,
      per_page: PropTypes.number,
      total: PropTypes.number,
      error: PropTypes.string,
      isLoading: PropTypes.bool,
      showModal: PropTypes.bool,
      srcModal: PropTypes.string,
    }),
    fetchImg: PropTypes.func,
    handleSearchFormSubmit: PropTypes.func,
    showModal: PropTypes.func,
    closeModal: PropTypes.func,
  };

  state = {
    hits: [],
    searchQuery: "",
    page: 1,
    per_page: 12,
    total: 0,

    error: null,
    isLoading: false,

    showModal: false,
    srcModal: "",
  };

  //fetch делаем только в том случае если в state поменялось св-во searchQuery
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ page: 1 });
      this.fetchImg();
    }

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (nextPage > prevPage) {
      this.scroll();
    }
  }

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  fetchImg = () => {
    // console.log("searchQuery", this.state.searchQuery);
    const { searchQuery, page } = this.state;
    this.setState({
      isLoading: true,
    });

    pixabayApi
      .fetchImageWithQuery(searchQuery, page)
      .then(({ data }) =>
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          page: prevState.page + 1,
          total: data.total,
        })),
      ) //увелич текущую страницу на 1
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  //для того что бы значение query сохранить в state
  //при submit формы а также при новом запросе обнулить массив и страницу
  handleSearchFormSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      hits: [],
    });
  };

  showModal = e => {
    const largeImg = e.target.dataset.modal;
    this.setState(state => ({
      showModal: true,
      srcModal: largeImg,
    }));
  };

  closeModal = e => {
    this.setState(state => ({
      showModal: false,
      srcModal: "",
    }));
  };

  render() {
    const { hits, isLoading, error, showModal, srcModal, total } = this.state;

    return (
      <div className={styles.App}>
        <SearchForm onSubmit={this.handleSearchFormSubmit} />
        {error && <Notification message={error.message} />}

        {hits.length > 0 && (
          <HitsList hits={hits} onShowModal={this.showModal} />
        )}

        {showModal && (
          <Modal onCloseModal={this.closeModal}>
            <img src={srcModal} alt="" />
          </Modal>
        )}

        {isLoading && (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={5000} //3 secs
          />
        )}
        {hits.length > 0 && hits.length !== total && !isLoading && (
          <Button onLoadMore={this.fetchImg} />
        )}
      </div>
    );
  }
}

export default App;
