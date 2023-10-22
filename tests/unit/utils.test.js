/* eslint-env jest */
import { sortElements } from '../../src/sortElements.js'
import { filterObject } from '../../src/filterObjects.js'

describe('SortCityOptions', () => {
  test('sort cities which is randomly arranged', () => {
    const objectToCheck = { nome: { timeZone: 'America/Nome' }, jamaica: { timeZone: 'America/jamaica' }, losAngeles: { timeZone: 'America/losangeles' } }
    const result = sortElements.sortCityOptions(objectToCheck)
    const answer = { jamaica: { timeZone: 'America/jamaica' }, losAngeles: { timeZone: 'America/losangeles' }, nome: { timeZone: 'America/Nome' } }
    expect(result).toEqual(answer)
  })
  test('sort cities which is already sorted', () => {
    const objectToCheck = { jamaica: { timeZone: 'America/jamaica' }, losAngeles: { timeZone: 'America/losangeles' }, nome: { timeZone: 'America/Nome' } }
    const result = sortElements.sortCityOptions(objectToCheck)
    const answer = { jamaica: { timeZone: 'America/jamaica' }, losAngeles: { timeZone: 'America/losangeles' }, nome: { timeZone: 'America/Nome' } }
    expect(result).toEqual(answer)
  })
  test('sort cities which is reversely sorted', () => {
    const objectToCheck = { nome: { timeZone: 'America/Nome' }, losAngeles: { timeZone: 'America/losangeles' }, jamaica: { timeZone: 'America/jamaica' } }
    const result = sortElements.sortCityOptions(objectToCheck)
    const answer = { jamaica: { timeZone: 'America/jamaica' }, losAngeles: { timeZone: 'America/losangeles' }, nome: { timeZone: 'America/Nome' } }
    expect(result).toEqual(answer)
  })
  test('sorting if the object is empty', () => {
    const objectToCheck = { }
    const result = sortElements.sortCityOptions(objectToCheck)
    const answer = { }
    expect(result).toEqual(answer)
  })
})

describe('sort cities by continent', () => {
  test('sort cities by continent which is randomly aranged', () => {
    const arrayToCheck = [{ timeZone: 'America/Los_Angeles' }, { timeZone: 'Africa/Maseru' }, { timeZone: 'Pacific/Auckland' }]
    const result = sortElements.sortCitiesByContinent(arrayToCheck)
    const answer = [{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }]
    expect(result).toEqual(answer)
  })

  test('sort cities by continent which is already sorted', () => {
    const arrayToCheck = [{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }]
    const result = sortElements.sortCitiesByContinent(arrayToCheck)
    const answer = [{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }]
    expect(result).toEqual(answer)
  })
  test('sort cities by continent which is reversely sorted', () => {
    const arrayToCheck = [{ timeZone: 'Pacific/Auckland' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Africa/Maseru' }]
    const result = sortElements.sortCitiesByContinent(arrayToCheck)
    const answer = [{ timeZone: 'Africa/Maseru' }, { timeZone: 'America/Los_Angeles' }, { timeZone: 'Pacific/Auckland' }]
    expect(result).toEqual(answer)
  })

  test('sort cities by continent empty', () => {
    const arrayToCheck = []
    const result = sortElements.sortCitiesByContinent(arrayToCheck)
    const answer = []
    expect(result).toEqual(answer)
  })
})

describe('sort cities by temperature', () => {
  test('sort cities by temperature in descending order which is randomly aranged', () => {
    const arrayToCheck = [{ timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'America/Los_Angeles', temperature: '50c' }, { timeZone: 'America/Los_Angeles', temperature: '20c' }]
    const result = sortElements.sortCitiesByTemperature(arrayToCheck, 'asc')
    const answer = [{ timeZone: 'America/Los_Angeles', temperature: '20c' }, { timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'America/Los_Angeles', temperature: '50c' }]
    expect(result).toEqual(answer)
  })

  test('sort cities by temperature in ascending order', () => {
    const arrayToCheck = [{ timeZone: 'Pacific/Auckland', temperature: '20c' }, { timeZone: 'America/Los_Angeles', temperature: '40c' }, { timeZone: 'America/Los_Angeles', temperature: '50c' }]
    const result = sortElements.sortCitiesByTemperature(arrayToCheck, 'desc')
    const answer = [{ timeZone: 'Pacific/Auckland', temperature: '20c' }, { timeZone: 'America/Los_Angeles', temperature: '50c' }, { timeZone: 'America/Los_Angeles', temperature: '40c' }]
    expect(result).toEqual(answer)
  })

  test('sort cities by continent empty', () => {
    const arrayToCheck = []
    const result = sortElements.sortCitiesByTemperature(arrayToCheck)
    const answer = []
    expect(result).toEqual(answer)
  })
})

describe('filtering the objects based on the sunny condition', () => {
  test('testing objects by giving different values', () => {
    const objectToCheck = [{ temperature: '43°C', humidity: '10%', precipitation: '86%' },
      { temperature: '28.5°C', humidity: '50%', precipitation: '6%' },
      { temperature: '50°C', humidity: '40%', precipitation: '90%' }]
    const result = []
    for (let i = 0; i < 3; i++) {
      result[i] = filterObject.filterSunny(objectToCheck[i])
    }
    expect(result[0]).toBeTruthy()
    expect(result[1]).toBeFalsy()
    expect(result[2]).toBeTruthy()
  })
  test('testing by not giving one of the key-value pair condition', () => {
    const objectToCheck = { temperature: '50°C', humidity: '40%' }
    const result = filterObject.filterSunny(objectToCheck)
    expect(result).toBeFalsy()
  })
  test('testing by giving empty object', () => {
    const objectToCheck = {}
    const result = filterObject.filterSunny(objectToCheck)
    expect(result).toBeFalsy()
  })
})
describe('filtering the objects based on the windy condition', () => {
  test('testing objects by giving different values', () => {
    const objectToCheck = [{ temperature: '7.90°C', humidity: '85%', precipitation: '14%' },
      { temperature: '22°C', humidity: '52%', precipitation: '6%' },
      { temperature: '9°C', humidity: '50%', precipitation: '6%' }]
    const result = []
    for (let i = 0; i < 3; i++) {
      result[i] = filterObject.filterSnowFlake(objectToCheck[i])
    }
    expect(result[0]).toBeFalsy()
    expect(result[1]).toBeTruthy()
    expect(result[2]).toBeFalsy()
  })
  test('testing by not giving one of the key-value pair condition', () => {
    const objectToCheck = { temperature: '50°C', humidity: '40%' }
    const result = filterObject.filterSnowFlake(objectToCheck)
    expect(result).toBeFalsy()
  })
  test('testing by giving empty object', () => {
    const objectToCheck = {}
    const result = filterObject.filterSnowFlake(objectToCheck)
    expect(result).toBeFalsy()
  })
})
describe('filtering the objects based on the rainy condition', () => {
  test('testing objects by giving different values', () => {
    const objectToCheck = [{ temperature: '9°C', humidity: '50%', precipitation: '6%' },
      { temperature: '23°C', humidity: '52%', precipitation: '45%' },
      { temperature: '20.8°C', humidity: '10%', precipitation: '8%' }]
    const result = []
    for (let i = 0; i < 3; i++) {
      result[i] = filterObject.filterRainy(objectToCheck[i])
    }
    expect(result[0]).toBeTruthy()
    expect(result[1]).toBeFalsy()
    expect(result[2]).toBeFalsy()
  })
  test('testing by not giving one of the key-value pair condition', () => {
    const objectToCheck = { temperature: '0°C', precipitation: '8%' }
    const result = filterObject.filterRainy(objectToCheck)
    expect(result).toBeFalsy()
  })
  test('testing by giving empty object', () => {
    const objectToCheck = {}
    const result = filterObject.filterRainy(objectToCheck)
    expect(result).toBeFalsy()
  })
})

describe('sort cities based on weather type', () => {
  describe('sorting card objects based on the temperature in descending order', () => {
    test('testing objects by giving different values', () => {
      const objectToCheck = [{ temperature: '10°C' }, { temperature: '20°C' }, { temperature: '50°C' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'temperature')
      const answer = [{ temperature: '50°C' }, { temperature: '20°C' }, { temperature: '10°C' }]
      expect(result).toEqual(answer)
    })
    test('giving same temperature values for both objects', () => {
      const objectToCheck = [{ temperature: '50°C' }, { temperature: '50°C' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'temperature')
      const answer = [{ temperature: '50°C' }, { temperature: '50°C' }]
      expect(result).toEqual(answer)
    })
    test('giving already sorted object array', () => {
      const objectToCheck = [{ temperature: '50°C' }, { temperature: '10°C' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'temperature')
      const answer = [{ temperature: '50°C' }, { temperature: '10°C' }]
      expect(result).toEqual(answer)
    })
    test('testing by giving empty object', () => {
      const objectToCheck = []
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'temperature')
      const answer = []
      expect(result).toEqual(answer)
    })
  })
  describe('sorting card objects based on the precipitation  in descending order', () => {
    test('testing objects by giving different values', () => {
      const objectToCheck = [{ precipitation: '45%' }, { precipitation: '4%' }, { precipitation: '5%' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'precipitation')
      const answer = [{ precipitation: '45%' }, { precipitation: '5%' }, { precipitation: '4%' }]
      expect(result).toEqual(answer)
    })
    test('giving same temperature values for both objects', () => {
      const objectToCheck = [{ precipitation: '45%' }, { precipitation: '45%' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'precipitation')
      const answer = [{ precipitation: '45%' }, { precipitation: '45%' }]
      expect(result).toEqual(answer)
    })
    test('giving already sorted object array', () => {
      const objectToCheck = [{ precipitation: '32%' }, { precipitation: '4%' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'precipitation')
      const answer = [{ precipitation: '32%' }, { precipitation: '4%' }]
      expect(result).toEqual(answer)
    })
    test('testing by giving empty object', () => {
      const objectToCheck = []
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'precipitation')
      const answer = []
      expect(result).toEqual(answer)
    })
  })
  describe('sorting card objects based on the humidity  in descending order', () => {
    test('testing objects by giving different values', () => {
      const objectToCheck = [{ humidity: '45%' }, { humidity: '4%' }, { humidity: '5%' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'humidity')
      const answer = [{ humidity: '45%' }, { humidity: '5%' }, { humidity: '4%' }]
      expect(result).toEqual(answer)
    })
    test('giving same temperature value for both objects', () => {
      const objectToCheck = [{ humidity: '45%' }, { humidity: '45%' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'humidity')
      const answer = [{ humidity: '45%' }, { humidity: '45%' }]
      expect(result).toEqual(answer)
    })
    test('giving already sorted object array', () => {
      const objectToCheck = [{ humidity: '32%' }, { humidity: '4%' }]
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'humidity')
      const answer = [{ humidity: '32%' }, { humidity: '4%' }]
      expect(result).toEqual(answer)
    })
    test('testing by giving empty object', () => {
      const objectToCheck = []
      const result = sortElements.sortCitiesBasedOnWeatherType(objectToCheck, 'humidity')
      const answer = []
      expect(result).toEqual(answer)
    })
  })
})
