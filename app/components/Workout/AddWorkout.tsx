"use client";

import { useState } from "react";
import { WorkoutType } from "@/app/types/Workout";




interface AddWorkoutProps {
  handleAddedWorkout: (workout: WorkoutType) => Promise<void>;
}

const AddWorkout: React.FC<AddWorkoutProps> = ({ handleAddedWorkout }) => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState(0);
  const [load, setLoad] = useState(0);


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReps(Number(event.target.value));
  };

  const handleLoadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoad(Number(event.target.value));
  };

  const handleAddWorkout = async () => {
    const newWorkout: WorkoutType = { title, reps, load };
    await handleAddedWorkout(newWorkout);
  };

  return (
    <div className="max-w-xl md:self-start self-center p-4 mx-auto bg-white shadow-md w-[350px] md:w-[800px]">
      <h2 className="mb-4 text-xl font-semibold">Add Workout</h2>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="title">
          Title
        </label>
        <input
          title="title"
          placeholder="Title"
          type="text"
          name="title"
          onChange={handleTitleChange}
          className="w-full p-2 border"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="reps">
          Reps
        </label>
        <input
          title="Reps"
          placeholder="Reps"
          type="number"
          name="reps"
          onChange={handleRepsChange}
          className="w-full p-2 border"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="load">
          Load
        </label>
        <input
          title="Load"
          placeholder="Load"
          type="number"
          onChange={handleLoadChange}
          className="w-full p-2 border"
        />
      </div>
      <button
        onClick={handleAddWorkout}
        className="w-full py-2 mt-4 text-white bg-red-500 border hover:bg-red-400"
      >
        Add Workout
      </button>
    </div>
  );
};

export default AddWorkout;
