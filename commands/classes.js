const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const classes_collection = [
    { name: 'thermodynamics-001', value: 'meen2300-001'},
    { name: 'ece-001', value: 'ece2210-001'},
];

function get_office_hours(course) {
    if (course === 'meen2300-001') {
        let info = "```PROFESSOR HOURS\n"
        info += 'Wednesday and Friday, 1:00 - 2:15.\n';
        info += 'On Wednesday, the office hours are on zoom, and the password is 006740.\n';
        info += 'On Friday, the office hours are in person in MEK 3352.\n\n';
        info += "TA HOURS\n";
        info += 'Thursdays from 12:00 - 1:00 on zoom.\n```';
        return info;
    }
    if (course === 'ece2210-001') {
        let info = "```PROFESSOR HOURS\n"
        info += 'Mondays and Wednesdays after class until 12:15 pm in MEB 2278.\n';
        info += 'Professor Simpson also provides office hours by appointment, either in person or through zoom.\n\n';
        info += "TA HOURS\n";
        info += 'Mondays:\n' +
            '\t2:00 - 3:30 PM\n' +
            '\t\tEmma\n' +
            '\t\tRoom MEB 2267 and through Zoom:\n' +
            '\t\thttps://utah.zoom.us/j/5099844531 Links to an external site. \n' +
            '\t\tMeeting ID: 509 984 4531\n' +
            '\n' +

            'Tuesdays:\n' +
            '\t4:00 - 5:30 PM\n' +
            '\t\tRich\n' +
            '\t\tRoom MEB 2267\n' +
            '\n' +

            'Wednesdays:\n' +
            '\t2:00 - 3:30 PM\n' +
            '\t\tMd Golam Dastgir\n' +
            '\t\tRoom MEB 2255A\n' +
            '\n' +

            'Thursdays: \n' +
            '\t2:00 - 3:30 PM\n' +
            '\t\tBraden\n' +
            '\t\tRoom MEB 2255A\n' +
            '\n' +

            'Fridays:\n' +
            '\t12:00 - 1:30 PM\n' +
            '\t\tKyle\n' +
            '\t\tRoom MEB 2255B\n' +
            '\t\t3:00 - 4:30 PM\n' +
            '\t\tUtpal\n' +
            '\t\tRoom MEB 2255A in Week 1 and MEB 2255B thereafter\n```';
        return info;
    }
}

function get_final_exam(course) {
    if (course === 'meen2300-001') {
        let info = "Placeholder\n";
        return info;
    }
    if (course === 'ece2210-001') {
        let info = "Placeholder\n";
        return info;
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('classes')
        .setDescription('various utility commands for classes')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('office-hours')
                .setDescription('view office hours information for a class')
                .addStringOption((option) =>
                    option
                        .setName('class')
                        .setDescription('the class to view information for')
                        .setRequired(true)
                        .addChoices(
                        ...classes_collection.map(lesson => {
                                return { name: lesson.name, value: lesson.value };
                            })
                        )
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('final-exam')
                .setDescription('view final exam information for a class')
                .addStringOption((option) =>
                    option
                        .setName('class')
                        .setDescription('the class to view information for')
                        .setRequired(true)
                        .addChoices(
                            ...classes_collection.map(lesson => {
                                return { name: lesson.name, value: lesson.value };
                            })
                        )
                )
        ),



    async execute(interaction) {
        try {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'office-hours') {
                const course = interaction.options.getString('class');
                const office_hours = get_office_hours(course);
                await interaction.reply({content: office_hours, ephemeral: false});
            } else if (subcommand === 'final-exam') {
                const course = interaction.options.getString('class');
                const final_exam = get_final_exam(course);
                await interaction.reply({content: final_exam, ephemeral: false});
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};