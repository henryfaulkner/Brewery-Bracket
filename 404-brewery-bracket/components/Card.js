import React, { Component } from 'react';

class Card extends React.Component {
    render() {
      return(
          <div className="card">
            <div className="card-body">
              <h1>{this.props.name}</h1>
            </div>
          </div>
      )
    }
  }

export default Card;