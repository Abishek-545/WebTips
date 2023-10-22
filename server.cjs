const express = require('express')
const path = require('path')
const { fork, exec } = require('child_process')

const app = express()

let allCityData = ''

app.use(express.static(path.join(__dirname, '/src')))
app.use(express.static(__dirname))
app.use(express.json())
app.get('/all-city-timezones', function (req, res) {
  const childProcess = fork('./childThread.cjs')
  childProcess.send({ fetchString: 'all-city-timezones' })
  childProcess.on('message', (msg) => {
    allCityData = msg
    res.json(msg)
    childProcess.kill()
  })
})

app.post('/get-hourly-details', function (req, res) {
  const childProcess = fork('./childThread.cjs')
  childProcess.send({ fetchString: 'get-hourly-details', requestBody: req.body, cityDetails: allCityData })
  childProcess.on('message', (msg) => {
    res.json(msg)
    childProcess.kill()
  })
})

app.listen(8080, () => console.log('server starting at http://localhost:8080/'))

const url = 'http://localhost:8080'
exec('start' + ' ' + url)
