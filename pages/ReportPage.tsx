import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { MapPinIcon, ImageIcon, CloseIcon } from '../components/icons';
import FormError from '../components/FormError';
import { analyzeImageForReport } from '../services/geminiService';
import SEO from '../components/SEO';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = "image/jpeg, image/png, image/gif, video/mp4, video/quicktime";

interface FilePreview {
  file: File;
  url: string;
}

const ReportPage: React.FC = () => {
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [fileError, setFileError] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // New state for AI Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysisError, setAiAnalysisError] = useState('');

  // Form refs to fill data
  const animalTypeRef = useRef<HTMLSelectElement>(null);
  const conditionRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Effect to clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(filePreview => URL.revokeObjectURL(filePreview.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setStatus('Locating...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('Location found!');
        setLocation(`${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`);
        setIsLocating(false);
      },
      () => {
        setStatus('Unable to retrieve your location. Please enter it manually.');
        setIsLocating(false);
      }
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    setAiAnalysisError('');
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: File[] = Array.from(selectedFiles);

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File "${file.name}" is too large. Max size is 10 MB.`);
        // Reset file input to allow re-selection of the same file after an error
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
    }

    const newFilePreviews = newFiles.map(file => ({
      file: file,
      url: URL.createObjectURL(file)
    }));

    setFiles(prevFiles => [...prevFiles, ...newFilePreviews]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveFile = (indexToRemove: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(files[indexToRemove].url);
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleAnalyzeImage = async () => {
    // Find the first image file
    const imageFile = files.find(f => f.file.type.startsWith('image/'))?.file;
    if (!imageFile) {
      setAiAnalysisError("Please upload an image first to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setAiAnalysisError('');

    try {
      const resultJson = await analyzeImageForReport(imageFile);
      const result = JSON.parse(resultJson);

      if (result.animalType && animalTypeRef.current) {
        // Safe conversion without generic syntax in TSX to avoid parsing errors
        // Explicitly casting to HTMLOptionElement[] to solve type errors
        const options = Array.from(animalTypeRef.current.options) as HTMLOptionElement[];
        const optionValues = options.map(o => o.value);
        const match = optionValues.find((opt: string) => opt.toLowerCase() === result.animalType.toLowerCase());

        if (match) {
          animalTypeRef.current.value = match;
        } else {
          // Default to 'Other' if specific type not found, or leave as is if unsure
          if (['dog', 'cat', 'bird'].includes(result.animalType.toLowerCase())) {
            const exactMatch = options.find((o) => o.value.toLowerCase() === result.animalType.toLowerCase());
            if (exactMatch) animalTypeRef.current.value = exactMatch.value;
          } else {
            animalTypeRef.current.value = "Other";
          }
        }
      }

      if (result.condition && conditionRef.current) {
        conditionRef.current.value = result.condition;
      }

    } catch (error) {
      setAiAnalysisError("Could not analyze image. Please fill details manually.");
    } finally {
      setIsAnalyzing(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    setIsLoading(true);

    try {
      // In a real app, this is where you'd upload files and submit data
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo, we'll randomly throw an error sometimes
      if (Math.random() > 0.8) {
        throw new Error("Failed to submit report. Please try again later.");
      }

      alert('Thank you! Your report has been submitted. Our team will look into it shortly.');
      // Reset form on success
      const form = e.target as HTMLFormElement;
      form.reset();
      setLocation('');
      setStatus('');
      files.forEach(filePreview => URL.revokeObjectURL(filePreview.url));
      setFiles([]);
      setFileError('');
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (err) {
      setSubmissionError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full p-3 bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-slate-700 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/80 focus:border-orange-500 focus:bg-white/70 dark:focus:bg-slate-900/70 transition-colors";

  return (
    <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
      <SEO
        title="Report an Animal"
        description="Found an animal in need? Report it here and our team will assist."
        canonical="/report"
      />
      <div className="w-full max-w-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-4">Report an Animal in Need</h1>
        <p className="text-lg text-center text-slate-800 dark:text-slate-200 mb-10">
          See an animal that needs help? Fill out the form below, and our rescue team will be alerted.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormError message={submissionError} />

          <div>
            <label className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Photos or Videos (up to 10MB each)</label>
            <div className="mt-2 flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-400/80 dark:border-slate-600 border-dashed rounded-lg cursor-pointer bg-white/30 dark:bg-slate-900/30 hover:bg-white/50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-10 h-10 text-slate-700 dark:text-slate-300 mb-3" />
                  <p className="mb-2 text-sm text-slate-800 dark:text-slate-200"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-red-600 dark:text-red-400 font-bold">Image or Video (MAX. 10MB)</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept={ACCEPTED_FILE_TYPES} onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            {fileError && <p className="text-sm text-red-600 mt-2">{fileError}</p>}
            {aiAnalysisError && <p className="text-sm text-red-600 mt-2">{aiAnalysisError}</p>}

            {/* Image Previews & AI Analyze Button */}
            {files.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Attached Files:</h3>
                  {files.some(f => f.file.type.startsWith('image/')) && (
                    <button
                      type="button"
                      onClick={handleAnalyzeImage}
                      disabled={isAnalyzing}
                      className="text-xs sm:text-sm bg-purple-600/90 hover:bg-purple-700 text-white px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors disabled:opacity-50 shadow-lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>✨ Auto-Fill with AI</>
                      )}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {files.map((filePreview, index) => (
                    <div key={index} className="relative group">
                      {filePreview.file.type.startsWith('image/') ? (
                        <img src={filePreview.url} alt={filePreview.file.name} className="w-full h-24 object-cover rounded-lg" />
                      ) : (
                        <div className="w-full h-24 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center p-2">
                          <p className="text-xs text-slate-700 dark:text-slate-200 text-center break-all">{filePreview.file.name}</p>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove file"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="animal-type" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Type of Animal</label>
            <select id="animal-type" ref={animalTypeRef} required className={inputStyle}>
              <option value="">Select Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="condition" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Description of Condition</label>
            <textarea id="condition" ref={conditionRef} rows={4} required placeholder="e.g., Injured leg, looks lost and scared, etc." className={inputStyle}></textarea>
          </div>

          <div>
            <label htmlFor="location" className="block text-base font-semibold text-slate-800 dark:text-slate-100 mb-2">Location (Address or Coordinates)</label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="e.g., Near City Park, 123 Main St"
                className={inputStyle}
              />
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex items-center justify-center bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-900 transition-colors disabled:bg-slate-400 whitespace-nowrap"
              >
                <MapPinIcon className="w-5 h-5 mr-2" />
                {isLocating ? 'Locating...' : 'Use My Location'}
              </button>
            </div>
            {status && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{status}</p>}
          </div>

          <div>
            <button type="submit" disabled={isLoading || isAnalyzing} className="w-full bg-orange-500 text-white font-bold py-4 px-4 rounded-lg text-lg hover:bg-orange-600 transition-colors transform hover:scale-105 disabled:bg-orange-300 disabled:cursor-wait">
              {isLoading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;