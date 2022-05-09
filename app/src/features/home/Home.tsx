import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import * as Styles from './Home.styles';

const Home = (): ReactElement => (
  <Styles.View>
    <Styles.Header>
      <Styles.Title>Home</Styles.Title>
    </Styles.Header>
    <Styles.Content>
      <Styles.NavList>
        <Styles.NavEntry>
          <Link to={{ pathname: '/calls' }}>Calls</Link>
        </Styles.NavEntry>
      </Styles.NavList>
    </Styles.Content>
  </Styles.View>
);

export default Home;
