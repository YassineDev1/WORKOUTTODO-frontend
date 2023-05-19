"use client"
import { Workout } from '@/app/types/Workout'


type Props = {
    workout: Workout
}

const WorkoutDetails = ({workout}: Props) => {
    const {title, reps, load} = workout
  return (
    <div className="w-full max-w-2xl p-4 mx-auto">
      <div className="p-4 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-bold">Workout Details</h2>
        <div className="flex mb-2">
          <span className="w-20 font-semibold">Title:</span>
          <span>{title}</span>
        </div>
        <div className="flex mb-2">
          <span className="w-20 font-semibold">Reps:</span>
          <span>{reps}</span>
        </div>
        <div className="flex mb-2">
          <span className="w-20 font-semibold">Load:</span>
          <span>{load}</span>
        </div>
      </div>
    </div>
  );
}
export default WorkoutDetails;