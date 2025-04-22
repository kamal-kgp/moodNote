const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';

export const fetchWeather = async (lat, lon) => {
  if (!WEATHER_API_KEY) {
    console.error("WeatherAPI key is missing");
    throw new Error("API key missing. Cannot fetch weather.");
  }

  const queryParam = `${lat},${lon}`;
  const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(queryParam)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.error) {
        const errorMessage = data.error ? data.error.message : `HTTP Error (${response.status}): ${response.statusText}`;
        console.error("WeatherAPI Error:", errorMessage);
        throw new Error(errorMessage);
    }

    const formattedData = {
      temperature: data.current?.temp_c ?? null,          
      description: data.current?.condition?.text ?? null, 
      conditionCode: data.current?.condition?.code ?? null, 
      isDay: data.current?.is_day ?? null,               
      locationName: data.location?.name ?? null,          
      icon: data.current?.condition?.icon ?? null,        
      dayCondition: data.current?.condition?.text ?? null, 
    };

    return formattedData;

  } catch (error) {
    console.error("Error fetching or processing weather data from WeatherAPI:", error);
    throw new Error(`Failed to fetch weather: ${error.message}`);
  }
};