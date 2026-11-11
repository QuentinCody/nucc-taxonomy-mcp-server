import {describe, expect, it} from "vitest";
import {parseOfficialCsv} from "./official-csv";

const header = "Code,Grouping,Classification,Specialization,Definition,Notes,Display Name,Section";
const row = '101Y00000X,Group,Class,,"  quoted, definition\r\nwith ""quotes""  ",,Name,Individual';

describe("complete official CSV ingestion", () => {
  it("preserves native whitespace, empty fields, embedded newlines, quotes and extra columns", () => {
    expect(parseOfficialCsv(`${header},Extension\r\n${row},0012\r\n`)).toEqual([{
      Code: "101Y00000X", Grouping: "Group", Classification: "Class", Specialization: "",
      Definition: '  quoted, definition\r\nwith "quotes"  ', Notes: "", "Display Name": "Name", Section: "Individual", Extension: "0012",
    }]);
  });
  it.each([
    `${header}\n${row}\n${row}`, `${header}\n${row},extra`, `${header}\n101Y00000X,Group`,
    `${header}\n${row.replace("101Y00000X", "bad-code")}`, `${header}\n${row.replace("Group,Class", ",Class")}`,
    `${header}\n${row.replace("Name", 'a"b')}`, `${header}\n${row.replace("Name", '"name"tail')}`,
    `${header}\n${row.replace("Name", '"name')}`, `${header},Code\n${row},101Y00000X`,
    `${header.replace("Notes", "Wrong")}\n${row}`, header, `${header}\n${row}\n\n`,
  ])("rejects malformed/incomplete files without silently dropping or overwriting rows", input => {
    expect(() => parseOfficialCsv(input)).toThrow();
  });
  it("bounds complete native row bytes, including escaped Unicode", () => {
    expect(() => parseOfficialCsv(`${header}\n${row.replace("Name", "🧬".repeat(5000))}`)).toThrow("16 KiB");
  });
  it("rejects excessive rows and columns before materializing a complete unbounded table", () => {
    expect(() => parseOfficialCsv(`${header}\n${`${row}\n`.repeat(10_001)}`)).toThrow("10,000");
    expect(() => parseOfficialCsv(`${header},${"Extra,".repeat(33)}`)).toThrow("32 columns");
  });
});
