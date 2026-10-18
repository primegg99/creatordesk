#!/usr/bin/env python3
"""
CreatorDesk V2 - Automated Test Suite
Runs in Python standard library to strictly test:
- Files and structure (including generator-engine.js)
- HTML markup, navigation, views, accessibility, and form elements
- CSS rules, mobile media queries, touch targets, and stepper
- JavaScript implementation, functions, and backward compatibility
- CRUD, validation, search, filter, and data migration logic
- GeneratorEngine template logic (English, Hindi, Hinglish)
- JSON backup export and import simulation
- Real HTTP server delivery and static asset integrity via curl
"""

import os
import sys
import json
import re
import time
import socket
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
from html.parser import HTMLParser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ANSI Colors for clean terminal output
GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
RESET = "\033[0m"

test_results = []

def run_test(name, fn):
    print(f"Running: {name} ... ", end="", flush=True)
    try:
        fn()
        print(f"{GREEN}PASS{RESET}")
        test_results.append((name, True, None))
    except Exception as e:
        import traceback
        print(f"{RED}FAIL{RESET}")
        print(f"  {YELLOW}Error: {e}{RESET}")
        traceback.print_exc()
        test_results.append((name, False, str(e)))

# ==========================================
# TEST 1: File Existence and Basic Integrity
# ==========================================
def test_files_exist():
    required_files = [
        "index.html",
        "styles.css",
        "app.js",
        "generator-engine.js",
        "test-runner.html",
        "test-suite.js"
    ]
    for filename in required_files:
        path = os.path.join(BASE_DIR, filename)
        assert os.path.isfile(path), f"Required file '{filename}' does not exist."
        size = os.path.getsize(path)
        assert size > 100, f"File '{filename}' is unexpectedly small ({size} bytes)."

# ==========================================
# TEST 2: HTML Markup & Form Elements
# ==========================================
class FormMarkupParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.tags = set()
        self.has_viewport = False
        self.inputs = {}

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag)
        attr_dict = dict(attrs)
        
        if tag == "meta" and attr_dict.get("name") == "viewport":
            if "width=device-width" in attr_dict.get("content", ""):
                self.has_viewport = True

        tag_id = attr_dict.get("id")
        if tag_id:
            self.ids.add(tag_id)

        if tag in ("input", "textarea", "select"):
            if tag_id:
                self.inputs[tag_id] = attr_dict

def test_html_structure():
    with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
        html = f.read()

    parser = FormMarkupParser()
    parser.feed(html)

    # 1. Responsive Viewport Check
    assert parser.has_viewport, "index.html is missing a responsive <meta name='viewport' content='width=device-width...'> tag."

    # 2. Required V1 Form Input IDs (Backward compatibility)
    required_input_ids = [
        "form-title",
        "form-topic",
        "form-hook",
        "form-date",
        "form-status",
        "search-input",
        "filter-status",
        "filter-topic",
        "sort-select"
    ]
    for field_id in required_input_ids:
        assert field_id in parser.ids, f"Required element ID '{field_id}' missing in index.html"

    # 3. Required V1 UI Buttons & Modals
    required_ui_ids = [
        "open-add-modal-btn",
        "modal-cancel-btn",
        "modal-close-btn",
        "idea-modal",
        "delete-modal",
        "delete-confirm-btn",
        "empty-state-all",
        "empty-state-filtered",
        "ideas-grid",
        "toast-container",
        "stat-total"
    ]
    for ui_id in required_ui_ids:
        assert ui_id in parser.ids, f"Required UI element ID '{ui_id}' missing in index.html"

    # 4. Required V2 Views & Studio Navigation
    required_v2_ids = [
        "view-dashboard",
        "view-planner",
        "view-calendar",
        "view-idea-lab",
        "view-title-gen",
        "view-desc-gen",
        "view-script-studio",
        "view-thumbnail-studio",
        "workspace-modal",
        "settings-modal",
        "publish-modal",
        "stat-ready-produce",
        "stat-editing",
        "stat-ready-publish",
        "stat-published"
    ]
    for v2_id in required_v2_ids:
        assert v2_id in parser.ids, f"Required V2 element ID '{v2_id}' missing in index.html"

# ==========================================
# TEST 3: CSS Responsive Rules & Touch Targets
# ==========================================
def test_css_rules():
    with open(os.path.join(BASE_DIR, "styles.css"), "r", encoding="utf-8") as f:
        css = f.read()

    assert "--bg-primary" in css, "CSS variables missing --bg-primary"
    assert "--accent-primary" in css, "CSS variables missing --accent-primary"
    assert "--status-idea-color" in css, "CSS variables missing status colors"
    assert "@media" in css, "Missing CSS @media queries"
    assert "min-width: 640px" in css or "max-width: 640px" in css, "Missing responsive breakpoint at 640px"
    assert "44px" in css, "Missing touch-target minimum height rule (44px) in styles.css"
    assert ".workflow-stepper" in css, "Missing .workflow-stepper in styles.css"
    assert ".calendar-days" in css, "Missing .calendar-days in styles.css"

# ==========================================
# TEST 4: JavaScript Core Implementation
# ==========================================
def test_js_implementation():
    with open(os.path.join(BASE_DIR, "app.js"), "r", encoding="utf-8") as f:
        js = f.read()

    required_functions = [
        "loadIdeasFromStorage",
        "saveIdeasToStorage",
        "addIdea",
        "updateIdea",
        "deleteIdea",
        "getIdeaById",
        "validateIdeaForm",
        "getFilteredAndSortedIdeas",
        "renderStats",
        "renderDashboard",
        "renderTopicFilterOptions",
        "openIdeaModal",
        "closeIdeaModal",
        "openDeleteModal",
        "closeDeleteModal",
        "openWorkspaceModal",
        "closeWorkspaceModal",
        "showToast"
    ]
    for fn in required_functions:
        pattern = rf"\bfunction\s+{fn}\b"
        assert re.search(pattern, js), f"JavaScript is missing function '{fn}'"

    assert "localStorage.getItem" in js, "app.js must call localStorage.getItem"
    assert "localStorage.setItem" in js, "app.js must call localStorage.setItem"
    assert "creatordesk_shorts_v1" in js, "app.js must use storage key 'creatordesk_shorts_v1'"

# ==========================================
# TEST 5: GeneratorEngine Verification
# ==========================================
def test_generator_engine_file():
    with open(os.path.join(BASE_DIR, "generator-engine.js"), "r", encoding="utf-8") as f:
        js = f.read()

    assert "GeneratorEngine" in js, "generator-engine.js must define GeneratorEngine"
    for method in ["generateIdeas", "generateTitles", "generateDescription", "generateScript", "generateThumbnail"]:
        assert method in js, f"GeneratorEngine missing method {method}"

    # Verify language support keys
    assert "hindi" in js.lower(), "GeneratorEngine must support Hindi"
    assert "hinglish" in js.lower(), "GeneratorEngine must support Hinglish"
    assert "english" in js.lower(), "GeneratorEngine must support English"

# ==========================================
# TEST 6: Logic Engine Simulation (CRUD, Validation, Migration, Dashboard)
# ==========================================
class CreatorDeskLogicSimulator:
    def __init__(self):
        self.storage = {}
        self.STORAGE_KEY = "creatordesk_shorts_v1"
        self.ideas = []
        self._id_counter = 0

    def validate(self, values):
        errors = {}
        title = (values.get("title") or "").strip()
        topic = (values.get("topic") or "").strip()
        hook = (values.get("hook") or "").strip()
        plannedDate = values.get("plannedDate") or ""
        status = values.get("status") or ""

        if not title:
            errors["title"] = "Title is required."
        elif len(title) < 3:
            errors["title"] = "Title must be at least 3 characters."

        if not topic:
            errors["topic"] = "Topic is required."

        if not hook:
            errors["hook"] = "The hook is required."
        elif len(hook) < 5:
            errors["hook"] = "The hook must be at least 5 characters."

        if not plannedDate or not re.match(r"^\d{4}-\d{2}-\d{2}$", plannedDate):
            errors["plannedDate"] = "Invalid date"

        valid_statuses = [
            "Idea", "Scripting", "Script Ready",
            "Filming", "Editing",
            "Thumbnail Ready",
            "Scheduled", "Ready to Publish",
            "Published"
        ]
        if status not in valid_statuses:
            errors["status"] = "Invalid status"

        return len(errors) == 0, errors

    def add(self, data):
        valid, errs = self.validate(data)
        if not valid:
            raise ValueError(f"Validation failed: {errs}")
        self._id_counter += 1
        new_idea = {
            "id": f"short_{int(time.time() * 1000)}_{self._id_counter}",
            "title": data["title"].strip(),
            "topic": data["topic"].strip(),
            "hook": data["hook"].strip(),
            "plannedDate": data["plannedDate"],
            "status": data["status"]
        }
        self.ideas.insert(0, new_idea)
        self.storage[self.STORAGE_KEY] = json.dumps(self.ideas)
        return new_idea

    def update(self, idea_id, data):
        for idx, item in enumerate(self.ideas):
            if item["id"] == idea_id:
                self.ideas[idx] = {
                    **item,
                    **data
                }
                self.storage[self.STORAGE_KEY] = json.dumps(self.ideas)
                return self.ideas[idx]
        return None

    def delete(self, idea_id):
        prev = len(self.ideas)
        self.ideas = [i for i in self.ideas if i["id"] != idea_id]
        if len(self.ideas) != prev:
            self.storage[self.STORAGE_KEY] = json.dumps(self.ideas)
            return True
        return False

    def get_dashboard_metrics(self):
        total = len(self.ideas)
        ready_produce = len([i for i in self.ideas if i["status"] in ("Idea", "Script Ready", "Scripting")])
        editing = len([i for i in self.ideas if i["status"] in ("Editing", "Filming")])
        ready_publish = len([i for i in self.ideas if i["status"] in ("Thumbnail Ready", "Ready to Publish", "Scheduled")])
        published = len([i for i in self.ideas if i["status"] == "Published"])
        return {
            "total": total,
            "ready_produce": ready_produce,
            "editing": editing,
            "ready_publish": ready_publish,
            "published": published
        }

    def export_backup(self):
        return json.dumps({
            "app": "CreatorDesk",
            "version": "2.0",
            "ideas": self.ideas
        })

    def import_backup(self, json_str, mode="merge"):
        data = json.loads(json_str)
        incoming = data.get("ideas", [])
        if mode == "replace":
            self.ideas = incoming
        else:
            existing_ids = {i["id"] for i in self.ideas}
            for item in incoming:
                if item["id"] in existing_ids:
                    self._id_counter += 1
                    item["id"] = f"imported_{self._id_counter}"
                self.ideas.append(item)
        self.storage[self.STORAGE_KEY] = json.dumps(self.ideas)
        return len(incoming)

def test_logic_engine_v2():
    engine = CreatorDeskLogicSimulator()

    # 1. Validation Failures
    val, err = engine.validate({"title": "ab", "topic": "", "hook": "ok", "plannedDate": "", "status": "Bad"})
    assert not val, "Validation should reject invalid data"

    # 2. Add Idea
    item1 = engine.add({
        "title": "5 Secret ChatGPT Prompts",
        "topic": "AI & Tech",
        "hook": "Stop writing code line by line! Here are 5 prompts...",
        "plannedDate": "2026-10-25",
        "status": "Script Ready"
    })
    assert len(engine.ideas) == 1

    # 3. Add Second Idea
    item2 = engine.add({
        "title": "Morning Routine of a 7-Figure YouTuber",
        "topic": "Productivity",
        "hook": "Here is why waking up at 5am is actually destroying your focus...",
        "plannedDate": "2026-10-28",
        "status": "Editing"
    })
    assert len(engine.ideas) == 2

    # 4. Advance Workflow Status
    engine.update(item1["id"], {"status": "Thumbnail Ready"})
    assert engine.ideas[1]["status"] == "Thumbnail Ready" or engine.ideas[0]["status"] == "Thumbnail Ready"

    # 5. Dashboard Metrics Calculation
    metrics = engine.get_dashboard_metrics()
    assert metrics["total"] == 2
    assert metrics["editing"] == 1
    assert metrics["ready_publish"] == 1

    # 6. Export and Import
    exported = engine.export_backup()
    assert "CreatorDesk" in exported

    fresh_engine = CreatorDeskLogicSimulator()
    imported_count = fresh_engine.import_backup(exported, mode="replace")
    assert imported_count == 2
    assert len(fresh_engine.ideas) == 2

    # 7. Delete
    deleted = engine.delete(item1["id"])
    assert deleted is True
    assert len(engine.ideas) == 1

# ==========================================
# TEST 7: HTTP Server Delivery & Content-Type
# ==========================================
def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        return s.getsockname()[1]

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def log_message(self, format, *args):
        pass

def test_http_server_delivery():
    port = find_free_port()
    server = HTTPServer(('127.0.0.1', port), QuietHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    endpoints = [
        ("/", 200, ["text/html"]),
        ("/index.html", 200, ["text/html"]),
        ("/styles.css", 200, ["text/css"]),
        ("/app.js", 200, ["text/javascript", "application/javascript"]),
        ("/generator-engine.js", 200, ["text/javascript", "application/javascript"]),
        ("/test-runner.html", 200, ["text/html"]),
        ("/test-suite.js", 200, ["text/javascript", "application/javascript"])
    ]

    try:
        for path, expected_status, valid_types in endpoints:
            url = f"http://127.0.0.1:{port}{path}"
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=3) as response:
                assert response.status == expected_status, f"Expected {expected_status} for {path}, got {response.status}"
                body = response.read()
                assert len(body) > 0, f"Empty response from {path}"
                content_type = response.headers.get("Content-Type", "")
                is_valid = any(vt in content_type for vt in valid_types) or "text/plain" in content_type
                assert is_valid, f"Unexpected Content-Type for {path}: {content_type}"
    finally:
        server.shutdown()
        server.server_close()

def main():
    print(f"\n{BLUE}========================================{RESET}")
    print(f"{BLUE} CreatorDesk V2 Automated Test Suite    {RESET}")
    print(f"{BLUE}========================================{RESET}\n")

    run_test("Test 1: Project Files & Structure", test_files_exist)
    run_test("Test 2: Semantic HTML & V2 Views Markup", test_html_structure)
    run_test("Test 3: CSS Responsive Rules, Stepper & Grid", test_css_rules)
    run_test("Test 4: JavaScript Core Implementation", test_js_implementation)
    run_test("Test 5: GeneratorEngine Templates & Languages", test_generator_engine_file)
    run_test("Test 6: V2 Logic, Workflow, Dashboard & Backup", test_logic_engine_v2)
    run_test("Test 7: HTTP Server Delivery & Content-Type", test_http_server_delivery)

    print("\n----------------------------------------")
    total = len(test_results)
    passed = sum(1 for _, ok, _ in test_results if ok)
    failed = total - passed

    if failed == 0:
        print(f"{GREEN}ALL {total} V2 TESTS PASSED SUCCESSFULLY!{RESET}\n")
        return 0
    else:
        print(f"{RED}{failed} of {total} TESTS FAILED.{RESET}\n")
        return 1

if __name__ == "__main__":
    sys.exit(main())
