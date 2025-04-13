import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { SelectOption } from "../type/types";

interface SortByProps {
  options: SelectOption[];
}

const SortBy: React.FC<SortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
    />
  );
};

export default SortBy;
