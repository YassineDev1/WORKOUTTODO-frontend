"use client";
import { Workout } from "@/app/types/Workout";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditWorkout from "@/app/components/Workout/EditWorkout";

const Edit = () => {
  const { _id }: any = useParams();
  const [workout, setWorkout] = useState<Workout>();

  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const fetchWorkout = useCallback(async () => {
    if (token && _id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/workouts/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { workout } = response.data;
        setWorkout(workout);
      } catch (error) {
        console.log(error?.response);
        if (error?.response?.status === 401) {
          await router.push("auth/login?message=Token Expired");
        } else {
          console.error(error);
        }
      }
    }
  }, [_id, router, token]);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  const handleEdit = async (workout: Workout) => {
    if (token && _id) {
      try {
        const res = await axios.put(
          `http://127.0.0.1:5000/api/workouts/${_id}`,
          workout,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(res?.status === 200){
            router.push('/dashboard')
        }
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
    
      {workout && (
        <EditWorkout workout={workout} handleEditWorkout={handleEdit} />
      )}
    </>
  );
};

export default Edit;
