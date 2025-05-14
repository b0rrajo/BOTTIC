const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Modo de prueba de aplicación')
        .addStringOption(option =>
            option
                .setName('option')
                .setDescription('Elige una opción')
                .setRequired(true)
                .addChoices(
                    { name: 'Ping', value: 'ping', description: 'Responder con Pong' },
                    { name: 'Status', value: 'status', description: 'Cambiar el estado del bot' }
                )
        ),

    async execute(interaction) {
        if (interaction.channel.type === 'DM') {
            // Comandos permitidos en MD
            if (interaction.options.getString('option') === 'ping') {
                await interaction.reply({ content: 'Pong! (desde MD)', ephemeral: true });
                console.log('Ping command executed in DM.');
            } else {
                await interaction.reply({ content: 'Este comando no está disponible en mensajes directos.', ephemeral: true });
            }
            return;
        }
        if (!interaction.channel.type === 'GUILD_TEXT') {
            const selectedOption = interaction.options.getString('option');
            switch (selectedOption) {
                case 'ping':
                    await interaction.reply({ content: 'Pong!', ephemeral: true });
                    console.log('Ping command executed.');
                    break;

                case 'status':
                    console.log('Status command executed.');

                    // Opciones del menú
                    const statusMenu = new StringSelectMenuBuilder()
                        .setCustomId('status_select')
                        .setPlaceholder('Selecciona un estado')
                        .addOptions(
                            { label: 'Online', value: 'online' },
                            { label: 'Do Not Disturb', value: 'dnd' },
                            { label: 'Idle', value: 'idle' },
                            { label: 'Offline', value: 'offline' }
                        );

                    const row = new ActionRowBuilder().addComponents(statusMenu);

                    await interaction.reply({
                        content: 'Selecciona el estado que deseas establecer:',
                        components: [row],
                        ephemeral: true
                    });

                    // Crear un collector para manejar la interacción del menú select
                    const filter = i => i.customId === 'status_select' && i.user.id === interaction.user.id;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

                    collector.on('collect', async i => {
                        const selectedStatus = i.values[0];

                        // Actualizar el estado del bot
                        await interaction.client.user.setPresence({
                            status: selectedStatus
                        });

                        await i.update({
                            content: `Estado del bot actualizado a: **${selectedStatus}**`,
                            components: []
                        });

                        console.log(`Estado del bot actualizado a: ${selectedStatus}`);
                    });

                    collector.on('end', collected => {
                        if (collected.size === 0) {
                            interaction.editReply({
                                content: 'No seleccionaste ningún estado.',
                                components: []
                            });
                        }
                    });
                    break;

                default:
                    await interaction.reply({ content: 'Opción no válida.', ephemeral: true });
                    console.log('Opción desconocida ejecutada.');
            }
        }
        console.log('Comando ejecutado.');
        console.log(`Comando: ${interaction.commandName}`);
    },
};