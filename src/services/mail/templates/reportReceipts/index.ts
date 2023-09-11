import path from 'path'
import fs from 'fs'
import ejs from 'ejs'

async function reportReceiptTemplate(receiptObj: any): Promise<string> {
    let templateString = await ejs.renderFile(path.join(__dirname, "reportReceipt.ejs"), { receiptObj })
    return templateString
}

export default reportReceiptTemplate