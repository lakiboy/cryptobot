const Telegraf = require('telegraf')
const { memorySession } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(memorySession())

bot.use((ctx, next) => {
    const start = new Date()

    return next().then(() => console.log('response time %sms', new Date() - start))
})

bot.hears('Hey', ({ session, replyWithMarkdown }) => {
    session.heyCounter = session.heyCounter || 0
    session.heyCounter++

    return replyWithMarkdown(`_Hey counter:_ ${session.heyCounter}`)
})

bot.startPolling()
