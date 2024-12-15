interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
      {icon && <div className="mb-4 text-gray-500">{icon}</div>}
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;