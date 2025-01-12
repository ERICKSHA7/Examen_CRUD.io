import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import '../index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="form-group">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <br />
        <form onSubmit={handleLogin} className="form-group">
          {/* Correo Electrónico */}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3" // Aplica la clase de Bootstrap para el input
            required
          />
  
          {/* Contraseña */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-3" // Aplica la clase de Bootstrap para el input
            required
          />
  
          {/* Botón de Ingreso */}
          <button type="submit" className="btn btn-success btn-block mt-3">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}  

export default Login;
