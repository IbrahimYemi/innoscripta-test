import DashboardLayout from "../../components/layout/DashboardLayout";
import Settings from "../../components/Dashboard/Settings";
import useUserPreferences from "../../hooks/useUserPreferences";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearStatus, showStatus } from "../../store/slices/statusSlice";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { preferences, loading, error } = useUserPreferences();
  
  useEffect(() => {
    if (loading) {
      dispatch(
        showStatus({
          state: "loading",
          text: "Fetching your preferences...",
        })
      );
    } else if (error) {
      dispatch(showStatus({ state: "error", text: error }));
    } else {
      dispatch(clearStatus());
    }
  }, [loading, error, dispatch]);

  return (
    <DashboardLayout>
      <Settings
        myAuthors={preferences?.authors}
        myCategories={preferences?.categories}
        mySources={preferences?.sources}
      />
    </DashboardLayout>
  );
};

export default SettingsPage;
