import { Button } from "@heroui/react";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#D8DCE3] bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <p className="font-bold text-[#1E2A4A] text-xl">CareerTrack</p>

        {/* Nav links - hidden on mobile for now, we'll add a mobile menu later if time allows */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3A3F4B]">
          <NavLink to={"/"} className="hover:text-[#3D7A6E] transition-colors">
            Features
          </NavLink>
          <NavLink to={"/"} className="hover:text-[#3D7A6E] transition-colors">
            How it works
          </NavLink>
          <NavLink
            to={"/dashboard"}
            className="hover:text-[#3D7A6E] transition-colors"
          >
            Dashboard
          </NavLink>
          <NavLink
            to={"/all-applications"}
            className="hover:text-[#3D7A6E] transition-colors"
          >
            All Applications
          </NavLink>
          <NavLink
            to={"/edit-applications"}
            className="hover:text-[#3D7A6E] transition-colors"
          >
            Edit Applications
          </NavLink>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-[#1E2A4A]">
            <Link to={"/auth/login"}>Log in</Link>
          </Button>
          <Button className="bg-[#3D7A6E] text-white hover:bg-[#336a5f]">
            <Link to={"/auth/register"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
