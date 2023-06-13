import xlsx from "xlsx"
import fs from "fs"

const filePath = "c:/data.xlsx"

const workbook = xlsx.readFile(filePath)

const sheetName = workbook.SheetNames[0]
const worksheet = workbook.Sheets[sheetName]

const jsonData = xlsx.utils.sheet_to_json(worksheet, {header: 1})

fs.writeFileSync("data.json", JSON.stringify(jsonData, null, 2))

console.log("Excel to JSON converson completed!")