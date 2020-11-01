import years from "./../data/years"
import mapRegions from "./../data/mapRegionToDataRegions"
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

function convertToLongName(country) {
    let selectedCountry = ''
        switch(country) {
          case 'dk': 
            selectedCountry = 'DKE'
            break
          case 'no':
            selectedCountry = 'NO1'
            break
          case 'se':
            selectedCountry = 'SW1'
            break
          default:
            console.log('Unknown selected country')
            break
        }
        return selectedCountry
  }
  
//const years = [2010,2020,2030,2040, 2050]
export function createAccumulatedData(data, scenario, percentage, chartName, selectedCountries) {
  //console.log("selectedCountries: ", selectedCountries)  
  const selectedCountriesLongNames = selectedCountries.map(convertToLongName)
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      //console.log("path_id: ", mapRegion.path_id)
      mapRegion.data_regions.forEach((dataRegion) => {
        //console.log("dataRegion: ", dataRegion)
        selectedDataRegions.push(dataRegion)
      })
    }
  })
  console.log("sdrs: ", selectedDataRegions)

    //Useful when finding axis range
    let totalYearValues = {}
    years.forEach(year => {
        totalYearValues[year] = 0
    })
    if (!scenario) return undefined //this will be the case for sceanrio2 if only one scenario is selected
    let accumulatedData = {}
    console.log("chartName: ", chartName)
    console.log("data.scenarios: ", data.scenarios)
    console.log("scenario: ", scenario)
    data.scenarios
        .find(o => o.scenario === scenario)
        .indicators.find(o => o.indicator === chartName)
        .regions.forEach(r => {
            r.indicatorGroups.forEach(indicatorGroup => {
              if (!accumulatedData[indicatorGroup.indicatorGroup]) {
                accumulatedData[indicatorGroup.indicatorGroup]=[]
                years.forEach(y => {
                  accumulatedData[indicatorGroup.indicatorGroup].push({"year": y, "total": 0})
                })
              }
              if (selectedDataRegions.includes(r.region)) {//Only include selected countries
                console.log("region*************************************************: ", r.region)
                indicatorGroup.indicatorGroupValues.forEach((value, index) => {
                  //if(indicatorGroup.indicatorGroup === "Wood chips and wood waste")
                  //if(indicatorGroup.indicatorGroup === "Straw")
                    console.log(indicatorGroup.indicatorGroup + " value: ", value)
                  if (accumulatedData[indicatorGroup.indicatorGroup][index].year !== value.year ) {
                     //Extra check we rely on the two arrays being indexed the same way
                    console.log("indicatorGroup.indicatorGroup: ",indicatorGroup.indicatorGroup)
                    console.log("index: ", index)
                    console.log("accumulatedData[indicatorGroup.indicatorGroup][index].year: ", accumulatedData[indicatorGroup.indicatorGroup][index].year)
                    console.log("value.year: ", value.year)
                    console.log("Error in array indexing")
                  }
                  accumulatedData[indicatorGroup.indicatorGroup][index].total += percentage ? value.total/selectedCountries.length : value.total
                  totalYearValues[value.year] += percentage ? value.total/selectedCountries.length : value.total
                })
              }
            })
        })
        console.log("accumulatedData: ", accumulatedData)
        console.log("totalYearValues: ", totalYearValues)
        return [accumulatedData, totalYearValues]
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