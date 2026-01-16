import React, { useEffect, useState } from "react";

const LIMIT = 10;

const AboveFold = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadImages = async () => {
      if (typeof fetch !== "function") return;

      try {
        setLoading(true);

        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${LIMIT}`
        );
        const data = await res.json();

        if (!ignore) {
          setImages(prev => [...prev, ...data]);
          setPage(prev => prev + 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadImages();

    return () => {
      ignore = true;
    };
  }, []);

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
