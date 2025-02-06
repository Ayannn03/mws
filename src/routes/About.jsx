import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./About.css";

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", tag: "" });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:4000/.netlify/functions/api/authors");
      if (!response.ok) {
        throw new Error("Failed to fetch authors");
      }
      const data = await response.json();
      setAuthors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (author) => {
    setEditingAuthor(author._id);
    setFormData({ name: author.name, description: author.description, tag: author.tag });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingAuthor) return;

    try {
      const response = await fetch(`http://localhost:4000/.netlify/functions/api/authors/${editingAuthor}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update author");
      }

      setEditingAuthor(null);
      fetchAuthors(); // Refresh the author list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNew = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/.netlify/functions/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add author");
      }

      setFormData({ name: "", description: "", tag: "" }); // Clear form
      setIsModalOpen(false); // Close modal
      fetchAuthors(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
      <h1>Authors</h1>

      {/* Add Author Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded mt-3"
      >
        Add Author
      </button>

      {/* Add Author Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Author</h2>
            <form onSubmit={handleAddNew}>
              <label className="block">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />

              <label className="block mt-2">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />

              <label className="block mt-2">Tag:</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />

              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Authors List */}
      <ul className="content mt-4">
        {authors.map((author) => (
          <li key={author._id} className="border-b pb-2 mb-2">
            <p> Name:
              <strong>{author.name}</strong>
            </p>
            <p>Description{author.description}</p>
            <p>Tag:{author.tag}</p>
            <button onClick={() => handleEditClick(author)} className="bg-blue-500 text-white px-2 py-1 rounded ml-2">
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Edit Author Section */}
      {editingAuthor && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2>Edit Author</h2>
          <form onSubmit={handleUpdate}>
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />

            <label className="block mt-2">Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />

            <label className="block mt-2">Tag:</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />

            <div className="flex justify-end mt-7 ">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ">
                Update Author
              </button>
              <button
                type="button"
                onClick={() => setEditingAuthor(null)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AuthorsList;
