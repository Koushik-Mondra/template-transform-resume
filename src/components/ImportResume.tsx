
import { useState } from 'react';
import { UploadCloud, FilePlus, File, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ImportResumeProps {
  onImport: (file: File) => void;
}

const ImportResume = ({ onImport }: ImportResumeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    setError(null);
    
    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
    onImport(file);
    toast.success('Resume successfully uploaded!');
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="flex flex-col items-center justify-center">
          {selectedFile ? (
            <>
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <File className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <div className="bg-gray-100 p-3 rounded-full mb-4">
                <UploadCloud className="h-8 w-8 text-gray-600" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">
                Drag & drop your resume here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports PDF and DOCX files (max 5MB)
              </p>
              <Button type="button" variant="outline" className="mb-2">
                <FilePlus className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-4 flex items-center text-red-600">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span>{error}</span>
        </div>
      )}
      
      <input 
        id="file-upload" 
        type="file" 
        className="hidden" 
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
        onChange={handleFileChange}
      />
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <p className="text-gray-700">Upload your existing resume</p>
          </div>
          <div>
            <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">2</span>
            </div>
            <p className="text-gray-700">Choose your preferred template</p>
          </div>
          <div>
            <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">3</span>
            </div>
            <p className="text-gray-700">Download your transformed resume</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportResume;
