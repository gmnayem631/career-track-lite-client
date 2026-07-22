const Footer = () => {
  return (
    <div className="bg-[#1E2A4A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <p className="font-bold text-xl">CareerTrack</p>
          <p className="mt-2 text-sm text-white/70">
            Track every job application, from Saved to Offer, in one place.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="font-semibold text-sm uppercase tracking-wide text-white/60">
            Links
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href="#features"
                className="text-white/80 hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="text-white/80 hover:text-white transition-colors"
              >
                How it works
              </a>
            </li>
          </ul>
        </div>

        {/* About / student info - required by project doc */}
        <div>
          <p className="font-semibold text-sm uppercase tracking-wide text-white/60">
            About
          </p>
          <p className="mt-3 text-sm text-white/80">Gulam Mustafa Nayem</p>
          <p className="text-sm text-white/80">Student ID: WEB11-0869</p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} CareerTrack Lite. Built for academic
        purposes.
      </div>
    </div>
  );
};

export default Footer;
