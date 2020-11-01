export default {
  scenarioCombinations : 
    {
      scenarioOptions : [ 
        { 
          "id": 0, 
          "name": "ONTIMES_2209", //name must follow optionAvailable order hence _cns_bio, not _bio_cns
          "nameNoOptions": "ONTIMES_2209", 
          "short_description": "TBase", //for translation: must be defined in src/translations/
          "ultra_short_description": "B",
          "desc":"times_desc", //used for mouseover in scenario list, for translation: must be defined in src/translations/
          "cns": false, //must correspond to name
          "bio": false  //must correspond to name
        },
        { "id": 1, "name": "ONTIMES_2209_cns_bio", "nameNoOptions": "ONTIMES_2209", "short_description": "cns + bio", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": false, "bio": true },
        { "id": 2, "name": "ONTIMES_2209_cns", "nameNoOptions": "ONTIMES_2209", "short_description": "cns", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": true, "bio": false },
        { "id": 3, "name": "ONTIMES_2209_bio", "nameNoOptions": "ONTIMES_2209", "short_description": "bio", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": true, "bio": true },
      ], 
      optionsAvailable:  { //option names are defined in src/translations/
        "ONTIMES_2209": {"cns": true, "bio": true, "opt2": false, "opt3": false},
      }
    }
  };