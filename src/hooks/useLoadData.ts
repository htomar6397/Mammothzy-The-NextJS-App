import { ActivityFormValues, LocationFormValues } from "@/lib/types";
import { clearSessionData, getSessionData } from "@/lib/utils";
import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

interface LoadDataParams {
  reset: UseFormReset<LocationFormValues> | UseFormReset<ActivityFormValues>;
  type: string;
}

export default function useLoadData({ reset, type }: LoadDataParams) {
  useEffect(() => {
    const savedData = getSessionData(type);
    if (savedData) {
      reset(savedData);
    }
    return () => {
      if (savedData) clearSessionData(type);
    };
  }, [reset, type]);
}
