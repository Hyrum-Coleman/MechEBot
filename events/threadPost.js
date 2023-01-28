const { Events, EmbedBuilder} = require('discord.js');


module.exports = {
    name: Events.ThreadCreate,
    async execute(thread) {
        try {
            async function sendMsg(channel_id, embed) {
                await thread.client.channels.fetch(channel_id).then(channel => {
                    channel.send({embeds: [embed]});
                });
            }
            // function getThreadMessage() {
            //     thread.messages.fetch(thread.messages.lastMessageId).then(message => {
            //
            //         let lastMessage = message
            //     });
            //     return lastMessage
            // }

            // setTimeout(() => {
            //     const threadMessage = getThreadMessage();

            const embed = new EmbedBuilder()
                .setTitle(`New Homework Question!`)
                .setDescription(`${thread.name}`)
                .setColor(0x36393F)
                .setTimestamp(Date.now())
                .addFields([
                    {
                        name: 'To answer this question, click the link below:',
                        value: `[Click Here](${thread.url})`,
                    },
                ])

            const thread_tag = thread.appliedTags[0];
            if (thread_tag === null) {
            } else if (thread_tag === '1062055127277654026') {
                let channel_id = '1054199680260657232'; // Thermodynamics
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1062054945580384346') {
                let channel_id = '1054199694009573486'; // ECE
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1062055029315473528') {
                let channel_id = '1062039365762691072'; // PDEs
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1067912348679012362') {
                let channel_id = '1062039712556130434'; // PDEs + Vector Calc
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1062056054827008112') {
                let channel_id = '1054199720781807686'; // Statistics
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1062055186144698491') {
                let channel_id = '1054199740226613258'; // Manufacturing
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '') {
                let channel_id = '1062055654933676142'; // Fluids
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1062055360875208764') {
                let channel_id = '1063274753529495632'; // Numerical Methods
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1063281491330736158') {
                let channel_id = '1065308478236799128'; // ODEs + Lin Al
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1062055732251476090') {
                let channel_id = '1066526891567222844'; // Materials Science
                await sendMsg(channel_id, embed);
            } else if (thread_tag === '1066530895680520252') {
                let channel_id = '1067910754960949319'; // Dynamics
                await sendMsg(channel_id, embed);
            } else {
                return;
            }
            // },  1000)

        }
        catch (error) {
            console.error(error);
        }
    },
}