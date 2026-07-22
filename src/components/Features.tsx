import { LayoutGrid, Search, BarChart3, Link as LinkIcon } from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Track every application",
    description:
      "Log company, role, source, status and notes in one place — no more scattered spreadsheets.",
  },
  {
    icon: BarChart3,
    title: "See your stats at a glance",
    description:
      "Instantly know how many applications are saved, applied, in interviews, or offered.",
  },
  {
    icon: Search,
    title: "Search and filter instantly",
    description:
      "Find any application by company or title, or filter by status and source in seconds.",
  },
  {
    icon: LinkIcon,
    title: "Never lose a job link again",
    description:
      "Keep the original posting URL attached to every application, permanently.",
  },
];

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold text-[#1E2A4A] text-center">
        Everything your job search needs
      </h2>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="bg-white border border-[#D8DCE3] rounded-lg p-6"
          >
            <Icon className="text-[#3D7A6E]" size={28} strokeWidth={1.75} />
            <h3 className="mt-4 font-semibold text-[#1E2A4A]">{title}</h3>
            <p className="mt-2 text-sm text-[#3A3F4B]">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
