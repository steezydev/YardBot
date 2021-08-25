import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu'
import { SessionContext } from '../context/context'
import { QRCodeGen } from '../utils/QRCodeGenerator'
import { UserModel } from '../models/userModel'

const QRCodeModel = new QRCodeGen()
const userModel = new UserModel()


const referralTemplate = new MenuTemplate<SessionContext>(async context => {
    const user = await userModel.getUser(context.from?.id!)
    const refLink = process.env.BOT_INVITE_URL + '?start=' + user.refHash
    const refs = 0
    const text = `У вас *${refs}* рефералов\n\nВаша реферальная ссылка:\n${refLink}`

    return {
        text,
        parse_mode: 'Markdown'
    }
})

const referralQRTemplate = new MenuTemplate<SessionContext>(async context => {
    const user = await userModel.getUser(context.from?.id!)
    const QRCode = await QRCodeModel.makeReferralQRCode(user.refHash)

    const text = `🧾 QR для приглашения`

    return {
        type: 'photo',
        media: {
            source: Buffer.from(QRCode, 'base64')
        },
        text,
        parse_mode: 'Markdown'
    }
})

referralTemplate.submenu('🧾Получить QR код', 'getRefQR', referralQRTemplate)

referralQRTemplate.manualRow(createBackMainMenuButtons('🔙 Назад', ''))
referralTemplate.manualRow(createBackMainMenuButtons('🔙 Назад', ''))

export { referralTemplate }