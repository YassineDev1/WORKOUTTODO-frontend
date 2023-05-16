"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const [email, setEmail] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);

  const onSubmit = useCallback(() => {
    signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });

  }, [email, password]);
  return (
    <div className="relative grid w-full h-screen grid-cols-1 sm:grid-cols-2">
      <div className="relative hidden sm:block">
        <div className="">
          <Image
            className="object-cover"
            fill
            src="/images/background.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col justify-center bg-gray-100">
        <div className="max-w-[400px] w-full mx-auto bg-white p-4">
          <h2 className="py-6 text-4xl font-bold text-center">
            <span className="text-red-700">WORK</span>
            <span>OUT</span>
          </h2>
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
            <Link href="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
