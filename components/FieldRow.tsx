"use client";

import type { Field } from "@/lib/types";

const INPUT =
  "w-full rounded-md border border-hairline bg-paper px-2.5 py-1.5 text-[13px] text-ink outline-none transition placeholder:text-muted/60 focus:border-ink";

export function FieldRow({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (v: string) => void;
}) {
  const empty = value.trim() === "";
  const mono = field.type === "money" || field.type === "int";

  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-[12.5px] font-medium text-ink">
          {field.label}
        </span>
        {empty ? (
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">
            blank
          </span>
        ) : null}
      </span>

      {field.type === "select" ? (
        <select
          className={`${INPUT} appearance-none`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          className={`${INPUT} min-h-[68px] resize-y leading-relaxed`}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={`${INPUT} ${mono ? "font-mono" : ""}`}
          type="text"
          inputMode={mono ? "decimal" : undefined}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {field.help ? (
        <span className="text-[11.5px] leading-snug text-muted">
          {field.help}
        </span>
      ) : null}
    </label>
  );
}
