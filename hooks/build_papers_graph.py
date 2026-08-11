import json
import re
from pathlib import Path
from datetime import datetime

DOCS_DIR = Path("docs/papers")
DOCS_ROOT = DOCS_DIR.resolve()
OUTPUT = DOCS_DIR / "assets/graph.json"
LATEST_OUTPUT = Path("docs/assets/latest-note.json")
CODE_BLOCK_RE = re.compile(r"(?ms)^(```|~~~)[^\n]*\n.*?^\1\s*$")
LINK_RE = re.compile(r'(?<!!)\[[^\]]*\]\(([^)\s]+\.md(?:#[^)]+)?)(?:\s+["\'][^"\']*["\'])?\)')
IMAGE_RE = re.compile(r'!\[[^\]]*\]\(([^)\s]+)')
TITLE_RE = re.compile(r"(?m)^#\s+(.+?)\s*$")


def rel_path(path: Path) -> str:
    return path.relative_to(DOCS_DIR).as_posix()


def iter_pages() -> list[Path]:
    return sorted(path for path in DOCS_DIR.rglob("*.md") if path.name != "index.md")


def extract_links(text: str):
    for match in LINK_RE.finditer(CODE_BLOCK_RE.sub("", text)):
        yield match.group(1).split("#", 1)[0]


def build_graph() -> dict:
    page_map = {rel_path(path): path for path in iter_pages()}
    nodes = {
        node_id: {"id": node_id, "label": Path(node_id).stem, "degree": 0, "neighbors": set()}
        for node_id in page_map
    }
    edges = set()

    for source_id, path in page_map.items():
        for target_ref in extract_links(path.read_text(encoding="utf-8")):
            try:
                target_id = (path.parent / target_ref).resolve().relative_to(DOCS_ROOT).as_posix()
            except ValueError:
                continue
            if target_id not in nodes or target_id == source_id:
                continue
            edges.add(tuple(sorted((source_id, target_id))))

    for source_id, target_id in edges:
        nodes[source_id]["degree"] += 1
        nodes[target_id]["degree"] += 1
        nodes[source_id]["neighbors"].add(target_id)
        nodes[target_id]["neighbors"].add(source_id)

    for node in nodes.values():
        node["neighbors"] = sorted(node["neighbors"])

    return {
        "nodes": sorted(nodes.values(), key=lambda node: (-node["degree"], node["label"], node["id"])),
        "links": [
            {"source": source_id, "target": target_id}
            for source_id, target_id in sorted(edges)
        ],
    }


def note_metadata(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    title_match = TITLE_RE.search(text)
    title = title_match.group(1).strip() if title_match else path.stem.replace("-", " ").title()
    label = title.split(":", 1)[0].strip()

    image = ""
    image_match = IMAGE_RE.search(text)
    if image_match:
        image_path = (path.parent / image_match.group(1)).resolve()
        try:
            image = image_path.relative_to(Path("docs").resolve()).as_posix()
        except ValueError:
            image = ""

    relative = path.relative_to(Path("docs")).as_posix()
    return {
        "label": label,
        "title": title,
        "url": relative.removesuffix(".md") + "/",
        "image": image,
        "kind": "Paper" if relative.startswith("papers/") else "Book",
        "date": datetime.fromtimestamp(path.stat().st_mtime).date().isoformat(),
    }


def latest_notes() -> list[dict]:
    pages = sorted(
        (path for path in Path("docs").rglob("*.md") if path.name != "index.md"),
        key=lambda path: path.stat().st_mtime,
        reverse=True,
    )
    return [note_metadata(path) for path in pages[:3]]


def latest_note() -> dict:
    entries = latest_notes()
    latest = dict(entries[0])
    latest["entries"] = entries
    return latest


def on_files(files, config):
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(build_graph(), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    LATEST_OUTPUT.write_text(json.dumps(latest_note(), ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return files
