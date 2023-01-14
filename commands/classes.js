const { SlashCommandBuilder } = require('discord.js');
const classes_collection = [
    { name: 'thermodynamics-001', value: 'meen2300-001'},
    { name: 'fluid-mechanics-001', value: 'meen2400-001'},
];


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
                console.log(course);
                const office_hours = 'information about office hours';
                await interaction.reply({content: office_hours, ephemeral: false});
            } else if (subcommand === 'final-exam') {
                const course = interaction.options.getString('class');
                console.log(course);
                const final_exam = 'information about final exam';
                await interaction.reply({content: final_exam, ephemeral: false});
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};