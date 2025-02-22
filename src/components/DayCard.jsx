import React, { useState } from 'react'
import styles from "./DayCard.module.css"
import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy, WiCloud, WiCloudy, WiShowers, WiRain, WiSnow, WiFog } from "react-icons/wi";
// Weather Icons:
// 01 - WiDaySunny
// 02 - WiDaySunnyOvercast
// 03 - WiDayCloudy
// 04 - WiCloud
// 09 - WiCloudy
// 10 - WiShowers
// 11 - WiRain
// 13 - WiSnow
// 50 - WiFog

export default function DayCard(props) {
  try {
    const round = (value, precision) => {
      let multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    const formatDate = (UnixDate) => {
      let dateStr = new Date(UnixDate * 1000).toLocaleString(
        "en-US",
        {
          weekday: "long",
          month: "short",
          day: "2-digit",
        })
      let dateArr = dateStr.split(", ");
      return dateArr;
    }

    const getIcon = (IconStr) => {
      let IconSize = props.iconSize; //100 //props.pageSize.h / 10
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

    let splitDate = formatDate(props.data.dt);

    return (
      <div className={[styles.Card, (props.isActive) ? styles.Selected : styles.unSelected].join(' ')} onClick={props.onCardClick(props.keyUsable)}>
        <div className={styles.WeatherDate}>
          <p id={styles.Day}>{splitDate[0]}</p>
          <p id={styles.Date}>{splitDate[1]}</p>
        </div>
        <div className={styles.WeatherIcon}>
          {getIcon(props.data.weather[0].icon)}
        </div>
        <div className={styles.Temp}>
          <div className={styles.DayTemp}>
            <p>{round(props.data.temp.day, 1)}</p>
          </div>
          <div className={styles.MinMaxTemp}>
            <div className={styles.MaxTemp}>
              <p>{round(props.data.temp.max, 1)}</p>
            </div>
            <div className={styles.MinTemp}>
              <p>{round(props.data.temp.min, 1)}</p>
            </div>
          </div>
          <div className={styles.CTemp}>
            <p>°C</p>
          </div>
        </div>
      </div>
    );
  } catch (error) { console.log(error) }
}
