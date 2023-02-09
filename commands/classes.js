const get_office_hours = require('./info/office-hours.js');
const get_final_exam = require('./info/final-exam.js');

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const classes_collection = [
    { name: 'thermodynamics-001', value: 'meen2300-001'},
    { name: 'ece-004', value: 'ece2210-004'},
    {name: 'manuf-for-eng-sys-001', value: 'meen2650-001'},
    {name: 'PDEs-004', value: 'math3150-004'},
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('classes')
        .setDescription('various utility commands for classes')
        .addSubcommandGroup(subcommandGroup => subcommandGroup.setName('info').setDescription('get information about a class')
            .addSubcommand((subcommand) => subcommand.setName('office-hours').setDescription('view office hours information for a class')
                    .addStringOption((option) => option.setName('class').setDescription('the class to view information for').setRequired(true)
                            .addChoices(
                            ...classes_collection.map(lesson => {
                                    return { name: lesson.name, value: lesson.value };
                                })
                            ),
                    ),
            )
            .addSubcommand((subcommand) => subcommand.setName('final-exam').setDescription('view final exam information for a class')
                    .addStringOption((option) => option.setName('class').setDescription('the class to view information for').setRequired(true)
                            .addChoices(
                                ...classes_collection.map(lesson => {
                                    return { name: lesson.name, value: lesson.value };
                                })
                            ),
                    ),
            ),
        )
        .addSubcommand((subcommand) => subcommand.setName('add').setDescription('add a class so you can see its channel!')
                .addStringOption((option) => option.setName('class').setDescription('the class to add').setRequired(true)
                    .addChoices(
                        ...classes_collection.map(lesson => {
                            return { name: lesson.name, value: lesson.value};
                        })
                    ),
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
            }
            else if (subcommand === 'final-exam') {
                const course = interaction.options.getString('class');
                const final_exam = get_final_exam(course);
                await interaction.reply({content: final_exam, ephemeral: false});
            }

            else if (subcommand === 'add') {
                await interaction.reply({content: 'This command is not yet implemented!', ephemeral: true});
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};