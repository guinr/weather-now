import './App.css';

import Header from './components/header/Header';
import WeatherCard from './components/weather-card/WeatherCard';

function App() {

  const cities = [
    { name: "Nuuk", country: "GL" },
    { name: "Urubici", country: "BR", moreInfo: true },
    { name: "Nairobi", country: "KE" }
  ];

  return (
    <div className="App">
      <Header />
      <main>
        {cities.map((city, index) => {
          return <WeatherCard key={index} city={city} />
        })}
      </main>
    </div>
  );
}

export default App;
