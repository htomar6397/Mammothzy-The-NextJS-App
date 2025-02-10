import { countries } from "./constants";

export const saveSessionData = (key: string, data: string) => {
  sessionStorage.setItem(key, data);
};

export const getSessionData = <T>(key: string): T | null => {
  const savedData = sessionStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
};

export const clearSessionData = (key: string) => {
  sessionStorage.removeItem(key);
};

export const getSelectedCountryData = (dialCode : string) => {
  return countries.find((country) => country.dialCode === dialCode);
};


