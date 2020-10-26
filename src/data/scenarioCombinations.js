export default {
  scenarioCombinations : 
    {
      scenarioOptions : [
        { "id": 0, "name": "ONTIMES_2209", "nameNoOptions": "ONTIMES_2209", "short_description": "TBase", "ultra_short_description": "TB","desc":"times_desc", "cns": false, "bio": false },
        { "id": 1, "name": "ONTIMES_2209_cns_bio", "nameNoOptions": "ONTIMES_2209", "short_description": "Tech Focus", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": false, "bio": true },
        { "id": 2, "name": "ONTIMES_2209_cns", "nameNoOptions": "ONTIMES_2209", "short_description": "Tech Focus", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": true, "bio": false },
        { "id": 3, "name": "ONTIMES_2209_bio", "nameNoOptions": "ONTIMES_2209", "short_description": "Tech Focus", "ultra_short_description": "Tech","desc":"nordic_tech_desc", "cns": true, "bio": true },
      ],
      regionOptions : [
        { "id": 0, "name": "Denmark", "country": "Denmark", "short_description": "Denmark", "ultra_short_description": "Denmark" },
        { "id": 1, "name": "Norway", "country": "Norway", "short_description": "Norway", "ultra_short_description": "Norway" },
        { "id": 2, "name": "Sweden", "country": "Sweden", "short_description": "Sweden", "ultra_short_description": "Sweden" }
      ], 
      optionsAvailable:  {
        "ONTIMES_2209": {"cns": true, "bio": true},
      }
    }
  };