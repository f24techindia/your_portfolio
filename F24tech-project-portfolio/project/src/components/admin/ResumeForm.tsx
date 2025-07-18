import React, { useState } from 'react';
import { Upload, Download, Trash2, FileText } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ResumeForm: React.FC = () => {
  const { data, updateResume } = usePortfolio();
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const fileUrl = URL.createObjectURL(file);
      const resume = {
        fileName: file.name,
        fileUrl: fileUrl,
        uploadDate: new Date().toISOString()
      };
      updateResume(resume);
      alert('Resume uploaded successfully!');
    } else {
      alert('Please upload a PDF or Word document.');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDownload = () => {
    if (data.resume) {
      const link = document.createElement('a');
      link.href = data.resume.fileUrl;
      link.download = data.resume.fileName;
      link.click();
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete the resume?')) {
      updateResume(null);
      alert('Resume deleted successfully!');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Resume Management
      </h3>

      {!data.resume ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            Upload your resume
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Drag and drop your resume here, or click to select
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            Supported formats: PDF, DOC, DOCX (Max 5MB)
          </p>
          
          <label className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
            <Upload size={20} />
            Select Resume
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText size={32} className="text-purple-600 dark:text-purple-400" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {data.resume.fileName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploaded on {new Date(data.resume.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                Download
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={20} />
                Delete
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This resume will be available for download on your portfolio website.
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">
          Tips for your resume:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Keep it updated with your latest experience and skills</li>
          <li>• Use a professional format and design</li>
          <li>• Include relevant keywords for your industry</li>
          <li>• Keep it concise (1-2 pages maximum)</li>
          <li>• Save as PDF for best compatibility</li>
        </ul>
      </div>
    </div>
  );
};