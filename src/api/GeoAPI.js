export default async function GetGeoLoc(LocName) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let reqResult = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + LocName + "&limit=50&appid=93235a2363a8ed97a74f27111965409e", requestOptions)
        .catch(err => console.log(err.message));
    if (!reqResult) return "";

    return await reqResult.json();
}