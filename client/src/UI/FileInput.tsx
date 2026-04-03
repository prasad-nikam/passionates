import { useRef } from 'react';
import { Upload } from 'lucide-react';

type Props = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function FileInput({ file, setFile }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  return (
    <div className="w-full max-w-sm">
      <input
        ref={inputRef}
        accept="image/*"
        type="file"
        name="profilePic"
        onChange={handleChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer items-center justify-between rounded-xl border border-white/40 bg-white/40 px-4 py-2 backdrop-blur-md transition focus-within:ring-2 focus-within:ring-blue-400 hover:bg-white/50"
      >
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Upload size={16} />
          <span>{file ? file.name : 'Upload Profile Picture'}</span>
        </div>

        <span className="text-xs font-medium text-blue-500">Browse</span>
      </div>
    </div>
  );
}
