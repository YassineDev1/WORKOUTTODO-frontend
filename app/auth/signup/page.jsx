"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const SignIn = () => {
  const [response, setResponse] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/signup`,
        formData
      );
      if (data) {
        setResponse(data)
        if(data?.status !== 404){
           setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
        }     
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
      <div className="hidden md:block">
        <img
          className="object-cover w-full h-full"
          src="/images/bg-1.jpg"
          alt=""
        />
      </div>

      <div className="relative flex flex-col justify-center px-4 bg-gray-100">
        <div className="relative flex items-center justify-between px-12 bottom-36 ">
          <Link
            className="flex items-center justify-center w-10 h-10 bg-red-500 rounded"
            href="/"
          >
            <FaArrowLeft className="text-base font-normal text-gray-200" />
          </Link>
          <div className="flex flex-col text-2xl font-bold text-center ">
            WORKOUT <span> TODO</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[450px] w-full mx-auto bg-white px-10 py-6"
        >
          {response && (
            <div className="block text-center">
              <p
                className={
                  response?.status !== 404
                    ? "font-bold text-green-500"
                    : "font-bold text-red-500"
                }
              >
                {response?.message}
              </p>
            </div>
          )}
          <h2 className="py-6 text-4xl font-bold text-center">Sign Up</h2>
          <div className="flex flex-col py-2">
            <label>name</label>
            <input
              className="p-2 border"
              type="text"
              placeholder="name"
              {...register("name", {
                required: true,
                minLength: 6,
                pattern: /^[A-Za-z\s]+$/,
              })}
            />
            {errors.name && (
              <span className="text-red-500">
                {errors.name.type === "required"
                  ? "This field is required"
                  : "Name must be at least 6 characters"}
              </span>
            )}
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="p-2 border"
              type="text"
              placeholder="email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
            />
            {errors.email && (
              <span className="text-red-500">
                {errors.email.type === "required"
                  ? "This field is required"
                  : "Enter a valid email address"}
              </span>
            )}
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="p-2 border"
              type="password"
              placeholder="password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <span className="text-red-500">
                {errors.password.type === "required"
                  ? "This field is required"
                  : errors.password.type === "minLength"
                  ? "password must be at least 6 characters"
                  : "Invalid Password"}
              </span>
            )}
          </div>
          <button className="w-full py-2 my-5 text-white bg-red-500 border hover:bg-red-400">
            register
          </button>
          <div className="flex justify-center gap-2">
            <p className="flex items-center">If you already have an account</p>
            <Link className="font-bold text-red-600" href="/auth/login">
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
