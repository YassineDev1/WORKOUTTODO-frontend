"use client";

import { WorkoutType } from "@/app/types/Workout";
import { useForm } from "react-hook-form";

interface AddWorkoutProps {
  handleAddedWorkout: (workout: WorkoutType) => Promise<void>;
}

const AddWorkout: React.FC<AddWorkoutProps> = ({ handleAddedWorkout }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddWorkout = async (formData: any) => {
    await handleAddedWorkout(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddWorkout)}
      className="self-center w-full max-w-xl p-4 mx-auto bg-white shadow-md md:self-start"
    >
      <h2 className="mb-4 text-xl font-semibold text-center">Add Workout</h2>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="title">
          Title
        </label>
        <input
          title="title"
          placeholder="Title"
          type="text"
          className="w-full p-2 border"
          {...register("title", {
            required: true,
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Title must contain only characters",
            },
          })}
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="reps">
          Reps
        </label>
        <input
          title="Reps"
          placeholder="Reps"
          type="number"
          {...register("reps", { required: true })}
          className="w-full p-2 border"
        />
      </div>
      {errors.reps && (
        <span className="text-red-500">This field is required</span>
      )}
      <div className="mb-4">
        <label className="block mb-2" htmlFor="load">
          Load
        </label>
        <input
          title="Load"
          placeholder="Load"
          type="number"
          {...register("load", { required: true })}
          className="w-full p-2 border"
        />
        {errors.load && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full py-2 mt-4 text-white bg-red-500 border hover:bg-red-400"
      >
        Add Workout
      </button>
    </form>
  );
};

export default AddWorkout;
