const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("displays the current song queue")
    .addNumberOption((option) => option.setName("page").setDescription("Page number of the queue").setMinValue(1)),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interaction.editReply("Não tem som na fila")
        }

        const totalPages = Math.ceil(queue.tracks.lenght / 10) || 1
        const page = (interaction.options.getNumber("page") || 1)

        if (page > totalPages)
            return await interaction.editReply(`Página invalida ${totalPages} pages of`) 
        
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}. \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        })

        const currentSong = queue.currentSong
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                .setDescription(`**Tocando Atualmente**\n` +
                (currentSong ? `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>` : "Nenhum") + 
                `\n\n**Fila**\n${queueString}`
                )
                .setFooter({
                    text: `Page ${page + 1} de ${totalPages}`
                })
                .setThumbnail(currentSong.setThumbnail)
            ]
        })
            
    }
}