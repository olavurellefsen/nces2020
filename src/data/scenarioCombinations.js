export default { 
	scenarioCombinations : 
		{ 
			scenarioOptions : [ 
				{ 
					"id": 0, 
					"name": CNS_copy, 
					"nameNoOptions": CNS, 
					"short_description": CNS, 
					"ultra_short_description": C0, 
					"desc": times_desc, 
					"opt0": false, 
					"opt1": false, 
					"opt2": false, 
					"opt3": false, 
				}, 
				{ 
					"id": 1, 
					"name": CNS, 
					"nameNoOptions": CNS, 
					"short_description": CNS, 
					"ultra_short_description": C1, 
					"desc": times_desc, 
					"opt0": false, 
					"opt1": false, 
					"opt2": false, 
					"opt3": false, 
				}, 
				{ 
					"id": 2, 
					"name": CNS_Bio, 
					"nameNoOptions": CNS, 
					"short_description": CNS + Bio, 
					"ultra_short_description": C2, 
					"desc": times_desc, 
					"opt0": false, 
					"opt1": true, 
					"opt2": false, 
					"opt3": false, 
				}, 
				{ 
					"id": 3, 
					"name": CNS_copy_Bio, 
					"nameNoOptions": CNS, 
					"short_description": CNS + Bio, 
					"ultra_short_description": C3, 
					"desc": times_desc, 
					"opt0": false, 
					"opt1": true, 
					"opt2": false, 
					"opt3": false, 
				}, 
			], 
			optionsAvailable: 
				"CNS_copy": { 
					"opt0": false,
					"opt1": true,
					"opt2": false,
					"opt3": false,
					}, 
				"CNS": { 
					"opt0": false,
					"opt1": true,
					"opt2": false,
					"opt3": false,
					}, 
		} 
	};