import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Insert.css";
import { ToastContainer,toast } from "react-toastify";

export const Insert = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itemToEdit = location.state?.item; // Get the item data if it's passed

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "travel",
    image: "",
    createdBy: "",
  });

  useEffect(() => {
    // Pre-fill the form if editing
    if (itemToEdit) {
      setFormData(itemToEdit);
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const data = e.target.result;
      setFormData({ ...formData, image: data });
    };
  };

  // Submit handler
  const submitInsertData = (e) => {
    e.preventDefault();

    // If an item is being edited, we use PUT, otherwise, we use POST
    const apiUrl = itemToEdit
    ? `https://671739bbb910c6a6e027076a.mockapi.io/insert/${itemToEdit.id}`
    : "https://671739bbb910c6a6e027076a.mockapi.io/insert";
  

    const method = itemToEdit ? "PUT" : "POST";

    fetch(apiUrl, {
      method: method,
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        toast.success(
          itemToEdit ? "Post Updated Successfully." : "Post Added Successfully."
        )
        navigate("/home", { state: { refresh: true } });

      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
    <form className="insert-container-main" onSubmit={submitInsertData}>
      <h1>{itemToEdit ? "Update Post Details" : "Enter Post Details"}</h1>

      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select id="category" value={formData.category} onChange={handleChange}>
          <option value="travel">Travel</option>
          <option value="fashion">Fashion</option>
          <option value="food">Food</option>
          <option value="style">Style</option>
          <option value="coding">Coding</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" onChange={handleFileChange} />
        {formData.image && (
          <div className="image-preview">
            <img src={formData.image} alt="Preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="createdBy">Created By:</label>
        <input
          type="text"
          id="createdBy"
          value={formData.createdBy}
          onChange={handleChange}
        />
      </div>

      <button className="submit-btn" type="submit">
        {itemToEdit ? "Update" : "Submit"}
      </button>
    </form>
    </>
  );
};