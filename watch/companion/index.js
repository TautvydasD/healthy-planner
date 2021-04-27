import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { UserId } from "../common/globals"
// Fetch Sleep Data from Fitbit Web API
// function fetchSleepData(accessToken)  {
//   let date = new Date();
//   let todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //YYYY-MM-DD

//   // Sleep API docs - https://dev.fitbit.com/reference/web-api/sleep/
//   fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${todayDate}.json`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   })
//   .then(function(res) {
//     return res.json();
//   })
//   .then(function(data) {
//     let myData = {
//       totalMinutesAsleep: data.summary.totalMinutesAsleep
//     }
//     if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
//       messaging.peerSocket.send(myData);
//     }
//   })
//   .catch(err => console.log('[FETCH]: ' + err));
// }

// // A user changes Settings
// settingsStorage.onchange = evt => {
//   if (evt.key === "oauth") {
//     // Settings page sent us an oAuth token
//     let data = JSON.parse(evt.newValue);
//     fetchSleepData(data.access_token) ;
//   }
// };

// // Restore previously saved settings and send to the device
// function restoreSettings() {
//   for (let index = 0; index < settingsStorage.length; index++) {
//     let key = settingsStorage.key(index);
//     if (key && key === "oauth") {
//       // We already have an oauth token
//       let data = JSON.parse(settingsStorage.getItem(key))
//       fetchSleepData(data.access_token);
//     }
//   }
// }

// // Message socket opens
// messaging.peerSocket.onopen = () => {
//   restoreSettings();
// };

function fetchActivityDates () {
  fetch(`http://192.168.1.11:5000/api/users/${UserId}/activities`, {
    method: "GET"
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(JSON.stringify(data))
  })
  .catch(err => {
    console.log("Fetch failed")
  })
}

fetchActivityDates()

settingsStorage.onchange = evt => {
  fetchActivityDates()
}