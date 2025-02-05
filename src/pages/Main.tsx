"use client"
import Sidebar from "@/components/SideBar";
import { useState } from "react";
import ActivityForm from "./ActivityForm";
import LocationForm from "./LocationForm";

export default function Main (){
    const [step, setStep] = useState(1)
    return (
      <div className="px-[6rem] my-6">
        <div className="font-bold  text-[24px] leading-[130%] items-center text-[#12151C] pb-6  ">
          Create new Activity
        </div>
        <main className="flex gap-2 items-center justify-center flex-grow py-2">
          <Sidebar step={step} setStep={setStep} />
          <div className="flex-grow">
            {
            step ?
            (
              <ActivityForm/>
            ):
            (
              <LocationForm/>
            )
            }

          </div>
        </main>
      </div>
    );
}