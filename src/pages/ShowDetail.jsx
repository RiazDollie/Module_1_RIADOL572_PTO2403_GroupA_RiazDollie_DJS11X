import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchShowById } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import SeasonList from '../components/SeasonList';
import ShowDetailsNav from '../navigation/ShowDetailsNav';

const ShowDetail = () => {
  const { id } = useParams(); // Get the show ID from the URL
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const data = await fetchShowById(id);
        console.log('Fetched show data:', data); // Debug: Log the fetched data
        setShow(data);
      } catch (error) {
        console.error('Error fetching show details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!show) {
    return <div>Show not found.</div>;
  }

  console.log('Show data to render:', show); // Debug: Log the show data before rendering

  return (
    <div className="show-detail">
      <ShowDetailsNav showTitle={show.title} />
      <div className="show-info">
        <img src={show.image} alt={show.title} className="show-image" />
        <h1>{show.title}</h1>
        <p>{show.description}</p>
        <p>
          <strong>Seasons:</strong> {show.seasons.length}
        </p>
        <p>
          <strong>Last Updated:</strong> {new Date(show.updated).toLocaleDateString()}
        </p>
        <p>
          <strong>Genres:</strong> {show.genres.join(', ')}
        </p>
      </div>
      {/* Pass showId and seasons to SeasonList */}
      {show.seasons && <SeasonList seasons={show.seasons} showId={id} />}
    </div>
  );
};

export default ShowDetail;