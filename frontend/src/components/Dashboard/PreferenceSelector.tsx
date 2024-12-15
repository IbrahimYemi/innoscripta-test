interface PreferenceSelectorProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (value: string) => void;
}

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  title,
  options,
  selectedOptions,
  onChange,
}) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="flex flex-wrap gap-4 border border-red-300 p-2 md:p-4 rounded-md max-h-44 overflow-y-auto">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option}
              onChange={() => onChange(option)}
              checked={selectedOptions.includes(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PreferenceSelector;