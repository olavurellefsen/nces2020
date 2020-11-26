import years from "./../data/years"
import mapRegionToDataRegions from "./../data/mapRegionToDataRegions"

export function createAccumulatedData(data, scenario, percentage, chartName, selectedCountries) { 
  let selectedDataRegions = [] 
  mapRegionToDataRegions.forEach((mapRegion) => {
      if(selectedCountries.includes(mapRegion.path_id)) {
      mapRegion.data_regions.forEach((dataRegion) => {
        selectedDataRegions.push(dataRegion)
      })
    }
  })

    //Useful when finding axis range
    let totalYearValues = {}
    years.forEach(year => {
        totalYearValues[year] = 0
    })
    if (!scenario) return undefined //this will be the case for sceanrio2 if only one scenario is selected
    let accumulatedData = {}
    //console.log("scenario accu****************************: ", scenario)
    //console.log("scenarioL: ", scenario.length)
    //console.log("_copy: ", scenario.substring(8, 13))
    //console.log("scenarioA: ", scenario)
    if (scenario.substring(8, 13) === "_copy")
      scenario = scenario.replace("_copy", "")
    //console.log("_copy replaced", scenario)
    //console.log("length", scenario.length)
    let scen = data.scenarios
    .find(o => o.scenario === scenario)
    //console.log("scen: ", scen)
    //console.log("all scens: ", data.scenarios)
    let ind = scen.indicators.find(o => o.indicator === chartName)
        //console.log("chartName: ", chartName)
        //console.log("all ind: ", scen.indicators)
        //console.log("ind: ", ind)
        ind.regions.forEach(r => {
            r.indicatorGroups.forEach(indicatorGroup => {
              if (!accumulatedData[indicatorGroup.indicatorGroup]) {
                accumulatedData[indicatorGroup.indicatorGroup]=[]
                years.forEach(y => {
                  accumulatedData[indicatorGroup.indicatorGroup].push({"year": y, "total": 0})
                })
              }
              if (selectedDataRegions.includes(r.region)) {//Only include selected countries
                indicatorGroup.indicatorGroupValues.forEach((value, index) => {
                  //if(indicatorGroup.indicatorGroup === "Wood chips and wood waste")
                  //if(indicatorGroup.indicatorGroup === "Straw")
                  //console.log("fff*************", accumulatedData[indicatorGroup.indicatorGroup])
                  //console.log("index: ", index)
                  if (accumulatedData[indicatorGroup.indicatorGroup][index].year !== value.year ) {
                     //Extra check we rely on the two arrays being indexed the same way
                     //console.log("accu:", accumulatedData[indicatorGroup.indicatorGroup][index].year)
                     //console.log("value: ", value.year)
                    console.log("Error in array indexing")
                  }
                  accumulatedData[indicatorGroup.indicatorGroup][index].total += percentage ? value.total/selectedCountries.length : value.total
                  totalYearValues[value.year] += percentage ? value.total/selectedCountries.length : value.total
                })
              }
            })
        })
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