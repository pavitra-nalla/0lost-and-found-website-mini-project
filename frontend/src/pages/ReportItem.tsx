import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Upload, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories } from '@/data/mockData';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const ReportItem = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'lost';

  // FORM STATE
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    status: defaultType,
  });

  // 🔥 IMAGE STATES
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // HANDLE IMAGE PREVIEW
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    } else {
      setPreview(null);
    }
  }, [image]);

  // UPLOAD IMAGE
  const uploadImage = async () => {
    if (!image) return "";

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.imageUrl;
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
      return "";
    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      await axios.post("http://localhost:5000/api/items", {
        ...form,
        image: imageUrl,
      });

      toast.success("Item reported successfully!");

      // RESET FORM
      setForm({
        title: '',
        description: '',
        category: '',
        location: '',
        date: '',
        status: defaultType,
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const inputClasses =
    "w-full px-4 py-3.5 bg-card rounded-2xl shadow-soft text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-[3px] focus:ring-aura-lavender/20 transition-all duration-200 text-sm";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <h1 className="text-3xl text-center mb-6">Report an Item</h1>

          <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl space-y-5">

            {/* TITLE */}
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClasses}
              required
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={inputClasses}
              required
            />

            {/* CATEGORY */}
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClasses}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* LOCATION */}
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={inputClasses}
              required
            />

            {/* DATE */}
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={`${inputClasses} pl-11`}
                required
              />
            </div>

            {/* 🔥 IMAGE UPLOAD */}
            <div
              className="border-2 border-dashed border-aura-peach/30 rounded-2xl p-6 text-center cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              {preview ? (
                <img
                  src={preview}
                  className="w-32 h-32 object-cover mx-auto rounded-lg"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p>Click to upload image</p>
                  <p className="text-xs">PNG, JPG up to 5MB</p>
                </>
              )}

              <input
                id="fileInput"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl gradient-action text-white"
            >
              {loading ? "Uploading..." : "Submit Report"}
            </button>

          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ReportItem;