import React from 'react';

const formatDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateString;
  }
};


export default function EntryCard({ entry }) {
  const moodColor = entry.mood?.color || 'bg-gray-200';
  const moodEmoji = entry.mood?.emoji || '❓';
  const moodName = entry.mood?.name || 'Unknown';

  return (
    <div className={`p-4 rounded-lg shadow-md transition hover:shadow-lg ${moodColor} h-full flex flex-col justify-between`}>
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-3xl mr-2" aria-label={`Mood: ${moodName}`}>{moodEmoji}</span>
            <span className="text-sm font-medium">{formatDate(entry.date)}</span>
          </div>
          {entry.weather && entry.weather.temperature !== null && (
            <div className="flex items-center space-x-1 text-sm opacity-90">
              <img src={entry.weather.icon} alt=""/>
              <span>{Math.round(entry.weather.temperature)}°C</span>
            </div>
          )}
        </div>
        <p className="text-base leading-relaxed mt-1 break-words">
          {entry.note || <span className="italic opacity-70">No note added.</span>}
        </p>
      </div>
    </div>
  );
}