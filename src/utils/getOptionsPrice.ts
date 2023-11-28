import { OptionType } from "@/types/option.type";
import { OptionValueType } from "@/types/optionValue.type";

export   const getOptionsPrice = (options:OptionType[]) => {
  let price = 0;
  options.forEach((option:OptionType) => {
    option.values.forEach((value:OptionValueType) => {
      price += value.price;
    })
  })
  return price;
}