const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Randomiza a queue"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("Não tem sons na fila")
            
            queue.shuffle()
            await interaction.editReply(`A fila ${queue.tracks.lenght} foram randomizados`)
    },
}