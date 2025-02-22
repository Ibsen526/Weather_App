import React from 'react'
import styles from "./Timeline.module.css"
import { WiDaySunny, WiDaySunnyOvercast, WiDayCloudy, WiCloud, WiCloudy, WiShowers, WiRain, WiSnow, WiFog } from "react-icons/wi";
//import Graph from './Graph_CanvasJS'
import "react-vis/dist/style.css";
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

export default function Timeline(props) {
    

  function getIcon(IconStr) {
    let IconSize = 20;
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

  function formatDate(UnixDate) {
    let dateStr = new Date(UnixDate * 1000); 
    dateStr = dateStr.toLocaleString(
      "en-US",
      {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
      })
    let dateArr = dateStr.split(", ");
    return dateArr
  }

 
  let minData = Infinity;
  let maxData = 0;
  let mappedData = props.data.hourly.map((item, index) => {
    if(item.temp > maxData) {
      maxData=item.temp;
    }
    else if(item.temp < minData) {
      minData=item.temp;
    }
    return {x:index, y:item.temp};
  })

  const yRange = [minData-1,maxData+1];

  const graphWidth = 2000;
  const graphHeight = 230;


  return (
    <div className={styles.TimelineDiv}>
      <div className={styles.Graphs}>
        <div className={styles.StaticGraph}>
          <XYPlot height={graphHeight} yDomain={yRange}>
            <LineSeries
              data={[ 
                {x: 0, y: 0}
              ]}/>
            <YAxis hideLine style={{
              ticks: {stroke: '#1b1a1f'},
              text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }} />
          </XYPlot>
        </div>
        
        <div className={styles.Scrollable}>
          <div className={styles.DataGraph}>
            <XYPlot width={graphWidth} height={graphHeight} yDomain={yRange}>
              <LineSeries
                color='#fae0fb'
                data={mappedData}/>
              <XAxis hideLine tickFormat={function tickFormat(index) {
                //console.log(index + " " + formatDate(props.data.hourly[index].dt)[0]);
                return formatDate(props.data.hourly[index].dt)[0];
              }} />
            </XYPlot>
          </div>

          <div className={styles.Icons}>
            {props.data.hourly.map((hourlyData) => {
              //console.log(hourlyData.weather[0].icon);
              return getIcon(hourlyData.weather[0].icon);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}