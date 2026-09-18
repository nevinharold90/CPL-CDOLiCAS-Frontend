import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  DragEvent,
} from "react";
import {
  FiX,
  FiImage,
  FiUpload,
  FiCamera,
  FiBook,
  FiSearch,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCopy,
} from "react-icons/fi";
import JsBarcode from "jsbarcode";
import { DeweyDecimalSelect, DeweyItem } from "./component/deweyDecimal";
// Imported IsbnSearchResult directly from component to match API types
import { Isbn, IsbnSearchResult } from "./component/isbn";

// Dropdown constants
const BOOK_TYPES = ["Fiction", "Non-Fiction", "Reference", "Textbook", "Periodical"];
const FORMATS = ["Hardcover", "Paperback", "E-Book", "Audiobook"];
const CONDITIONS = ["New", "Good", "Fair", "Poor"];
const SOURCE_OF_FUND = ["Government", "Donation", "Library Budget", "Grant"];

// Data Interfaces
export interface BookFormData {
  title: string;
  authors: string[];
  isbn13: string;
  isbn11: string;
  issn: string;
  category: string;
  bookType: string;
  deweyDecimalId: string;
  cutter: string;
  format: string;
  yearPublished: string;
  placeOfPublication: string;
  location: string;
  numberOfCopies: number;
  condition: string;
  sourceOfFund: string;
  summary: string;
  description: string;
}

export interface BookItem extends BookFormData {
  id: string;
  coverUrl: string | null;
  code: string;
  registeredAt: Date;
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  span?: string;
}

// Helper component for form fields
const Field: React.FC<FieldProps> = ({ label, children, span = "" }) => (
  <div className={`space-y-1 ${span}`}>
    <label className="block text-xs font-semibold text-zinc-600 uppercase tracking-wider">
      {label}
    </label>
    {children}
  </div>
);

const initialFormState: BookFormData = {
  title: "",
  authors: [],
  isbn13: "",
  isbn11: "",
  issn: "",
  category: "",
  bookType: "",
  deweyDecimalId: "",
  cutter: "",
  format: "",
  yearPublished: "",
  placeOfPublication: "",
  location: "",
  numberOfCopies: 1,
  condition: "",
  sourceOfFund: "",
  summary: "",
  description: "",
};

export default function BookRegistration() {
  // Typed State Variables
  const [formData, setFormData] = useState<BookFormData>(initialFormState);
  const [authorInput, setAuthorInput] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [registeredBooks, setRegisteredBooks] = useState<BookItem[]>([]);
  const [listSearch, setListSearch] = useState<string>("");
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [viewingBook, setViewingBook] = useState<BookItem | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Typed HTML Refs
  const formTopRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  const inputClass =
    "w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition";

  // Generate Barcode when viewing a book in detail modal
  useEffect(() => {
    if (viewingBook && barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, viewingBook.code || "00000000", {
          format: "CODE128",
          width: 2,
          height: 50,
          displayValue: true,
        });
      } catch (err) {
        console.error("Barcode generation failed:", err);
      }
    }
  }, [viewingBook]);

  // General Form Input Handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ISBN Dropdown Selection Handler
  const handleIsbnSelect = (isbn: string, selectedBook?: IsbnSearchResult) => {
    if (!selectedBook) {
      setFormData((prev) => ({ ...prev, isbn13: isbn }));
      return;
    }

    // Extract string names from author objects
    const fetchedAuthors =
      selectedBook.authors?.map((a) => a.full_name).filter(Boolean) || [];
    const cls = selectedBook.classification;

    setFormData((prev) => ({
      ...prev,
      isbn13: selectedBook.isbn13 || isbn,
      isbn11: selectedBook.isbn11 || prev.isbn11,
      issn: selectedBook.issn || prev.issn,
      title: selectedBook.title || prev.title,
      summary: selectedBook.summary || prev.summary,
      description: selectedBook.description || prev.description,
      authors: Array.from(new Set([...prev.authors, ...fetchedAuthors])),
      category: prev.category || cls?.category || cls?.dewey_decimal?.class_name || "",
      deweyDecimalId:
        prev.deweyDecimalId ||
        cls?.dewey_decimal?.dewey_number ||
        (cls?.dewey_decimal_id ? String(cls.dewey_decimal_id) : ""),
      cutter: prev.cutter || cls?.cutter || "",
      yearPublished: prev.yearPublished || cls?.year_published || "",
      placeOfPublication: prev.placeOfPublication || cls?.place_of_publication || "",
      bookType: prev.bookType || cls?.book_type || "",
    }));
  };

  // Generic Search Select Handler for ISBN/ISSN fields
  const handleBookSelect = (
    value: string,
    fieldKey: "isbn13" | "isbn11" | "issn",
    selectedBook?: IsbnSearchResult
  ) => {
    setFormData((prev) => {
      if (!selectedBook) {
        return { ...prev, [fieldKey]: value };
      }

      const fetchedAuthors =
        selectedBook.authors?.map((a) => a.full_name).filter(Boolean) || [];
      const cls = selectedBook.classification;

      return {
        ...prev,
        [fieldKey]: value,
        isbn13: prev.isbn13 || selectedBook.isbn13 || "",
        isbn11: prev.isbn11 || selectedBook.isbn11 || "",
        issn: prev.issn || selectedBook.issn || "",
        title: prev.title || selectedBook.title || "",
        authors: prev.authors.length > 0 ? prev.authors : fetchedAuthors,
        description: prev.description || selectedBook.description || "",
        summary: prev.summary || selectedBook.summary || "",
        deweyDecimalId:
          prev.deweyDecimalId ||
          cls?.dewey_decimal?.dewey_number ||
          (cls?.dewey_decimal_id ? String(cls.dewey_decimal_id) : ""),
        category: prev.category || cls?.category || cls?.dewey_decimal?.class_name || "",
        cutter: prev.cutter || cls?.cutter || "",
        yearPublished: prev.yearPublished || cls?.year_published || "",
        placeOfPublication: prev.placeOfPublication || cls?.place_of_publication || "",
        bookType: prev.bookType || cls?.book_type || "",
      };
    });
  };

  // Dewey Decimal Selection Handler
  const handleDeweySelect = (deweyNumber: string, item?: DeweyItem) => {
    setFormData((prev) => ({
      ...prev,
      deweyDecimalId: deweyNumber,
      category: item?.class_name || prev.category,
    }));
  };

  // Author Handlers
  const handleAddAuthor = () => {
    if (authorInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        authors: Array.from(new Set([...prev.authors, authorInput.trim()])),
      }));
      setAuthorInput("");
    }
  };

  const handleAuthorKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddAuthor();
    }
  };

  const handleRemoveAuthor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  // Cover Image Handlers
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Camera Handlers
  const startCamera = async () => {
    setCameraError(null);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCameraError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImagePreview(canvas.toDataURL("image/png"));
      }
      stopCamera();
    }
  };

  // Save / Update Actions
  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedCode = `${formData.deweyDecimalId || "000"} ${formData.cutter || "C00"}`;

      if (editingBookId) {
        setRegisteredBooks((prev) =>
          prev.map((b) =>
            b.id === editingBookId
              ? {
                  ...formData,
                  id: editingBookId,
                  coverUrl: imagePreview,
                  code: generatedCode,
                  registeredAt: b.registeredAt,
                }
              : b
          )
        );
      } else {
        const newBook: BookItem = {
          ...formData,
          id: Date.now().toString(),
          coverUrl: imagePreview,
          code: generatedCode,
          registeredAt: new Date(),
        };
        setRegisteredBooks((prev) => [newBook, ...prev]);
      }

      handleRegisterAgain();
      setIsSubmitting(false);
    }, 500);
  };

  const handleRegisterAgain = () => {
    setFormData(initialFormState);
    setImagePreview(null);
    setEditingBookId(null);
    setAuthorInput("");
  };

  const handleCancel = () => {
    handleRegisterAgain();
    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditBook = (book: BookItem) => {
    setFormData(book);
    setImagePreview(book.coverUrl || null);
    setEditingBookId(book.id);
    formTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRemoveBook = (book: BookItem) => {
    setRegisteredBooks((prev) => prev.filter((b) => b.id !== book.id));
    if (editingBookId === book.id) handleRegisterAgain();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Search Filter for Table
  const filteredRegisteredBooks = registeredBooks.filter((book) => {
    const q = listSearch.toLowerCase();
    return (
      book.title?.toLowerCase().includes(q) ||
      book.authors?.some((a) => a.toLowerCase().includes(q)) ||
      book.isbn13?.toLowerCase().includes(q) ||
      book.isbn11?.toLowerCase().includes(q) ||
      book.issn?.toLowerCase().includes(q) ||
      book.code?.toLowerCase().includes(q)
    );
  });

  
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 bg-linear-to-b from-zinc-50 to-white font-[Poppins] overflow-x-hidden">
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
          {/* Cover Image Upload (3/12 Desktop) */}
          <div className="lg:col-span-3 min-w-0">
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
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

              <div className="flex gap-2 sm:gap-3 max-w-xs mx-auto lg:max-w-none">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm font-medium cursor-pointer transition min-w-0"
                >
                  <FiUpload size={15} className="shrink-0" />
                  <span className="truncate">Upload</span>
                </button>
                <button
                  onClick={startCamera}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium cursor-pointer transition min-w-0"
                >
                  <FiCamera size={15} className="shrink-0" />
                  <span className="truncate">Capture</span>
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

          {/* Form Section (5/12 Desktop) */}
          <div className="lg:col-span-5 min-w-0 bg-white border border-zinc-200 rounded-2xl shadow-sm p-4 sm:p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* ISBN13 */}
                <Field label="ISBN13">
                  <Isbn
                    value={formData.isbn13}
                    onChange={(val: string, selectedBook?: IsbnSearchResult) =>
                      handleBookSelect(val, "isbn13", selectedBook)
                    }
                    className={inputClass}
                  />
                </Field>

                {/* ISBN11 */}
                <Field label="ISBN11">
                  <Isbn
                    value={formData.isbn11}
                    onChange={(val: string, selectedBook?: IsbnSearchResult) =>
                      handleBookSelect(val, "isbn11", selectedBook)
                    }
                    className={inputClass}
                  />
                </Field>

                {/* ISSN */}
                <Field label="ISSN">
                  <Isbn
                    value={formData.issn}
                    onChange={(val: string, selectedBook?: IsbnSearchResult) =>
                      handleBookSelect(val, "issn", selectedBook)
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Book title"
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

              {/* Authors Field */}
              <Field label="Authors" span="col-span-1">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={authorInput}
                      onChange={(e) => setAuthorInput(e.target.value)}
                      onKeyDown={handleAuthorKeyDown}
                      placeholder="Type author name and press Enter"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={handleAddAuthor}
                      className="px-4 sm:px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium transition cursor-pointer shrink-0"
                    >
                      Add
                    </button>
                  </div>

                  {formData.authors.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {formData.authors.map((author, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-200"
                        >
                          {author}
                          <button
                            type="button"
                            onClick={() => handleRemoveAuthor(index)}
                            className="text-indigo-400 hover:text-indigo-900 cursor-pointer rounded-full p-0.5"
                          >
                            <FiX size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
            </div>
          </div>

            {/* Classification */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-700 uppercase tracking-wider mb-3">
                Classification
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <Field label="Dewey Decimal No">
                  <DeweyDecimalSelect
                    value={formData.deweyDecimalId}
                    onChange={(deweyNumber: string, selectedItem: DeweyItem | null) =>
                      setFormData((prev) => ({
                        ...prev,
                        deweyDecimalId: deweyNumber,
                        category: selectedItem ? selectedItem.class_name : prev.category,
                        description: selectedItem?.description ? selectedItem.description : prev.description,
                      }))
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Category">
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Auto-filled category"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Bottom Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-100">
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold cursor-pointer transition"
              >
                {isSubmitting
                  ? "Saving..."
                  : editingBookId
                  ? "Update"
                  : "Save"}
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

          {/* Registered Books List (4/12 Desktop) */}
          <div className="lg:col-span-4 min-w-0">
            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col max-h-[70vh] lg:max-h-[85vh]">
              <div className="flex items-center gap-2 mb-4">
                <FiBook className="text-indigo-600 shrink-0" size={20} />
                <h2 className="text-sm sm:text-base font-semibold text-zinc-700 uppercase tracking-wider truncate">
                  Registered Books
                </h2>
                <span className="ml-auto text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full shrink-0">
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
                  placeholder="Search by title, author, ISBN13, ISBN11, ISSN, code..."
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
                      editingBookId === String(book.id)
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
                        <div className="flex items-center gap-1.5 min-w-0">
                          <p className="text-sm text-zinc-800 shrink-0">
                            Title:
                          </p>
                          <p className="text-sm font-semibold text-zinc-800 truncate">
                            {book.title || "Untitled"}
                          </p>
                        </div>
                        <p className="text-xs text-zinc-500 truncate">
                          Authors: {book.authors?.join(", ") || "Unknown author"}
                        </p>
                        <p className="text-xs font-mono text-indigo-500 mt-1 truncate">
                          ISBN13: {book.isbn13 || "N/A"}
                        </p>
                        <p className="text-xs font-mono text-indigo-500 mt-1 truncate">
                          ISBN11: {book.isbn11 || "N/A"}
                        </p>
                        <p className="text-xs font-mono text-indigo-500 mt-1 truncate">
                          ISSN: {book.issn || "N/A"}
                        </p>
                        <p className="text-[11px] text-zinc-600 mt-0.5 truncate">
                          Registered: {formatDate(book.registeredAt)}
                        </p>
                        <p className="text-[11px] text-zinc-600 mt-0.5 truncate">
                          Condition: {book.condition || "N/A"} | Copies: {book.numberOfCopies}
                        </p>
                      </div>
                    </button>

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

      {/* Camera Modal */}
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
                <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3]">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={capturePhoto}
                  disabled={!!cameraError}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-sm font-semibold cursor-pointer transition"
                >
                  Take Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-semibold cursor-pointer transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Book Details Modal */}
      {viewingBook && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h3 className="text-zinc-800 font-bold text-lg">Book Details</h3>
              <button
                onClick={() => setViewingBook(null)}
                className="text-zinc-400 hover:text-zinc-700 cursor-pointer p-1 rounded-lg transition"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {viewingBook.coverUrl ? (
                  <img
                    src={viewingBook.coverUrl}
                    alt={viewingBook.title}
                    className="w-32 h-44 object-cover rounded-xl border border-zinc-200 shadow-xs shrink-0 mx-auto sm:mx-0"
                  />
                ) : (
                  <div className="w-32 h-44 flex flex-col items-center justify-center bg-zinc-100 rounded-xl border border-zinc-200 shrink-0 text-zinc-400 mx-auto sm:mx-0">
                    <FiImage size={32} />
                    <span className="text-xs mt-1">No Cover</span>
                  </div>
                )}

                <div className="space-y-2 flex-1 min-w-0">
                  <h4 className="text-xl font-bold text-zinc-800 leading-snug">
                    {viewingBook.title}
                  </h4>
                  <p className="text-sm font-medium text-indigo-600">
                    {viewingBook.authors?.join(", ") || "Unknown Author"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Published {viewingBook.yearPublished || "N/A"}
                    {viewingBook.placeOfPublication ? ` in ${viewingBook.placeOfPublication}` : ""}
                  </p>f

                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100">
                      {viewingBook.code}
                    </span>
                    <button
                      onClick={() => copyCode(viewingBook.code)}
                      className="p-1.5 text-zinc-400 hover:text-indigo-600 cursor-pointer rounded-md hover:bg-zinc-100"
                      title="Copy Call Number"
                    >
                      <FiCopy size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Barcode Output */}
              <div className="flex flex-col items-center justify-center p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                <canvas ref={barcodeRef} className="max-w-full" />
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">ISBN13</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.isbn13 || "N/A"}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">ISBN11</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.isbn11 || "N/A"}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">ISSN</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.issn || "N/A"}</span>f
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">Dewey Decimal</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.deweyDecimalId || "N/A"}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">Cutter</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.cutter || "N/A"}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">Format</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.format || "N/A"}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">Location</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.location || "N/A"}</span>
                </div>
                <div className="p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                  <span className="text-zinc-400 block mb-0.5">Copies</span>
                  <span className="font-semibold text-zinc-700">{viewingBook.numberOfCopies}</span>
                </div>
              </div>

              {/* Details Text */}
              {viewingBook.summary && (
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Summary</h5>
                  <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                    {viewingBook.summary}
                  </p>
                </div>
              )}

              {viewingBook.description && (
                <div className="space-y-1">
                  <h5 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Description</h5>
                  <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                    {viewingBook.description}
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setViewingBook(null)}
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-900 text-white rounded-lg text-sm font-semibold cursor-pointer transition"
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