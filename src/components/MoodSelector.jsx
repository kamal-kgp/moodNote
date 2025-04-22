"use client"; 
import React, { useState } from 'react';

const MOODS = [
  { name: 'Happy', emoji: '😊', color: 'bg-yellow-300', textColor: 'text-yellow-800' },
  { name: 'Okay', emoji: '😐', color: 'bg-blue-300', textColor: 'text-blue-800' },
  { name: 'Sad', emoji: '😢', color: 'bg-indigo-300', textColor: 'text-indigo-800' },
  { name: 'Angry', emoji: '😠', color: 'bg-red-400', textColor: 'text-red-800' },
  { name: 'Excited', emoji: '🥳', color: 'bg-pink-300', textColor: 'text-pink-800' },
];

export default function MoodSelector({ onMoodSelect, initialMood = null }) {
  const [selectedMoodName, setSelectedMoodName] = useState(initialMood);

  const handleSelect = (mood) => {
    setSelectedMoodName(mood.name);
    onMoodSelect(mood);
  };

  return (
    <div className="my-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        How are you feeling today?
      </label>
      <div className="flex justify-around items-center space-x-2 p-3 bg-white rounded-lg shadow-sm">
        {MOODS.map((mood) => (
          <button
            key={mood.name}
            type="button"
            className={`
              p-3 rounded-full text-3xl transition-transform duration-200 ease-in-out
              hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${selectedMoodName === mood.name
                ? `${mood.color} ring-2 ring-offset-2 ${mood.color.replace('bg-', 'ring-')}`
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
            onClick={() => handleSelect(mood)}
            aria-label={`Select mood: ${mood.name}`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}