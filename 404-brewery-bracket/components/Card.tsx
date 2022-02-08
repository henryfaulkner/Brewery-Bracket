import * as React from 'react';

type Props = {
  name: string;
};

const Card: React.FC<Props> = ({ name }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default Card;
