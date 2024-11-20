import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page
  const navigate = useNavigate(); // Use navigate for routing

  const LocalData = JSON.parse(localStorage.getItem("LoginData")) || {};
  const userRole = LocalData.role || "User";
  console.log(userRole);

  // Function to fetch data from API
  const fetchLogin = async (api) => {
    setLoading(true);
    try {
      const response = await fetch(api);
      const data = await response.json();
      setApiData(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // Delete item from API and local state
  const handleDelete = async (id) => {
    try {
      await fetch(`https://671739bbb910c6a6e027076a.mockapi.io/insert/${id}`, {
        method: "DELETE",
      });
      setApiData(apiData.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Navigate to the Insert component with selected card data
  const handleUpdate = (item) => {
    navigate("/insert", { state: { item } });
  };

  const handleDetail = (item) => {
    navigate("/detail", { state: { item } }); // Navigate to Detail page with the item state
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchLogin("https://671739bbb910c6a6e027076a.mockapi.io/insert");
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(apiData.slice(startIndex, endIndex));
  }, [apiData, currentPage]);

  return (
    <div className="home-container">
      <div className="card-grid">
        {apiData.length > 0 ? (
          currentItems.map((item) => (
            <div key={item.id} className="card">
              {item.image && (
                <img src={item.image} alt={item.title} className="card-image" />
              )}
              <p>
                <strong>Title : </strong>
                {item.title}
              </p>
              <p>
                <strong>Description : </strong>
                {item.description}
              </p>
              <p>
                <strong>Category : </strong>
                {item.category}
              </p>
              <p>
                <strong>Created By:</strong> {item.createdBy}
              </p>
              <button className="btn3" onClick={() => handleDetail(item)}>
                Details
              </button>

              {userRole === "Admin" && (
                <>
                  <button className="btn2" onClick={() => handleUpdate(item)}>
                    Update
                  </button>
                  <button className="btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="loader">
            <h2>{loading ? "Loading..." : ""}</h2>
          </div>
        )}
      </div>
      {apiData.length > 0 && (
        <Pagination
          totalItems={apiData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
