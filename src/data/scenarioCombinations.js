export default {
  scenarioCombinations : 
    {
      scenarioOptions : [ 
        { 
          "id": 0, 
          "name": "CNS", //name must follow optionAvailable order hence _cns_bio, not _bio_cns
          "nameNoOptions": "CNS", 
          "short_description": "TBase", //for translation: must be defined in src/translations/
          "ultra_short_description": "B1",
          "desc":"times_desc", //used for mouseover in scenario list, for translation: must be defined in src/translations/
          "cns": false, //must correspond to name
          "bio": false  //must correspond to name
        },
        { "id": 1, "name": "CNS_bio", "nameNoOptions": "CNS", "short_description": "cns + bio", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": true, "bio": true },
        { 
          "id": 3, 
          "name": "CNS_copy", //name must follow optionAvailable order hence _cns_bio, not _bio_cns
          "nameNoOptions": "CNS_copy", 
          "short_description": "TBase2", //for translation: must be defined in src/translations/
          "ultra_short_description": "B2",
          "desc":"times_desc", //used for mouseover in scenario list, for translation: must be defined in src/translations/
          "cns": false, //must correspond to name
          "bio": false  //must correspond to name
        },
        { "id": 5, "name": "CNS_copy_Bio", "nameNoOptions": "CNS_copy", "short_description": "cns + bio", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": true, "bio": true },
        
      ], 
      optionsAvailable:  { //option names are defined in src/translations/
        "CNS": {"cns": false, "bio": true, "opt2": false, "opt3": false},
        "CNS_copy": {"cns": false, "bio": true, "opt2": false, "opt3": false},
      }
    }
  };