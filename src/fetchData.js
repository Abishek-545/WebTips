import { sortElements } from './sortElements.js'
/**
 * This function will fetch data from JSON file using fetch api
 * @returns {object} cityDetails
 */
export async function fetchCityDetails () {
  let cityDetails = await fetch('/all-city-timezones')
  cityDetails = await cityDetails.json()
  document.querySelector('.page-loader').style.display = 'none'
  const cityDetailsObject = {}
  cityDetails.forEach((items) => {
    cityDetailsObject[items.cityName.toLowerCase()] = items
  })
  cityDetails = cityDetailsObject
  cityDetails = sortElements.sortCityOptions(cityDetails)
  return cityDetails
}

/**
 *  This function will get the next n hours value
 * @param {string} dateAndTime it is the date and time string
 * @param {string} cityName it is the cityname
 *  @returns {object} next five hours temperature array
 */
export async function fetchNextHours (dateAndTime, cityName) {
  const body = {
    city_Date_Time_Name: dateAndTime + ', ' + cityName, hours: 4
  }
  const request = {
    method: 'POST',
    headers: {

      Accept: 'application/json',

      'Content-Type': 'application/json'

    },
    body: JSON.stringify(body)
  }
  let fetchRes = await fetch('/get-hourly-details', request)
  fetchRes = await fetchRes.json()
  console.log(fetchRes)
  return fetchRes
}
