import React, { Component } from "react";
import Loader from "react-loader-spinner";

import Notification from "./Notification/Notification";
import HitsList from "./HitsList/HitsList";
import SearchForm from "./SearchForm/SearchForm";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import pixabayApi from "../service/pixabayApi";

class App extends Component {
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

  componentDidMount() {
    // this.setState({
    //   isLoading: true,
    // });
  }

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
    if (prevPage !== nextPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  fetchImg = () => {
    // console.log("searchQuery", this.state.searchQuery);
    const { searchQuery, page } = this.state;
    this.setState({
      isLoading: true,
    });

    pixabayApi
      .fetchImageWithQuery(searchQuery, page)
      .then((hits) =>
        this.setState((prevState) => ({
          hits: [...prevState.hits, ...hits],
          page: prevState.page + 1,
        }))
      ) //увелич текущую страницу на 1
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  //для того что бы значение query сохранить в state
  //при submit формы а также при новом запросе обнулить массив и страницу
  handleSearchFormSubmit = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      hits: [],
    });
  };

  toggleModal = (e) => {
    // const largeImg = e.target.dataset.modal;
    this.setState((state) => ({
      showModal: !state.showModal,
      // srcModal: largeImg,
    }));
  };

  render() {
    const { hits, isLoading, error, showModal, srcModal } = this.state;
    return (
      <>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {/* <img src={srcModal} /> */}
          </Modal>
        )}
        <SearchForm onSubmit={this.handleSearchFormSubmit} />
        {error && <Notification message={error.message} />}

        {hits.length > 0 && (
          <HitsList hits={hits} onShowModal={this.toggleModal} />
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
        {hits.length > 0 && !isLoading && <Button onLoadMore={this.fetchImg} />}
      </>
    );
  }
}

export default App;
