export const fetchShows = async () => {
     const response = await fetch('https://podcast-api.netlify.app');
    const data = await response.json();
    return data;
  };
  
  export const fetchShowById = async (id) => {
    const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
    const data = await response.json();
    return data;
  };
  
  export const fetchGenreById = async (id) => {
    const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
    const data = await response.json();
    return data;
  };