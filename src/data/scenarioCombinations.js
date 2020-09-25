export default {scenarioCombinations : {scenarioOptions : [
  { "id": 0, "name": "ONTIMESBase_2209", "nameNoOptions": "ONTIMESBase_2209", "short_description": "TBase", "ultra_short_description": "TB","desc":"nordic_tech_desc", "ccs": false, "bio": false },
  { "id": 1, "name": "Nordic_Tech_bio", "nameNoOptions": "Nordic_Tech", "short_description": "Tech Focus", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "ccs": false, "bio": true },
  { "id": 2, "name": "Nordic_Tech_ccs", "nameNoOptions": "Nordic_Tech", "short_description": "Tech Focus", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "ccs": true, "bio": false },
  { "id": 3, "name": "Nordic_Tech_ELC", "nameNoOptions": "Nordic_Tech", "short_description": "Tech Focus", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "ccs": true, "bio": true },
  
  ],
  regionOptions : [
  { "id": 0, "name": "Denmark", "country": "Denmark", "short_description": "Denmark", "ultra_short_description": "Denmark" },
  { "id": 1, "name": "Norway", "country": "Norway", "short_description": "Norway", "ultra_short_description": "Norway" },
  { "id": 2, "name": "Sweden", "country": "Sweden", "short_description": "Sweden", "ultra_short_description": "Sweden" }
                 ], 
  optionsAvailable:  {
         "Nordic_Tech": {"ccs": true, "bio": true, "opt2": true, "opt3": true},
         "Nordic_ShiftAvoid": {"ccs": true, "bio": true, "opt2": true, "opt3": true},
      }
    }
  };