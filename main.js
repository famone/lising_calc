// const x = (0.2 * 3000000 + 3000000) / 36
import { getRange } from '/rangeSlider.js'

const priceInp = document.querySelector('#priceInp')
const avansInp = document.querySelector('#avansInp')
const timeInp = document.querySelector('#timeInp')

const priceRange = document.querySelector('#priceRange')
const avansRange = document.querySelector('#avansRange')
const timeRange = document.querySelector('#timeRange')

const monthPrice = document.querySelector('#monthPrice')
const yearPercent = document.querySelector('#yearPercent')


getRange()


priceRange.addEventListener('input', function(e){
    priceInp.value = e.target.value
    getRange()
    calculate()
})
avansRange.addEventListener('input', function(e){
    avansInp.value = e.target.value
    getRange()
    calculate()
})
timeRange.addEventListener('input', function(e){
    timeInp.value = e.target.value
    getRange()
    calculate()
})
priceInp.addEventListener('input', function(e){
    priceRange.value = e.target.value
    getRange()
    calculate()
})
avansInp.addEventListener('input', function(e){
    avansRange.value = e.target.value
    getRange()
    calculate()
})
timeInp.addEventListener('input', function(e){
    timeRange.value = e.target.value
    getRange()
    calculate()
})


calculate()

function calculate(){
    let priceVal = parseInt(priceInp.value)
    let avansVal = parseInt(avansInp.value)
    let timeVal = parseInt(timeInp.value)


    let monthPayment = (avansVal/100 * priceVal + priceVal) / timeVal

    monthPrice.innerHTML = parseInt(monthPayment).toLocaleString() + ' ₽'

    let yearPercentVal = ((monthPayment * 36 - priceVal) / priceVal) * 100 / (timeVal/12)

    yearPercent.innerHTML = yearPercentVal.toFixed(2) + '%'
}