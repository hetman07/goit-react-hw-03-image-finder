import React, { Component } from "react";
import fetchApi from "../service/pixabayApi";

class App extends Component {
  state = {
    hits: [],
    query: "",
    per_page: 12,
  };
  componentDidMount() {
    fetchApi.fetchImageWithQuery().then((hits) => this.setState({ hits }));
  }

  render() {
    return <></>;
  }
}

export default App;
