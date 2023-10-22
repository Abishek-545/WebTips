import { domElement } from './domElements.js'
import { topSection } from './topSection.js'
import { bottomSection } from './bottomSection.js'
import { middleSection } from './middleSection.js'
import { changeHeaderValues } from './baseClass.js'

(async function () {
  let bottomItemCount = 0
  const allCityDetails = domElement.allCityDetails
  domElement.continentWiseList.push(Object.values(allCityDetails))
  domElement.middleSegmentCards.push(allCityDetails)
  topSection.loadSelectOptions(allCityDetails)
  changeHeaderValues('Anadyr')
  middleSection.selectIcon('sunny-ic')
  domElement.optionSelectCity.addEventListener('change', (e) => { console.log(e.target.value); changeHeaderValues(e.target.value) })
  domElement.weatherList.forEach((ic) => ic.addEventListener('click', (e) => { middleSection.selectIcon(e.target.id) }))
  middleSection.updateScrollButtonsVisibility()
  domElement.leftArrow.addEventListener('click', () => { middleSection.scrollItems('left') })
  domElement.rightArrow.addEventListener('click', () => { middleSection.scrollItems('right') })
  domElement.increaseMiddleCards.addEventListener('change', middleSection.addCardsbySpinner)
  bottomItemCount = bottomSection.changeBottomByContinents('up-arrow', bottomItemCount)
  bottomItemCount = bottomSection.changeBottomByTemperature('up-arrow-temp', bottomItemCount)
  domElement.continentArrow.addEventListener('click', (e) => { bottomItemCount = bottomSection.changeBottomByContinents(e.target.id, bottomItemCount) })
  domElement.citiesTemperature.addEventListener('click', (e) => { bottomItemCount = bottomSection.changeBottomByTemperature(e.target.id, bottomItemCount) })
  document.querySelector('#body').classList.add('overflow-body-scroll')
})()
