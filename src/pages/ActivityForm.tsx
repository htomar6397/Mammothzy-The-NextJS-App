"use client"
import React, { Dispatch, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RadioGroup from "@/components/ui/RadioGroup";
import InputField from "@/components/ui/InputField";
import {
  activitySchema,
  activityTypes,
  locationTypes,
  categories,
} from "@/utils/activity-validation";


interface ActivityFormProps {
  setStep: Dispatch<React.SetStateAction<number>>;
}


type ActivityFormValues = z.infer<typeof activitySchema>;

const ActivityForm: React.FC<ActivityFormProps> = ({setStep}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
  });
  // Load initial data from localStorage
  useEffect(() => {
    const savedData = sessionStorage.getItem("activityData");
    if (savedData) {
      reset(JSON.parse(savedData));
    }
    return ()=>{
      if(savedData) sessionStorage.removeItem("activityData");
    }

  });

    useEffect(() => {
      // Warn if data differs from session storage
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const currentData = JSON.stringify(getValues());
        const savedDataString = sessionStorage.getItem("activityData") || "{}";
// console.log(currentData,savedDataString);

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
    
  const onSubmit = (data: ActivityFormValues) => {
   
    sessionStorage.setItem("activityData", JSON.stringify(data));

    setStep(2);
    sessionStorage.setItem("step","2");
  };

  return (
    <>
      <div className="font-[620] text-[18px] leading-[24px]  mb-[0.90rem]">
        Activity Details
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 ">
        {/* Activity Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              label="Activity Name"
              placeholder="Eg: Cooking class in Palo Alto"
              value={field.value}
              onChange={field.onChange}
              error={errors.name?.message}
              required
            />
          )}
        />

        {/* Category Selection */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={categories}
              selectedValue={field.value}
              onChange={field.onChange}
              error={errors.category?.message}
              groupLabel="Select the best category to describe your activity"
              required
              name="category"
              other
            />
          )}
        />

        {/*  description Input */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-1 w-full">
              <div className="space-y-1 flex flex-col gap-[0.35rem] mb-1 ">
                <label className="font-medium text-[12px] leading-[20px]  ">
                  About the Activity
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  placeholder="Activity Description"
                  value={field.value}
                  onChange={field.onChange}
                  aria-label="Activity Description"
                  className="resize-none w-full border rounded-lg h-36 border-gray-200  px-[0.95rem] py-[0.9rem] text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  rows={5}
                />
              </div>
              {errors.description?.message && (
                <p className="text-red-500 text-xs">
                  {errors.description?.message}
                </p>
              )}
            </div>
          )}
        />

        {/* Activity Type Selection */}
        <Controller
          name="activityType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={activityTypes}
              selectedValue={field.value}
              onChange={field.onChange}
              error={errors.activityType?.message}
              groupLabel="Please select the activity type"
              required
              name="activityType"
            />
          )}
        />

        {/* Location Type Selection */}
        <Controller
          name="locationType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              options={locationTypes}
              selectedValue={field.value}
              onChange={field.onChange}
              error={errors.locationType?.message}
              groupLabel="Please select the location type"
              required
              name="locationType"
            />
          )}
        />

        <div className="space-y-1 flex flex-col gap-3 ">
          <label className="text-sm font-medium text-gray-700 ">
            How many members can take part in the activity?
          </label>

          <div className="flex gap-8">
            <Controller
              name="minMembers"
              control={control}
              render={({ field }) => (
                <div className="flex-grow">
                  <input
                    type="number"
                    placeholder="Minimum Members"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full border-[1px] rounded-full  border-gray-200 px-[0.96rem] h-10 text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  />
                  {errors.minMembers?.message && (
                    <p className="text-red-500 text-xs">
                      {errors.minMembers?.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="maxMembers"
              control={control}
              render={({ field }) => (
                <div className="flex-grow">
                  <input
                    type="number"
                    placeholder="Maximum Members"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full border-[1px]  rounded-full  border-gray-200 px-[0.96rem] h-10 text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  />
                  {errors.maxMembers?.message && (
                    <p className="text-red-500 text-sx">
                      {errors.maxMembers?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-[10.5rem] mt-4 bg-black font-[550] text-sm text-white py-[0.66rem] text-center rounded-full hover:bg-gray-800"
        >
          Save and Continue
        </button>
      </form>
    </>
  );
};

export default ActivityForm;
