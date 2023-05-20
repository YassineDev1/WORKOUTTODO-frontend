"use client";
import { Workout } from "@/app/types/Workout";
import { useForm } from "react-hook-form";

interface EditWorkoutProps {
  workout: Workout
  handleEditWorkout: (workout: Workout) => void;
}

const EditWorkout: React.FC<EditWorkoutProps> = ({ handleEditWorkout, workout }) => {

    const {title, reps, load} = workout

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const EditWorkout = async (formData: any) => {
    await handleEditWorkout(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(EditWorkout)}
      className="self-center w-full max-w-xl p-4 mx-auto bg-white shadow-md md:self-start"
    >
      <h2 className="mb-4 text-xl font-semibold text-center">Edit Workout</h2>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="title">
          Title
        </label>
        <input
          title="title"
          placeholder="Title"
          type="text"
          className="w-full p-2 border"
          defaultValue={title}
          {...register("title", {
            required: true,
            pattern: {
              value: /^[A-Za-z]+$/,
              message: "Title must contain only characters",
            },
          })}
        />
        {errors.title && (
          <span className="text-red-500">{String(errors?.title?.message)}</span>
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
          defaultValue={reps}
          {...register("reps", { required: true, valueAsNumber: true })}
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
          defaultValue={load}
          {...register("load", { required: true, valueAsNumber: true })}
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
        Edit
      </button>
    </form>
  );
};

export default EditWorkout;
