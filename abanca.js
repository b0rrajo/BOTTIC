const{SlashCommandBuilder, userMention}=require("discord.js");

module.exports={
    data:new SlashCommandBuilder()
        .setName("abanca")
        .setDescription("Haz ping a Borrajo para que le devuelva el dinero a Abanca"),
    
    async execute(interaction){
        const user = '<@!698132997601361970>'; // Reemplaza con el ID del usuario que quieres mencionar
        const sender = interaction.user;
        const senderMention = `<@${sender.id}>`; // Mención del usuario que ejecuta el comando
        
        await interaction.reply({content:`${senderMention} le recuerda a ${user} que le devuelva el dinero a Abanca, puto chorizo xd`,ephemeral:false});
        console.log("Abanca command executed.");
    },
};