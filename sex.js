const { SlashCommandBuilder, userMention } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sex')
        .setDescription('Comando del sexo')
        .addStringOption(option =>
            option
                .setName('dureza')
                .setDescription('Dureza del sexo')
                .setRequired(true)
                .addChoices(
                    { name: 'Blando', value: 'level1' },
                    { name: 'Duro', value: 'level2' }
                )
        )
        .addUserOption(option =>
            option
                .setName('afortunado')
                .setDescription('Elige al usuario que tendrá sexo')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('mensaje')
                .setDescription('Escribe el mensaje que deseas enviar')
                .setRequired(true)
        ),
    async execute(interaction) {
        const selectedOption = interaction.options.getString('dureza');
        const user = interaction.options.getUser('afortunado');
        const message = interaction.options.getString('mensaje');

        if (user && message) {
            try {
                // Send the message to the selected user
                if (user.id === '1234992141168541816') {
                    await interaction.reply({
                        content: `No puedes tener sexo con ${userMention(user.id)}, es un bot.`,
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: `Mensaje enviado a ${userMention(user.id)}, tendrá sexo hoy.`,
                        ephemeral: false
                    });
                    await user.send({
                    content: `El que ejecutó el comando quiere coger contigo 🍆 y te manda esto: **${message}**`,
                    });
                }
                
            } catch (error) {
                console.error('Error sending message:', error);

                // Handle errors gracefully
                await interaction.reply({
                    content: 'No se pudo enviar el mensaje. Asegúrate de que el usuario tiene los mensajes directos habilitados.',
                    ephemeral: true
                });
            }
        } else {
            // Acknowledge the interaction with an error message
            await interaction.reply({
                content: 'Error al enviar el mensaje. Asegúrate de proporcionar todos los datos requeridos.',
                ephemeral: true
            });
        }
    }
};