const STORAGE_KEY = 'moodNoteEntries';

const getCurrentDateString = () => {
    return new Date().toISOString().split('T')[0];
};

export const getAllEntries = () => {
  if (typeof window === 'undefined') return [];
  try {
    const entriesJson = localStorage.getItem(STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (error) {
    console.error("Error reading entries from localStorage:", error);
    return [];
  }
};

export const saveEntry = (newEntry) => {
  if (typeof window === 'undefined') return;
  try {
    const entries = getAllEntries();
    const filteredEntries = entries.filter(entry => entry.date !== newEntry.date);
    const updatedEntries = [...filteredEntries, newEntry];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error("Error saving entry to localStorage:", error);
    throw new Error("Could not save entry.");
  }
};

export const getTodaysEntry = () => {
    if (typeof window === 'undefined') return null;
    try {
        const entries = getAllEntries();
        const today = getCurrentDateString();
        return entries.find(entry => entry.date === today) || null;
    } catch (error) {
        console.error("Error checking for today's entry:", error);
        return null;
    }
};

export const deleteEntry = (entryId) => {
  if (typeof window === 'undefined') return;
  try {
    const entries = getAllEntries();
    const updatedEntries = entries.filter(entry => entry.id !== entryId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
  } catch (error) {
    console.error("Error deleting entry from localStorage:", error);
    throw new Error("Could not delete entry.");
  }
};
