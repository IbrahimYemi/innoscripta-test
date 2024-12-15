import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../api/axios";
import { clearStatus, showStatus } from "../../store/slices/statusSlice";
import TitleText from "../TitleText";
import { usePreferenceManager } from "../../hooks/usePreferenceManager";
import PreferenceSelector from "./PreferenceSelector";

interface UserPreferenceProps {
  myCategories?: string[];
  mySources?: string[];
  myAuthors?: string[];
}

const Settings: React.FC<UserPreferenceProps> = ({
  myCategories = [],
  mySources = [],
  myAuthors = [],
}) => {
  const dispatch = useDispatch();

  const [preferences, setPreferences] = useState({
    categories: [],
    sources: [],
    authors: [],
  });

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    const storedSources = localStorage.getItem("sources");
    const storedAuthors = localStorage.getItem("authors");

    if (storedCategories) {
      setPreferences((prev) => ({
        ...prev,
        categories: JSON.parse(storedCategories),
      }));
    }
    if (storedSources) {
      setPreferences((prev) => ({
        ...prev,
        sources: JSON.parse(storedSources),
      }));
    }
    if (storedAuthors) {
      setPreferences((prev) => ({
        ...prev,
        authors: JSON.parse(storedAuthors),
      }));
    }
  }, []);

  const { categories, sources, authors } = preferences;

  const { preferences: categoryPreferences, togglePreference: toggleCategory } =
    usePreferenceManager(myCategories, categories);
  const { preferences: sourcePreferences, togglePreference: toggleSource } =
    usePreferenceManager(mySources, sources);
  const { preferences: authorPreferences, togglePreference: toggleAuthor } =
    usePreferenceManager(myAuthors, authors);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const preferences = {
        categories: categoryPreferences,
        sources: sourcePreferences,
        authors: authorPreferences,
      };

      dispatch(showStatus({ state: "loading", text: "Processing request..." }));

      const response = await apiClient.post(
        "/api/set-preferences",
        preferences
      );

      if (response.data.success) {
        dispatch(showStatus({ state: "success", text: response.data.message }));
      } else {
        dispatch(
          showStatus({ state: "error", text: "Error saving preferences" })
        );
      }
    } catch (error) {
      dispatch(
        showStatus({ state: "error", text: "Error saving preferences" })
      );
    } finally {
      setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-between font-semibold mb-4">
        <TitleText text="Personalize Your Feed" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PreferenceSelector
          title="Categories"
          options={categories}
          selectedOptions={categoryPreferences}
          onChange={toggleCategory}
        />
        <PreferenceSelector
          title="Preferred Sources"
          options={sources}
          selectedOptions={sourcePreferences}
          onChange={toggleSource}
        />
        <PreferenceSelector
          title="Favorite Authors"
          options={authors}
          selectedOptions={authorPreferences}
          onChange={toggleAuthor}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default Settings;
