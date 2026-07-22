import { UserPlus, FilePlus2, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "1",
    icon: UserPlus,
    title: "Sign up",
    description: "Create your free account in seconds — no credit card needed.",
  },
  {
    step: "2",
    icon: FilePlus2,
    title: "Add applications",
    description:
      "Log each job you apply to — company, role, source, and status.",
  },
  {
    step: "3",
    icon: TrendingUp,
    title: "Track progress",
    description: "Watch your pipeline move from Saved all the way to Offer.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold text-[#1E2A4A] text-center">
          How it works
        </h2>
        <p className="mt-3 text-center text-[#3A3F4B] max-w-md mx-auto">
          Three simple steps between you and an organized job search.
        </p>

        <div className="mt-16 relative grid sm:grid-cols-3 gap-10">
          {/* Connecting line - desktop only, sits behind the icons */}
          <div className="hidden sm:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-[#D8DCE3]" />

          {steps.map(({ step, icon: Icon, title, description }) => (
            <div
              key={step}
              className="relative flex flex-col items-center text-center"
            >
              {/* Icon circle - sits on top of the connecting line */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-[#F7F8FA] border-2 border-[#3D7A6E] flex items-center justify-center">
                <Icon className="text-[#3D7A6E]" size={26} strokeWidth={1.75} />
              </div>

              <span className="mt-4 text-xs font-semibold tracking-wide text-[#8B93A1]">
                STEP {step}
              </span>
              <h3 className="mt-1 text-lg font-semibold text-[#1E2A4A]">
                {title}
              </h3>
              <p className="mt-2 text-sm text-[#3A3F4B] max-w-55">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
