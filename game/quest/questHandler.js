const allQuests = require("./all-quests");

const questHandler = async (user) => {
    // If there are no quests available
    if(user.quests.length === 0) return "You currently have no available quests. You may get new ones when you explore new areas or obtain specific items or building levels";

    // If the user only has one quest available, execute this quest
    if(user.quests.length === 1) {
        let quest = "";
        user.quests[0].questKeySequence.forEach(questKey => {
            quest = quest ? quest[questKey] : allQuests[questKey];
        });

        const questResponse = await quest.execute(user);

        // Show quest description
        if(!questResponse) return showQuestDescription(quest);
        else return showQuestRewards(quest);
    }
};

// Change this to an embed
const showQuestDescription = (quest) => {
    const msg = `**__${quest.name}:__**\n\n__Description:__\n${quest.description}\n\n__Objective:__\n${quest.objective}\n\n__Rewards__:\n${quest.reward}`;
    return msg;
};

// Change this to an embed
const showQuestRewards = (quest) => {
    const msg = `Congratulations you have completed ${quest.name}! ${quest.winDescription || ""}\n\n__Rewards:__\n${quest.reward}`;
    return msg;
};


module.exports = questHandler;