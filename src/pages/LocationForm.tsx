
import React, { Dispatch, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Arrowsvg from "/public/logos/arrow.svg"
import InputField from "@/components/ui/InputField";
import {
  locationSchema,

} from "@/utils/location.validator";

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
    getValues
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
  });

   // Load initial data from localStorage
    useEffect(() => {
      const savedData = sessionStorage.getItem("locationData");
      if (savedData) {
        reset(JSON.parse(savedData));
      }

      // Add a warning on page reload or close
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.preventDefault();
        // event.returnValue = "";
        alert("Are you sure you want to leave? Unsaved changes will be lost.");
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleanup the event listener
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };

    }, [reset]);
  const onSubmit = (data: LocationFormValues) => {
    console.log("Form Data:", data);
    setStep(0);
  };
  const handlePrevious = () => {
    const formData = getValues(); // Get current form values
    sessionStorage.setItem("locationData", JSON.stringify(formData)); // Save to localStorage
    setStep(1);
  };

  return (
    <>
      <div className="font-[620] text-[18px] leading-[24px]  ">
        Location Details
      </div>
      <div className="  font-normal text-sm text-gray-500 mb-5">
        Please Specify the address for where the activity takes place
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 ">
        {/* Adreess 1 Field */}
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

        {/* Adreess 2 Field */}
        <Controller
          name="ad2"
          control={control}
          render={({ field }) => (
            <InputField
              label="Address Line 2"
              placeholder="Other information, e.g., building name, landmarks ,etc."
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
              maxLength={6} // Limit length for typical ZIP codes (like 5 or 6)
              pattern="\d{5,6}" // Accept only digits
            />
          )}
        />

        <div>
          <button
            onClick={handlePrevious}
            className="px-5 mt-4 bg-gray-100  font-medium text-gray-700 text-sm  py-[0.66rem] text-center rounded-full hover:bg-gray-200 border-gray-200 border-2 transition-all duration-300 delay-200 mr-3"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-5 relative hover:pr-12 overflow-hidden bg-black font-[550] border-black border-2 text-sm text-white py-[0.66rem] rounded-full hover:bg-gray-800 group transition-all duration-300 delay-200"
          >
            <span className="inline-block">Submit</span>

            {/* Arrow with opacity and translation effects */}
            <span className="absolute top-1/2 -translate-y-1/2 left-20 opacity-0  group-hover:opacity-100 transition-all duration-300 delay-200">
              <Arrowsvg height={19} width={19} />
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default LocationForm;

