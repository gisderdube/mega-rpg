const User = require("../../models/User");
const { getLocationIcon, getDungeonKeyIcon } = require("../_CONSTS/icons");
const { worldLocations } = require("../_CONSTS/explore");
const { onCooldown } = require("../_CONSTS/cooldowns");
const getWeaponInfo = (weapon, num = null)=>{
    const weaponInformation = {
        "slash":{
            name: "slash",
            type: "attack",
            answer: null,
            chanceforSuccess: 0.95,
            damage: 1,
            description: "\n95% chance of slashing the enemy",
        },
        "strike":{
            name: "strike",
            type: "attack",
            answer: null,
            chanceforSuccess: 0.80,
            damage: 2,
            description: "\n80% chance of causing a strong attack",
        },
        "critical":{
            name: "critical",
            type: "attack",
            answer: null,
            chanceforSuccess: 0.40,
            damage: 4,
            description: "\n40% chance of causing a brutal attack",
        },
        "disarm":{
            name: "disarm",
            type: "disarm",
            answer: null,
            chanceforSuccess: 0.25,
            damage: 0.2,
            description: "\n25% chance of lowering boss attack",
        },
        "heal":{
            name: "heal",
            type: "heal",
            answer: null,
            chanceforSuccess: 0.90,
            damage: 0.25,
            description: "\n90% chance of healing a teammate",
        },
        "poke":{
            name: "poke",
            type: "attack",
            answer: null,
            chanceforSuccess: 0.1,
            damage: 0.05,
            description: "\n10% chance of poking the enemy",
        },
    };
    if (num) {
      const alphabet = ["a", "b", "c", "d", "e"];
        const shuffled = Object
            .entries(weaponInformation)
            .sort(() => 0.5 - Math.random())
            .slice(0, num)
            .reduce((obj, [k, v]) => ({
                ...obj,
                [k]: v,
            }), {});
            // Sorry
            for (const i in Object.keys(shuffled)) {
              shuffled[Object.keys(shuffled)[i]].answer = alphabet[i];
            }
        return shuffled;
      }
    if (weapon) {
      return weaponInformation[weapon];
    }
    return weaponInformation;
};
const dungeonStartAllowed = (user)=>{
    // checks for cooldown
    const cooldownInfo = onCooldown("dungeon", user);
    if (cooldownInfo.response) {
        return cooldownInfo.embed;
    }

    const { currentLocation } = user.world;
    const locationIcon = getLocationIcon(currentLocation);
    const dungeonInformation = Object.values(worldLocations[currentLocation].places).find(p=>{
        return p.type === "dungeon";
    });

    if (!user.world.locations[currentLocation].explored.includes([dungeonInformation.name])) {
        return `You haven't found any dungeon in ${locationIcon} ${currentLocation}`;
    }

    // Checks if user has the correct key
    const requiredDungeonKey = dungeonInformation.requires;
    if (!user.hero.dungeonKeys[requiredDungeonKey]) {
        let response = `You try to enter ${dungeonInformation.name}, but you don't have the required ${getDungeonKeyIcon(requiredDungeonKey)} ${requiredDungeonKey} to proceed. `;
        if (user.hero.rank < 2) {
            response += `Try defeating the miniboss in ${locationIcon} ${currentLocation} to obtain the required dungeon key`;
        }
        return response;
    }

    if (user.hero.currentHealth < user.hero.health * 0.05) {
        let feedback = `Your hero's health is too low (**${user.hero.currentHealth}**)`;
        if (user.hero.rank < 2) {
            feedback += "\n You can `!build` a shop and `!buy` potions";
        }
        return feedback;
    }
    return null;
};
const validateHelper = async discordId =>{
    const user = await User.findOne({ "account.userId": discordId }).lean();
    return user.hero.currentHealth > user.hero.health * 0.05;
};

const randomIntBetweenMinMax = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

module.exports = { getWeaponInfo, dungeonStartAllowed, validateHelper, randomIntBetweenMinMax };