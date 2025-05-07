import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "../styles/UploadForm.css"; // Ensure this CSS file exists

const UploadForm = ({ setResult, resultsRef }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/analyze",
        formData
      );
      setResult(response.data);

      // Clear the uploaded image and preview
      setImage(null);
      setPreviewUrl(null);

      // Scroll to the analysis results section
      if (resultsRef?.current) {
        resultsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="preview-image" />
        ) : (
          <p>Drag & drop an image here, or click to select</p>
        )}
      </div>
      <button type="submit" className="analyze-button" disabled={!image}>
        Analyze
      </button>
    </form>
  );
};

export default UploadForm;
