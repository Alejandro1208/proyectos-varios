import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../componentes/footer/img/logo.png';

const ADMIN_EMAIL = 'admin@datashield.com';
const ADMIN_PASSWORD = 'admin123';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuth', 'true');
      setError('');
      navigate('/admin');
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src={Logo} alt="Data Shield" />
        </div>
        <h2>Ingreso Administrador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
