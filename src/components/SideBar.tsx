import Flag from "/public/logos/flag.svg";
import Location from "/public/logos/location.svg";
import { Dispatch, SetStateAction } from "react";



interface SidebarProps {

  setStep: Dispatch<SetStateAction<number>>;
  step : number;

};



const Sidebar: React.FC<SidebarProps> = ({ step,setStep }) => {
   

     return (
       <div className="flex flex-col pr-6 border-r-[1.5px] border-r-[#E9E9EB] ">
         <nav className="flex flex-col   pr-7 ">
           <div
             onClick={() => setStep(1)}
             className={`flex gap-2 rounded-md cursor-pointer ${
               step === 1 ? "bg-[#F7F7F7]" : ""
             } px-6 py-3`}
           >
             <Flag alt="Home" stroke={step === 1 ? "#2E2B2B" : "#6B6B6B"} />
             <span
               className={`text-[${step === 1 ? "#2E2B2B" : "#6B6B6B"}] ${
                 step === 1 ? "font-semibold" : ""
               }`}
             >
               Activity Details
             </span>
           </div>
           <div
             onClick={() => setStep(0)}
             className={`flex gap-2 rounded-md cursor-pointer  ${
               step === 0 ? "bg-[#F7F7F7]" : ""
             } px-6 py-3`}
           >
             <Location alt="loc" stroke={step === 0 ? "#2E2B2B" : "#6B6B6B"} />
             <span
               className={`text-[${step === 0 ? "#2E2B2B" : "#6B6B6B"}] ${
                 step === 0 ? "font-semibold" : ""
               }`}
             >
               Location Details
             </span>
           </div>
         </nav>
       </div>
     );
}
export default Sidebar;
