const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const classes_collection = [
    { name: 'thermodynamics-001', value: 'meen2300-001'},
    { name: 'ece-004', value: 'ece2210-004'},
    {name: 'manuf-for-eng-sys-001', value: 'meen2650-001'},
];

function get_office_hours(course) {
    if (course === 'meen2300-001') {
        let professor_hours = 'Wednesday and Friday, 1:00 - 2:15.\n\n';
        professor_hours += 'On Wednesday, the office hours are on zoom, and the password is 006740.\n';
        professor_hours += 'On Friday, the office hours are in person in MEK 3352.\n\n';

        let ta_hours = 'Thursdays from 12:00 - 1:00 on zoom.';
        return { professor_hours, ta_hours };
    }
    else if (course === 'ece2210-004') {
        let professor_hours = 'Mondays and Wednesdays after class until 12:15 pm in MEB 2278.\n\n';
        professor_hours += 'Professor Simpson also provides office hours by appointment, either in person or through zoom.\n\n';

        let ta_hours = 'Mondays:\n' +
            'TA: Emma\n' +
            '2:00 - 3:30 PM\n' +
            'Room MEB 2267 and through Zoom:\n' +
            'https://utah.zoom.us/j/5099844531\n' +
            '\n' +
            'Tuesdays:\n' +
            'TA: Rich\n' +
            '4:00 - 5:30 PM\n' +
            'Room MEB 2267\n' +
            '\n' +
            'Wednesdays:\n' +
            'TA: Md Golam Dastgir\n' +
            '2:00 - 3:30 PM\n' +
            'Room MEB 2255A\n' +
            '\n' +
            'Thursdays: \n' +
            'TA: Braden\n' +
            '2:00 - 3:30 PM\n' +
            'Room MEB 2255A\n' +
            '\n' +
            'Fridays:\n' +
            'TA: Kyle\n' +
            '12:00 - 1:30 PM\n' +
            'Room MEB 2255B\n\n' +
            'TA: Utpal\n' +
            '3:00 - 4:30 PM\n' +
            'Room MEB 2255B\n';
        return { professor_hours, ta_hours };
    }
    else if (course === 'meen2650-001') {
        let professor_hours = 'Tuesdays and Thursdays from 10:30 - 11:30 in MEK 2339\n\n'
        professor_hours += 'Professor Pan also provides office hours by appointment, either in person or through zoom.';
        let ta_hours = 'none';
        return { professor_hours, ta_hours };
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
        .addSubcommandGroup(subcommandGroup =>
            subcommandGroup
                .setName('info')
                .setDescription('get information about a class')
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
        ),



    async execute(interaction) {
        try {
            const subcommand = interaction.options.getSubcommand();
            if (subcommand === 'office-hours') {
                const course = interaction.options.getString('class');
                const office_hours = get_office_hours(course);
                const embed = new EmbedBuilder()
                    .setTitle(`Office Hours for ${course.toUpperCase()}`)
                    .setColor(0x00FF00)
                    .addFields([
                        { name: '`Professor Hours`', value: office_hours.professor_hours },
                        { name: '`TA Hours`', value: office_hours.ta_hours },
                    ]);
                await interaction.reply({embeds: [embed], ephemeral: false});
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