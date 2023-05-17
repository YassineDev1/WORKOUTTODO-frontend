"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";


const SignIn = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:5000/api/users/signup",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
      <div className="hidden md:block">
        <img
          className="object-cover w-full h-full"
          src="/images/background.jpg"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-center px-4 bg-gray-100">
        <form
          onSubmit={(e) => onSubmit(e)}
          className="max-w-[400px] w-full mx-auto bg-white px-10 py-6"
        >
          <h2 className="py-6 text-4xl font-bold text-center">Sign Up</h2>
          <div className="flex flex-col py-2">
            <label>name</label>
            <input
              className="p-2 border"
              type="text"
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="p-2 border"
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="p-2 border"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button className="w-full py-2 my-5 text-white bg-red-500 border hover:bg-red-400">
            register
          </button>
          <div className="flex justify-center gap-2">
            <p className="flex items-center">If you already have an account</p>
            <Link className="font-bold text-red-600" href="/login">
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
