import React from 'react';
import "./App.css";

function App() {

  const [city, setCity] = React.useState("");
  const [temperature, setTemperature] = React.useState("-");
  const [weather, setWeather] = React.useState("");
  const [weatherIcon, setWeatherIcon] = React.useState("");
  const [weatherMessage, setWeatherMessage] = React.useState("");
  const weatherData = {
    sunny: {
      name: "Ensoleillé",
      icon: <IconSun fill="#466A9A"/>,
      message: "Prennez vos lunettes de soleil"
    },
    cloudy: {
      name: "Nuageux",
      icon: <IconCloud fill="#466A9A"/>,
      message: "Prennez un manteau"
    },
    windy: {
      name: "Vents",
      icon: <IconWindyLine fill="#466A9A"/>,
      message: "Prennez une écharpe"
    },
    rainy: {
      name: "Pluvieux",
      icon: <IconCloudRain fill="#466A9A"/>,
      message: "Prennez votre parapluie"
    },
    stormy: {
      name: "Orageux",
      icon: <IconThunderstormsLine fill="#466A9A"/>,
      message: "Évitez de sortir, restez à l'abri !"
    }
  }

  const handleChange = (props) => {
    setCity(props.target.value);
  }

  React.useEffect(() => {
    if(city.length > 0){
      setWeatherIcon(<IconLoading fill="#466A9A" />)
      fetch("https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/weather/"+city)
        .then((response) => response.json())
        .then((json) => {
          setTemperature(json.temperature);
          setWeather(weatherData[json.condition].name);
          setWeatherIcon(weatherData[json.condition].icon);
          setWeatherMessage(weatherData[json.condition].message);
        })
        .catch((error) => {
          setWeatherMessage("Erreur lors de la récupération de la météo !")
          setWeatherIcon(<IconWifi_error color="red"/>)
          setTemperature("-")
          setWeather("")
        });
    }
  }, [city]);
  
  React.useEffect(() => {
    setWeatherIcon(<IconLoading fill="#466A9A" />)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var latitude = position.coords.latitude,
          longitude = position.coords.longitude;
          fetch("https://jb03dcnv74.execute-api.eu-west-1.amazonaws.com/Prod/geo?lon="+longitude+"&lat="+latitude)
            .then((response) => response.json())
            .then((json) => {
              setCity(json.city);
            })
            .catch((error) => console.error(error));
        },
          (err) => console.log(err)
      );
    }
  }, []);

  function IconCloud(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="6em"
        width="6em"
        {...props}
      >
        <path d="M811.4 418.7C765.6 297.9 648.9 212 512.2 212S258.8 297.8 213 418.6C127.3 441.1 64 519.1 64 612c0 110.5 89.5 200 199.9 200h496.2C870.5 812 960 722.5 960 612c0-92.7-63.1-170.7-148.6-193.3zm36.3 281a123.07 123.07 0 01-87.6 36.3H263.9c-33.1 0-64.2-12.9-87.6-36.3A123.3 123.3 0 01140 612c0-28 9.1-54.3 26.2-76.3a125.7 125.7 0 0166.1-43.7l37.9-9.9 13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0152.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9 15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5 37.8 10c54.3 14.5 92.1 63.8 92.1 120 0 33.1-12.9 64.3-36.3 87.7z" />
      </svg>
    );
  }

  function IconCloudRain(props) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="6em"
        width="6em"
        {...props}
      >
        <path d="M4.158 12.025a.5.5 0 01.316.633l-.5 1.5a.5.5 0 01-.948-.316l.5-1.5a.5.5 0 01.632-.317zm3 0a.5.5 0 01.316.633l-1 3a.5.5 0 01-.948-.316l1-3a.5.5 0 01.632-.317zm3 0a.5.5 0 01.316.633l-.5 1.5a.5.5 0 01-.948-.316l.5-1.5a.5.5 0 01.632-.317zm3 0a.5.5 0 01.316.633l-1 3a.5.5 0 11-.948-.316l1-3a.5.5 0 01.632-.317zm.247-6.998a5.001 5.001 0 00-9.499-1.004A3.5 3.5 0 103.5 11H13a3 3 0 00.405-5.973zM8.5 2a4 4 0 013.976 3.555.5.5 0 00.5.445H13a2 2 0 010 4H3.5a2.5 2.5 0 11.605-4.926.5.5 0 00.596-.329A4.002 4.002 0 018.5 2z" />
      </svg>
    );
  }

  function IconSun(props) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="6em"
        width="6em"
        {...props}
      >
        <path d="M8 11a3 3 0 110-6 3 3 0 010 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z" />
      </svg>
    );
  }
  function IconWindyLine(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="6em"
        width="6em"
        {...props}
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M10.5 17H4v-2h6.5a3.5 3.5 0 11-3.278 4.73l1.873-.703A1.5 1.5 0 1010.5 17zM5 11h13.5a3.5 3.5 0 11-3.278 4.73l1.873-.703A1.5 1.5 0 1018.5 13H5a3 3 0 010-6h8.5a1.5 1.5 0 10-1.405-2.027l-1.873-.702A3.501 3.501 0 0117 5.5 3.5 3.5 0 0113.5 9H5a1 1 0 100 2z" />
      </svg>
    );
  }

  function IconThunderstormsLine(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="6em"
        width="6em"
        {...props}
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M17 18v-2h.5a3.5 3.5 0 10-2.5-5.95V10a6 6 0 10-8 5.659v2.089a8 8 0 119.458-10.65A5.5 5.5 0 1117.5 18l-.5.001zm-4-1.995h3l-5 6.5v-4.5H8l5-6.505v4.505z" />
      </svg>
    );
  }

  function IconWifi_error(props) {
    return (
      <svg
        viewBox="0 0 21 21"
        fill="currentColor"
        height="6em"
        width="6em"
        {...props}
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(3 4)"
        >
          <path d="M2.727 7.033A7.539 7.539 0 015.492 5.61m4.05-.005a7.54 7.54 0 012.785 1.43M7.5 8.5l.027-8M.286 4.667A10.974 10.974 0 015.511 2.18m4.087.02a10.972 10.972 0 015.116 2.467m-9.58 4.74c.161-.112.328-.211.5-.298m3.706-.016c.183.09.361.195.533.314" />
          <path
            fill="currentColor"
            d="M8.5 11.5 A1 1 0 0 1 7.5 12.5 A1 1 0 0 1 6.5 11.5 A1 1 0 0 1 8.5 11.5 z"
          />
        </g>
      </svg>
    );
  }

  function IconSearch(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1.5em"
        width="1.5em"
        {...props}
      >
        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
      </svg>
    );
  }
  function IconLoading(props) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="currentColor"
        height="6em"
        width="6em"
        preserveAspectRatio="xMidYMid"
        {...props}
      >
        <circle cx="50" cy="50" fill="none" stroke="#1d3f72" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle>
      </svg>
    );
  }

  return (
    <>
      <div className='card' style={{width: "25rem", backgroundColor: "#EAF4FB", color: "#466A9A"}}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1"><IconSearch fill="#466A9A"/></span>
          <input type="text" className="form-control shadow-none" onChange={handleChange} placeholder='Rechercher'/>
        </div>
        <span><strong>{city.toUpperCase()}</strong> · FRANCE</span>
        <hr></hr>
        <div className='row'>
          <div className='col-6'>
            <div style={{fontSize: "xxx-large"}}><strong>{temperature}°C</strong></div>
            <div style={{fontSize: "larger"}}>{weather}</div>
          </div>
          <div className='col-6'>
            {weatherIcon}
          </div>
        </div>
        <hr></hr>
        <span>{weatherMessage}</span>
      </div>
    </>
  )
}

export default App
