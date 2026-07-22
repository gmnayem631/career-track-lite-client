import { Button } from "@heroui/react";
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#D8DCE3] bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <p className="font-bold text-[#1E2A4A] text-xl">CareerTrack</p>

        {/* Nav links - hidden on mobile for now, we'll add a mobile menu later if time allows */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#3A3F4B]">
          <a
            href="#features"
            className="hover:text-[#3D7A6E] transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#3D7A6E] transition-colors"
          >
            How it works
          </a>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-[#1E2A4A]">
            Log in
          </Button>
          <Button className="bg-[#3D7A6E] text-white hover:bg-[#336a5f]">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
