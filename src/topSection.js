import { months } from './data.js'
import { template } from './templates.js'
import { timeDetails } from './time.js'

/**
 * This function will change the icons for particular hour based on temperature value
 * @param {string} temp current temperature
 * @param {number} i increment value for accessing each classes iteretively
 */
const changeSelectedCityIcon = (temp, i) => {
  temp = parseInt(temp.slice(0, 2))
  const iconImage = document.getElementsByClassName('top-ic')[i]
  if (temp >= 23 && temp <= 29) { iconImage.src = '../Assets/HTML&CSS/Weather_Icons/cloudyIcon.svg' } else if (temp < 18) { iconImage.src = '../Assets/HTML&CSS/Weather_Icons/rainyIcon.svg' } else if (temp <= 22 && temp >= 18)iconImage.src = '../Assets/HTML&CSS/Weather_Icons/windyIcon.svg'
  else iconImage.src = '../Assets/HTML&CSS/Weather_Icons/sunnyIcon.svg'
}
/**
 *This function will change the top hourly temperature value for next 5 hours
 * @param {object} currentCity This object holds the current city value
 * @param {string} temperature temperature of current city
 * @param {Array} nextFiveHrs next five hours of the current city
 * @param {string} hour current hour of the city
 * @param {string} state current Meridiem state
 */

const changeTopScroll = (temperature, nextFiveHrs, hour, state) => {
  const topContainer = document.getElementsByClassName('top-end')[0]
  topContainer.innerHTML = ''
  for (let i = 0; i < 5; i += 1) {
    if (i === 0) {
      const forecastTimeElement = document.createElement('div')
      forecastTimeElement.classList.add('topscroll-items')
      forecastTimeElement.innerHTML = template.getCityTimeHtmlTemplate('Now', temperature)
      topContainer.appendChild(forecastTimeElement)
      changeSelectedCityIcon(temperature, i)
    } else {
      const forecastTimeElement = document.createElement('div')
      forecastTimeElement.classList.add('topscroll-items')
      if (parseInt(hour) === 11) hour = 12
      else hour = (parseInt(hour) + 1) % 12
      if (hour === 1) {
        if (state === 'PM') state = 'AM'
        else state = 'PM'
      }
      forecastTimeElement.innerHTML = template.getCityTimeHtmlTemplate(hour.toString() + state, nextFiveHrs[i - 1])
      topContainer.appendChild(forecastTimeElement)
      changeSelectedCityIcon(nextFiveHrs[i - 1], i)
    }

    if (i < 4) {
      const forecastTimeElement = document.createElement('div')
      forecastTimeElement.classList.add('topscroll-items')
      forecastTimeElement.innerHTML = template.getCityTimeHtmlTemplate('', '')
      topContainer.appendChild(forecastTimeElement)
    }
  }
}

const setTopDate = (timeZone) => {
  const dateArray = timeDetails.getDate(timeZone)
  const date = document.getElementById('date-text')
  date.innerHTML = dateArray[0] + '-' + months[parseInt(dateArray[1]) - 1] + '-' + dateArray[2]
}

const setTopTime = (timeZone, temperature, nextFiveHrs) => {
  const timeText = document.querySelector('.time-text')
  const timeState = document.getElementById('time-img')
  const splitSecAndMeridiem = timeDetails.updateHeaderTime(timeZone)
  if (splitSecAndMeridiem[1] === 'PM') {
    timeState.src = '../Assets/HTML&CSS/GeneralImages&Icons/pmState.svg'
    timeText.classList.add('pm-state')
  } else {
    timeState.src = '../Assets/HTML&CSS/GeneralImages&Icons/amState.svg'
    timeText.classList.add('time-text')
    timeText.classList.remove('pm-state')
  }
  changeTopScroll(temperature, nextFiveHrs, splitSecAndMeridiem[0].split(':')[0], splitSecAndMeridiem[1])
}

const updateTopMiddle = (selectedCity, temperature, humidity, precipitation) => {
  document.getElementById('top-img').src = '../Assets/HTML&CSS/Icons_for_cities/' + selectedCity + '.svg'
  document.getElementById('tempc-val').innerHTML = temperature
  document.getElementById('tempf-val').innerHTML = ((parseInt(temperature) * 9 / 5) + 32).toFixed(2) + 'F'
  document.getElementById('humid-val').innerHTML = humidity
  document.getElementById('precip-val').innerHTML = precipitation
}

/**
 * This function will load the the city names in option of datalist
 * @param {object} data all city data JSON file
 */
const loadSelectOptions = (data) => {
  data = Object.values(data)
  const dataList = document.querySelector('.datalist-options')
  data.forEach((s) => {
    const options = document.createElement('option')
    options.value = s.cityName
    dataList.appendChild(options)
    return 0
  })
}

export const topSection = { loadSelectOptions, setTopDate, setTopTime, updateTopMiddle }
