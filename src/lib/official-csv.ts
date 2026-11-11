/** Strict CSV parsing: preserve field whitespace, quoted newlines and native columns. */
export function parseOfficialCsv(text: string): Record<string, string>[] {
  const { headers, required, records }: { headers: string[] | undefined; required: string[]; records: string[][]; } = parseCsvRecords(text);
  if (!headers || headers.length > 32 || new Set(headers).size !== headers.length || headers.some(key => !key || key.length > 100) || required.some(key => !headers.includes(key))) throw new Error("Unsupported NUCC CSV headers");
  if (!records.length || records.length > 10_000) throw new Error("NUCC CSV must contain 1–10,000 records");
  const codes = new Set<string>();
  return records.map(values => {
    if (values.length !== headers.length) throw new Error("NUCC CSV column count mismatch");
    const record = Object.fromEntries(headers.map((key, index) => [key, values[index]]));
    if (!/^[0-9A-Z]{9}X$/.test(record.Code) || codes.has(record.Code)) throw new Error("Invalid or duplicate NUCC CSV code");
    if (!record.Grouping || !record.Classification) throw new Error("Missing NUCC CSV hierarchy");
    // A complete native row must fit an inline page, including JSON escaping/UTF-8.
    if (new TextEncoder().encode(JSON.stringify(record)).length > 16 * 1024) throw new Error("NUCC CSV row exceeds 16 KiB");
    codes.add(record.Code);
    return record;
  });
}

function parseCsvRecords(text: string) {
  const records: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  let closed = false;
  const finishField = () => {
    row.push(field); field = ""; closed = false;
    if (row.length > 32) throw new Error("NUCC CSV exceeds 32 columns");
  };
  for (let index = 0; index < text.length; index++) {
    const ch = text[index];
    if (quoted) {
      if (ch !== '"') field += ch;
      else if (text[index + 1] === '"') { field += '"'; index++; }
      else { quoted = false; closed = true; }
    } else if (ch === ",") finishField();
    else if (ch === "\n" || ch === "\r") {
      finishField(); records.push(row); row = [];
      if (records.length > 10001) throw new Error("NUCC CSV exceeds 10,000 records");
      if (ch === "\r" && text[index + 1] === "\n") index++;
    } else if (ch === '"' && !field && !closed) quoted = true;
    else {
      if (closed || ch === '"') throw new Error("Malformed NUCC CSV quoting");
      field += ch;
    }
  }
  if (quoted) throw new Error("Unterminated NUCC CSV field");
  if (field || closed || row.length) { finishField(); records.push(row); }
  const headers = records.shift();
  const required = ["Code", "Grouping", "Classification", "Specialization", "Definition", "Notes", "Display Name", "Section"];
  return { headers, required, records };
}
