import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Home = (): ReactElement => (
  <div className="container">
    <h1>Home</h1>
    <Link to={{ pathname: '/calls' }}>Calls</Link>
  </div>
);

export default Home;
