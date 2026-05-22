import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUp, FileText, AlertCircle, Info } from 'lucide-react';
import { EmptyState } from '../components';

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]); // Strictly starts empty - zero fake data

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
      const filesArray = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type || 'Document'
      }));
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const filesArray = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        type: file.type || 'Document'
      }));
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Intro Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">
          Study Materials
        </h2>
        <p className="text-sm text-brand-charcoal/70 mt-1">
          Upload textbook PDFs, lecture slides, and notes. Pathshala AI will analyze them to power personalized chats and quizzes.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column: Drag & Drop Zone */}
        <div className="md:col-span-2">
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

            <div className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
              dragActive 
                ? 'border-brand-brown bg-brand-brown/5' 
                : 'border-brand-beige bg-white/50 hover:bg-white/80'
            }`}>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-cream border border-brand-beige">
                <FileUp className="h-7 w-7 text-brand-brown" />
              </div>

              <h3 className="font-display text-base font-bold text-brand-charcoal mb-1">
                Drag and drop your study materials
              </h3>
              <p className="text-xs text-brand-charcoal/60 mb-5 max-w-xs">
                Supports PDF, DOCX, and TXT files up to 25MB each.
              </p>

              <button
                type="button"
                onClick={() => document.getElementById('file-upload-input').click()}
                className="inline-flex items-center justify-center rounded-xl bg-brand-brown px-4 py-2 text-xs font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 active:scale-[0.98]"
              >
                Choose File
              </button>
            </div>
          </form>

          {/* List of uploaded documents - Starts STRICTLY in empty state */}
          <div className="mt-8">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-brand-charcoal/70 mb-4">
              Documents Inventory
            </h3>

            {uploadedFiles.length === 0 ? (
              <EmptyState
                illustrationType="pdf"
                title="No uploaded documents yet"
                description="Your study materials are currently empty. Drop a textbook PDF above so your AI study guide can answer questions based on your notes."
                actionLabel="Upload Your First Document"
                onAction={() => document.getElementById('file-upload-input').click()}
              />
            ) : (
              <div className="space-y-3">
                {uploadedFiles.map((file, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between rounded-xl border border-brand-beige bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-cream border border-brand-beige">
                        <FileText className="h-5 w-5 text-brand-brown" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-brand-charcoal leading-tight max-w-xs truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-brand-charcoal/50 mt-0.5">
                          {file.size} • {file.type}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: PDF Upload Guidelines & Tech Specs */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-beige bg-white/70 p-6 glassmorphic">
            <h3 className="font-display text-sm font-bold text-brand-charcoal mb-4 flex items-center gap-2">
              <Info className="h-4.5 w-4.5 text-brand-brown" />
              How Analysis Works
            </h3>
            <ul className="space-y-3.5 text-xs text-brand-charcoal/70 leading-relaxed text-left">
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cream text-[10px] font-bold text-brand-brown">1</span>
                <span>Our AI reads the document text, sections, and structural layouts.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cream text-[10px] font-bold text-brand-brown">2</span>
                <span>Your files are securely processed and saved in your private study space.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-cream text-[10px] font-bold text-brand-brown">3</span>
                <span>The AI Study Buddy uses your files to give you accurate step-by-step guidance.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-beige bg-yellow-50/45 p-6 border-l-4 border-l-brand-brown">
            <h3 className="font-display text-sm font-bold text-brand-charcoal mb-2 flex items-center gap-2">
              <AlertCircle className="h-4.5 w-4.5 text-brand-brown" />
              Study Storage Limit
            </h3>
            <p className="text-xs text-brand-charcoal/65 leading-relaxed text-left">
              On the Free Tier, your account is allocated up to <strong>50 MB</strong> of secure study space. You can upload multiple textbooks, chapters, and notes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
