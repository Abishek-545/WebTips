const timezone = require('abi-timezones-npm-packages')

process.on('message', (msg) => {
  if (msg.fetchString === 'all-city-timezones') {
    const allCityData = timezone.allTimeZones()
    process.send(allCityData)
  } else if (msg.fetchString === 'get-hourly-details') {
    const postData = msg.requestBody
    const citydn = postData.city_Date_Time_Name
    const hours = postData.hours
    const data = timezone.nextNhoursWeather(citydn, hours, msg.cityDetails)
    process.send(data)
  }
})
