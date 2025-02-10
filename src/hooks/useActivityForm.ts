"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema } from "@/lib/validations";
import { saveSessionData } from "@/lib/utils";
import { ActivityFormValues } from "@/lib/types";
import useLoadData from "./useLoadData";
import { sanitizeData } from "@/lib/validations";

export const useActivityForm = ({
  setStep,
}: {
  setStep: (step: number | null) => void;
}) => {
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
  });

  // reset the form values
  useLoadData({ reset, type: "activityData" });

  const onSubmit: SubmitHandler<ActivityFormValues> = (data) => {
    saveSessionData("activityData", JSON.stringify(data));
    setStep(null);
    saveSessionData("step", "2");
  };
  
const onFinalSubmit: SubmitHandler<ActivityFormValues> = (data) => {
  // Sanitize input data
  const sanitizedData = sanitizeData<ActivityFormValues>(data);

  // Update form values with sanitized data
  for (const [key, value] of Object.entries(sanitizedData)) {
    setValue(key as keyof ActivityFormValues, value);
  }

  // Trigger validation and submission after sanitization
  handleSubmit(onSubmit)();
};

  return { handleSubmit, control, errors, onFinalSubmit };
};
