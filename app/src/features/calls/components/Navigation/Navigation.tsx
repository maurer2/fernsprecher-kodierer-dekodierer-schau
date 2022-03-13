import { ReactElement, useEffect, MouseEvent, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

type NavigationProps = {
  daysWithCalls: string[];
};

export default function Navigation(props: NavigationProps): ReactElement {
  // let navigate = useNavigate();

  // function handleNavClick(event: MouseEvent<HTMLButtonElement>, day: string): void {
  //   event.preventDefault();
  //   console.log('day clicked:', day);

  //   navigate('/${day')
  // }

  useEffect(() => {
    // console.log('mounted', props);
  }, [props]);

  return (
    <nav>
      {props.daysWithCalls.map((day) => (
        <Fragment key={day}>
          <Link
            to={`/${day}`}
            // onClick={(event: MouseEvent<HTMLButtonElement>) => handleNavClick(event, day)}
          >
            {day}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
