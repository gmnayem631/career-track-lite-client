// src/components/Hero.tsx
import { Button } from "@heroui/react";
import { statusColors } from "../constants/statusColors";

// Status colors - reused later for dashboard badges, defining once here

const pipelinePreview = ["Saved", "Applied", "Interview", "Offer"];

const Hero = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
      {/* Left: headline + CTA */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E2A4A] leading-tight">
          Your job hunt,{" "}
          <span className="text-[#3D7A6E]">finally organized.</span>
        </h1>
        <p className="mt-5 text-lg text-[#3A3F4B] max-w-md">
          Stop losing track of applications across spreadsheets and browser
          tabs. Log every application, follow its progress, and see your whole
          search at a glance.
        </p>
        <div className="mt-8 flex gap-4">
          <Button className="bg-[#3D7A6E] text-white hover:bg-[#336a5f] px-6">
            Get Started — It's Free
          </Button>
        </div>
      </div>

      {/* Right: signature pipeline visual */}
      <div className="flex flex-col gap-3">
        {pipelinePreview.map((status, i) => (
          <div
            key={status}
            className="flex items-center gap-4 bg-white border border-[#D8DCE3] rounded-lg px-5 py-4 shadow-sm"
            style={{ marginLeft: `${i * 16}px` }} // staggered offset = "progression" feel
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: statusColors[status] }}
            />
            <span className="font-medium text-[#1E2A4A]">{status}</span>
            <span className="ml-auto text-xs text-[#8B93A1]">
              {i === 0 && "Google - Frontend Engineer"}
              {i === 1 && "Bdjobs - Backend Developer"}
              {i === 2 && "LinkedIn - Full Stack Role"}
              {i === 3 && "Referral - Product Engineer"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
