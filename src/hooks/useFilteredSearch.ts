import { Dispatch, SetStateAction, useEffect } from "react";

// Generic hook to filter options based on a search term
const useFilteredSearch = <T extends { label: string }>({
  setFilteredOptions,
  options,
  searchTerm,
}: {
  setFilteredOptions: Dispatch<SetStateAction<T[]>>;
  options: T[];
  searchTerm: string;
}) => {
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [options, searchTerm, setFilteredOptions]);
};

export default useFilteredSearch;
