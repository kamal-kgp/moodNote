"use client"; 
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EntryCard from '@/components/EntryCard';
import CalendarView from '@/components/CalenderView'; 
import { getAllEntries } from '@/lib/storage';
import { useThemeContext } from '@/components/ThemeProvider';

const MOODS = [
  { name: 'Happy', emoji: '😊', color: 'bg-yellow-300', textColor: 'text-yellow-800' },
  { name: 'Okay', emoji: '😐', color: 'bg-blue-300', textColor: 'text-blue-800' },
  { name: 'Sad', emoji: '😢', color: 'bg-indigo-300', textColor: 'text-indigo-800' },
  { name: 'Angry', emoji: '😠', color: 'bg-red-400', textColor: 'text-red-800' },
  { name: 'Excited', emoji: '🥳', color: 'bg-pink-300', textColor: 'text-pink-800' },
  { name: 'All', emoji: '📜', color: 'bg-gray-300', textColor: 'text-gray-800' }, 
];

export default function JournalPage() {
  const [mounted, setMounted] = React.useState(false);
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [moodFilter, setMoodFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');
  const {theme} = useThemeContext();

  useEffect(() => {
    const loadedEntries = getAllEntries();
    loadedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    setEntries(loadedEntries);
    setFilteredEntries(loadedEntries); 
  }, []);

  useEffect(() => {
    if (moodFilter === 'All') {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(
        entries.filter(entry => entry.mood.name === moodFilter)
      );
    }
  }, [moodFilter, entries]);

  const handleSelectFilter = (moodName) => {
    setMoodFilter(moodName);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>; 
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-600">Mood Notes</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800 transition">
          &larr; Back to Today
        </Link>
      </div>

      <div className="mb-6 p-4 bg-white/70 rounded-lg shadow-sm flex flex-wrap justify-center gap-2">
        <span className="text-sm font-medium text-gray-600 self-center mr-2">Filter by mood:</span>
        {MOODS.map((mood) => (
          <button
            key={mood.name}
            onClick={() => handleSelectFilter(mood.name)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition
              flex items-center gap-1
              ${moodFilter === mood.name
                ? `${mood.color} ${mood.textColor} ring-2 ring-offset-1 ${mood.color.replace('bg-', 'ring-')}`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span className="text-lg">{mood.emoji}</span>
            {mood.name}
          </button>
        ))}
      </div>

       <div className={`text-center mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
         <button onClick={() => setViewMode('list')} className={`mr-2 p-2 ${viewMode === 'list' ? 'font-bold' : ''}`}>List</button>
         <button onClick={() => setViewMode('calendar')} className={`p-2 ${viewMode === 'calendar' ? 'font-bold' : ''}`}>Calendar</button>
       </div>

      {viewMode === 'list' && (
        <>
          {filteredEntries.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              {entries.length === 0 ? "No mood entries yet." : `No entries found for mood: ${moodFilter}.`}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEntries.map((entry) => (
                 <div key={entry.id} className="relative group">
                   <EntryCard entry={entry} />
                 </div>
              ))}
            </div>
          )}
        </>
      )}

      {viewMode === 'calendar' && (
        <CalendarView entries={entries}/>
      )}
    </div>
  );
}