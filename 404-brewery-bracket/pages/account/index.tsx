import React from "react";
import Header from "../../components/Header";

export default class Account extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div>
            <h1>Account Information</h1>
            <h3>Name</h3>
            <h3>Visted Breweries</h3>
        </div>

      </div>
    );
  }
}
