"use client";
import { useEffect, useState } from "react";

export function useStepHandler() {
  const [step, setStep] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedStep = Number(sessionStorage.getItem("step")) || 1;
 
    setTimeout(() => {  setStep(storedStep);
    setLoading(false)},500)
  }, [step]);

  useEffect(() => {
  
      window.scrollTo({ top: 0, behavior: "smooth" });
 
  }, [step]);

  return { step, setStep, loading };
}
