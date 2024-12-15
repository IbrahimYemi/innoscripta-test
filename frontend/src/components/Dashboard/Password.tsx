import { useEffect, useState } from "react";
import TitleText from "../TitleText";
import { usePasswordManager } from "../../hooks/usePasswordManager";
import { useDispatch } from "react-redux";
import { clearStatus, showStatus } from "../../store/slices/statusSlice";

const Password: React.FC = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, success, changePassword } = usePasswordManager();

  useEffect(() => {
    if (loading) {
      dispatch(
        showStatus({
          state: "loading",
          text: "Processing your request...",
        })
      );
    } else if (success) {
      dispatch(showStatus({ state: "success", text: success }));
    } else if (error) {
      dispatch(showStatus({ state: "error", text: error }));
    } else {
      dispatch(clearStatus());
    }
  }, [loading, success, error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      dispatch(showStatus({ state: "error", text: "New password and confirmation password do not match." }));
      return;
    }

    if (newPassword.length < 8) {
      dispatch(showStatus({ state: "error", text: "New password must be at least 8 characters long." }));
      return;
    }

    await changePassword(oldPassword, newPassword, confirmPassword);
  };

  return (
    <div>
      <div className="flex items-center justify-between font-semibold mb-4">
        <TitleText text="Change Your Password" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 outline-red-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 outline-red-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 outline-red-300 rounded-md shadow-sm"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Password;
