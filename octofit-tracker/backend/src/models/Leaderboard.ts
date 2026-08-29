import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

export default model('Leaderboard', leaderboardSchema);
