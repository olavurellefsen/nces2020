import years from "./../data/years"
import historicalYears from "./../data/historicalyears"
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

function createAccumulatedData(data, scenario, percentage, chartName, selectedCountries) { 
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })

    //Useful when finding axis range
    let totalYearValuesPositive = {}
    let totalYearValuesNegative = {}
    let unit = "";
    years.forEach(year => {
        totalYearValuesPositive[year] = 0
        totalYearValuesNegative[year] = 0
    })
    if (!scenario) return undefined //this will be the case for sceanrio2 if only one scenario is selected
    let accumulatedData = {}
    //if (scenario.substring(3, 8) === "_copy")
    if (scenario.includes("_copy"))
      scenario = scenario.replace("_copy", "")
    let scen = data.scenarios
    .find(o => o.scenario.toLowerCase() === scenario.toLowerCase())
    //console.log("data: ", data)
    //console.log("scenario: ", scenario)
    let ind = scen.indicators.find(o => o.indicator === chartName)
        //console.log("ind: ", ind)
        //console.log("chartName: ", chartName)
        unit = ind.unit
        ind.regions.forEach(r => {
            r.indicatorGroups.forEach(indicatorGroup => {
              if (!accumulatedData[indicatorGroup.indicatorGroup]) {
                accumulatedData[indicatorGroup.indicatorGroup]=[]
                years.forEach(y => {
                  accumulatedData[indicatorGroup.indicatorGroup].push({"year": y, "total": 0})
                })
              }
              if (selectedDataRegions.includes(r.region)) {//Only include selected countries
                //console.log("indicatorGroup.indicatorGroup", indicatorGroup.indicatorGroup)
                indicatorGroup.indicatorGroupValues.forEach((value, index) => {
                  if (accumulatedData[indicatorGroup.indicatorGroup][index].year !== value.year ) {
                     //Extra check we rely on the two arrays being indexed the same way
                    console.log("Error in array indexing")
                  }
                  accumulatedData[indicatorGroup.indicatorGroup][index].total += percentage ? value.total/selectedCountries.length : value.total
                  if (value.total > 0)
                    totalYearValuesPositive[value.year] += percentage ? value.total/selectedCountries.length : value.total
                  else
                    totalYearValuesNegative[value.year] += percentage ? value.total/selectedCountries.length : value.total
                })
              }
            })
        })
        return [accumulatedData, totalYearValuesPositive, totalYearValuesNegative , unit]
}

// export function getMinMaxStackedValues(yearValues1, yearValues2) {
//   let minValue = -0.00001
//   let maxValue = 0.00001
//   for (var i = 0; i < years.length; i++) {
//     let totalValuePos = 0
//     let totalValueNeg = 0
//     Object.keys(data).forEach(indicatorName => {
//         let value = data[indicatorName][i].total
//         if (value < 0) {
//           totalValueNeg += value
//         } else {
//           totalValuePos += value
//         }

//     })
//     if (totalValuePos > maxValue) {
//       maxValue = totalValuePos
//     }
//     if (totalValueNeg < minValue) {
//       minValue = totalValueNeg
//     }
//   }
//   if (-minValue > maxValue) {
//     maxValue = -minValue
//   }
// }

function createAccumulatedHistoricalData(data, chartName, selectedCountries) {
  //console.log("about to go historical")
  let accumulatedHistoricalData = {}
  let totalHistoricalYearValues = {}
  historicalYears.forEach(year => {
    totalHistoricalYearValues[year] = 0
})
let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.historical_data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })

data.data.nces_eleproduction.forEach((item, i)=>{ 
  if(historicalYears.includes(item.year) && selectedDataRegions.includes(item.nces_country.name)) {
    if(Object.keys(accumulatedHistoricalData).includes(item.nces_fuel_type.fuel_type)) {
      if (accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)]) {
      
        //if(item.year === 1990 && item.nces_fuel_type.fuel_type === "Oil")
          //console.log("accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)].value: ", accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)].value)
        accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)].total += item.value
      } else {
        accumulatedHistoricalData[item.nces_fuel_type.fuel_type].push({"year": item.year, "total": item.value})
      }
  } else {
    accumulatedHistoricalData[item.nces_fuel_type.fuel_type] = []
    accumulatedHistoricalData[item.nces_fuel_type.fuel_type].push({"year": item.year, "total": item.value})
    totalHistoricalYearValues[item.year] += item.value
    //if(item.year === 1990 && item.nces_fuel_type.fuel_type === "Oil")
    //console.log("new entry: ", accumulatedHistoricalData)
  }
  }
})
//console.log("accumulatedHistoricalData: ", accumulatedHistoricalData)
//console.log("totalHistoricalYearValues: ", totalHistoricalYearValues)

let fuelTypes = []
data.data.nces_eleproduction.forEach((item)=>{
  if (fuelTypes.indexOf(item.nces_fuel_type.fuel_type) === -1)
    fuelTypes.push(item.nces_fuel_type.fuel_type)
})

  return [accumulatedHistoricalData,totalHistoricalYearValues, fuelTypes]
}
//Share of RE in electricity consumption (theme: Transforming the power sector) 
const createIndicator1Data = (rawData) => {
  //console.log("ind1 raw data: ", rawData)
  const countries = ['Denmark', 'Sweden', 'Norway', 'Finland','Iceland']
  let re = []
  let total = [];
  countries.forEach((country)=>{
    re[country] = []
    total[country] = []
    historicalYears.forEach((year) =>{
      re[country][year]=0
      total[country][year]=0
    })
  })
  
  
  
  const filter_fuel = [
    "Biofuels",
    "Geothermal",
    "Hydroelectricity", 
    "Solar photovoltaic", 
    "Solar thermal", 
    "Tide, wave, ocean", 
    "Wind electricity"]
  rawData.data.nces_eleproduction.forEach((item) => {
    //console.log("item: ", item)
    console.log("item.nces_fuel_type.fuel_type: ", filter_fuel.includes(item.nces_fuel_type.fuel_type))
    if (filter_fuel.includes(item.nces_fuel_type.fuel_type))
      //console.log("item.value: ", item.value)
      //console.log("re[item.nces_country]: ", re[item.nces_country.name])
      //console.log("item.nces_country: ", item.nces_country.name)
      re[item.nces_country.name][item.year] += item.value
    total[item.nces_country.name][item.year] += item.value
    //total[country][year] +=item.value
  })
  console.log("re: ", re)
  console.log("total: ", total)
}

export { createAccumulatedData, createAccumulatedHistoricalData, createIndicator1Data }