import React, {useState, useEffect} from 'react';
import UserModal from './UserModal';
import { helpHttp } from '../helpers/helpHttp.js';
import EditUserModal from './EditUserModal';

const UsersList = () => {
  const [formInput, setFormInput] = useState("");
  const [users, setUsers] = useState([]);
  
  const toDateString = (date) => {
    const result = `${new Date(date).toLocaleDateString('es-ES')} - ${new Date(date).toLocaleTimeString('es-ES')}`
    return result
  }

  useEffect(() => {
    helpHttp().get('http://127.0.0.1:8000/users').then((res) => {      
      if(!res.err){
        setUsers(res);
      } else {
        setUsers(null);                
      }
    });
  }, [users]);

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col">
              <UserModal users={users} set={setUsers} />
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" value={formInput} onChange={e => setFormInput(e.target.value)} placeholder='Buscar'/>
                </div>
              </form>
              <table className="table table-striped">
                  <thead className="table-dark">
                      <tr>
                          <th>id</th>
                          <th>Name</th>
                          <th>Lastname</th>
                          <th>Login</th>
                          <th>Estado</th>
                          <th>Creado el</th>
                          <th>Actualizado el</th>
                          <th>Editar</th>
                      </tr>
                  </thead>
                  <tbody>
                  {users.filter((item) => {
                    const fullString = `${item.name} ${item.login} ${item.status.toLowerCase()}`
                    return formInput === ""
                    ? item
                    : fullString.includes(formInput)
                  }).map((u, key) => {
                      return (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.last_name}</td>
                            <td>{u.login}</td>
                            <td>{u.status}</td>
                            <td>{toDateString(u.created_at)}</td>
                            <td>{toDateString(u.updated_at)}</td>
                            <td>
                                <EditUserModal users={users} set={setUsers} editUser={u} />
                            </td>
                        </tr>
                      )
                    })
                  }                
                  </tbody>
              </table>
            </div>
        </div>
    </div>
  );
}

export default UsersList