import { useState } from "react";
import { saveSessionData, getSessionData, clearSessionData } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { LocationFormValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema, sanitizeData } from "@/lib/validations";
import useLoadData from "./useLoadData";

export const useLocationForm = ({
  setStep,
}: {
  setStep: (step: number | null) => void;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    setValue
  } = useForm<LocationFormValues>({
    resolver: zodResolver(locationSchema),
  });

  // Load initial data from sessionStorage
  useLoadData({ reset, type: "locationData" });

  const [modal, setModal] = useState<boolean>(false);

  const onSubmit = (data: LocationFormValues) => {
    const activityData = getSessionData("activityData");

    const finalFormData = { ...(activityData || {}), ...data };
    console.log(finalFormData);

    clearSessionData("activityData");

    setModal(true);
    clearSessionData("step");
  };
  const onFinalSubmit: SubmitHandler<LocationFormValues> = (data) => {
    // Sanitize input data
    const sanitizedData = sanitizeData<LocationFormValues>(data);

    // Update form values with sanitized data
    for (const [key, value] of Object.entries(sanitizedData)) {
      setValue(key as keyof LocationFormValues, value);
    }

    // Trigger validation and submission after sanitization
    handleSubmit(onSubmit)();
  };


  const handlePrevious = () => {
    const formData = getValues();
    saveSessionData("locationData", JSON.stringify(formData));
    setStep(null);
    saveSessionData("step", "1");
  };

  return {
    handleSubmit,
    control,
    errors,
    onFinalSubmit,
    handlePrevious,
    modal,
    setModal,
  };
};
