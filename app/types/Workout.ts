export interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

export interface WorkoutType{
  title: string;
  reps: number;
  load: number;
}