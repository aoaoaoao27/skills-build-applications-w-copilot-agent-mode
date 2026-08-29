import { getApiUrl } from '../config/api';
import { useFetchData } from '../hooks/useFetchData';

function Workouts() {
  const { data: workouts, error, loading } = useFetchData(getApiUrl('workouts'));

  if (loading) return <p>Loading workouts…</p>;
  if (error) return <p className="text-danger">Error loading workouts: {error}</p>;

  return (
    <div>
      <h1>Workouts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Suggested For</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.difficulty}</td>
              <td>
                {(workout.suggestedFor ?? [])
                  .map((user) => user.name ?? user)
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
