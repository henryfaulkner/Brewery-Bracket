import React, { Component } from 'react';
import Card from "./CurrentCompetitionCard";

class Bracket extends React.Component {
    render() {
      return(
          <div className="bracket-card">
              <div className="card-container">
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