/*
  Cleaner to remove unwanted Allure attachments (e.g. generic "Screenshot")
  Usage: node scripts/clean_allure_results.js [--dry]
  --dry : just prints modified files without writing
*/

import fs from "fs";
import path from "path";

const resultsDir = path.resolve(process.cwd(), "reports", "allure-results");
const dryRun = process.argv.includes("--dry");

function walkDir(dir) {
  const list = [];
  for (const file of fs.readdirSync(dir)) {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) list.push(...walkDir(fp));
    else list.push(fp);
  }
  return list;
}

function cleanJsonFile(filePath) {
  if (!filePath.endsWith(".json")) return false;
  const raw = fs.readFileSync(filePath, "utf8");
  let json;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    return false;
  }

  let changed = false;

  // Helper to filter attachments array
  const filterAttachments = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return arr;
    const filtered = arr.filter(
      (att) => !(att && att.name && att.name.toLowerCase() === "screenshot")
    );
    if (filtered.length !== arr.length) changed = true;
    return filtered;
  };

  // top-level attachments
  if (json.attachments) {
    // before filtering, collect sources that will be removed so we can delete their files
    const toRemove = json.attachments
      .filter(
        (att) => att && att.name && att.name.toLowerCase() === "screenshot"
      )
      .map((att) => att.source)
      .filter(Boolean);
    if (toRemove.length) {
      // mark for deletion later
      json.__removedAttachmentSources = (
        json.__removedAttachmentSources || []
      ).concat(toRemove);
    }
    json.attachments = filterAttachments(json.attachments);
  }

  // steps
  if (Array.isArray(json.steps)) {
    for (const step of json.steps) {
      if (step.attachments) {
        step.attachments = filterAttachments(step.attachments);
      }
    }
  }

  // fixtures (before/after etc) may have attachments
  if (Array.isArray(json.fixtures)) {
    for (const fx of json.fixtures) {
      if (fx.attachments) {
        fx.attachments = filterAttachments(fx.attachments);
      }
      if (Array.isArray(fx.steps)) {
        for (const s of fx.steps) {
          if (s.attachments) s.attachments = filterAttachments(s.attachments);
        }
      }
    }
  }

  if (changed) {
    if (!dryRun) {
      // write JSON without the temporary helper
      const removed = json.__removedAttachmentSources;
      delete json.__removedAttachmentSources;
      fs.writeFileSync(filePath, JSON.stringify(json));

      // delete any removed attachment files that were referenced
      if (Array.isArray(removed)) {
        for (const src of removed) {
          try {
            const candidate = path.join(path.dirname(filePath), src);
            if (fs.existsSync(candidate)) fs.unlinkSync(candidate);
          } catch (e) {
            // ignore individual delete errors
          }
        }
      }
    }
    return true;
  }
  return false;
}

if (!fs.existsSync(resultsDir)) {
  console.error(`Allure results directory not found: ${resultsDir}`);
  process.exit(1);
}

const files = walkDir(resultsDir);
const modified = [];
for (const f of files) {
  const did = cleanJsonFile(f);
  if (did) modified.push(f);
}

if (modified.length === 0) console.log("No files modified.");
else {
  console.log("Modified files:");
  for (const m of modified) console.log(" -", path.relative(process.cwd(), m));
}

if (dryRun && modified.length > 0)
  console.log("\nDry-run complete. Rerun without --dry to write changes.");
