import { useState, useEffect } from "react";

export const usePreferenceManager = (
  initialData: string[],
  externalData: string[]
) => {

  const [preferences, setPreferences] = useState<string[]>(initialData);

  useEffect(() => {
    setPreferences(initialData);
  }, [initialData, externalData]);

  const togglePreference = (value: string) => {
    setPreferences((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return { preferences, togglePreference };
};