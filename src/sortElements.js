/**
 *  This function will  sort the cities based on continent name
 * @param {object}  cityDetails all city details
 * @returns  {object} sorted cities
 */
const sortCitiesByContinent = (cityDetails) => {
  cityDetails.sort((a, b) => {
    return (a.timeZone.split('/')[0]) < (b.timeZone.split('/')[0]) ? -1 : 1
  })
  return cityDetails
}

/**
 *   This function will  sort the cities based on temperature
 * @param {object} cityDetails all city details
 * @param {string} order order to sort the elements
 * @returns {object}  sorted cities
 */
const sortCitiesByTemperature = (cityDetails, order) => {
  cityDetails.sort((a, b) => {
    if ((a.timeZone.split('/')[0]) !== (b.timeZone.split('/')[0])) {
      return 0
    } else {
      if (order === 'asc') { return parseInt(a.temperature) - parseInt(b.temperature) } else {
        return parseInt(b.temperature) - parseInt(a.temperature)
      }
    }
  })
  return cityDetails
}

/**
 *  This function sorts the objects
 * @param {object} data  all city details
 *  @returns {object} returns the sorted city objects
 */
const sortCityOptions = (data) => {
  const sortedKeys = Object.keys(data).sort()
  const result = { }
  sortedKeys.forEach((key) => { result[key] = data[key] })
  return result
}

/**
 * This function will sort the objects based on weather type
 * @param {object} citiesObject filtered cities object
 * @param {string} weatherType sorting parameter
 * @returns {object} sorted cities
 */
const sortCitiesBasedOnWeatherType = (citiesObject, weatherType) => {
  return citiesObject.sort((a, b) => { return parseInt(b[weatherType]) - parseInt(a[weatherType]) })
}

export const sortElements = { sortCitiesBasedOnWeatherType, sortCitiesByContinent, sortCityOptions, sortCitiesByTemperature }
