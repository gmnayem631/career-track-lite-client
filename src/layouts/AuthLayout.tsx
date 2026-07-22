import { Outlet, Link } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center justify-center px-6">
      <Link to="/" className="mb-8 font-bold text-2xl text-[#1E2A4A]">
        CareerTrack
      </Link>
      <div className="w-full max-w-md bg-white border border-[#D8DCE3] rounded-lg p-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
