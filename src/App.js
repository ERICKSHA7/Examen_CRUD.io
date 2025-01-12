import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Componentes/Login';
import Dashboard from './Componentes/Dashboard';
import PrivateRoute from './Componentes/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
