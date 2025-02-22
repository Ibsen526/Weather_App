import styles from './WeatherDetails.module.css'
import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy, WiCloud, WiCloudy, WiShowers, WiRain, WiSnow, WiFog, WiSunrise, WiSunset,WiMoonrise, WiMoonset, WiStrongWind, WiWindDeg, WiHumidity } from "react-icons/wi";


const formatDate = (UnixDate) => {
  let dateStr = new Date(UnixDate * 1000).toLocaleString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit"
    });
  return dateStr;
}

const getIcon = (IconStr, IconSize) => {
  switch (IconStr.slice(0, 2)) {
    case '01':
      return <WiDaySunny size={IconSize}></WiDaySunny>;
    case '02':
      return <WiDaySunnyOvercast size={IconSize}></WiDaySunnyOvercast>;
    case '03':
      return <WiDayCloudy size={IconSize}></WiDayCloudy>;
    case '04':
      return <WiCloud size={IconSize}></WiCloud>;
    case '09':
      return <WiCloudy size={IconSize}></WiCloudy>;
    case '10':
      return <WiShowers size={IconSize}></WiShowers>;
    case '11':
      return <WiRain size={IconSize}></WiRain>;
    case '13':
      return <WiSnow size={IconSize}></WiSnow>;
    case '50':
      return <WiFog size={IconSize}></WiFog>;
    default:
      console.log("switch case error");
  }
  return;
}

export default function WeatherDetails(props) {
  let desc = props.fetchData.daily[props.info].weather[0].description;
  const descSplitted = desc.split(" ");
  desc = "";
  for (let i = 0; i < descSplitted.length; i++) {
    desc += descSplitted[i][0].toUpperCase() + descSplitted[i].substr(1) + " ";
  }

  //console.log(props.fetchData.daily[props.info]);

  let sunrise = formatDate(props.fetchData.daily[props.info].sunrise);
  let sunset = formatDate(props.fetchData.daily[props.info].sunset);
  let moonrise = formatDate(props.fetchData.daily[props.info].moonrise);
  let moonset = formatDate(props.fetchData.daily[props.info].moonset);

  let humidity = props.fetchData.daily[props.info].humidity;
  let windSpeed = Math.round (props.fetchData.daily[props.info].wind_speed * 3.6 * 10) / 10;
  let windDir = props.fetchData.daily[props.info].wind_deg;

  const iconSize = props.iconSize; //50

  return (
    <div className={styles.DescDiv}>
      <div className={styles.Scrollable}>
        <div className={styles.Row}>
          {getIcon(props.fetchData.daily[props.info].weather[0].icon, iconSize)}
          <div className={styles.Description}>{desc}</div>
        </div>
        <div className={styles.Row}>
          <WiSunrise size={iconSize}/>
          <div className={styles.Description}>{"Sunrise at " + sunrise}</div>
        </div>
        <div className={styles.Row}>
          <WiSunset size={iconSize}/>
          <div className={styles.Description}>{"Sunset at " + sunset}</div>
        </div>
        <div className={styles.Row}>
          <WiMoonrise size={iconSize}/>
          <div className={styles.Description}>{"Moonrise at " + moonrise}</div>
        </div>
        <div className={styles.Row}>
          <WiMoonset size={iconSize}/>
          <div className={styles.Description}>{"Moonset at " + moonset}</div>
        </div>
        <div className={styles.Row}>
          <WiStrongWind size={iconSize}/>
          <div className={styles.Description}>{"Windspeed: " + windSpeed + " km/h"}</div>
        </div>
        <div className={styles.Row}>
          <WiWindDeg size={iconSize}/>
          <div className={styles.Description}>{"Wind direction: " + windDir + "°"}</div>
        </div>
        <div className={styles.Row}>
          <WiHumidity size={iconSize}/>
          <div className={styles.Description}>{"Humidity: " + humidity + " %"}</div>
        </div>
      </div>
    </div>
  );
}