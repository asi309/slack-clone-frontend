import { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

export default function Register({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const { setIsLoggedIn, themePref, darkStyle, lightStyle } = useContext(
  //   UserContext
  // );

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      if (email !== '' && password !== '' && username !== '') {
        if (
          !email.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
          )
        ) {
          throw error;
        }
        const response = await api.post('/user/register', {
          username,
          email,
          password,
        });

        const user_id = response.data.user_id || false;
        const user = response.data.user || false;

        if (user_id && user) {
          localStorage.setItem('user_id', user_id);
          localStorage.setItem('user', user);
          // setIsLoggedIn(true);
          history.push('/home');
        }
      }
    } catch (error) {
      setError(true);
      const message = error.response ? error.response.data.message : false;
      if (message) {
        setErrorMessage(message);
      } else {
        setErrorMessage('ERROR: Cannot perform the operation');
      }
      setTimeout(() => {
        setError(false);
        setErrorMessage('');
      }, 2500);
    }
  };

  return (
    <div
      className="container"
      // style={themePref === 'dark' ? darkStyle : lightStyle}
    >
      <div className="container--login">
        <form
          // style={
          //   themePref === 'dark'
          //     ? { backgroundColor: 'rgba(31, 70, 110, 0.804)' }
          //     : {}
          // }
        >
          <div className="title">Signup</div>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            autoFocus={true}
            value={username}
            placeholder="Choose your username"
            onChange={(e) => setUsername(e.target.value)}
            // style={
            //   themePref === 'dark'
            //     ? { backgroundColor: 'rgba(42, 70, 98, 0.704)', color: 'white' }
            //     : {}
            // }
          />
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            autoFocus={true}
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            // style={
            //   themePref === 'dark'
            //     ? { backgroundColor: 'rgba(42, 70, 98, 0.704)', color: 'white' }
            //     : {}
            // }
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            // style={
            //   themePref === 'dark'
            //     ? { backgroundColor: 'rgba(42, 70, 98, 0.704)', color: 'white' }
            //     : {}
            // }
          />
          <button onClick={registerHandler}>Signup</button>
          <p style={{ marginTop: '15px', alignSelf: 'center' }}>
            <Link
              to="/signup"
              style={{ color: '#0075ff', textDecoration: 'none' }}
            >
              Login
            </Link>
          </p>
          {error ? <div className="alert">{errorMessage}</div> : ''}
        </form>
      </div>
    </div>
  );
}
