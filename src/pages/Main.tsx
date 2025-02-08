"use client";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import ActivityForm from "./ActivityForm";
import LocationForm from "./LocationForm";

export default function Main() {
  const [step, setStep] = useState<number | null>(null); // No initial value for step
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure sessionStorage access only in the client
    const storedStep = Number(sessionStorage.getItem("step")) || 1;
    setStep(storedStep);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (step !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
  }, [step]);

  return (
    <div className="px-[7rem] py-8 flex flex-col gap-8">
      <div className="h-[31px] not-italic font-bold text-[24px] leading-[130%] items-center text-[#12151C] order-none flex-grow-0">
        Create new Activity
      </div>
      <main className="flex gap-2 flex-grow">
        <Sidebar step={step} />
        <div className="min-w-[52.7%] min-h-[60vh] px-[1.45rem]">
          {loading || step === null ? (
            <div className="flex justify-center items-center h-full ">
              {/* Spinner Loader */}
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-300"></div>
            </div>
          ) : step === 1 ? (
            <ActivityForm setStep={setStep} />
          ) : (
            <LocationForm setStep={setStep} />
          )}
        </div>
      </main>
    </div>
  );
}
