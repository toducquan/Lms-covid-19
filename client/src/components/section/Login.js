import React, { useState, useEffect } from 'react';
import { loginAction, getUser } from '../../redux/action/authAction';
import '../css/login.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.auth.user);

  if (user) return <Navigate to="/"></Navigate>;

  const handleLoginForm = () => {
    dispatch(
      loginAction({
        email: email,
        password: password,
      }),
    );
    dispatch(getUser());
  };

  return (
    <div className="container">
      <div className="intro-text">
        <h1>Sign in</h1>
      </div>
      <div className="inputs">
        <div className="input">
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="email">Email</label>
        </div>
        <div className="input">
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="password">Password</label>
        </div>
      </div>
      <button onClick={() => handleLoginForm()}>Sign in</button>
      <p className="join-link">
        New to linkedin? <a href="#">Join now</a>
      </p>
    </div>
  );
};

export default Login;
