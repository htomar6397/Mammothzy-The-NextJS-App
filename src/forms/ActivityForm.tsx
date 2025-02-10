"use client";
import { Controller } from "react-hook-form";
import RadioGroup from "@/components/ui/RadioGroup";
import InputField from "@/components/ui/InputField";
import { categories, activityTypes, locationTypes } from "@/lib/constants";
import { useActivityForm } from "@/hooks/useActivityForm";
import { FormProps } from "@/lib/types";
import Button from "@/components/ui/Button";

const ActivityForm: React.FC<FormProps> = ({ setStep }) => {
  const { handleSubmit, control, errors, onFinalSubmit } = useActivityForm({ setStep });


  return (
    <div className="flex flex-col gap-4">
      <div className="h-[24px] not-italic font-bold text-[18px] leading-[24px] order-none flex-grow-0">
        Activity Details
      </div>

      <form onSubmit={handleSubmit(onFinalSubmit)} className=" flex flex-col gap-4">
        {/* Activity Name Field */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              label="Activity Name"
              placeholder="Eg: Cooking class in Palo Alto"
              value={field.value || ""}
              onChange={field.onChange}
              error={errors.name?.message}
              required
              pattern="^[A-Za-z0-9\s\-&,.:]{0,50}$"
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
            <div className="flex flex-col gap-1 w-full ">
              <div className=" flex flex-col gap-2 ">
                <label className="font-medium text-[12px] leading-[20px]  ">
                  About the Activity
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  placeholder="Activity Description"
                  value={field.value}
                  onChange={field.onChange}
                  aria-label="Activity Description"
                  className="resize-none custom-scrollbar w-full border-2 rounded-[0.625rem] h-[9.25rem] border-[#dbe0f8a4]  p-[0.90rem] text-sm shadow-sm font-normal text-[14px] focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  rows={5}
                  maxLength={500}
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

        <div className=" flex flex-col gap-3 ">
          <label className="text-sm font-medium ">
            How many members can take part in the activity?
          </label>

          <div className="flex gap-2">
            {/* minMembers */}
            <Controller
              name="minMembers"
              control={control}
              render={({ field }) => (
                <div className="flex-grow">
                  <input
                    type="text" // Switched to text for better validation
                    placeholder="Minimum Members"
                    value={field.value || ""}
                    onChange={(e) => {
                      if (/^\d{0,3}$/.test(e.target.value)) {
                        // Only allows 0 to 999
                        console.log(e.target.value);

                        field.onChange(e.target.value);
                      }
                    }}
                    inputMode="numeric" // Enables numeric keyboard on mobile
                    className="w-full border-[1px] rounded-full border-gray-200 px-[0.96rem] h-[2.375rem] text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  />
                  {errors.minMembers?.message && (
                    <p className="text-red-500 text-xs">
                      {errors.minMembers?.message}
                    </p>
                  )}
                </div>
              )}
            />
            {/* maxMembers */}
            <Controller
              name="maxMembers"
              control={control}
              render={({ field }) => (
                <div className="flex-grow">
                  <input
                    type="text" // Switched to text for better validation
                    placeholder="Maximum Members"
                    value={field.value || ""}
                    onChange={(e) => {
                      if (/^\d{0,3}$/.test(e.target.value)) {
                        // Only allows 0 to 999
                        console.log(e.target.value);

                        field.onChange(e.target.value);
                      }
                    }}
                    inputMode="numeric" // Enables numeric keyboard on mobile
                    className="w-full border-[1px] rounded-full border-gray-200 px-[0.96rem] h-[2.375rem] text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  />

                  {errors.maxMembers?.message && (
                    <p className="text-red-500 text-xs">
                      {errors.maxMembers?.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className=" mt-4 ">
          <Button label="Save and Continue" type="submit" variant="primary" />
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
