// src/admin/Routes/sub-route/Book/BookRegister.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JsBarcode from "jsbarcode";
import {
  FiUpload,
  FiCamera,
  FiX,
  FiImage,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiBook,
  FiSearch,
  FiCopy,
} from "react-icons/fi";

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  deweyDecimalId: string;
  bookType: string;
  cutter: string;
  yearPublished: string;
  location: string;
  category: string;
  sourceOfFund: string;
  condition: string;
  numberOfCopies: string;
  summary: string;
  description: string;
  placeOfPublication: string;
  format: string;
}

interface RegisteredBook extends BookFormData {
  id: string;
  code: string;
  coverUrl: string | null;
  registeredAt: string;
}

const initialFormData: BookFormData = {
  title: "",
  author: "",
  isbn: "",
  deweyDecimalId: "",
  bookType: "",
  cutter: "",
  yearPublished: "",
  location: "",
  category: "",
  sourceOfFund: "",
  condition: "",
  numberOfCopies: "1",
  summary: "",
  description: "",
  placeOfPublication: "",
  format: "",
};

const BOOK_TYPES = ["Book", "Magazine", "Journal", "Thesis", "Reference", "Periodical"];
const FORMATS = ["Hardcover", "Paperback", "E-book", "Audiobook"];
const CONDITIONS = ["New", "Good", "Fair", "Poor", "Damaged"];
const SOURCE_OF_FUND = ["Purchased", "Donated", "Grant", "Institutional Budget"];

// Generates a code like LIB-202609-0001, incrementing per month based on existing count
function generateBookCode(existingCount: number) {
  const now = new Date();
  const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const seq = String(existingCount + 1).padStart(4, "0");
  return `LIB-${yyyymm}-${seq}`;
}

export default function RegisterBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookFormData>(initialFormData);

  // Tracks which registered book is currently being edited (null = new entry)
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  // ---------- Registered books list ----------
  const [registeredBooks, setRegisteredBooks] = useState<RegisteredBook[]>([]);
  const [listSearch, setListSearch] = useState("");
  const [viewingBook, setViewingBook] = useState<RegisteredBook | null>(null);

  // ---------- Image state ----------
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const barcodeRef = useRef<HTMLCanvasElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  // Universal handler for text/select/textarea inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------- File upload ----------
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------- Camera capture ----------
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(
        "Couldn't access the camera. Check browser permissions and make sure you're on HTTPS or localhost."
      );
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `book-cover-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
      setImageFile(file);
      setImagePreview(URL.createObjectURL(blob));
      stopCamera();
    }, "image/jpeg", 0.92);
  };

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // ---------- Generate barcode whenever the details modal opens ----------
  useEffect(() => {
    if (!viewingBook || !barcodeRef.current) return;
    JsBarcode(barcodeRef.current, viewingBook.code, {
      format: "CODE128",
      width: 2.2,
      height: 70,
      fontSize: 16,
      displayValue: true,
      textAlign: "center",
      margin: 10,
    });
  }, [viewingBook]);

  // ---------- Form reset ----------
  const resetForm = () => {
    setFormData(initialFormData);
    setEditingBookId(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ---------- Actions ----------
  const handleSave = () => {
    if (!formData.title.trim()) {
      alert("Please enter at least a book title before saving.");
      return;
    }

    if (editingBookId) {
      // Update existing book, keep its original code + registeredAt
      setRegisteredBooks((prev) =>
        prev.map((b) =>
          b.id === editingBookId
            ? { ...b, ...formData, coverUrl: imagePreview }
            : b
        )
      );
      console.log("Updated book:", editingBookId, formData, "Cover file:", imageFile);
      // TODO: replace with actual API call (PUT/PATCH, multipart/form-data if cover changed)
      resetForm();
    } else {
      const newBook: RegisteredBook = {
        ...formData,
        id: `${Date.now()}`,
        code: generateBookCode(registeredBooks.length),
        coverUrl: imagePreview,
        registeredAt: new Date().toISOString(),
      };

      setRegisteredBooks((prev) => [newBook, ...prev]);
      console.log("Saved book:", newBook, "Cover file:", imageFile);
      // TODO: replace with actual API call (multipart/form-data with imageFile)
    }
  };

  const handleRegisterAgain = () => {
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    if (window.opener) {
      window.close();
    } else {
      navigate("/book-list");
    }
  };

  const handleEditBook = (book: RegisteredBook) => {
    const { id, code, coverUrl, registeredAt, ...rest } = book;
    setFormData(rest);
    setEditingBookId(id);
    setImagePreview(coverUrl);
    setImageFile(null); // existing cover, no new file selected yet
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleRemoveBook = (book: RegisteredBook) => {
    const confirmed = window.confirm(
      `Remove "${book.title || "this book"}" from the registered list? This cannot be undone.`
    );
    if (!confirmed) return;

    setRegisteredBooks((prev) => prev.filter((b) => b.id !== book.id));

    // If the book being removed was mid-edit, clear the form back to a fresh entry
    if (editingBookId === book.id) {
      resetForm();
    }
    // If it was open in the details modal, close it
    if (viewingBook?.id === book.id) {
      setViewingBook(null);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const filteredRegisteredBooks = registeredBooks.filter((b) => {
    if (!listSearch.trim()) return true;
    const term = listSearch.toLowerCase();
    return (
      b.title.toLowerCase().includes(term) ||
      b.author.toLowerCase().includes(term) ||
      b.isbn.toLowerCase().includes(term) ||
      b.category.toLowerCase().includes(term) ||
      b.code.toLowerCase().includes(term)
    );
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-PH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-linear-to-b from-zinc-50 to-white font-[Poppins]">
      <div className="max-w-[1600px] mx-auto space-y-5 sm:space-y-6" ref={formTopRef}>
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-800">
            {editingBookId ? "Edit Book" : "Register Book"}
          </h1>
          {editingBookId && (
            <span className="text-xs font-medium bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              Editing existing entry
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ---------- Cover image (wider: 3/12 on desktop) ---------- */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-5 space-y-4">
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider">
                Book Cover
              </h2>

              {imagePreview ? (
                <div className="relative group max-w-xs mx-auto lg:max-w-none">
                  <img
                    src={imagePreview}
                    alt="Book cover preview"
                    className="w-full aspect-[3/4] object-cover rounded-xl border border-zinc-200"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1.5 bg-zinc-900/70 hover:bg-zinc-900 text-white rounded-full cursor-pointer transition"
                    title="Remove image"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="w-full max-w-xs mx-auto lg:max-w-none aspect-[3/4] flex flex-col items-center justify-center gap-2 border-2 border-dashed border-zinc-300 rounded-xl text-zinc-400 bg-zinc-50"
                >
                  <FiImage size={36} />
                  <span className="text-sm">No cover selected</span>
                </div>
              )}

              <div className="flex gap-3 max-w-xs mx-auto lg:max-w-none">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm font-medium cursor-pointer transition"
                >
                  <FiUpload size={15} />
                  Upload
                </button>
                <button
                  onClick={startCamera}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium cursor-pointer transition"
                >
                  <FiCamera size={15} />
                  Capture
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <p className="text-xs text-zinc-400 text-center">
                JPG or PNG. Drag & drop onto the preview area, or use upload / capture.
              </p>
            </div>
          </div>

          {/* ---------- Form fields (5/12 on desktop) ---------- */}
          <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl shadow-sm p-4 sm:p-6 space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Title" span="md:col-span-2">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Book title"
                    className={inputClass}
                  />
                </Field>

                <Field label="Author">
                  <input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className={inputClass}
                  />
                </Field>

                <Field label="ISBN">
                  <input
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="978-0-000000-0-0"
                    className={inputClass}
                  />
                </Field>

                <Field label="Category">
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Programming, Fiction"
                    className={inputClass}
                  />
                </Field>

                <Field label="Book Type">
                  <select
                    name="bookType"
                    value={formData.bookType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select type</option>
                    {BOOK_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Classification */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
                Classification
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Dewey Decimal ID">
                  <input
                    name="deweyDecimalId"
                    value={formData.deweyDecimalId}
                    onChange={handleChange}
                    placeholder="e.g. 005.13"
                    className={inputClass}
                  />
                </Field>

                <Field label="Cutter">
                  <input
                    name="cutter"
                    value={formData.cutter}
                    onChange={handleChange}
                    placeholder="e.g. M377c"
                    className={inputClass}
                  />
                </Field>

                <Field label="Format">
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select format</option>
                    {FORMATS.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Publication */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
                Publication
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Year Published">
                  <input
                    type="number"
                    name="yearPublished"
                    value={formData.yearPublished}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
                    min={1000}
                    max={2100}
                    className={inputClass}
                  />
                </Field>

                <Field label="Place of Publication" span="sm:col-span-2">
                  <input
                    name="placeOfPublication"
                    value={formData.placeOfPublication}
                    onChange={handleChange}
                    placeholder="e.g. Cagayan de Oro, Philippines"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {/* Inventory */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
                Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Location">
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Shelf A-3"
                    className={inputClass}
                  />
                </Field>

                <Field label="Number of Copies">
                  <input
                    type="number"
                    name="numberOfCopies"
                    value={formData.numberOfCopies}
                    onChange={handleChange}
                    min={1}
                    className={inputClass}
                  />
                </Field>

                <Field label="Condition">
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select condition</option>
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Source of Fund">
                  <select
                    name="sourceOfFund"
                    value={formData.sourceOfFund}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select source</option>
                    {SOURCE_OF_FUND.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
                Summary & Description
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <Field label="Summary">
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Short summary of the book"
                    className={inputClass}
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Detailed description, notes, or remarks"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {/* ---------- Bottom action bar ---------- */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-100">
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold cursor-pointer transition"
              >
                {editingBookId ? "Update" : "Save"}
              </button>
              <button
                onClick={handleRegisterAgain}
                className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm font-semibold cursor-pointer transition"
              >
                {editingBookId ? "Discard Changes" : "Register Again"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-sm font-semibold cursor-pointer transition"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* ---------- Registered books list (4/12 on desktop) ---------- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col max-h-[70vh] lg:max-h-[85vh]">
              <div className="flex items-center gap-2 mb-4">
                <FiBook className="text-indigo-600" size={20} />
                <h2 className="text-sm sm:text-base font-semibold text-zinc-700 uppercase tracking-wider">
                  Registered Books
                </h2>
                <span className="ml-auto text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                  {registeredBooks.length}
                </span>
              </div>

              <div className="relative mb-4">
                <FiSearch
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={16}
                />
                <input
                  type="text"
                  value={listSearch}
                  onChange={(e) => setListSearch(e.target.value)}
                  placeholder="Search by title, author, ISBN, code..."
                  className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {filteredRegisteredBooks.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center py-16 text-zinc-400 gap-2">
                    <FiBook size={32} />
                    <p className="text-sm">
                      {registeredBooks.length === 0
                        ? "No books registered yet."
                        : "No matches found."}
                    </p>
                  </div>
                )}

                {filteredRegisteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition ${
                      editingBookId === book.id
                        ? "bg-amber-50 border-amber-200"
                        : "bg-zinc-50 border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50"
                    }`}
                  >
                    <button
                      onClick={() => setViewingBook(book)}
                      className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                    >
                      {book.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded-md border border-zinc-200 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-16 flex items-center justify-center bg-zinc-200 rounded-md shrink-0 text-zinc-400">
                          <FiImage size={18} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-zinc-800 truncate">
                          {book.title || "Untitled"}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {book.author || "Unknown author"}
                        </p>
                        <p className="text-xs font-mono text-indigo-500 mt-1">
                          {book.code}
                        </p>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {formatDate(book.registeredAt)}
                        </p>
                      </div>
                    </button>

                    {/* Row actions */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => setViewingBook(book)}
                        title="View"
                        className="p-1.5 rounded-md text-zinc-400 hover:text-indigo-600 hover:bg-indigo-100 cursor-pointer transition"
                      >
                        <FiEye size={15} />
                      </button>
                      <button
                        onClick={() => handleEditBook(book)}
                        title="Edit"
                        className="p-1.5 rounded-md text-zinc-400 hover:text-amber-600 hover:bg-amber-100 cursor-pointer transition"
                      >
                        <FiEdit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleRemoveBook(book)}
                        title="Remove"
                        className="p-1.5 rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-100 cursor-pointer transition"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Camera Modal ---------- */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/90 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl overflow-hidden max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <h3 className="text-white font-semibold">Capture Book Cover</h3>
              <button
                onClick={stopCamera}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {cameraError ? (
                <p className="text-rose-400 text-sm text-center py-10">
                  {cameraError}
                </p>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-xl bg-black aspect-video object-cover"
                />
              )}
              <canvas ref={canvasRef} className="hidden" />

              <div className="flex gap-3">
                <button
                  onClick={stopCamera}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium cursor-pointer transition"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  disabled={!!cameraError}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium cursor-pointer transition"
                >
                  Take Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- View Book Details Modal ---------- */}
      {viewingBook && (
        <div className="fixed inset-0 z-50 bg-zinc-950/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h3 className="text-lg font-bold text-zinc-800">Book Details</h3>
              <button
                onClick={() => setViewingBook(null)}
                className="text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* Cover + basic info */}
              <div className="flex flex-col sm:flex-row gap-5">
                {viewingBook.coverUrl ? (
                  <img
                    src={viewingBook.coverUrl}
                    alt={viewingBook.title}
                    className="w-28 h-40 object-cover rounded-xl border border-zinc-200 shrink-0 mx-auto sm:mx-0"
                  />
                ) : (
                  <div className="w-28 h-40 flex items-center justify-center bg-zinc-100 rounded-xl shrink-0 text-zinc-400 mx-auto sm:mx-0">
                    <FiImage size={28} />
                  </div>
                )}
                <div className="min-w-0 text-center sm:text-left">
                  <h4 className="text-xl font-bold text-zinc-800">
                    {viewingBook.title || "Untitled"}
                  </h4>
                  <p className="text-zinc-500 mt-1">{viewingBook.author || "—"}</p>
                  <p className="text-xs text-zinc-400 mt-2">
                    Registered {formatDate(viewingBook.registeredAt)}
                  </p>
                </div>
              </div>

              {/* Detailed fields */}
              <DetailGrid book={viewingBook} />

              {viewingBook.summary && (
                <DetailBlock label="Summary" value={viewingBook.summary} />
              )}
              {viewingBook.description && (
                <DetailBlock label="Description" value={viewingBook.description} />
              )}

              {/* ---------- Automated barcode ---------- */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 flex flex-col items-center gap-2 overflow-x-auto">
                <canvas ref={barcodeRef} />
                <button
                  onClick={() => copyCode(viewingBook.code)}
                  className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  <FiCopy size={12} />
                  Copy code
                </button>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-4 border-t border-zinc-100 flex flex-col sm:flex-row justify-between gap-3">
              <button
                onClick={() => {
                  handleEditBook(viewingBook);
                  setViewingBook(null);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-sm font-medium cursor-pointer transition"
              >
                <FiEdit2 size={14} />
                Edit
              </button>
              <button
                onClick={() => setViewingBook(null)}
                className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm font-medium cursor-pointer transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Small helper components ----------
function Field({
  label,
  children,
  span,
}: {
  label: string;
  children: React.ReactNode;
  span?: string;
}) {
  return (
    <div className={span}>
      <label className="block text-sm font-medium text-zinc-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function DetailGrid({ book }: { book: RegisteredBook }) {
  const rows: [string, string][] = [
    ["ISBN", book.isbn],
    ["Category", book.category],
    ["Book Type", book.bookType],
    ["Format", book.format],
    ["Dewey Decimal ID", book.deweyDecimalId],
    ["Cutter", book.cutter],
    ["Year Published", book.yearPublished],
    ["Place of Publication", book.placeOfPublication],
    ["Location", book.location],
    ["Number of Copies", book.numberOfCopies],
    ["Condition", book.condition],
    ["Source of Fund", book.sourceOfFund],
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {rows.map(([label, value]) => (
        <div key={label}>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-sm text-zinc-800 mt-0.5">{value || "—"}</p>
        </div>
      ))}
    </div>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-zinc-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-lg text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition";