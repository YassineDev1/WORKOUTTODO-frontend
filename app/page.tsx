import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-3xl font-bold text-center max-w-[600px]"> Welcome to our platform, to get started click on Sign Up or If you are already one of our clients just click Sign In</p>
        <div className="flex flex-col gap-4 items-center justify-between p-8 min-h-[150px]">
          <h1 className="text-2xl font-semibold">WORKOUTTODO</h1>
          <div className="flex items-center justify-center gap-6">
            <Link className="px-4 py-1 text-white bg-red-500 rounded-md hover:bg-red-400 min-w-[90px] text-center" href="auth/login">Sign In</Link>
            <Link className="px-4 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-400 min-w-[90px] text-center" href="auth/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
