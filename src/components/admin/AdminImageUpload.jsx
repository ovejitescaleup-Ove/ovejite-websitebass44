import { useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";

/**
 * AdminImageUpload — uploads a file via the Core UploadFile integration
 * and returns the public URL. Used across all CMS forms.
 */
export default function AdminImageUpload({ value, onChange, label = "Image", ratio = "aspect-video" }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      onChange(result.file_url);
    } catch (err) {
      alert("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      {value ? (
        <div className="relative group">
          <img src={value} alt="Preview" className={`w-full ${ratio} object-cover rounded-xl border border-slate-200`} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white"
          >
            <X className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center ${ratio} w-full rounded-xl border-2 border-dashed border-slate-200 hover:border-primary hover:bg-orange-50/30 cursor-pointer transition-colors`}>
          <input type="file" onChange={handleUpload} accept="image/*" className="hidden" />
          {uploading ? (
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-slate-300 mb-2" />
              <span className="text-sm font-medium text-slate-500">Click to upload</span>
            </>
          )}
        </label>
      )}
    </div>
  );
}
