import { useContext } from "react";
import { Context } from ".";

export function useSearch() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useSearch must be used within a provider");
  }
  return context;
}
