const Telegraf = require('telegraf')
const axios = require('axios')

const CURRENCIES = ['BTC', 'ETH', 'LTC']
const FOLLOW_INTERVAL = 15 * 60 * 1000 // 15 minutes

const http = axios.create({
    baseURL: 'https://api.coinbase.com/v2',
    timeout: 3000,
    headers: { 'CB-VERSION': '2017-09-05' }
})
const bot = new Telegraf(process.env.BOT_TOKEN)

const fetchAnReply = async (currency, reply) => {
    const { data: { data }} = await http.get(`/prices/${currency}-EUR/spot`)

    return reply(`*${data.base}*: ${data.amount} ${data.currency}`)
}

bot.command('follow', ({ message: { text }, replyWithMarkdown }) => {
    const currency = text.substr(7).trim()

    if (!CURRENCIES.includes(currency)) {
        return replyWithMarkdown(`Please type _/follow_ <${CURRENCIES.join(' | ')}>`)
    }

    setInterval(() => fetchAnReply(currency, replyWithMarkdown), FOLLOW_INTERVAL)

    return replyWithMarkdown(`Following *${currency}*`)
})

bot.hears('BTC', ({ replyWithMarkdown }) => fetchAnReply('BTC', replyWithMarkdown))
bot.hears('ETH', ({ replyWithMarkdown }) => fetchAnReply('ETH', replyWithMarkdown))
bot.hears('LTC', ({ replyWithMarkdown }) => fetchAnReply('LTC', replyWithMarkdown))

bot.startPolling()
