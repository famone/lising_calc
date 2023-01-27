// const x = (0.2 * 3000000 + 3000000) / 36
import { getRange } from '/rangeSlider.js'

const priceInp = document.querySelector('#priceInp')
const avansInp = document.querySelector('#avansInp')
const timeInp = document.querySelector('#timeInp')

const priceRange = document.querySelector('#priceRange')
const avansRange = document.querySelector('#avansRange')
const timeRange = document.querySelector('#timeRange')

const suggestions = document.querySelector('.suggestions');
const suggAmount = document.querySelector('#suggAmount')

// const monthPrice = document.querySelector('#monthPrice')
// const yearPercent = document.querySelector('#yearPercent')


getRange()
  

priceRange.addEventListener('change', function(e){
    priceInp.value = e.target.value
    getRange()
    calculate()
})
avansRange.addEventListener('change', function(e){
    avansInp.value = e.target.value
    getRange()
    calculate()
})
timeRange.addEventListener('change', function(e){
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

async function calculate(){
    let priceVal = parseInt(priceInp.value)
    let avansVal = parseInt(avansInp.value)
    let timeVal = parseInt(timeInp.value)


    // API для одного результата по подсчетам

    // fetch(`https://www.stone-xxi.ru/api/calc_d.php?dbg=false&fmt=JSON&price=${priceVal}&adv=${avansVal}&sl=${timeVal}as=${priceVal/100*avansVal}`)
    // .then(data => {
    //     return data.json();
    // })
    // .then(response => {
    //     console.log(response);
    //     monthPrice.innerHTML = response['EP'].toLocaleString() + ' ₽'
    //     yearPercent.innerHTML = response['Удорожание в год'] + '%'

    // });


    // API для 10 результатов от нескольких банков

    
    await fetch(`https://server.finleo.ru/api/public/autoassign/matched-partners?advance=${priceVal/100*avansVal}&advancePercent=${avansVal}&guaranteeId=32&inn=7722329291&isSecondHand=false&leasingTerm=${timeVal}&manufactureYear=2023&sum=${priceVal}`)
    .then(data => {
        return data.json();
    })
    .then(response => {
        // console.log(response);
        let suggestionsAmont = 0
        suggestions.innerHTML = ''
        response.forEach((item) =>{
            if(item.meta.comissions === null){
                return
            }
            suggestionsAmont++
            let suggItem = document.createElement('div')
            suggItem.className = 'sugg-item'
            suggItem.innerHTML = `
                    <div class="row">
                        <div class="col-lg-4 text-center">
                            <img src="https://server.finleo.ru${item.small_logo}" alt="">
                            <p class="me-0">${item.name}</p>
                        </div>
                        <div class="col-lg-2">
                            <label>Платеж:</label>
                            <p><strong>${parseInt(item.meta.comissions.monthlyPayment).toLocaleString()} ₽</strong></p>
                        </div>
                        <div class="col-lg-2">
                            <label>Удорожание:</label>
                            <p><strong>${(item.meta.comissions.leaseRate * 100).toFixed(2)} %</strong></p>
                        </div>
                        <div class="col-lg-2">
                            <label>Общая сумма:</label>
                            <p><strong>${parseInt(item.meta.comissions.dealSum).toLocaleString()} ₽</strong></p>
                        </div>
                        <div class="col-lg-2">
                            <label>Экономия:</label>
                            <p><strong>${parseInt(item.meta.comissions.savingSum).toLocaleString()} ₽</strong></p>
                        </div>
                    </div>
            `
            suggestions.appendChild(suggItem)
            suggAmount.innerHTML = suggestionsAmont
            // console.log(`${item.name} - Платеж: ${parseInt(item.meta.comissions.monthlyPayment)}, удорожание: ${(item.meta.comissions.leaseRate * 100).toFixed(2)}, сумма по договору: ${parseInt(item.meta.comissions.dealSum)}, экономия: ${parseInt(item.meta.comissions.savingSum)}`)

        })
    });
}

// let monthPayment = (avansVal/100 * priceVal + priceVal) / timeVal

    // monthPrice.innerHTML = parseInt(monthPayment).toLocaleString() + ' ₽'

    // let yearPercentVal = ((monthPayment * 36 - priceVal) / priceVal) * 100 / (timeVal/12)

    // yearPercent.innerHTML = yearPercentVal.toFixed(2) + '%'