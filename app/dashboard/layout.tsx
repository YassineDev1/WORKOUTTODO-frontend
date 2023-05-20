"use client";
import { useSession } from "next-auth/react";
import NavBar from "../components/Workout/NavBar";

export default function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
const {data: session} = useSession();
const name: string = session?.user?.data?.name ?? "";
  return (
    <div className="w-full h-full">
      <NavBar name={name} />
      <div className="flex flex-col-reverse justify-end h-screen gap-10 px-4 py-10 bg-gray-300 md:px-10 lg:px-20 md:flex-row ">{children}</div>
    </div>
  );
}
