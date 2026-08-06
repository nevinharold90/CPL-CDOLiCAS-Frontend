import React, { useState } from "react";

// TypeScript interface for the book form data
interface BookFormData {
    title: string;
    isbn: string;
    author: string;
    category: string;
}

export default function RegisterBook() {
    const [formData, setFormData] = useState<BookFormData>({
        title: "",
        isbn: "",
        author: "",
        category: "",
    });

  // Universal handler for text inputs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleRegisterBook = () => {
        console.log("Registering book with data");
    }

    // // Form submission handler (Console logs only)
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log("Submit button clicked! Form payload:", formData);
    // };

    return (
        <div className="flex p-6 md:p-8 bg-linear-to-b from-zinc-50 to-white font-[Poppins]">
        
            <div className="flex w-full items-center">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-800">
                    Register Book
                </h1>
                <button 
                    onClick={() => handleRegisterBook()}
                    className=" p-2 ml-auto cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition-all"
                >
                    Register Books
                </button>
            </div>


        </div>
    );
}