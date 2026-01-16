import React, { useEffect, useState } from "react";
import "./../styles/App.css";

const LIMIT = 20;

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${LIMIT}`
      );
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...data]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchItems();
  }, []);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        fetchItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      {/* Do not remove the main div */}
      <h2>Infinite Scroll List</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: "20px" }}>
            <img src={item.thumbnailUrl} alt={item.title} />
            <p>{item.title}</p>
          </li>
        ))}
      </ul>

      {loading && <p className="loadmore">Loading more items...</p>}
      {!hasMore && <p>No more items to load.</p>}
    </div>
  );
};

export default App;
