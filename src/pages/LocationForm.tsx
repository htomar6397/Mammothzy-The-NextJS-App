import React, { Dispatch, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Arrowsvg from "/public/logos/arrow.svg";
import InputField from "@/components/ui/InputField";
import { indianStates, locationSchema } from "@/utils/location.validator";
import { Modal } from "@/components/Modal";
import Select from "@/components/ui/SelectField";
import ContactDetails from "@/components/ContactDetails";

interface LocationFormProps {
  setStep: Dispatch<React.SetStateAction<number>>;
}

type LocationFormValues = z.infer<typeof locationSchema>;

const LocationForm: React.FC<LocationFormProps> = ({ setStep }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
  });

  // Load initial data from sessionStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem("locationData");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
    return () => {
      
      if (savedData) sessionStorage.removeItem("locationData");
    };
    }, );

    useEffect(()=>{
    // Warn if data differs from session storage\
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const currentData = JSON.stringify(getValues());
      const savedDataString = sessionStorage.getItem("locationData") || "{}";
      
     
      if (savedDataString != currentData) {
        event.preventDefault();
        
        alert("");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      
    };
  }, [reset, getValues]);
  const  [modal,setModal] = useState<boolean>(false);
  const onSubmit = (data: LocationFormValues) => {
    
    const activityDataString = sessionStorage.getItem("activityData");
    const activityData = activityDataString
      ? JSON.parse(activityDataString)
      : {}; // Get current activity data
    const finalFormData = { ...activityData, ...data };
    console.log(finalFormData);
    
   
    sessionStorage.removeItem("activityData");
    
    setModal(true);
    sessionStorage.removeItem("step");
  };

  const handlePrevious = () => {
    const formData = getValues();
    sessionStorage.setItem("locationData", JSON.stringify(formData));
    setStep(1);
    sessionStorage.setItem("step", "1");
  };

  return (
    <>
      <div className="font-[620] text-[18px] leading-[24px]">
        Location Details
      </div>
      <div className="font-normal text-sm text-gray-500 mb-5">
        Please Specify the address for where the activity takes place
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* Address 1 Field */}
        <Controller
          name="ad1"
          control={control}
          render={({ field }) => (
            <InputField
              label="Address Line 1"
              placeholder="House number and street name"
              value={field.value}
              onChange={field.onChange}
              error={errors.ad1?.message}
              required
            />
          )}
        />

        {/* Address 2 Field */}
        <Controller
          name="ad2"
          control={control}
          render={({ field }) => (
            <InputField
              label="Address Line 2"
              placeholder="Other information, e.g., building name, landmarks, etc."
              value={field.value || ""}
              onChange={field.onChange}
              error={errors.ad2?.message}
            />
          )}
        />

        {/* Zipcode Field */}
        <Controller
          name="zip"
          control={control}
          render={({ field }) => (
            <InputField
              label="ZIP Code"
              placeholder="eg: 123 467"
              value={field.value}
              onChange={field.onChange}
              error={errors.zip?.message}
              required
              type="number"
              maxLength={6}
              pattern="\d{5,6}"
            />
          )}
        />
        {/* City Field */}
        <div className="flex gap-4">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <InputField
                label="City"
                placeholder="Your City"
                value={field.value}
                onChange={field.onChange}
                error={errors.city?.message}
                required
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Select
                label="Select a State"
                options={indianStates}
                value={field.value}
                onChange={field.onChange}
                placeholder="Your State"
                required
                error={errors.state?.message}
              />
            )}
          />
        </div>
        <div className="border-t-[1.8px]   border-[#ececefcf] pt-6 mt-10">
          <div className="font-[620] text-[18px] leading-[24px]">
            Contact Details
          </div>
          <div className="font-normal text-sm text-gray-500 mb-5">
            Please provide contact information for this activity
          </div>
          <div className="flex gap-3">
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <ContactDetails
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.number?.message || errors.number?.phoneNumber?.message}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  placeholder="Contact Name"
                  value={field.value}
                  onChange={field.onChange}
                  className=" w-full border-[1px] rounded-full  border-gray-200 px-[0.96rem] h-10 text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                />
              )}
            />
          </div>
        </div>

        <div>
          <button
            onClick={handlePrevious}
            className="px-5 mt-4 bg-gray-100 font-medium text-gray-700 text-sm py-[0.66rem] text-center rounded-full hover:bg-gray-200 border-gray-200 border-2 transition-all duration-300 delay-200 mr-3"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-5 relative hover:pr-12 overflow-hidden bg-black font-[550] border-black border-2 text-sm text-white py-[0.66rem] rounded-full hover:bg-gray-800 group transition-all duration-300 delay-200"
          >
            <span className="inline-block">Submit</span>
            <span className="absolute top-1/2 -translate-y-1/2 left-20 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
              <Arrowsvg height={19} width={19} />
            </span>
          </button>
        </div>
      </form>
      {modal && <Modal setStep={setStep} />}
    </>
  );
};

export default LocationForm;
