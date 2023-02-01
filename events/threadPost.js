const { Events, EmbedBuilder} = require('discord.js');

const tagToChannel_obj = {
    //    Tag Id                Channel Id
    "1062055127277654026": "1054199680260657232", // Thermodynamics
    "1062054945580384346": "1054199694009573486", // ECE
    "1062055029315473528": "1062039365762691072", // PDEs
    "1062055360875208764": "1062039712556130434", // PDEs + Vector Calc
    "1062056054827008112": "1070016071232393217", // Statistics
    "1062055186144698491": "1054199740226613258", // Manufacturing
    "1062055654933676142": "1062046410587000942", // Fluid Mechanics
    "1063281491330736158": "1063274753529495632", // Numerical Methods
    "1067912348679012362": "1065308478236799128", // Lin Al + ODEs
    "1066530895680520252": "1066526891567222844", // Materials Science
    "1062055732251476090": "1067910754960949319", // Dynamics
    "1070448658409066506": "1068279559239237652", // Dev Channel
}
const tagToChannel = new Map(Object.entries(tagToChannel_obj));

module.exports = {
    name: Events.ThreadCreate,
    async execute(thread) {
        try {
            async function sendMsg(channel_id, embed) {
                await thread.client.channels.fetch(channel_id).then(channel => {
                    channel.send({embeds: [embed]});
                });
            }

            const embed = new EmbedBuilder()
                .setTitle(`New Homework Question!`)
                .setDescription(`${thread.name}`)
                .setColor(0x36393F)
                .setTimestamp(Date.now())
                .setThumbnail('https://cdn.discordapp.com/attachments/1068279559239237652/1070017063856377956/5-53868_question-mark-clipart-question-mark-clip-art-question-red-question-mark-png.png')
                .addFields([
                    {
                        name: 'To view this question, click the link below:',
                        value: `[Click Here](${thread.url})`,
                    },
                ])

            const thread_tag = thread.appliedTags[0]; // Get the tag of the thread
            const channel_id = tagToChannel.get(thread_tag); // Get the channel id from the tag
            await sendMsg(channel_id, embed);
        }
        catch (error) {
            console.error(error);
        }
    },
}