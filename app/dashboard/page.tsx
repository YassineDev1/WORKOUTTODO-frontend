"use client";
import axios from "axios";
import AddWorkout from "../components/Workout/AddWorkout";
import NavBar from "../components/Workout/NavBar";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Workout, WorkoutType } from "../types/Workout";
import Workouts from "../components/Workout/Workouts";

const Dashboard = () => {
  const { data: session } = useSession();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const token = session?.user?.accessToken;
  const name: string = session?.user?.data?.name;
  const fetchWorkouts = useCallback(async () => {
    if (token) {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/workouts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const {
          data: { workouts },
        } = response;
        setWorkouts(workouts);
      } catch (error) {
        console.error(error);
      }
    }
  }, [token]);
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleAddedWorkout = useCallback(
    async (workout: WorkoutType) => {
      try {
        const addedWorkout: Workout = await axios.post(
          "http://127.0.0.1:5000/workouts",
          workout,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const {
          data: { workout: newWorkout },
        } = addedWorkout;

        setWorkouts((prevWorkouts) => [newWorkout, ...prevWorkouts]);
        fetchWorkouts();
      } catch (err) {
        console.log(err);
      }
    },
    [token, fetchWorkouts]
  );

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/workouts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchWorkouts();
      } catch (err) {
        console.log(err);
      }
    },
    [token, fetchWorkouts]
  );

  return (
    <div className="h-full">
      <NavBar name={name} />
      <div className="flex flex-col-reverse h-screen gap-10 py-10 bg-gray-300 first-letter md:px-10 lg:px-20 md:flex-row ">
        <Workouts cards={workouts} onDelete={onDelete} />
        <AddWorkout handleAddedWorkout={handleAddedWorkout} />
      </div>
    </div>
  );
};

export default Dashboard;
