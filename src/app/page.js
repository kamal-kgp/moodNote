"use client";

import React, { useState, useEffect } from "react";
import MoodSelector from "@/components/MoodSelector";
import NoteInput from "@/components/NoteInput";
import WeatherDisplay from "@/components/WeatherDisplay";
import { saveEntry, getTodaysEntry } from "@/lib/storage";
import { fetchWeather } from "@/lib/api";
import { getCurrentDateString } from "@/lib/dateUtils";
import Link from "next/link";
import { useThemeContext } from "@/components/ThemeProvider";

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");
  const {theme} = useThemeContext();

  const todayDate = getCurrentDateString();

  useEffect(() => {
    const todaysEntry = getTodaysEntry();
    if (todaysEntry) {
      setSelectedMood(todaysEntry.mood);
      setNote(todaysEntry.note);
      setWeatherData(todaysEntry.weather);
      setIsLoadingWeather(false);
      setLocationError(null);
      setWeatherError(null);
      console.log("Loaded today's existing entry.");
      return;
    }

    setLocationError(null);
    setWeatherError(null);
    setIsLoadingWeather(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weather = await fetchWeather(latitude, longitude);
            setWeatherData(weather);
            setWeatherError(null);
          } catch (error) {
            console.error("Failed to fetch weather:", error);
            setWeatherError("Could not fetch weather data.");
            setWeatherData(null);
          } finally {
            setIsLoadingWeather(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationError(
            `Geolocation failed: ${error.message}. Weather data unavailable.`
          );
          setIsLoadingWeather(false);
          setWeatherData(null);
        },
        { timeout: 10000 }
      );
    } else {
      setLocationError(
        "Geolocation is not supported by this browser. Weather data unavailable."
      );
      setIsLoadingWeather(false);
      setWeatherData(null);
    }
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setSaveStatus("");
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
    setSaveStatus("");
  };

  const handleSave = () => {
    if (!selectedMood) {
      setSaveStatus("Please select a mood first.");
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      date: todayDate,
      mood: selectedMood,
      note: note,
      weather: weatherData,
    };

    try {
      saveEntry(newEntry);
      setSaveStatus("Entry saved successfully!");
    } catch (error) {
      console.error("Failed to save entry:", error);
      setSaveStatus("Failed to save entry.");
    }
  };

  return (
    <div className={`max-w-lg mx-auto backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg ${theme === "dark" ? "bg-white/70" : "bg-white"}`}>
      <div className="flex justify-end mb-5">
        <button />
        <Link
          href="/journal"
          className={`px-3 py-2 rounded-xl bg-gradient-to-r  ${theme === "dark" ? "from-purple-500 to-indigo-500" : "from-purple-100 to-indigo-300"} shadow-md text-gray-800 hover:text-gray-800 transition duration-200 ease-in-out`}
        >
          Calendar View
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mood Note</h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <WeatherDisplay
          weather={weatherData}
          isLoading={isLoadingWeather}
          error={locationError || weatherError}
        />
      </div>
      <MoodSelector
        onMoodSelect={handleMoodSelect}
        initialMood={selectedMood?.name}
      />
      <NoteInput value={note} onChange={handleNoteChange} />
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          disabled={!selectedMood || !!getTodaysEntry()}
          className={`
            px-8 py-3 rounded-lg text-black font-semibold transition duration-200 ease-in-out
            ${
              selectedMood
                ? selectedMood.color.replace("text-", "hover:bg-opacity-80 ") +
                  selectedMood.color
                : "bg-gray-400"
            }
            ${
              !selectedMood || !!getTodaysEntry()
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-md"
            }
            focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selectedMood
                ? selectedMood.color.replace("bg-", "ring-")
                : "ring-gray-400"
            }
          `}
        >
          Save Entry
        </button>
        {saveStatus && (
          <p
            className={`mt-3 text-sm ${
              saveStatus.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {saveStatus}
          </p>
        )}
        {!!getTodaysEntry() && !saveStatus && (
          <p className="mt-3 text-sm text-blue-600">
            You&apos;ve already logged your mood for today.
          </p>
        )}
      </div>
    </div>
  );
}
