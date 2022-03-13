import { ReactElement, useEffect } from 'react';

type NavigationProps = {
  daysWithCalls: string[],
}

export default function Navigation(props: NavigationProps): ReactElement {
  useEffect(() => {
    console.log('mounted', props);
  }, [props]);

  return <nav>Nav</nav>;
}
