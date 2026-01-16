import React, { useEffect, useState } from "react";

const LIMIT = 20;

const AboveFold = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (loading) return;

    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${LIMIT}`
    );
    const data = await res.json();

    setImages(prev => [...prev, ...data]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        fetchImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  return (
    <div>
      {images.map(img => (
        <img
          key={img.id}
          src={img.thumbnailUrl}
          alt={img.title}
        />
      ))}

      {loading && (
        <p className="loadmore">Loading more items...</p>
      )}
    </div>
  );
};

export default AboveFold;
