"use client";
import axios from "axios";
import AddWorkout from "../components/Workout/AddWorkout";
import NavBar from "../components/Workout/NavBar";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Workout, WorkoutType } from "../types/Workout";
import Workouts from "../components/Workout/Workouts";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [isRedirectedToLogin, setIsRedirectedToLogin] = useState(false);

  const router = useRouter();

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
      setIsFetched(true);
    } catch (error) {
      console.log(error?.response);
      if (error?.response?.status === 401 && !isRedirectedToLogin) {
        setIsRedirectedToLogin(true);
        await router.push('auth/login?message=Token Expired');
      } else {
        setErrorMessage("An error occurred while fetching workouts.");
      }
    }
  }
}, [token, router, isRedirectedToLogin]);



useEffect(() => {
  if (!isFetched && session && router.pathname !== "/auth/login") {
    fetchWorkouts();
  }
}, [isFetched, fetchWorkouts, session, router]);


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
        setIsFetched(false);
      } catch (err) {
        console.log(err);
      }
    },
    [token]
  );

  const onDelete = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/workouts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFetched(false);
      } catch (err) {
        console.log(err);
      }
    },
    [token]
  );

  // Render different content based on session status
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <div className="h-full">
      <NavBar name={name} />
      <div className="flex flex-col-reverse justify-end h-screen gap-10 px-4 py-10 bg-gray-300 md:px-10 lg:px-20 md:flex-row ">
        <Workouts cards={workouts} onDelete={onDelete} />
        <AddWorkout handleAddedWorkout={handleAddedWorkout} />
      </div>
    </div>
  );
};

export default Dashboard;
