import { Workout } from "@/app/types/Workout";
import Card from "./Card";
import Link from "next/link";
interface WorkoutsProps {
  cards: Workout[];
  onDelete: (id: string) => void;
}

const Workouts: React.FC<WorkoutsProps> = ({ cards, onDelete }) => {
  return (
    <div className="flex flex-col items-center w-full max-h-full overflow-auto ">
      {cards &&
        cards.map((card, index) => (
          <Card key={index} data={card} onDelete={onDelete} />
        ))}
    </div>
  );
};

export default Workouts;
