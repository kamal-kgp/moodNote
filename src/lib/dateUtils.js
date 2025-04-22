export const getCurrentDateString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - (offset*60*1000));
    return localDate.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateString, options) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  try {
    const date = new Date(`${dateString}T00:00:00Z`);
    return date.toLocaleDateString('en-US', options || defaultOptions);
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString; 
  }
};
