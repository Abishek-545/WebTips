/**
 *
 * @param  {object} cities all city details
 *  @returns {boolean}  filter sunny based on conditions
 */
const filterSunny = (cities) => {
  const temp = parseInt(cities.temperature)
  const humid = parseInt(cities.humidity)
  const precip = parseInt(cities.precipitation)
  return temp > 29 && humid < 50 && precip >= 50
}

/**
 *
 * @param {object} cities all city details
 *  @returns {boolean}  filter snowflake based on conditions
 */
const filterSnowFlake = (cities) => {
  const temp = parseInt(cities.temperature)
  const humid = parseInt(cities.humidity)
  const precip = parseInt(cities.precipitation)
  return (temp >= 20 && temp <= 28) && humid > 50 && precip < 50
}
/**
 *
 * @param {object} cities all city details
 * @returns {boolean}  filter rainy based on conditions
 */
const filterRainy = (cities) => {
  const temp = parseInt(cities.temperature)
  const humid = parseInt(cities.humidity)
  return (temp < 20) && humid >= 50
}

export const filterObject = { filterRainy, filterSnowFlake, filterSunny }
