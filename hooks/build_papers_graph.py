# hooks/build_papers_graph.py
import re, json
from pathlib import Path

DOCS_DIR = Path("docs/papers")
OUTPUT = Path("docs/papers/assets/graph.json")
LINK_RE = re.compile(r'\[.*?\]\(([^)]+\.md)\)')

def on_files(files, config):
    nodes, edges, seen = [], [], set()
    md_files = list(DOCS_DIR.rglob("*.md"))

    for f in md_files:
        rel = f.relative_to(DOCS_DIR).as_posix()
        if rel not in seen:
            nodes.append({"id": rel, "label": f.stem})
            seen.add(rel)

    for f in md_files:
        rel = f.relative_to(DOCS_DIR).as_posix()
        text = f.read_text(encoding="utf-8")
        for m in LINK_RE.finditer(text):
            target = (f.parent / m.group(1)).resolve()
            try:
                target_rel = target.relative_to(DOCS_DIR.resolve()).as_posix()
            except ValueError:
                continue
            if target_rel in seen:
                edges.append({"source": rel, "target": target_rel})

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps({"nodes": nodes, "links": edges}, ensure_ascii=False))
    return files