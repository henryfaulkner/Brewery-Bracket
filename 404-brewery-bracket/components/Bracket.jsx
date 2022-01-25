import React, { Component } from 'react';
import Card from "./Card";

class Bracket extends React.Component {
    render() {
      return(
          <div className="bracket-card">
              <div className="card-container">

                  {this.props.card1}
                  {this.props.card2}
              </div>
              <div className="bracket-lines">
                  <div className="horizontal-lines">
                      <div className="line horizontal top"></div>
                      <div className="line horizontal bottom"></div>
                  </div>
                  <div className="line vertical"></div>
                  <div className="line horizontal center"></div>
              </div>

          </div>
      )
    }
  }

export default Bracket;