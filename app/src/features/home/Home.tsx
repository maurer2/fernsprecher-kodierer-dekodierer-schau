import { ReactElement } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";


export default function Home(): ReactElement {

  return (
    <div className="container">
      <h2>Home</h2>

      <Link
        to={{
          pathname: "/calls",
        }}
      >
        Calls
      </Link>
    </div>
  );
}
