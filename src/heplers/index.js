import { RULES } from "@/utils/index";

export function upperCase(text) {
  return text.toUpperCase();
}

export const getRule = (key) => {
  return RULES[key] || "None";
};
