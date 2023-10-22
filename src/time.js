import { domElement } from './domElements.js'
/**
 *  It will update the bottom time
 * @param {string} cityTimezone It is the timezone of the cities
 * @param {string} itemName  Id for each elements
 */
function setTime (cityTimezone, itemName) {
  const timeElement = document.getElementById(itemName)
  const timeArray = new Date().toLocaleTimeString('en-US', { timeZone: cityTimezone }).split(' ')
  const hourAndMin = timeArray[0].split(':')
  if (timeElement !== null) {
    timeElement.innerHTML = ' ' + hourAndMin[0] + ':' + hourAndMin[1] + ' ' + timeArray[1]
  }
}

/**
 * It will update the bottom time
 * @param {string}cityTimezone It is the timezone of the cities
 * @param {string}itemName Id for each elements
 */
const updateCityTileTime = (cityTimezone, itemName) => {
  const timeoutHandle = setTimeout(() => {
    setTime(cityTimezone, itemName)
    clearInterval(timeoutHandle)
  }, 10)
  setInterval(() => {
    setTime(cityTimezone, itemName)
  }, 60000)
}

/**
 * This function will get the current date
 * @param {string} cityTimezone Timezone name
 * @returns  {Array} returns the date array
 */

const getDate = (cityTimezone) => {
  const currTime = new Date(new Date().toLocaleString('en-US', { timeZone: cityTimezone }))
  const month = currTime.getMonth()
  const year = currTime.getFullYear()
  const date = currTime.getDate()
  return [date, month, year]
}

/**
 * This function will update live time based on cities
 * @param {string} cityTimezone Timezone name
 * @returns  {Array} returns the time array
 */

const updateHeaderTime = (cityTimezone) => {
  clearInterval(domElement.setTimerId)
  const timeElement = document.querySelector('.time-text')
  let timeArray = new Date().toLocaleTimeString('en-US', { timeZone: cityTimezone }).split(' ')
  domElement.setTimerId = setInterval(() => {
    timeArray = new Date().toLocaleTimeString('en-US', { timeZone: cityTimezone }).split(' ')
    const timeArrayLive = timeArray[0].split(':')
    timeElement.innerHTML = timeArrayLive[0] + ':' + timeArrayLive[1] + ':' + '<small>' + timeArrayLive[2] + '<small>'
  }, 1000)
  return [timeArray[0], timeArray[1]]
}

export const timeDetails = { updateCityTileTime, updateHeaderTime, getDate }
