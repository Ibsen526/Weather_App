export default async function GetWeatherFromAPI(lat, lon) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const res = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=93235a2363a8ed97a74f27111965409e&units=metric", requestOptions)
    .catch(err => console.log(err.message));
  if (!res) return "";
  return await res.json();
}
