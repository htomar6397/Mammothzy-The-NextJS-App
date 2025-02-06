"use client"
import Sidebar from "@/components/SideBar";
import { useState } from "react";
import ActivityForm from "./ActivityForm";
import LocationForm from "./LocationForm";

export default function Main (){
    const [step, setStep] = useState(1)
    return (
      <div className="px-[7rem] my-6">
        <div className="font-bold  text-[24px] leading-[130%] items-center text-[#12151C] py-2  ">
          Create new Activity
        </div>
        <main className="flex gap-2   flex-grow pt-6 pb-2">
          <Sidebar step={step}  />
          <div className="min-w-[52.7%] px-[1.38rem] pt-[0.1rem]">
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