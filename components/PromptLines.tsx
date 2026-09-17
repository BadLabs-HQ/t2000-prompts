/**
 * Renders a compiled prompt line by line with hanging indents, so a long
 * indented line or list item wraps under its own text instead of the margin.
 * Monospace only: indents are measured in ch.
 */
export function PromptLines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => {
        const body = line.trimStart();
        const lead = line.length - body.length;
        const marker = body.match(/^(\d+\.|-)\s+/)?.[0].length ?? 0;
        return (
          <span
            key={i}
            style={{
              display: "block",
              paddingLeft: `${lead + marker}ch`,
              textIndent: `-${marker}ch`,
            }}
          >
            {body === "" ? " " : body}
          </span>
        );
      })}
    </>
  );
}
