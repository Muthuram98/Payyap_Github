import xlsx from 'xlsx';
import path from 'path';

export function readExcel(filePath, sheetName) {
  const absPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const workbook = xlsx.readFile(absPath);
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);
  // returns array of objects: [{column1: value, ...}, ...]
  return xlsx.utils.sheet_to_json(sheet, { defval: '' });
}
