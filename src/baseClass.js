import { topSection } from './topSection.js'
import { domElement } from './domElements.js'
import * as data from './fetchData.js'

/**
 *
 * @param {object} cityDetails  individual city details
 * this is the function for setting values of the object
 */
class topSectionProto {
  constructor (cityDetails) {
    this.cityDetails = cityDetails
    this.cityName = cityDetails.cityName.toLowerCase()
    this.temperature = cityDetails.temperature
    this.humidity = cityDetails.humidity
    this.dateAndTime = cityDetails.dateAndTime
    this.precipitation = cityDetails.precipitation
    this.timeZone = cityDetails.timeZone
    this.dateAndTime = cityDetails.dateAndTime
    this.nextFiveHrs = {}
  }

  updateTopMiddle () {
    topSection.updateTopMiddle(this.cityName, this.temperature, this.humidity, this.precipitation)
  }

  setTopDate () {
    topSection.setTopDate(this.timeZone)
  }

  async setTopTime () {
    this.nextFiveHrs = await data.fetchNextHours(this.dateAndTime, this.cityDetails.cityName)
    topSection.setTopTime(this.timeZone, this.temperature, this.nextFiveHrs.temperature)
  }
}
/**
 *This function will change values if the option is changed in city selection
 * @param {string}cityName city name of the selected city
 */
export const changeHeaderValues = (cityName) => {
  clearInterval(domElement.setTimerId)
  const selectedCity = cityName.toLowerCase()
  const cityDetails = domElement.allCityDetails[selectedCity]
  const city = new topSectionProto(cityDetails)
  city.updateTopMiddle()
  city.setTopDate()
  city.setTopTime()
  const oneHourInMs = 3600000
  setInterval(() => {
    city.updateTopMiddle()
    city.setTopDate()
    city.setTopTime()
  }, oneHourInMs)
}
