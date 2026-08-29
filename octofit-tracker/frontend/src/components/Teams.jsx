import { useFetchData } from '../hooks/useFetchData';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const { data: teams, error, loading } = useFetchData(API_URL);

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
