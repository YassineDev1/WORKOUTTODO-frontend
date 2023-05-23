"use client";
import { Workout } from "@/app/types/Workout";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EditWorkout from "@/app/components/Workout/EditWorkout";
import WorkoutDetails from "@/app/components/Workout/WorkoutDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";



const Edit: React.FC = () => {
  const { _id }: any = useParams();
  const [workout, setWorkout] = useState<Workout>();

  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const fetchWorkout = useCallback(async () => {
    if (token && _id) {
      try {
        const response = await axios.get(
          `${process.env.API_URI}/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { workout } = response.data;
        setWorkout(workout);
      } catch (error : any) {
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
          `${process.env.API_URI}/${_id}`,
          workout,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res?.status === 200) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Link
        className="flex items-center justify-center w-10 h-10 bg-red-500 rounded top-4"
        href="/dashboard"
      >
        <FaArrowLeft className="text-base font-normal text-gray-200" />
      </Link>
      <div className="flex">
        {workout && (
          <>
            <WorkoutDetails workout={workout} />
            <EditWorkout workout={workout} handleEditWorkout={handleEdit} />
          </>
        )}
      </div>
    </div>
  );
};

export default Edit;
