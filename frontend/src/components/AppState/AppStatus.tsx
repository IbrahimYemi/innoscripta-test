import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearStatus } from '../../store/slices/statusSlice';

const AppStatus: React.FC = () => {
  const { state, text } = useSelector((state: RootState) => state.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (state && state !== 'loading') {
      const timer = setTimeout(() => {
        dispatch(clearStatus());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state, dispatch]);

  const renderIcon = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        );
      case 'error':
        return (
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M6.938 4.938a9 9 0 0110.125 0M9.172 9.172a4 4 0 015.656 0m3.536 3.536a9 9 0 11-12.728 0m3.536-3.536a4 4 0 015.656 0"
              />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m0 5a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (!state) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center">
        {renderIcon()}
        <p className="mt-4 text-gray-600 text-lg">
          {text || (state === 'loading' ? 'Loading...' : state === 'error' ? 'An error occurred!' : 'Success!')}
        </p>
      </div>
    </div>
  );
};

export default AppStatus;
