"use client";
import axios from "axios";
import AddWorkout from "../components/Workout/AddWorkout";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Workout, WorkoutType } from "../types/Workout";
import Workouts from "../components/Workout/Workouts";
import { useRouter, usePathname } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [isRedirectedToLogin, setIsRedirectedToLogin] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  const token = session?.user?.accessToken;


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
    } catch (error: any) {
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
  if (!isFetched && session && pathName !== "/auth/login") {
    fetchWorkouts();
  }
}, [isFetched, fetchWorkouts, session, pathName]);


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
        }: any = addedWorkout;

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
      } catch (err: any) {
        console.log(err);
      }
    },
    [token]
  );

  if (status === "loading") {
    return <div className="text-center">Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <>
      <Workouts cards={workouts} onDelete={onDelete} />
      <AddWorkout handleAddedWorkout={handleAddedWorkout} />
    </>
  );
};

export default Dashboard;
