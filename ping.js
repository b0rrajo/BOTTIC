const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Comando de prueba para verificar el funcionamiento del bot."),

    async execute(interaction) {
        await interaction.reply({ content: "Pong!", ephemeral: true });
        console.log("Ping command executed.");
    },
};
