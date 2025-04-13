import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import { SelectOption } from "../type/types";

interface FilterByProps {
  options: SelectOption[];
}

const FilterSelect: React.FC<FilterByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("status") || "";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("status", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={filter}
      onChange={handleChange}
    />
  );
};

export default FilterSelect;
