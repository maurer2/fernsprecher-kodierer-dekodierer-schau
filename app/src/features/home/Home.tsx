import { ReactElement } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

export default function Home(): ReactElement {
  const isLoading = useSelector((state: RootState) => state.calls.isLoading);

  return <div className="container">
    <h2>Is Loading!</h2>
  </div>;
}
