import React, { Component } from "react";
import Link from "next/link";

const CardInBracket: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h1>{this.props.breweryName}</h1>
        <Link href={`/brewery-day/${this.props.breweryId}`}>
          <button>Go to Brewery Day page</button>
        </Link>
      </div>
    </div>
  );
};

export default CardInBracket;
