import { getApiUrl } from '../config/api';
import { useFetchData } from '../hooks/useFetchData';

function Activities() {
  const { data: activities, error, loading } = useFetchData(getApiUrl('activities'));

  if (loading) return <p>Loading activities…</p>;
  if (error) return <p className="text-danger">Error loading activities: {error}</p>;

  return (
    <div>
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.name ?? '—'}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
