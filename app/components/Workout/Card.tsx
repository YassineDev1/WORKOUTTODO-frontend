"use client";
import { Workout } from "@/app/types/Workout";
import { FaTrash } from "react-icons/fa";

interface CardProps {
  data: Workout;
  onDelete: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ data, onDelete }) => {
  const handleDelete = () => {
    onDelete(data._id);
  };

  return (
    <div className="flex self-center justify-between w-full p-4 mb-4 bg-white rounded-md shadow-md lg:max-w-5xl">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-green-500 ">{data.title}</h3>
        <div>
          <p>
            <strong>Load(kg) </strong> {data.load}
          </p>
          <p>
            <strong>Reps: </strong> {data.reps}
          </p>
          <p>
            <strong>Created At: </strong> {data.createdAt}
          </p>
        </div>
      </div>
      <div>
        <button
          title="delete"
          onClick={handleDelete}
          className="p-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-400"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Card;
