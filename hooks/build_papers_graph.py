import json
import re
from collections import defaultdict
from pathlib import Path

DOCS_DIR = Path("docs/papers")
DOCS_ROOT = DOCS_DIR.resolve()
OUTPUT = DOCS_DIR / "assets/graph.json"
CODE_BLOCK_RE = re.compile(r"(?ms)^(```|~~~)[^\n]*\n.*?^\1\s*$")
LINK_RE = re.compile(r'(?<!!)\[[^\]]*\]\(([^)\s]+\.md(?:#[^)]+)?)(?:\s+["\'][^"\']*["\'])?\)')


def rel_path(path: Path) -> str:
    return path.relative_to(DOCS_DIR).as_posix()


def iter_pages() -> list[Path]:
    return sorted(path for path in DOCS_DIR.rglob("*.md") if path.name != "index.md")


def extract_links(text: str):
    cleaned = CODE_BLOCK_RE.sub("", text)
    for match in LINK_RE.finditer(cleaned):
        yield match.group(1).split("#", 1)[0]


def build_graph() -> dict:
    page_map = {rel_path(path): path for path in iter_pages()}
    nodes = {
        node_id: {"id": node_id, "label": Path(node_id).stem, "degree": 0, "neighbors": set()}
        for node_id in page_map
    }
    weights = defaultdict(int)

    for source_id, path in page_map.items():
        text = path.read_text(encoding="utf-8")
        for target_ref in extract_links(text):
            try:
                target_id = (path.parent / target_ref).resolve().relative_to(DOCS_ROOT).as_posix()
            except ValueError:
                continue
            if target_id not in nodes or target_id == source_id:
                continue
            weights[tuple(sorted((source_id, target_id)))] += 1

    for (source_id, target_id), weight in weights.items():
        nodes[source_id]["degree"] += weight
        nodes[target_id]["degree"] += weight
        nodes[source_id]["neighbors"].add(target_id)
        nodes[target_id]["neighbors"].add(source_id)

    for node in nodes.values():
        node["neighbors"] = sorted(node["neighbors"])

    return {
        "nodes": sorted(nodes.values(), key=lambda node: (-node["degree"], node["label"], node["id"])),
        "links": [
            {"source": source_id, "target": target_id, "weight": weight}
            for (source_id, target_id), weight in sorted(weights.items())
        ],
    }


def on_files(files, config):
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(build_graph(), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return files
