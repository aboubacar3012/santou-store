import { OptionValueType } from "./optionValue.type";


export type OptionType = {
  id?: string;
  name: string;
  isAvailable: boolean;
  max: number;
  min: number;
  values: OptionValueType[];
  createdAt?: string;
  updatedAt?: string;
};
