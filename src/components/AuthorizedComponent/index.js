import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function AuthorizedComponent({ Component }) {
    const history=useHistory();
  useEffect(() => {
    console.log("in auth component");
    let is_loggedIn = localStorage.getItem('logged_in');
    if (is_loggedIn === 'true') {
      return <Component/>
    } else {
      history.push('/login')
    }
  }, []);

  return (
    // <div>
      <Component />
    // </div>
  );
}
