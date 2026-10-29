const createEventHandler = async (eventData) => {
  try {
    await axios.post("/api/events", eventData);

    refreshEvents();
  } catch (error) {
    console.error(error);
  }
};
