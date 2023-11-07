const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Para o bot e limpa a fila"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("Não tem sons na fila")
            
            queue.destroy()
            await interaction.editReply("Despachado")
    },
}