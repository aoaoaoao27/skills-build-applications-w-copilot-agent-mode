import { useFetchData } from '../hooks/useFetchData';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const { data: entries, error, loading } = useFetchData(API_URL);

  if (loading) return <p>Loading leaderboard…</p>;
  if (error) return <p className="text-danger">Error loading leaderboard: {error}</p>;

  const sorted = [...entries].sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{entry.team?.name ?? '—'}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
