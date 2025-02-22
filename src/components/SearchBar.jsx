import React, { useState } from 'react';
import styles from "./SearchBar.module.css";
import { BiX, BiSearch } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import GetGeoLoc from '../api/GeoAPI';


export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [locData, setLocData] = useState([]);
  const [cssState, setCssState] = useState(styles.Hide);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log("Enter clicked");
      SearchFunc();
    }
  }

  const ResetFunc = () => {
    //change css state to hide result div
    if (cssState === styles.Show) {
      console.log("changing css state to dont show!");
      setCssState(styles.Hide)
    }

    //clear input
    setSearchTerm("");
  }

  const SearchFunc = async () => {
    if (searchTerm !== "") {
      let data = await GetGeoLoc(searchTerm);
      setLocData(data);
      console.log("New Loc Data:" + locData);

      //change css state to show result div
      if (cssState === styles.Hide) {
        console.log("changing css state to show!");
        setCssState(styles.Show)
      }

      //clear input
      setSearchTerm("");
    }
    else {
      console.log("empty search field")
    }
  }

  const getFoundLocations = () => {
    let response = [];
    locData.map((loc, i) => {
      response.push(<div key={i} onClick={() => { ResetFunc(); props.onLocClick(loc.name + ', ' + loc.state + ', ' + loc.country, loc.lat, loc.lon) }} className={styles.SingleLocDiv}>{loc.name}, {loc.state}, {loc.country}</div>)
    })
    return response;
  }

  return (

    <div className={styles.LocWrapper}>
      <div className={[styles.SearchDiv, cssState].join(' ')}>
        <div className={styles.SearchWrapper}>
          <input type="text" value={searchTerm} onChange={handleSearchChange} onKeyDown={handleKeyDown} className={[styles.SearchBar, cssState].join(' ')} placeholder="Search Location"></input>
          <div onClick={ResetFunc} className={[styles.CancelIcon, cssState].join(' ')}><BiX/></div>
          <div onClick={SearchFunc} className={styles.SearchIcon}><BiSearch/></div>
        </div>
        <div className={[styles.LocResultDiv, cssState].join(' ')}>{getFoundLocations()}</div>
      </div >
      <div className={styles.CurrentLoc}>
        <MdOutlineLocationOn/>
        <p className={styles.LocName}>{props.locName}</p>
      </div>
    </div>
  )
}
