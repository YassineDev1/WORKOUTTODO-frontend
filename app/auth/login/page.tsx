"use client";
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {  useSearchParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const searchParams = useSearchParams();

  


  const onSubmit = useCallback(async () => {
    if (email && password) {
      setErrorMessage(null);
       await signIn("credentials", {
        email: email,
        password: password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    }
  }, [email, password]);

  return (
    <div className="grid w-full h-screen grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img
          className="object-cover w-full h-full"
          loading="lazy"
          src="/images/background.jpg"
          alt=""
        />
      </div>
      <div className="relative flex flex-col justify-center px-6 bg-gray-100 md:px-2">
        <div className="relative flex items-center justify-between px-12 bottom-44 ">
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
        <div className="max-w-[400px] w-full mx-auto bg-white p-8 md:p-4">
          <h2 className="py-6 text-4xl font-bold text-center">
            <span className="text-red-700">WORK</span>
            <span>OUT</span>
          </h2>
          {searchParams && (
            <div className="text-center text-red-500">
              {searchParams?.get("message")}
            </div>
          )}
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="p-2 border"
              type="email"
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
          {errorMessage && (
            <div className="text-center text-red-500">{errorMessage}</div>
          )}
          <button
            onClick={onSubmit}
            className="w-full py-2 my-5 text-white bg-red-500 border hover:bg-red-400"
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input
                name="remember"
                id="remember"
                className="mr-2"
                type="checkbox"
              />
              <label htmlFor="remember">Remember Me</label>
            </p>
            <Link href="/auth/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
