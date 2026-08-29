import { getApiUrl } from '../config/api';
import { useFetchData } from '../hooks/useFetchData';

function Teams() {
  const { data: teams, error, loading } = useFetchData(getApiUrl('teams'));

  if (loading) return <p>Loading teams…</p>;
  if (error) return <p className="text-danger">Error loading teams: {error}</p>;

  return (
    <div>
      <h1>Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>
                {(team.members ?? [])
                  .map((member) => member.name ?? member)
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
