const Footer = () => {
  return (
    <div className="bg-[#1E2A4A] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 flex justify-between flex-col md:flex-row gap-8">
        {/* Brand */}
        <div>
          <p className="font-bold text-xl">CareerTrack</p>
          <p className="mt-2 text-sm text-white/70">
            Track every job application, from Saved to Offer, in one place.
          </p>
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
        © {new Date().getFullYear()} CareerTrack Lite.
      </div>
    </div>
  );
};

export default Footer;
