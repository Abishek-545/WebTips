import { domElement } from './domElements.js'
import { sortElements } from './sortElements.js'
import { template } from './templates.js'

/**
 *  This function will update the bottom container elements based on continent sorting criteria
 * @param {string} arrowId It is the arrow id of the arrow image
 * @param {number}bottomItemCount no of items added in bottom
 */

const changeBottomByContinents = (arrowId, bottomItemCount) => {
  bottomItemCount = 0
  domElement.bottomContainerElements.innerHTML = ''
  if (arrowId === 'down-arrow') {
    domElement.continentArrow.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrow-up' + '.svg'
    domElement.continentArrow.id = 'up-arrow'
    domElement.continentWiseList[0] = sortElements.sortCitiesByContinent(domElement.continentWiseList[0]).reverse()
  } else {
    domElement.continentArrow.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrow-down' + '.svg'
    domElement.continentArrow.id = 'down-arrow'
    domElement.continentWiseList[0] = sortElements.sortCitiesByContinent(domElement.continentWiseList[0])
  }
  return changeBottomSegment(domElement.continentWiseList[0], bottomItemCount)
}

/**
 *   This function will update the bottom container elements based on temperature sorting criteria
 * @param {string} arrowId  It is the arrow id of the arrow image
 * @param {number} bottomItemCount no of items added in bottom
 */

const changeBottomByTemperature = (arrowId, bottomItemCount) => {
  bottomItemCount = 0
  domElement.bottomContainerElements.innerHTML = ''
  if (arrowId === 'up-arrow-temp') {
    domElement.citiesTemperature.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrow-down' + '.svg'
    domElement.citiesTemperature.id = 'down-arrow-temp'
    domElement.continentWiseList[0] = sortElements.sortCitiesByTemperature(domElement.continentWiseList[0], 'asc')
  } else {
    domElement.citiesTemperature.src = '/Assets/HTML&CSS/GeneralImages&Icons/' + 'arrow-up' + '.svg'
    domElement.citiesTemperature.id = 'up-arrow-temp'
    domElement.continentWiseList[0] = sortElements.sortCitiesByTemperature(domElement.continentWiseList[0], 'desc')
  }
  // console.log(domElement.continentWiseList[0]);
  return changeBottomSegment(domElement.continentWiseList[0], bottomItemCount)
}

/**
 *  It will add elements to the bottom container
 * @param {object}cities all city details
 * @param {number} bottomItemCount no of Items added in bottom
 */

const changeBottomSegment = (cities, bottomItemCount) => {
  cities.forEach((city) => {
    if (bottomItemCount < 12) {
      bottomItemCount = bottomItemCount + 1
      const card = document.createElement('div')
      card.classList.add('container-elements')
      card.innerHTML = template.getContinentWiseDataTemplate(city, bottomItemCount)
      domElement.bottomContainerElements.appendChild(card)
    }
  }
  )
  return bottomItemCount
}

export const bottomSection = { changeBottomByContinents, changeBottomByTemperature, changeBottomSegment }
