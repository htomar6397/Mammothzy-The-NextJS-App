"use client"
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import ActivityForm from "./ActivityForm";
import LocationForm from "./LocationForm";

export default function Main (){
    const [step, setStep] = useState<number>(1)
      useEffect(() => {
    // Ensure sessionStorage access only in the client
    const storedStep = Number(sessionStorage.getItem('step')) || 1;
    setStep(storedStep);
  }, []);
  useEffect(() => {
    // Scroll to the top when step changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  
    return (
      <div className="px-[7rem] py-8 flex flex-col gap-8">
        <div className="h-[31px] not-italic font-bold text-[24px] leading-[130%] items-center text-[#12151C] order-none flex-grow-0  ">
          Create new Activity
        </div>
        <main className="flex gap-2   flex-grow ">
          <Sidebar step={step} />
          <div className="min-w-[52.7%] px-[1.38rem] ">
            {step === 1 ? (
              <ActivityForm setStep={setStep} />
            ) : (
              <LocationForm setStep={setStep} />
            )}
          </div>
        </main>
      </div>
    );
}