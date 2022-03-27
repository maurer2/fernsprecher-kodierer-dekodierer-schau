import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export default function Home(): ReactElement {
  return (
    <div className="container">
      <h1>Home</h1>
      <Link to={{ pathname: '/calls' }}>Calls</Link>
    </div>
  );
}
