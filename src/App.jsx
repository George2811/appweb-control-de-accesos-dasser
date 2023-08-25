import React from 'react';
import UsersList from './components/UsersList';

function App() {
  return (
    <>
      <nav className="navbar bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dasser - Gestión de usuarios
          </a>
        </div>
      </nav>
      <UsersList />
    </>
  );
}
export default App;