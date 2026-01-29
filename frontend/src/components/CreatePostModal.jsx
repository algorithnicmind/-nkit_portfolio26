
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCloudUploadAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const [category, setCategory] = useState('Motivation');
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    // Lock body scroll (and Lenis) when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
        } else {
            document.body.style.overflow = 'unset';
            if (window.lenis) window.lenis.start();
        }
        return () => { 
            document.body.style.overflow = 'unset'; 
            if (window.lenis) window.lenis.start();
        };
    }, [isOpen]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
                setError('File size too large (max 50MB)');
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!caption && !file) {
            setError('Please add a caption or media');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            let mediaUrl = null;
            let mediaType = null;

            // 1. Upload File if exists
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                const API_URL = process.env.REACT_APP_API_URL;
                const uploadRes = await fetch(`${API_URL}/api/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const uploadData = await uploadRes.json();
                if (!uploadData.success) throw new Error(uploadData.error || 'Upload failed');

                mediaUrl = uploadData.filePath;
                mediaType = file.type.startsWith('video/') ? 'video' : 'image';
            }

            // 2. Create Post
            const API_URL = process.env.REACT_APP_API_URL;
            const postRes = await fetch(`${API_URL}/api/soft-posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    category,
                    caption,
                    mediaUrl,
                    mediaType
                }),
            });

            const postData = await postRes.json();
            if (!postData.success) throw new Error(postData.error || 'Post creation failed');

            onPostCreated();
            onClose();
            // Reset
            setCategory('Motivation');
            setCaption('');
            setFile(null);
            setPreviewUrl(null);

        } catch (err) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="create-post-modal"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h3>Create New Post</h3>
                        <button className="modal-close-btn" onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Category Select */}
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="category-select"
                            >
                                <option value="Motivation">Motivation 💡</option>
                                <option value="Certificate">Certificate 📜</option>
                                <option value="Freelancing">Freelancing 💼</option>
                                <option value="Hackathon">Hackathon 🚀</option>
                                <option value="Seminar">Seminar 🎤</option>
                                <option value="Webinar">Webinar 💻</option>
                                <option value="Research">Research 🛠️</option>
                            </select>
                        </div>

                        {/* Caption */}
                        <div className="form-group">
                            <textarea
                                placeholder="What's on your mind, Admin?"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows={4}
                                className="caption-input"
                            />
                        </div>

                        {/* Media Upload */}
                        <div className="media-upload-section">
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*,video/*"
                                capture="environment"
                                onChange={handleFileChange}
                                hidden
                            />

                            {!previewUrl ? (
                                <label htmlFor="file-upload" className="upload-placeholder click-ripple">
                                    <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                                    <span>Add Photo or Video</span>
                                </label>
                            ) : (
                                <div className="media-preview">
                                    {file?.type.startsWith('video/') ? (
                                        <video src={previewUrl} controls className="preview-content" />
                                    ) : (
                                        <img src={previewUrl} alt="Preview" className="preview-content" />
                                    )}
                                    <button
                                        type="button"
                                        className="remove-media-btn"
                                        onClick={() => { setFile(null); setPreviewUrl(null); }}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </div>
                            )}
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button
                            type="submit"
                            className="submit-btn full-width"
                            disabled={isUploading}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                            {isUploading ? 'Posting...' : 'Post Update'}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CreatePostModal;
