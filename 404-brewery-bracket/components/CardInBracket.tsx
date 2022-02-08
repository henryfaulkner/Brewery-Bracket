import React, { Component } from "react";
import Link from "next/link";


type Props = {
  breweryName: string
  breweryId: string
};

const CardInBracket: React.FC<Props> = ({ breweryName, breweryId }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h1>{breweryName}</h1>
        <Link href={`/brewery-day/${breweryId}`}>
          <button>Go to Brewery Day page</button>
        </Link>
      </div>
    </div>
  );
};

export default CardInBracket;
