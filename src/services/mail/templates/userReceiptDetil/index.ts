import path from 'path'
import fs from 'fs'
import ejs from 'ejs'

async function userreportReceiptTemplate(receiptObj: any): Promise<string> {
    let templateString = await ejs.renderFile(path.join(__dirname, "usereportReceipt.ejs"), { receiptObj })
    return templateString
}

export default userreportReceiptTemplate