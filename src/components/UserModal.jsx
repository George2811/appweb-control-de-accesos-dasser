import React, {useState} from 'react';
import { helpHttp } from '../helpers/helpHttp';

export default function UserModal({users, set}) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Activo");

  // TODO: obten los campos y haz la petición POST
  // Falta el update users tmb
  const handleChange = (e, set) => {
    set(e.target.value);
  }

  const resetForm= () => {
    setName("");
    setLastname("");
    setLogin("");
    setPassword("");
    setStatus("Activo"); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    helpHttp().post('http://127.0.0.1:8000/users', {
      body: {
        "name": name,
        "last_name": lastname,
        "login": login,
        "password": password,
        "status": status
      },
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      }
    }).then((res) => {
      console.log(res);
      resetForm();
      set(users);
    });
  }

  return (
    <>
    <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#newUserModal">
      Nuevo usuario +
    </button>

    <div className="modal fade" id="newUserModal" tabIndex="-1" aria-labelledby="newUserModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="newUserModalLabel">Nuevo usuario</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body my-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Nombre(s)</label>
                <input type="text" className="form-control" id="nameInput" value={name} onChange={e => handleChange(e, setName)}/>
              </div>

              <div className="mb-3">
                <label htmlFor="lastNameInput" className="form-label">Apellidos</label>
                <input type="text" className="form-control" id="lastNameInput" value={lastname} onChange={e => handleChange(e, setLastname)}/>
              </div>

              <div className="mb-3">
                <label htmlFor="loginInput" className="form-label">Login</label>
                <input type="text" className="form-control" id="loginInput" value={login} onChange={e => handleChange(e, setLogin)}/>
              </div>

              <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="InputPassword" value={password} onChange={e => handleChange(e, setPassword)}/>
              </div>

              <div className="mb-3">
                <label htmlFor="statusSelection" className="form-label">Estado</label>
                <select className="form-select" id="statusSelection" value={status} onChange={e => handleChange(e, setStatus)}>
                  <option value="Activo">Activo</option>
                  <option value="Bloqueado">Bloqueado</option>
                  <option value="Eliminado">Eliminado</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
    </>
  );
}