'use client';

import { AlertCircle, ArrowLeft, Calendar, CheckCircle, Clock, Eye, FileText, Image as ImageIcon, Info, Send, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CreateBlogPost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewSlug, setPreviewSlug] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '', subtitle: '', content: '', imageUrl: '', published: true,
  });

  const set = (k: string, v: any) => setFormData((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50);
    setPreviewSlug(slug || 'post-slug');
  }, [formData.title]);

  // ✅ অপটিমাইজড ইমেজ আপলোড - কম্প্রেশন সহ
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max width 1200px
          if (width > 1200) {
            height = (height * 1200) / width;
            width = 1200;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                reject(new Error('Compression failed'));
              }
            },
            'image/jpeg',
            0.8 // 80% quality
          );
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // ✅ Step 1: ইমেজ কম্প্রেস করুন
      setUploadProgress(20);
      const compressedFile = await compressImage(file);
      
      // ✅ Step 2: Cloudinary এ আপলোড (প্রগ্রেস ট্র্যাকিং সহ)
      setUploadProgress(40);
      const uploadFormData = new FormData();
      uploadFormData.append('file', compressedFile);

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percent = 40 + (event.loaded / event.total) * 40;
            setUploadProgress(Math.round(percent));
          }
        });
        
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error('Upload failed'));
          }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        
        xhr.open('POST', '/api/admin/blog/upload');
        xhr.send(uploadFormData);
      });
      
      setUploadProgress(80);
      const data = await uploadPromise as { url: string };
      
      setUploadProgress(100);
      set('imageUrl', data.url);
      setPreviewImage(data.url);
      
      setTimeout(() => setUploadProgress(0), 1000);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
      setPreviewImage('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (pub: boolean) => {
    if (!formData.title.trim()) {
      alert('Please add a title before publishing');
      return;
    }
    if (!formData.content.trim()) {
      alert('Please add content before publishing');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, published: pub }),
      });
      if (res.ok) router.push('/admin/blog');
      else alert('Failed to save post');
    } catch (e) { console.error(e); alert('Something went wrong'); }
    finally { setLoading(false); }
  };

  const wordCount = formData.content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/blog" 
              className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 text-gray-500 transition-all duration-200"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Create New Post</h1>
              <p className="text-sm text-gray-500 mt-0.5">Write, edit, and publish blog content</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          
          {/* Main Content Area */}
          <div className="space-y-6">
            
            {/* Title Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  value={formData.title} 
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Enter a clear, descriptive title..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={120}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">{formData.title.length}/120 characters</p>
                  {formData.title.length > 60 && (
                    <p className="text-xs text-orange-500 flex items-center gap-1">
                      <AlertCircle size={12} /> SEO tip: Keep under 60 chars
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Subtitle / Excerpt
                </label>
                <input 
                  value={formData.subtitle} 
                  onChange={(e) => set('subtitle', e.target.value)}
                  placeholder="Optional subtitle or short description..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={160}
                />
                <p className="text-xs text-gray-400 mt-2">{formData.subtitle.length}/160 characters</p>
              </div>
            </div>

            {/* Image Section with Progress Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Cover Image
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="url" 
                  value={formData.imageUrl} 
                  onChange={(e) => set('imageUrl', e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center justify-center gap-2 border border-gray-200 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Uploading {uploadProgress}%</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span className="text-sm">Upload</span>
                      </>
                    )}
                  </button>
                  {formData.imageUrl && (
                    <button
                      onClick={() => { set('imageUrl', ''); setPreviewImage(''); }}
                      className="inline-flex items-center justify-center border border-red-200 rounded-lg px-3 py-3 text-red-500 hover:bg-red-50 transition"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              {uploading && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-3">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}
              
              <div className="mt-4 rounded-xl overflow-hidden bg-gray-100 min-h-[200px] flex items-center justify-center border border-gray-200">
                {(previewImage || formData.imageUrl) ? (
                  <img 
                    src={previewImage || formData.imageUrl} 
                    alt="Cover preview" 
                    className="w-full h-auto max-h-[260px] object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 py-8">
                    <ImageIcon size={32} className="text-gray-300" />
                    <p className="text-sm text-gray-400">Image preview will appear here</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Recommended: 1200×630px. Max 10MB. Auto-compressed to 80% quality.
              </p>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Content <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><FileText size={12} /> {wordCount} words</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {readTime} min read</span>
                </div>
              </div>
              
              <textarea 
                value={formData.content} 
                onChange={(e) => set('content', e.target.value)}
                rows={16} 
                placeholder="Write your post content here..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              />
              
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400 flex items-center gap-1"><Info size={12} /> HTML tags supported</p>
                <p className="text-xs text-gray-400">{formData.content.length.toLocaleString()} characters</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Publish Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Send size={16} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Publish</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Publish immediately</p>
                      <p className="text-xs text-gray-400">Make live on save</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.published} 
                        onChange={(e) => set('published', e.target.checked)} 
                        className="sr-only peer" 
                      />
                      <div className="w-10 h-5 bg-gray-200 peer-checked:bg-blue-600 rounded-full transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-2">
                    <button 
                      onClick={() => handleSubmit(false)} 
                      disabled={loading}
                      className="w-full border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      Save as Draft
                    </button>
                    <button 
                      onClick={() => handleSubmit(true)} 
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Publish Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye size={16} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">SEO Preview</h3>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-blue-600 font-medium text-base line-clamp-1">{formData.title || 'Post title goes here'}</p>
                  <p className="text-xs text-gray-400 mt-1">muazbd.net/blog/{previewSlug}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {formData.subtitle || formData.content.slice(0, 120) || 'Subtitle or excerpt...'}
                  </p>
                </div>
                
                <div className="mt-3 flex gap-2">
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} /> {new Date().toLocaleDateString()}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                    <CheckCircle size={16} className="text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Quick Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">🎯 Keep titles under 60 characters</li>
                  <li className="flex items-start gap-2">🖼️ Use 1200×630px images</li>
                  <li className="flex items-start gap-2">📝 Write at least 300 words</li>
                  <li className="flex items-start gap-2">🔗 Add internal links</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
