"use client";
import Sidebar from "@/components/layout/SideBar";
import ActivityForm from "@/forms/ActivityForm";
import LocationForm from "@/forms/LocationForm";
import { useStepHandler } from "@/hooks/useStepHandler";
import  useBeforeUnload  from "@/hooks/useBeforeUnload";

export default function Main() {
  const { step, setStep, loading } = useStepHandler();

  // Call the useBeforeUnload hook to handle the reload , cut  tabs for unsaved data
  useBeforeUnload()

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
