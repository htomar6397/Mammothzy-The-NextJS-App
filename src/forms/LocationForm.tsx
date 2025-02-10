"use client"
import {  Controller } from "react-hook-form";
import Arrowsvg from "/public/logos/arrow.svg";
import InputField from "@/components/ui/InputField";
import { Modal } from "@/components/SubmitModal";
import Select from "@/components/ui/SelectField";
import { indianStates } from "@/lib/constants";
import { useLocationForm } from "@/hooks/useLocationForm";
import { FormProps } from "@/lib/types";
import Button from "@/components/ui/Button";
import PhoneInput from "@/components/ui/PhoneInput";


const LocationForm: React.FC<FormProps> = ({ setStep }) => {
const { handleSubmit, control, errors, onFinalSubmit, handlePrevious, modal } = useLocationForm({setStep});

  return (
    <div className="flex flex-col gap-[1.45rem]">
      <div>
        <div className="font-[620] text-[18px] leading-[24px] mb-[0.125rem]">
          Location Details
        </div>
        <div className="font-normal text-sm text-gray-500">
          Please Specify the address for where the activity takes place
        </div>
      </div>

      <form onSubmit={handleSubmit(onFinalSubmit)} className="flex flex-col gap-4">
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
              pattern="^[A-Za-z0-9\s,.\-#/]{0,100}$"
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
              pattern="^[A-Za-z0-9\s,.\-#/]{0,100}$"
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
              value={field.value || ""}
              onChange={field.onChange}
              error={errors.zip?.message}
              required
              pattern="^\d{0,6}$"
            />
          )}
        />
        <div className="flex-grow ">
          <div className=" flex gap-[0.625rem]">
            {/* City Field */}
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
                  pattern="^[A-Za-z\s]{0,50}$"
                />
              )}
            />

            {/* State field */}
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
        </div>

        {/* seperator */}
        <div className="h-0 border-b-[1px] border-[solid] border-[#E9E9EB]  mt-[3rem] mb-2 "></div>

        {/* Contact Field */}
        <div className=" mb-4 flex flex-col gap-6 ">
          <div>
            <div className="font-[620] text-[18px] leading-[24px] mb-[0.125rem]">
              Contact Details
            </div>
            <div className="font-normal text-sm text-gray-500 ">
              Please provide contact information for this activity
            </div>
          </div>

          <div className="flex  gap-3">
            {/* phonenumber input field */}
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  value={field.value || { dialCode: "", phoneNumber: "" }}
                  onChange={field.onChange}
                  error={
                    errors.number?.message ||
                    errors.number?.phoneNumber?.message
                  }
                />
              )}
            />
            {/* contact name input field */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="flex-grow w-full">
                  <input
                    placeholder="Contact Name"
                    value={field.value}
                    onChange={ (e)=>{if(/^[A-Za-z\s]{0,30}$/.test(e.target.value)) field.onChange(e.target.value)}}
                    className=" w-full  border-[1px] rounded-full   border-gray-200 px-[0.96rem] h-[2.625rem] text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                  />
                </div>
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className=" flex items-center gap-2">
          <Button
            label="Previous"
            onClick={handlePrevious}
            variant="secondary"
          />
          <Button
            label="Submit"
            type="submit"
            variant="primary"
            icon={<Arrowsvg height={19} width={19} />}
          />
        </div>
      </form>

      {modal && <Modal setStep={setStep} />}
    </div>
  );
};

export default LocationForm;
