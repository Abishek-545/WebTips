import { domElement } from './domElements.js'
import { template } from './templates.js'
import { sortElements } from './sortElements.js'
import { filterObject } from './filterObjects.js'
import { timeDetails } from './time.js'
import { months } from './data.js'
/**
 *  This function will get the scrollwidth and clientwidth of the itemscontainer to display the arrow
 */
const updateScrollButtonsVisibility = () => {
  const middleCardContainer = document.querySelector('.items-container')
  const middleContainerWidth = middleCardContainer.clientWidth
  const scrollContainerWidth = middleCardContainer.scrollWidth
  const itemsContainer = document.querySelector('.items-container')
  if (middleContainerWidth >= scrollContainerWidth) {
    domElement.leftArrow.style.display = 'none'
    domElement.rightArrow.style.display = 'none'
    itemsContainer.style.justifyContent = 'space-around'
  } else {
    domElement.leftArrow.style.display = 'block'
    domElement.rightArrow.style.display = 'block'
    itemsContainer.style.justifyContent = 'start'
  }
}

/**
 * This function will get the value from spinner  and update the card numbers
 */
const addCardsbySpinner = () => {
  changeMiddleSegment(domElement.middleSegmentCards[0])
  updateScrollButtonsVisibility()
}

/**
 * This function will scroll the container when arrow is clicked
 * @param {string} arrow It is used to identify the arrow
 */
const scrollItems = (arrow) => {
  const cardWidth = document.querySelector('.items-scroll').getBoundingClientRect().width
  const scrollContainer = document.querySelector('.items-container')
  if (arrow === 'right') scrollContainer.scrollLeft += cardWidth
  else scrollContainer.scrollLeft -= cardWidth
}

/**
 *   This function selects the icon and add style. It calls the filter function
 * @param {string} id Icon id
 */
const selectIcon = (id) => {
  if (domElement.selectedWeather !== ' ') { document.getElementById(domElement.selectedWeather).classList.remove('ic-click') }
  domElement.selectedWeather = id
  document.getElementById(domElement.selectedWeather).classList.add('ic-click')
  filterMiddleSegment(domElement.selectedWeather)
}

const updateMiddleDate = (timeZone) => {
  const dateArray = timeDetails.getDate(timeZone)
  return dateArray[0] + '-' + months[parseInt(dateArray[1]) - 1] + '-' + dateArray[2]
}

/**
 *  This function will filter the cities based on selected icons and sort them
 * @param {string} iconId icon id for identification
 */
const filterMiddleSegment = (iconId) => {
  let filteredObject = {}
  document.querySelector('.items-container').innerHTML = ' '
  if (iconId === 'sunny-ic') {
    filteredObject = Object.values(domElement.allCityDetails).filter(filterObject.filterSunny)
    filteredObject = sortElements.sortCitiesBasedOnWeatherType(filteredObject, 'temperature')
  } else if (iconId === 'snowflake-ic') {
    filteredObject = Object.values(domElement.allCityDetails).filter(filterObject.filterSnowFlake)
    filteredObject = sortElements.sortCitiesBasedOnWeatherType(filteredObject, 'precipitation')
    console.log(filteredObject)
  } else if (iconId === 'rainy-ic') {
    filteredObject = Object.values(domElement.allCityDetails).filter(filterObject.filterRainy)
    filteredObject = sortElements.sortCitiesBasedOnWeatherType(filteredObject, 'humidity')
  }
  domElement.middleSegmentCards[0] = filteredObject
  changeMiddleSegment(filteredObject)
  updateScrollButtonsVisibility()
}
/**
 *    This function generate the card in container iteratively
 * @param {object}cities all city details
 */
const changeMiddleSegment = (cities) => {
  const middleContainer = document.querySelector('.items-container')
  middleContainer.innerHTML = ''
  const data = Object.values(cities)
  let i = 0
  data.slice(0, domElement.cardCount.value).forEach((value) => {
    const card = document.createElement('div')
    card.classList.add('items-scroll')
    card.innerHTML = template.getCardDetailsTemplate(value)
    middleContainer.appendChild(card)
    document.getElementsByClassName('items-scroll')[i].style.backgroundImage = "url('/Assets/HTML&CSS/Icons_for_cities/" + value.cityName.toLowerCase() + ".svg')"
    i = i + 1
    scrollEventPassing(card, document.querySelector('.items-container'))
  })
  updateScrollButtonsVisibility()
}

/**
Method to scroll Middle section both Horizontally and Vertically
 * @param {object} target - target element
 * @param {object} targetContainer - underlying container
 */
function scrollEventPassing (target, targetContainer) {
  target.addEventListener('wheel', (event) => {
    event.preventDefault()

    if (event.deltaY !== 0) {
      window.scrollBy({

        top: event.deltaY

      })
    }

    if (event.deltaX !== 0) {
      targetContainer.scrollLeft += event.deltaX
    }
  })
}

scrollEventPassing(document.querySelector('.items-overlay'), document.querySelector('.items-container'))
export const middleSection = { updateMiddleDate, updateScrollButtonsVisibility, addCardsbySpinner, scrollItems, selectIcon, changeMiddleSegment, filterMiddleSegment }
