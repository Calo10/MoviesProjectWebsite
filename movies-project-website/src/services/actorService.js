const getActors = async () => {
  try {
    // This will be replaced with actual API call
    const response = await fetch('/api/actors');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching actors:', error);
    throw error;
  }
};

export { getActors }; 