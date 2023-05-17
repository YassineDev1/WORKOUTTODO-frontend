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

  const fetchWorkouts =useCallback(async () => {
    try {
      const token = session?.user?.accessToken
      console.log(token);

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
      console.error("Error fetching workouts:", error);
    }
  },[session]);
  useEffect(() => {
    fetchWorkouts();
  }, [session, fetchWorkouts]);

  const handleAddedWorkout = async (workout: WorkoutType) => {
    const token = session?.user?.accessToken;
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
  };


  const onDelete = async (id: string) => {
    const token = session?.user?.accessToken  ?? ""  
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
  };

  const name:string = session?.user?.data?.name

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
