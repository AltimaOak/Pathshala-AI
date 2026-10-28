import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileText, AlertCircle, Info, Trash2, CheckCircle2, HardDrive } from 'lucide-react';
import { EmptyState } from '../components';

import { API_BASE_URL } from '../config/api';

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const API_URL = API_BASE_URL;

  // Fetch indexed materials from backend on mount
  const fetchIndexedFiles = async () => {
    try {
      const res = await fetch(`${API_URL}/upload/files`);
      if (res.ok) {
        const data = await res.json();
        const formatted = (data.files || []).map(f => ({
          name: f.source,
          size: `${f.chunks_count} chunks • ${f.total_pages} pg`,
          type: 'Indexed PDF'
        }));
        setUploadedFiles(formatted);
      }
    } catch (err) {
      console.warn("Could not load indexed materials:", err);
    }
  };

  React.useEffect(() => {
    fetchIndexedFiles();
  }, []);

  const uploadFileToBackend = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/upload/pdf`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Upload failed');
      }
      await fetchIndexedFiles();
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFileFromBackend = async (filename) => {
    try {
      await fetch(`${API_URL}/upload/files/${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      });
      setUploadedFiles(prev => prev.filter(f => f.name !== filename));
    } catch (err) {
      console.error("Error deleting file:", err);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      Array.from(e.dataTransfer.files).forEach(file => {
        uploadFileToBackend(file);
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      Array.from(e.target.files).forEach(file => {
        uploadFileToBackend(file);
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-10 text-left">
      {/* Intro Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3 py-1 text-xs font-semibold text-brand-brown mb-2.5">
          <FileText className="h-3.5 w-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
          Study Materials
        </h2>
        <p className="text-sm text-brand-charcoal/70 mt-1 max-w-2xl leading-relaxed">
          Upload textbook chapters, class slides, and syllabus notes. Your AI Study Buddy analyzes these materials to provide source-referenced answers and quizzes.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-3 items-start">
        {/* Left Column: Drag & Drop Zone & File List */}
        <div className="md:col-span-2 space-y-6">
          <form 
            onDragEnter={handleDrag} 
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
            className="relative"
          >
            <input
              id="file-upload-input"
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-9 text-center transition-all ${
              dragActive 
                ? 'border-brand-brown bg-brand-brown/5 ring-4 ring-brand-brown/10' 
                : 'border-brand-beige/80 bg-white/70 hover:bg-white hover:border-brand-brown/40 shadow-2xs'
            }`}>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-brown/10 border border-brand-brown/20 text-brand-brown shadow-2xs">
                <FileUp className="h-7 w-7" />
              </div>

              <h3 className="font-display text-base font-bold text-brand-charcoal mb-1">
                Drop your study materials here
              </h3>
              <p className="text-xs text-brand-charcoal/60 mb-5 max-w-sm leading-relaxed">
                Drag and drop your textbooks or lecture notes, or browse from your computer.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => document.getElementById('file-upload-input')?.click()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-brown px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-brown/90 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <FileUp className="h-3.5 w-3.5" />
                  <span>Choose Files</span>
                </button>
              </div>

              <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold text-brand-charcoal/45">
                <span className="rounded-md bg-brand-cream/80 border border-brand-beige px-2 py-0.5">PDF</span>
                <span className="rounded-md bg-brand-cream/80 border border-brand-beige px-2 py-0.5">DOCX</span>
                <span className="rounded-md bg-brand-cream/80 border border-brand-beige px-2 py-0.5">TXT</span>
                <span>• Up to 25 MB each</span>
              </div>
            </div>
          </form>

          {/* List of uploaded documents - Starts STRICTLY in empty state */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal/75">
                Uploaded Materials {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
              </h3>
              {uploadedFiles.length > 0 && (
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Indexed & Ready
                </span>
              )}
            </div>

            {uploadedFiles.length === 0 ? (
              <EmptyState
                illustrationType="pdf"
                title="No uploaded documents yet"
                description="Your study materials are currently empty. Drop a textbook PDF above so your AI study guide can answer questions based on your notes."
                actionLabel="Upload Your First Document"
                onAction={() => document.getElementById('file-upload-input')?.click()}
              />
            ) : (
              <div className="space-y-2.5">
                {uploadedFiles.map((file, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between rounded-xl border border-brand-beige/80 bg-white p-3.5 shadow-2xs hover:border-brand-brown/40 transition-all group"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-brown/10 text-brand-brown border border-brand-brown/20">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="text-xs font-bold text-brand-charcoal truncate max-w-xs md:max-w-md">
                          {file.name}
                        </p>
                        <p className="text-[11px] text-brand-charcoal/50 mt-0.5">
                          {file.size} • {file.type}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteFileFromBackend(file.name)}
                      className="p-2 text-brand-charcoal/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {isUploading && (
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-brand-brown/30 bg-brand-brown/5 text-brand-brown text-xs font-semibold animate-pulse">
                <FileUp className="h-4 w-4 animate-bounce" />
                <span>Processing & embedding PDF into knowledge base...</span>
              </div>
            )}

            {uploadError && (
              <div className="flex items-center gap-2 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: PDF Upload Guidelines & Tech Specs */}
        <div className="space-y-5">
          {/* How Analysis Works Card */}
          <div className="rounded-2xl border border-brand-beige/80 bg-white p-5.5 shadow-xs">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-brand-brown" />
              <span>How Analysis Works</span>
            </h3>
            <ul className="space-y-3.5 text-xs text-brand-charcoal/70 leading-relaxed text-left">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cream border border-brand-beige text-[10px] font-bold text-brand-brown">
                  1
                </span>
                <span>Our AI parses text, headings, and chapter structures from your document.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cream border border-brand-beige text-[10px] font-bold text-brand-brown">
                  2
                </span>
                <span>Your files are securely encrypted and indexed into your private study workspace.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cream border border-brand-beige text-[10px] font-bold text-brand-brown">
                  3
                </span>
                <span>The AI Study Buddy and Quiz Generator reference your exact syllabus for answers.</span>
              </li>
            </ul>
          </div>

          {/* Storage Meter Card */}
          <div className="rounded-2xl border border-brand-beige/80 bg-white p-5.5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-brand-brown" />
                <span>Study Storage</span>
              </h3>
              <span className="text-[10px] font-bold text-brand-brown bg-brand-cream border border-brand-beige px-2 py-0.5 rounded-full">
                Free Tier
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-brand-charcoal/70 font-medium">
                <span>Storage Allocated</span>
                <span className="font-bold text-brand-charcoal">50 MB</span>
              </div>
              <div className="w-full h-2 rounded-full bg-brand-cream border border-brand-beige overflow-hidden">
                <div 
                  className="h-full bg-brand-brown rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(8, uploadedFiles.length * 15))}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-brand-charcoal/60 mt-3 leading-relaxed text-left">
              You can upload multiple textbooks, chapters, and lecture notes within your 50 MB allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
