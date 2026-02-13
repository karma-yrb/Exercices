const fs = require('fs');
const path = require('path');

const REPORT_DIR = path.join(__dirname, '..', '..', 'local_library', 'reports');
const OVERRIDES_PATH = path.join(REPORT_DIR, 'notes_overrides.json');
const MASTER_JSON_PATH = path.join(REPORT_DIR, 'notes_master.json');
const MASTER_MD_PATH = path.join(REPORT_DIR, 'notes_master.md');
const INDEX_JSON_PATH = path.join(REPORT_DIR, 'notes_index.json');
const INDEX_MD_PATH = path.join(REPORT_DIR, 'notes_index.md');

function loadJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const parsed = Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function isIsoDate(value) {
  if (typeof value !== 'string') return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

function assertValidRow(row, idx) {
  if (!isIsoDate(row.date)) {
    throw new Error(`manual_entries[${idx}]: date invalide (${row.date}). Format attendu: YYYY-MM-DD`);
  }
  if (!row.subject || typeof row.subject !== 'string') {
    throw new Error(`manual_entries[${idx}]: subject manquant`);
  }
  if (!row.learner || typeof row.learner !== 'string') {
    throw new Error(`manual_entries[${idx}]: learner manquant`);
  }
  if (!row.note_raw || typeof row.note_raw !== 'string') {
    throw new Error(`manual_entries[${idx}]: note_raw manquante`);
  }

  const score20 = toNumberOrNull(row.note_score20);
  const nonRendu = /n\.?rdu/i.test(row.note_raw);
  if (score20 === null && !nonRendu) {
    throw new Error(`manual_entries[${idx}]: note_score20 obligatoire sauf Non rendu`);
  }
  if (score20 !== null && (score20 < 0 || score20 > 20)) {
    throw new Error(`manual_entries[${idx}]: note_score20 hors bornes [0..20] (${score20})`);
  }
}

function normalizeManualEntries(payload) {
  const rows = Array.isArray(payload.manual_entries) ? payload.manual_entries : [];
  const out = [];
  const seenIds = new Set();

  for (let idx = 0; idx < rows.length; idx += 1) {
    const row = rows[idx];
    if (!row || row.keep === false) continue;
    if (!row.date || !row.subject || !row.learner) continue;
    assertValidRow(row, idx);

    const id = row.id || `manual:${row.learner}:${row.subject}:${row.date}:${row.note_raw || 'na'}`;
    if (seenIds.has(id)) {
      throw new Error(`manual_entries: id duplique (${id})`);
    }
    seenIds.add(id);

    out.push({
      id,
      date: row.date,
      subject: row.subject,
      learner: row.learner,
      theme: row.theme || '',
      note_raw: row.note_raw || '',
      note_score20: toNumberOrNull(row.note_score20),
      source_file: row.source_file || 'manual',
      context: row.comment || '',
      origin: 'manual'
    });
  }

  out.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject, 'fr');
    if (a.learner !== b.learner) return a.learner.localeCompare(b.learner, 'fr');
    return a.id.localeCompare(b.id, 'fr');
  });

  return out;
}

function saveJson(filePath, payload) {
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
}

function saveMasterMarkdown(entries) {
  const lines = [];
  lines.push('# Notes principales (date, matiere, eleve)');
  lines.push('');
  lines.push('Source: `local_library/reports/notes_overrides.json` (`manual_entries`).');
  lines.push('Mode: saisie manuelle (OCR desactive).');
  lines.push('');
  lines.push('| Date | Matiere | Eleve | Note (/20) | Note brute | Theme | Origine | Fichier |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- |');

  for (const e of entries) {
    const note20 = e.note_score20 === null ? '' : String(e.note_score20);
    lines.push(`| ${e.date} | ${e.subject} | ${e.learner} | ${note20} | ${e.note_raw} | ${e.theme} | ${e.origin} | ${e.source_file} |`);
  }

  fs.writeFileSync(MASTER_MD_PATH, lines.join('\n'), 'utf8');
}

function saveIndexMarkdown(entries) {
  const lines = [];
  lines.push('# Index des notes (genere automatiquement)');
  lines.push('');
  lines.push('Source: `local_library/reports/notes_overrides.json` (`manual_entries`).');
  lines.push('Mode: saisie manuelle (OCR desactive).');
  lines.push('');
  lines.push('| Date | Eleve | Matiere | Theme | Note brute | Note (/20) | Fichier source |');
  lines.push('| --- | --- | --- | --- | --- | --- | --- |');

  for (const e of entries) {
    const note20 = e.note_score20 === null ? '' : String(e.note_score20);
    lines.push(`| ${e.date} | ${e.learner} | ${e.subject} | ${e.theme} | ${e.note_raw} | ${note20} | ${e.source_file} |`);
  }

  fs.writeFileSync(INDEX_MD_PATH, lines.join('\n'), 'utf8');
}

function main() {
  const payload = loadJson(OVERRIDES_PATH, { manual_entries: [] });
  if (!Array.isArray(payload.manual_entries)) {
    throw new Error('notes_overrides.json: manual_entries doit etre un tableau');
  }
  const entries = normalizeManualEntries(payload);

  const masterPayload = {
    updated_at: new Date().toISOString(),
    source: 'manual_entries',
    entries
  };

  const indexPayload = {
    updated_at: new Date().toISOString(),
    source: 'manual_entries',
    entries
  };

  saveJson(MASTER_JSON_PATH, masterPayload);
  saveJson(INDEX_JSON_PATH, indexPayload);
  saveMasterMarkdown(entries);
  saveIndexMarkdown(entries);

  console.log(`Manual notes synced (${entries.length} entries).`);
  console.log(`JSON: ${MASTER_JSON_PATH}`);
  console.log(`MD  : ${MASTER_MD_PATH}`);
  console.log(`JSON: ${INDEX_JSON_PATH}`);
  console.log(`MD  : ${INDEX_MD_PATH}`);
}

if (require.main === module) {
  main();
}
