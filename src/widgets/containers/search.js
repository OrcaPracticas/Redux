import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "../components/search";

class SearchContainer extends Component {
  state = {
      value: "Luis Fonsi",
  }

  handleSubmit = (event) => {
      event.preventDefault();
      // el dispatch se puede conseguir al utilizar
      // el connect ya que toda la aplicacion esta
      // enbuelta en el provider
      this.props.dispatch({
          type: "SEARCH_VIDEO",
          payload: {
              query: this.input.value,
          },
      });
  }

  setInputRef = (element) => {
      this.input = element;
  }

  handleInputChange = (event) => {
      this.setState({
          value: event.target.value.replace(" ", "-"),
      });
  }

  render() {
      return (
          <Search
              setRef={this.setInputRef}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleInputChange}
              value={this.state.value}
          />
      );
  }
}

export default connect()(SearchContainer);
