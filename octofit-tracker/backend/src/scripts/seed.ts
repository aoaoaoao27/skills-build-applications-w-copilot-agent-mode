import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Thompson', email: 'ava.thompson@octofit.com', age: 27 },
      { name: 'Liam Chen', email: 'liam.chen@octofit.com', age: 31 },
      { name: 'Sofia Ramirez', email: 'sofia.ramirez@octofit.com', age: 24 },
      { name: 'Noah Patel', email: 'noah.patel@octofit.com', age: 29 },
      { name: 'Mia Johnson', email: 'mia.johnson@octofit.com', age: 22 },
      { name: 'Ethan Kim', email: 'ethan.kim@octofit.com', age: 35 },
    ]);

    const [ava, liam, sofia, noah, mia, ethan] = users;

    const teams = await Team.insertMany([
      { name: 'Octo Runners', members: [ava._id, liam._id] },
      { name: 'Iron Tentacles', members: [sofia._id, noah._id] },
      { name: 'Cardio Crushers', members: [mia._id, ethan._id] },
    ]);

    await Promise.all(
      users.map((user, index) =>
        User.findByIdAndUpdate(user._id, { team: teams[Math.floor(index / 2)]._id })
      )
    );

    const [octoRunners, ironTentacles, cardioCrushers] = teams;

    await Activity.insertMany([
      { user: ava._id, type: 'Running', duration: 30, caloriesBurned: 300, date: new Date('2026-08-20') },
      { user: liam._id, type: 'Cycling', duration: 45, caloriesBurned: 400, date: new Date('2026-08-21') },
      { user: sofia._id, type: 'Weightlifting', duration: 60, caloriesBurned: 350, date: new Date('2026-08-22') },
      { user: noah._id, type: 'Swimming', duration: 40, caloriesBurned: 380, date: new Date('2026-08-23') },
      { user: mia._id, type: 'Yoga', duration: 50, caloriesBurned: 200, date: new Date('2026-08-24') },
      { user: ethan._id, type: 'HIIT', duration: 25, caloriesBurned: 320, date: new Date('2026-08-25') },
    ]);

    await Leaderboard.insertMany([
      { team: octoRunners._id, points: 720, rank: 1 },
      { team: ironTentacles._id, points: 650, rank: 2 },
      { team: cardioCrushers._id, points: 540, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        name: 'Morning 5K',
        description: 'A steady-paced 5K run to build endurance.',
        difficulty: 'beginner',
        suggestedFor: [ava._id, mia._id],
      },
      {
        name: 'Full Body Strength Circuit',
        description: 'Compound lifts targeting all major muscle groups.',
        difficulty: 'intermediate',
        suggestedFor: [sofia._id, noah._id],
      },
      {
        name: 'HIIT Sprint Intervals',
        description: 'High-intensity sprint intervals with short recovery.',
        difficulty: 'advanced',
        suggestedFor: [liam._id, ethan._id],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
