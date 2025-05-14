const {SlashCommandBuilder, userMention}=require('discord.js');


module.exports={
    data: new SlashCommandBuilder()
        .setName('replydm')
        .setDescription('Responde a un mensaje específico de un usuario al MD')
        .addUserOption(option=>
            option
                .setName('user')
                .setDescription('Elige un usuario')
                .setRequired(true)
        )
        .addStringOption(option=>
            option
                .setName('message')
                .setDescription('Escribe el mensaje que deseas enviar')
                .setRequired(true)
        ),
    async execute(interaction){
        const user=interaction.options.getUser('user');
        const message=interaction.options.getString('message');
        if (user.id === '1234992141168541816') {
            await interaction.reply({
                content: `No puedes enviar un mensaje a ${userMention(user.id)}, es un bot.`,
                ephemeral: true
            });
        }
        else {
            await interaction.reply({content:`Mensaje enviado a ${user.tag}`,ephemeral:true});
            if(user && message){
                await user.send(message);
            }
            else{
                await interaction.reply({content:'Error al enviar el mensaje',ephemeral:true});
            }
        }
        
    }
}