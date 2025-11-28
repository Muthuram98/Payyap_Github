import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

function parseCSV(csv) {
  // Simple CSV parser that handles quoted fields and returns array of objects (first row = header)
  const parseLine = (line) => {
    const re = /(\"([^\"]*(\"\"[^\"]*)*)\"|[^,]*)(,|$)/g;
    const res = [];
    let m;
    while ((m = re.exec(line)) !== null) {
      let val = m[1];
      if (val === undefined) val = '';
      if (val.startsWith('\"') && val.endsWith('\"')) {
        val = val.slice(1, -1).replace(/\"\"/g, '\"');
      }
      res.push(val);
      if (m[3] === '') break;
    }
    return res;
  };

  const lines = csv.split(/\r?\n/).filter(l => l.trim() !== '');
  if (lines.length === 0) return [];
  const headers = parseLine(lines[0]).map(h => h.trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseLine(lines[i]);
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = cols[j] !== undefined ? cols[j] : '';
    }
    rows.push(obj);
  }
  return rows;
}

/**
 * Read rows from an Excel or CSV file sheet and return as array of objects.
 * Falls back to CSV if the requested XLSX file is not present.
 * @param {string} filePath - Path to the Excel file (relative to project root or absolute)
 * @param {string} sheetName - Name of the sheet to read (for CSV this is ignored)
 * @returns {Array<Object>} rows
 */
export function readExcel(filePath, sheetName) {
  if (!filePath) throw new Error('filePath is required for readExcel');
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  // If the exact file exists, prefer it
  if (fs.existsSync(resolved)) {
    const ext = path.extname(resolved).toLowerCase();
    try {
      if (ext === '.csv') {
        const csv = fs.readFileSync(resolved, 'utf8');
        return parseCSV(csv);
      }
      // Try reading as XLSX/xls
      const workbook = XLSX.readFile(resolved);
      const actualSheet = sheetName || workbook.SheetNames[0];
      if (!workbook.SheetNames.includes(actualSheet)) {
        console.warn(`Sheet '${actualSheet}' not found in ${resolved}. Available sheets: ${workbook.SheetNames.join(', ')}`);
        return [];
      }
      const sheet = workbook.Sheets[actualSheet];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
      return rows;
    } catch (err) {
      console.error(`Failed to read file ${resolved}:`, err.message || err);
      return [];
    }
  }

  // If file doesn't exist, try CSV variants: same name with .csv, or products.csv, or payyapdata.csv
  const candidates = [
    `${resolved}.csv`,
    path.resolve(path.dirname(resolved), 'products.csv'),
    path.resolve(path.dirname(resolved), 'payyapdata.csv')
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand)) {
      try {
        const csv = fs.readFileSync(cand, 'utf8');
        return parseCSV(csv);
      } catch (err) {
        console.error(`Failed to read CSV fallback ${cand}:`, err.message || err);
        return [];
      }
    }
  }

  console.warn(`File not found: ${resolved} and no CSV fallback found. Looked for: ${candidates.join(', ')}`);
  return [];
}

export default readExcel;
