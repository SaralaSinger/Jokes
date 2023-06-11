import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './Context';
const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isValidLogin, setIsValidLogin] = useState(true)
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onTextChange = e => {
    const copy = { ...formData }
    copy[e.target.name] = e.target.value;
    setFormData(copy)
  }

  const onSubmit = async e => {
    e.preventDefault()
    const { data } = await axios.post('/api/account/login', formData);
    const isValid = !!data;
    setIsValidLogin(isValid);
    if (isValid) {
      setUser(data);
      navigate('/');
    }
  }

  return (
    <div className="container" style={{ marginTop: 80 }}>
      <main role="main" className="pb-3">
        <div
          className="row"
          style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
        >
          <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
            <h3>Log in to your account</h3>
            {!isValidLogin && <span className="text-danger">Invalid username/password. Please try again.</span>}
            <form>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
                defaultValue=""
                onChange={onTextChange}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                defaultValue=""
                onChange={onTextChange}
              />
              <br />
              <button onClick={onSubmit} className="btn btn-primary">Login</button>
            </form>
            <Link to="/signup">Sign up for a new account</Link>
          </div>
        </div>
      </main>
    </div>

  )
}
export default Login;