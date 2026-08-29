import { getApiUrl } from '../config/api';
import { useFetchData } from '../hooks/useFetchData';

function Users() {
  const { data: users, error, loading } = useFetchData(getApiUrl('users'));

  if (loading) return <p>Loading users…</p>;
  if (error) return <p className="text-danger">Error loading users: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.team?.name ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
