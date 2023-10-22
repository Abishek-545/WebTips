import { timeDetails } from './time.js'
import { middleSection } from './middleSection.js'

/**
 * It is the template for bottom element
 * @param {string} city city details
 * @param {number}bottomItemCount no of items added in bottom
 * @returns {string} bottom element template
 */
const getContinentWiseDataTemplate = (city, bottomItemCount) => {
  const continents = city.timeZone.split('/')[0]
  const bottomContainerId = 'live-time-' + bottomItemCount
  return (`<div class="cont">
      ${continents}
  </div>
  <div class="city-time"> ${city.cityName + ', '} &nbsp;<div id= ${bottomContainerId} ${timeDetails.updateCityTileTime(city.timeZone, bottomContainerId)}>
  </div></div>
  <div class="bottom-temp"> ${city.temperature}</div>
  <div class="bottom-humidinfo">
      <img alt="humidicon" src="/Assets/HTML&CSS/Weather_Icons/humidityIcon.svg" width="17vw" height="17vh">
      <div>${city.humidity}</div>

  </div>`)
}

/**
 * This function is the template for card
 * @param {object} data individual city details
 * @returns {object} card template
 */
function getCardDetailsTemplate (data) {
  return (`<div class="items-leftpart">
  <div class="scroll-itemcity">${data.cityName}</div>
  <div class="scroll-itemtime">${data.dateAndTime.split(', ')[1]}</div>
  <div class="scroll-itemdate">${middleSection.updateMiddleDate(data.timeZone)}</div>
  <div class="scrollitem-humidinfo">
      <img alt="humidityicon" src="/Assets/HTML&CSS/Weather_Icons/humidityIcon.svg">
      <div>${data.humidity}</div>
  </div>
  <div class="scrollitem-precipinfo">
      <img alt="precipicon" src="/Assets/HTML&CSS/Weather_Icons/precipitationIcon.svg">
      <div>${data.precipitation}</div>
  </div>
</div>
<div class="items-rightpart">
  <img alt="sunnyicon" src="/Assets/HTML&CSS/Weather_Icons/sunnyIcon.svg" class="sunny-icon">
  <div>${data.temperature}</div>
</div>
</div>`)
}

/**
 * @param {string} hour current hour
 * @param {string} temperature current temperature
 * @returns {object} top scroll element
 */
function getCityTimeHtmlTemplate (hour, temperature) {
  return (`
      <div class="item-time"> ${hour ?? ''}</div>
      <div class="pipe">|</div>
      <div class="scroll-icon">
      ${(temperature || hour) ? '<img alt="weathericon" class="top-ic"> </div>' : ''}
      <div class='num'> ${temperature ?? ''} </div>
      `)
}

export const template = { getContinentWiseDataTemplate, getCardDetailsTemplate, getCityTimeHtmlTemplate }
