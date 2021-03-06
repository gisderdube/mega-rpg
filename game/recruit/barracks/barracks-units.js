module.exports = {
	peasant: {
		name: "peasant",
		cost: {
			gold: 5,
		},
		requirement: {
			building: "barracks",
			level: 0,
		},
		stats: {
			health: 20,
			attack: 5,
		},
	},
	militia: {
		name: "militia",
		cost: {
			gold: 20,
			["bronze bar"]: 2,
		},
		requirement: {
			building: "barracks",
			level: 1,
		},
		stats: {
			health: 60,
			attack: 10,
		},
	},
	guardsman: {
		name: "guardsman",
		cost: {
			gold: 50,
			["iron bar"]: 4,
		},
		requirement: {
			building: "barracks",
			level: 2,
		},
		stats: {
			health: 150,
			attack: 20,
		},
	},
};