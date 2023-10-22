import * as data from './fetchData.js'
const bottomContainerElements = document.querySelector('.bottom-itemscontainer')
const weatherList = document.querySelectorAll('.mid-ic')
const leftArrow = document.querySelector('#left-scroll-arrow')
const rightArrow = document.querySelector('#right-scroll-arrow')
const continentArrow = document.querySelector('.continent-arrow')
const citiesTemperature = document.querySelector('.temperature-arrow')
const cardCount = document.querySelector('#select-icon')
const optionSelectCity = document.querySelector('.option-select.city')
const increaseMiddleCards = document.querySelector('#select-icon')
const continentWiseList = []
const middleSegmentCards = []
const allCityDetails = await data.fetchCityDetails()

export const domElement = { allCityDetails, continentWiseList, setTimerId: null, selectedWeather: ' ', middleSegmentCards, bottomContainerElements, weatherList, leftArrow, rightArrow, citiesTemperature, continentArrow, cardCount, optionSelectCity, increaseMiddleCards }
