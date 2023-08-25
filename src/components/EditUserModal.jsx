import React, {useEffect, useState} from 'react';
import { helpHttp } from '../helpers/helpHttp';

export default function EditUserModal({users, set, editUser}) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e, set) => {
    set(e.target.value);
  }
  
  useEffect(() => {
    setName(editUser.name);
    setLastname(editUser.last_name);
    setLogin(editUser.login);
    setPassword(editUser.password);
    setStatus(editUser.status);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    helpHttp().put(`http://127.0.0.1:8000/users/${editUser.id}`, {
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
      set(users);
    });
  }

  return (
    <>
    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#${editUser.id}`}>
      Editar
    </button>

    <div className="modal fade" id={editUser.id} tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">Editar usuario {editUser.id}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body my-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre(s)</label>
                <input type="text" className="form-control" value={name} onChange={e => handleChange(e, setName)}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Apellidos</label>
                <input type="text" className="form-control" value={lastname} onChange={e => handleChange(e, setLastname)}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Login</label>
                <input type="text" className="form-control" value={login} onChange={e => handleChange(e, setLogin)}/>
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" aria-describedby="passwordlHelp" value={password} onChange={e => handleChange(e, setPassword)}/>
                <div id="passwordlHelp" className="form-text">* Colocar contrseña nueva, sino se mantendrá la misma.</div> 
              </div>

              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select className="form-select" value={status} onChange={e => handleChange(e, setStatus)}>
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