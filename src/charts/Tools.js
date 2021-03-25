import years from "./../data/years"
import historicalYears from "./../data/historicalyears"
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"
import { colors } from "./chartColors"

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
      //checks if a value is already there, and then accumulate
      if (accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)]) {
      
        //if(item.year === 1990 && item.nces_fuel_type.fuel_type === "Oil")
          //console.log("accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)].value: ", accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)].value)
        accumulatedHistoricalData[item.nces_fuel_type.fuel_type][historicalYears.indexOf(item.year)].total += item.value
        totalHistoricalYearValues[item.year] += item.value
      } else {
        accumulatedHistoricalData[item.nces_fuel_type.fuel_type].push({"year": item.year, "total": item.value})
        totalHistoricalYearValues[item.year] += item.value
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
//console.log("accumulatedHistoricalData: ", accumulatedHistoricalData)
  return [accumulatedHistoricalData,totalHistoricalYearValues, fuelTypes]
}
/* const createAccumulatedHistoricalPerCountryData = (data, chartName, selectedCountries) => {
  let ret = 0
  console.log("data: ", data)
  console.log("chartName: ", chartName)
  console.log("selectedCountries: ", selectedCountries)

  console.log("ret: ", ret)
  return ret
} */

const fixedcolorCountries = [ 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland']
const countryColors = () => {
  let ret = colors.slice(0, 4)
  fixedcolorCountries.forEach((country, index)=>{
    ret[country] = colors[index]
  })
  return ret
}
//Share of RE in electricity consumption (theme: Transforming the power sector) 
const createIndicator1Data = (rawData, selectedCountries) => {
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.historical_data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })
  const countries = ['Denmark', 'Sweden', 'Norway', 'Finland','Iceland']
  let re = []
  let total = [];
  countries.forEach((country)=>{
    re = []
    total = []
    historicalYears.forEach((year) =>{
      re[year-historicalYears[0]]=0
      total[year-historicalYears[0]]=0
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
    if (selectedDataRegions.includes(item.nces_country.name)) {
      if (filter_fuel.includes(item.nces_fuel_type.fuel_type)) {
        re[item.year-historicalYears[0]] += item.value
      }
      total[item.year-historicalYears[0]] += item.value
    }
    
  })
  let ret = []
  re.forEach((item, index)=>{
    ret[index] = {
      "x": index + 1990,
      "y": item/total[index],
    }
  })
  return ret
}

//CO2 emissions (Mt CO2) from power and district heating  
const createIndicator2Data = (rawData, selectedCountries) => {
  const countries = ['Denmark', 'Sweden', 'Norway', 'Finland', 'Iceland']
  let selectedDataRegions = []
  
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.historical_data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    } 
  })
  let re = []
  let total = []
  
  countries.forEach((country)=>{
    if (selectedDataRegions.includes(country)) {
      re[country] = []
      total[country] = []
      historicalYears.forEach((year) =>{
        re[country][year-historicalYears[0]]=0
        total[year-historicalYears[0]]=0
      })
    }
  })
  const filter_src_crf = [
    "Fuel combustion in public electricity and heat production"
  ]
  const filter_airpol = [
    "Greenhouse gases (CO2, N2O in CO2 equivalent, CH4 in CO2 equivalent, HFC in CO2 equivalent, PFC in CO2 equivalent, SF6 in CO2 equivalent, NF3 in CO2 equivalent)",
    "Carbon dioxide"
  ]
  let ret = {}
  let countryLegends = []
  rawData.data.nces_ghgemission.forEach((item) => {
    if (filter_src_crf.includes(item.src_crf) && filter_airpol.includes(item.air_pol)) {
      if(historicalYears.includes(item.year) && selectedDataRegions.includes(item.nces_country.name)) {
        if(Object.keys(ret).includes(item.nces_country.name)) {
          if(ret[item.nces_country.name][historicalYears.indexOf(item.year)]) {
            ret[item.nces_country.name][historicalYears.indexOf(item.year)].total += isNaN(item.value) ? 0 : item.value
          } else {
            ret[item.nces_country.name].push({"year": item.year, "total": isNaN(item.value) ? 0 : item.value})
          }
        } else {
          ret[item.nces_country.name] = []
          ret[item.nces_country.name].push({"year": item.year, total: isNaN(item.value) ? 0 : item.value})
        }
        
      total[item.year-historicalYears[0]] += isNaN(item.value) ? 0 : item.value
      if (countryLegends.indexOf(item.nces_country.name) === -1) {
        //console.log("country: ", item.nces_country.name)
        countryLegends.push(item.nces_country.name)
      }
        
      }
    }
  })
  return [ret, total, selectedDataRegions, countryColors(selectedDataRegions)]
} 

//6. CO2 emissions (Mt CO2) from the industrial sector (Decarbonisation of industry)  
const createIndicator6Data = (rawData, selectedCountries) => {
  const countries = ['Denmark', 'Sweden', 'Norway', 'Finland', 'Iceland']
  let selectedDataRegions = []
  
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.historical_data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    } 
  })
  let re = []
  let total = []
  
  countries.forEach((country)=>{
    if (selectedDataRegions.includes(country)) {
      re[country] = []
      total[country] = []
      historicalYears.forEach((year) =>{
        re[country][year-historicalYears[0]]=0
        total[year-historicalYears[0]]=0
      })
    }
  })
  const filter_src_crf = [
    "Industrial processes and product use",
    "Other product manufacture and use",
    "Other industrial process and product use",
  ]
  const filter_airpol = [
    "Greenhouse gases (CO2, N2O in CO2 equivalent, CH4 in CO2 equivalent, HFC in CO2 equivalent, PFC in CO2 equivalent, SF6 in CO2 equivalent, NF3 in CO2 equivalent)",
    "Carbon dioxide"
  ]
  let ret = {}
  let countryLegends = []
  rawData.data.nces_ghgemission.forEach((item, i) => {
    if (filter_src_crf.includes(item.src_crf) && filter_airpol.includes(item.air_pol)) {
      if(historicalYears.includes(item.year) && selectedDataRegions.includes(item.nces_country.name)) {
        if(Object.keys(ret).includes(item.nces_country.name)) {
          if(ret[item.nces_country.name][historicalYears.indexOf(item.year)]) {
            ret[item.nces_country.name][historicalYears.indexOf(item.year)].total += isNaN(item.value) ? 0 : item.value
          } else {
            ret[item.nces_country.name].push({"year": item.year, "total": isNaN(item.value) ? 0 : item.value})
          }
        } else {
          ret[item.nces_country.name] = []
          ret[item.nces_country.name].push({"year": item.year, total: isNaN(item.value) ? 0 : item.value})
        }
      /* if (item.year >= 1995 && item.nces_country.name == "Finland") {
        console.log("item" + i + ": ", item)
        console.log("ret" + i + ": ", ret)
      } */
        
      total[item.year-historicalYears[0]] += isNaN(item.value) ? 0 : item.value
      if (countryLegends.indexOf(item.nces_country.name) === -1) {
        //console.log("country: ", item.nces_country.name)
        countryLegends.push(item.nces_country.name)
      }
        
      }
    }
  })
  return [ret, total, selectedDataRegions, countryColors(selectedDataRegions)]
} 

//9. CO2 emissions (Mt CO2) from road transport (Green mobility)
const createIndicator9Data = (rawData, selectedCountries) => {
  const countries = ['Denmark', 'Sweden', 'Norway', 'Finland', 'Iceland']
  let selectedDataRegions = []
  
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.historical_data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    } 
  })
  let re = []
  let total = []
  
  countries.forEach((country)=>{
    if (selectedDataRegions.includes(country)) {
      re[country] = []
      total[country] = []
      historicalYears.forEach((year) =>{
        re[country][year-historicalYears[0]]=0
        total[year-historicalYears[0]]=0
      })
    }
  })
  const filter_src_crf = [
    "Fuel combustion in road transport",
  ]
  const filter_airpol = [
    "Greenhouse gases (CO2, N2O in CO2 equivalent, CH4 in CO2 equivalent, HFC in CO2 equivalent, PFC in CO2 equivalent, SF6 in CO2 equivalent, NF3 in CO2 equivalent)",
    "Carbon dioxide"
  ]
  let ret = {}
  let countryLegends = []
  rawData.data.nces_ghgemission.forEach((item, i) => {
    if (filter_src_crf.includes(item.src_crf) && filter_airpol.includes(item.air_pol)) {
      if(historicalYears.includes(item.year) && selectedDataRegions.includes(item.nces_country.name)) {
        if(Object.keys(ret).includes(item.nces_country.name)) {
          if(ret[item.nces_country.name][historicalYears.indexOf(item.year)]) {
            ret[item.nces_country.name][historicalYears.indexOf(item.year)].total += isNaN(item.value) ? 0 : item.value
          } else {
            ret[item.nces_country.name].push({"year": item.year, "total": isNaN(item.value) ? 0 : item.value})
          }
        } else {
          ret[item.nces_country.name] = []
          ret[item.nces_country.name].push({"year": item.year, total: isNaN(item.value) ? 0 : item.value})
        }
        
      total[item.year-historicalYears[0]] += isNaN(item.value) ? 0 : item.value
      if (countryLegends.indexOf(item.nces_country.name) === -1) {
        //console.log("country: ", item.nces_country.name)
        countryLegends.push(item.nces_country.name)
      }
        
      }
    }
  })
  //console.log("ret", ret)
  return [ret, total, selectedDataRegions, countryColors(selectedDataRegions)]
} 

export { 
  createAccumulatedData, 
  createAccumulatedHistoricalData, 
  createIndicator1Data, 
  createIndicator2Data, 
  createIndicator6Data,
  createIndicator9Data }