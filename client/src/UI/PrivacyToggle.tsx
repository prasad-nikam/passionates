import { useState } from 'react';

export default function PrivacyToggle({
  privacy,
  handleCheckBox,
}: {
  privacy: 'private' | 'public' | null;
  handleCheckBox: (e: boolean) => void;
}) {
  const [checked, setChecked] = useState(privacy == 'private' ? true : false);
  return (
    <label className="group relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => {
          const isChecked = e.target.checked;
          setChecked(isChecked);
          handleCheckBox(isChecked);
        }}
      />

      <div
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-green-500' : 'bg-gray-400'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : ''
          }`}
        />
      </div>
    </label>
  );
}
