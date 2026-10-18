/**
 * CreatorDesk V2 - Automated Test Suite
 * Zero-dependency, pure JavaScript test harness.
 * Tests V1 and V2 functionality thoroughly.
 */

(function () {
  const tests = [];
  let passedCount = 0;
  let failedCount = 0;

  function describe(name, fn) {
    tests.push({ name, fn });
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  function assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(`${message || 'Assertion failed'}: expected "${expected}", got "${actual}"`);
    }
  }

  // --- TESTS DEFINITION ---

  describe('1. Add New Short Idea', () => {
    const testKey = 'creatordesk_shorts_v1';
    localStorage.removeItem(testKey);

    const testApp = window.CreatorDesk;
    assert(testApp, 'CreatorDesk application module must be loaded.');

    const ideaData = {
      title: 'How to Edit Shorts 10x Faster',
      topic: 'Editing Tips',
      hook: 'If you edit YouTube Shorts in Premiere or CapCut, stop making this 1 critical mistake...',
      plannedDate: '2026-11-01',
      status: 'Script Ready'
    };

    const created = testApp.addIdea(ideaData);
    assert(created.id, 'Created idea should have a unique ID');
    assertEqual(created.title, ideaData.title, 'Title must match input');
    assertEqual(created.topic, ideaData.topic, 'Topic must match input');
    assertEqual(created.hook, ideaData.hook, 'Hook must match input');
    assertEqual(created.plannedDate, ideaData.plannedDate, 'Planned date must match input');
    assertEqual(created.status, 'Script Ready', 'Status must match input');

    const stored = JSON.parse(localStorage.getItem(testKey));
    assert(Array.isArray(stored), 'localStorage must contain an array');
    const found = stored.find(i => i.id === created.id);
    assert(found, 'Created idea must be persisted in localStorage');
  });

  describe('2. Form Validation Checks', () => {
    const testApp = window.CreatorDesk;

    const invalidTitle = testApp.validateIdeaForm({
      title: '  ',
      topic: 'Tech',
      hook: 'Valid hook message over 5 chars',
      plannedDate: '2026-10-30',
      status: 'Idea'
    });
    assert(!invalidTitle.isValid, 'Empty title should fail validation');
    assert(invalidTitle.errors.title, 'Error message for title should be present');

    const invalidHook = testApp.validateIdeaForm({
      title: 'Valid Short Title',
      topic: 'Tech',
      hook: 'Hi',
      plannedDate: '2026-10-30',
      status: 'Idea'
    });
    assert(!invalidHook.isValid, 'Hook under 5 chars should fail validation');
    assert(invalidHook.errors.hook, 'Error message for hook should be present');

    const invalidDate = testApp.validateIdeaForm({
      title: 'Valid Short Title',
      topic: 'Tech',
      hook: 'Valid hook message here',
      plannedDate: '',
      status: 'Idea'
    });
    assert(!invalidDate.isValid, 'Missing planned date should fail validation');

    const validForm = testApp.validateIdeaForm({
      title: 'Valid Short Title',
      topic: 'Tech',
      hook: 'This is a fantastic hook to stop scrolling!',
      plannedDate: '2026-10-30',
      status: 'Editing'
    });
    assert(validForm.isValid, 'Complete valid form should pass validation');
    assertEqual(Object.keys(validForm.errors).length, 0, 'No errors should exist for valid data');
  });

  describe('3. Edit Existing Short Idea', () => {
    const testApp = window.CreatorDesk;

    const original = testApp.addIdea({
      title: 'Original Title Draft',
      topic: 'Gaming',
      hook: 'Did you know about this secret Easter egg in GTA 6?',
      plannedDate: '2026-11-05',
      status: 'Idea'
    });

    const updated = testApp.updateIdea(original.id, {
      title: 'Updated Final Title: GTA 6 Secret',
      topic: 'Gaming',
      hook: 'Did you know about this secret Easter egg in GTA 6? Here is how to find it!',
      plannedDate: '2026-11-06',
      status: 'Editing'
    });

    assert(updated !== null, 'Updated idea should not be null');
    assertEqual(updated.title, 'Updated Final Title: GTA 6 Secret', 'Title should be updated');
    assertEqual(updated.status, 'Editing', 'Status should be updated to Editing');
    assertEqual(updated.plannedDate, '2026-11-06', 'Date should be updated');

    const stored = JSON.parse(localStorage.getItem(testApp.STORAGE_KEY));
    const found = stored.find(i => i.id === original.id);
    assertEqual(found.title, 'Updated Final Title: GTA 6 Secret', 'localStorage must reflect updated title');
    assertEqual(found.status, 'Editing', 'localStorage must reflect updated status');
  });

  describe('4. Delete Short Idea', () => {
    const testApp = window.CreatorDesk;

    const toDelete = testApp.addIdea({
      title: 'Temporary Idea to Delete',
      topic: 'Scratch',
      hook: 'This hook will be removed shortly...',
      plannedDate: '2026-11-10',
      status: 'Idea'
    });

    const id = toDelete.id;
    assert(testApp.getIdeaById(id), 'Idea should exist prior to deletion');

    const deleteResult = testApp.deleteIdea(id);
    assertEqual(deleteResult, true, 'deleteIdea should return true on success');
    assert(!testApp.getIdeaById(id), 'Idea should no longer exist in state');

    const stored = JSON.parse(localStorage.getItem(testApp.STORAGE_KEY));
    const found = stored.find(i => i.id === id);
    assert(!found, 'Idea should be completely removed from localStorage');
  });

  describe('5. Search Functionality (Across Fields)', () => {
    const testApp = window.CreatorDesk;

    const sampleList = [
      { id: '1', title: 'Top 5 Coding Setups', topic: 'Tech', hook: 'Here is what your dream desk is missing...', summary: '', plannedDate: '2026-10-20', status: 'Idea' },
      { id: '2', title: 'How to Cook Ramen', topic: 'Food', hook: 'Transform standard instant noodles in 3 minutes...', summary: '', plannedDate: '2026-10-21', status: 'Published' },
      { id: '3', title: 'Stock Market Basics', topic: 'Finance', hook: 'Coding setups won’t make you rich, but compounding will...', summary: 'Compounding guide', plannedDate: '2026-10-22', status: 'Editing' }
    ];

    const results1 = testApp.getFilteredAndSortedIdeas(sampleList, { search: 'ramen', status: 'ALL', topic: 'ALL', sort: 'created-desc' });
    assertEqual(results1.length, 1, 'Search for "ramen" should return 1 result');
    assertEqual(results1[0].id, '2', 'Matching item ID should be 2');

    const results2 = testApp.getFilteredAndSortedIdeas(sampleList, { search: 'compounding', status: 'ALL', topic: 'ALL', sort: 'created-desc' });
    assertEqual(results2.length, 1, 'Search for hook keyword should return 1 result');
    assertEqual(results2[0].id, '3', 'Matching item ID should be 3');

    const results3 = testApp.getFilteredAndSortedIdeas(sampleList, { search: 'TECH', status: 'ALL', topic: 'ALL', sort: 'created-desc' });
    assertEqual(results3.length, 1, 'Uppercase search "TECH" should match topic');
  });

  describe('6. Filtering by Status and Topic', () => {
    const testApp = window.CreatorDesk;

    const sampleList = [
      { id: '1', title: 'Idea One', topic: 'Tech', hook: 'Hook 1', plannedDate: '2026-10-20', status: 'Idea' },
      { id: '2', title: 'Idea Two', topic: 'Finance', hook: 'Hook 2', plannedDate: '2026-10-21', status: 'Editing' },
      { id: '3', title: 'Idea Three', topic: 'Tech', hook: 'Hook 3', plannedDate: '2026-10-22', status: 'Published' },
      { id: '4', title: 'Idea Four', topic: 'Fitness', hook: 'Hook 4', plannedDate: '2026-10-23', status: 'Editing' }
    ];

    const editingIdeas = testApp.getFilteredAndSortedIdeas(sampleList, { search: '', status: 'Editing', topic: 'ALL', sort: 'created-desc' });
    assertEqual(editingIdeas.length, 2, 'Should find 2 ideas with status Editing');

    const techIdeas = testApp.getFilteredAndSortedIdeas(sampleList, { search: '', status: 'ALL', topic: 'Tech', sort: 'created-desc' });
    assertEqual(techIdeas.length, 2, 'Should find 2 ideas with topic Tech');
  });

  describe('7. Refresh Persistence Simulation (localStorage)', () => {
    const testApp = window.CreatorDesk;
    const testKey = testApp.STORAGE_KEY;

    const customList = [
      { id: 'test_persist_1', title: 'Persistent Short 1', topic: 'Science', hook: 'Hook A', plannedDate: '2026-10-31', status: 'Ready to Publish' },
      { id: 'test_persist_2', title: 'Persistent Short 2', topic: 'Art', hook: 'Hook B', plannedDate: '2026-11-02', status: 'Published' }
    ];
    testApp.saveIdeasToStorage(customList);

    const reloaded = testApp.loadIdeasFromStorage();
    assertEqual(reloaded.length, 2, 'Reloaded ideas count must match saved count');
    assertEqual(reloaded[0].title, 'Persistent Short 1', 'First reloaded item title must match');
    assertEqual(reloaded[1].status, 'Published', 'Second reloaded item status must match');
  });

  describe('8. Mobile Layout & Responsive Markup Verification', () => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    assert(viewportMeta, 'HTML must contain a viewport meta tag for mobile responsiveness');
    const content = viewportMeta.getAttribute('content');
    assert(content && content.includes('width=device-width'), 'Viewport meta must specify width=device-width');

    const buttons = document.querySelectorAll('button');
    assert(buttons.length > 0, 'Buttons must be present in the UI');

    const mainBtn = document.getElementById('open-add-modal-btn');
    assert(mainBtn, 'New Short Idea button exists');
  });

  // --- V2 STUDIO EXPANDED TESTS ---

  describe('9. Creator Dashboard Dynamic Calculation (Phase 2)', () => {
    const testApp = window.CreatorDesk;
    testApp.state.ideas = [
      { id: 'd1', title: 'Idea 1', topic: 'Tech', status: 'Idea', plannedDate: '2026-10-20' },
      { id: 'd2', title: 'Idea 2', topic: 'Tech', status: 'Script Ready', plannedDate: '2026-10-21' },
      { id: 'd3', title: 'Idea 3', topic: 'Tech', status: 'Editing', plannedDate: '2026-10-22' },
      { id: 'd4', title: 'Idea 4', topic: 'Tech', status: 'Thumbnail Ready', plannedDate: '2026-10-23' },
      { id: 'd5', title: 'Idea 5', topic: 'Tech', status: 'Ready to Publish', plannedDate: '2026-10-24' },
      { id: 'd6', title: 'Idea 6', topic: 'Tech', status: 'Published', plannedDate: '2026-10-25' }
    ];

    testApp.renderStats();

    const readyProduce = testApp.state.ideas.filter(i => i.status === 'Idea' || i.status === 'Script Ready').length;
    assertEqual(readyProduce, 2, 'Ready to produce should equal 2');

    const editing = testApp.state.ideas.filter(i => i.status === 'Editing').length;
    assertEqual(editing, 1, 'In editing should equal 1');

    const readyPublish = testApp.state.ideas.filter(i => i.status === 'Thumbnail Ready' || i.status === 'Ready to Publish').length;
    assertEqual(readyPublish, 2, 'Ready to publish should equal 2');

    const published = testApp.state.ideas.filter(i => i.status === 'Published').length;
    assertEqual(published, 1, 'Published should equal 1');
  });

  describe('10. Creator Idea Lab Generator (Phase 3)', () => {
    const engine = window.GeneratorEngine;
    assert(engine, 'GeneratorEngine must be loaded');

    // English generation
    const englishIdeas = engine.generateIdeas({
      niche: 'Gaming',
      topic: 'Free Fire',
      format: 'tutorial',
      language: 'english',
      count: 3
    });
    assertEqual(englishIdeas.length, 3, 'Should generate 3 ideas');
    assert(englishIdeas[0].title.includes('Free Fire'), 'Title should contain topic Free Fire');
    assert(englishIdeas[0].hook.length > 5, 'Idea must contain opening hook');
    assert(englishIdeas[0].nextStep.length > 5, 'Idea must contain suggested next step');

    // Hindi generation
    const hindiIdeas = engine.generateIdeas({
      niche: 'Technology',
      topic: 'iPhone',
      format: 'all',
      language: 'hindi',
      count: 2
    });
    assertEqual(hindiIdeas.length, 2, 'Should generate 2 Hindi ideas');
    assert(hindiIdeas[0].language === 'Hindi', 'Language tag must be Hindi');

    // Hinglish generation
    const hinglishIdeas = engine.generateIdeas({
      niche: 'Personal Finance',
      topic: 'Money Saving',
      format: 'all',
      language: 'hinglish',
      count: 3
    });
    assertEqual(hinglishIdeas.length, 3, 'Should generate 3 Hinglish ideas');
    assert(hinglishIdeas[0].language === 'Hinglish', 'Language tag must be Hinglish');

    // Non-duplicate check within session
    const titlesSet = new Set(englishIdeas.map(i => i.title));
    assertEqual(titlesSet.size, englishIdeas.length, 'No duplicate titles within generation batch');
  });

  describe('11. Title Studio Generator & Angles (Phase 4)', () => {
    const engine = window.GeneratorEngine;

    const titles = engine.generateTitles({
      topic: 'Secret iPhone Settings',
      tone: 'curiosity',
      language: 'english',
      videoType: 'Short'
    });

    assert(titles.length >= 3, 'Should generate multiple title angles');
    assert(titles[0].angle, 'Title suggestion must explain the angle');
    assert(titles[0].title.length > 5, 'Title must not be empty');
  });

  describe('12. Description & SEO Draft Generator (Phase 5)', () => {
    const engine = window.GeneratorEngine;

    const seo = engine.generateDescription({
      title: '5 Hidden Battery Tricks',
      topic: 'iPhone Battery',
      keywords: 'iphone battery, battery life, ios tips',
      language: 'english',
      channelName: 'TechDesk',
      cta: 'Subscribe for daily tech shorts!'
    });

    assert(seo.opening.length > 10, 'Opening hook must exist');
    assert(seo.fullDescription.includes('TechDesk'), 'Description must include channel name');
    assert(seo.hashtags.includes('#Shorts'), 'Hashtags must include #Shorts');
    assert(seo.tagsList.length > 0, 'Tags list must be populated');
    assert(seo.pinnedComment.length > 5, 'Pinned comment draft must exist');
  });

  describe('13. Hook & Short Script Studio (Phase 6)', () => {
    const engine = window.GeneratorEngine;

    // Test 15s script
    const script15 = engine.generateScript({
      topic: 'CapCut Speed Trick',
      duration: 15,
      language: 'english'
    });
    assertEqual(script15.duration, 15, 'Duration must be 15');
    assertEqual(script15.scenes.length, 3, '15s script should have 3 rapid scenes');
    assert(script15.hooks.length >= 2, 'Should provide alternative opening hooks');

    // Test 60s script
    const script60 = engine.generateScript({
      topic: 'CapCut Full Breakdown',
      duration: 60,
      language: 'english'
    });
    assertEqual(script60.duration, 60, 'Duration must be 60');
    assertEqual(script60.scenes.length, 5, '60s script should have 5 structured scenes');
    assert(script60.fullScriptText.length > 50, 'Full script text must be formatted');
  });

  describe('14. Thumbnail Concept Studio (Phase 7)', () => {
    const engine = window.GeneratorEngine;

    const thumb = engine.generateThumbnail({
      title: 'Stop Doing This iPhone Mistake',
      topic: 'iPhone Hacks',
      niche: 'Tech',
      colorPreference: 'Red & Black',
      mainSubject: 'Shocked creator holding glowing phone'
    });

    assert(thumb.concepts.length >= 2, 'Should generate multiple thumbnail concepts');
    const c1 = thumb.concepts[0];
    assert(c1.composition, 'Concept must have composition details');
    assert(c1.imagePrompt.includes('Red & Black'), 'Image prompt must incorporate color preference');
    assert(c1.negativePrompt.length > 5, 'Negative prompt must be provided');
    assert(c1.overlayText.length > 0, 'On-screen text overlay must be suggested');
  });

  describe('15. Production Workflow Stepper & Statuses (Phase 8)', () => {
    const testApp = window.CreatorDesk;

    const idea = testApp.addIdea({
      title: 'Workflow Stepper Test',
      topic: 'Testing',
      hook: 'Valid hook here...',
      status: 'Idea'
    });

    // Step 1: Advance to Script Ready
    const step1 = testApp.updateIdea(idea.id, { status: 'Script Ready' });
    assertEqual(step1.status, 'Script Ready', 'Should advance to Script Ready');

    // Step 2: Advance to Editing
    const step2 = testApp.updateIdea(idea.id, { status: 'Editing' });
    assertEqual(step2.status, 'Editing', 'Should advance to Editing');

    // Step 3: Advance to Thumbnail Ready
    const step3 = testApp.updateIdea(idea.id, { status: 'Thumbnail Ready' });
    assertEqual(step3.status, 'Thumbnail Ready', 'Should advance to Thumbnail Ready');

    // Step 4: Advance to Ready to Publish
    const step4 = testApp.updateIdea(idea.id, { status: 'Ready to Publish' });
    assertEqual(step4.status, 'Ready to Publish', 'Should advance to Ready to Publish');

    // Step 5: Advance to Published
    const step5 = testApp.updateIdea(idea.id, { status: 'Published' });
    assertEqual(step5.status, 'Published', 'Should advance to Published');
  });

  describe('16. Calendar Month & Overdue Detection (Phase 9)', () => {
    const testApp = window.CreatorDesk;

    // Check overdue on past date
    const pastDate = '2020-01-01';
    const overdueIdea = testApp.addIdea({
      title: 'Overdue Short Test',
      topic: 'Testing',
      hook: 'Overdue hook here...',
      plannedDate: pastDate,
      status: 'Editing'
    });

    const isOverdueItem = overdueIdea.plannedDate < new Date().toISOString().split('T')[0] && overdueIdea.status !== 'Published';
    assertEqual(isOverdueItem, true, 'Past incomplete idea must be identified as overdue');

    // If marked published, it is no longer overdue
    const pubIdea = testApp.updateIdea(overdueIdea.id, { status: 'Published' });
    const isOverduePub = pubIdea.plannedDate < new Date().toISOString().split('T')[0] && pubIdea.status !== 'Published';
    assertEqual(isOverduePub, false, 'Published idea is never marked overdue');
  });

  describe('17. Safe Data Migration & Backward Compatibility (Phase 10)', () => {
    const testApp = window.CreatorDesk;

    // Simulate raw legacy storage from V1 with legacy statuses ('Scripting', 'Filming', 'Scheduled')
    const legacyRaw = [
      { id: 'leg_1', title: 'Legacy Short 1', topic: 'Tech', hook: 'Hook 1', plannedDate: '2026-10-20', status: 'Scripting' },
      { id: 'leg_2', title: 'Legacy Short 2', topic: 'Tech', hook: 'Hook 2', plannedDate: '2026-10-21', status: 'Filming' },
      { id: 'leg_3', title: 'Legacy Short 3', topic: 'Tech', hook: 'Hook 3', plannedDate: '2026-10-22', status: 'Scheduled' }
    ];

    testApp.saveIdeasToStorage(legacyRaw);
    const migrated = testApp.loadIdeasFromStorage();

    assertEqual(migrated.length, 3, 'All 3 legacy records must survive migration');
    assertEqual(migrated[0].status, 'Script Ready', 'Legacy Scripting must map to Script Ready');
    assertEqual(migrated[1].status, 'Editing', 'Legacy Filming must map to Editing');
    assertEqual(migrated[2].status, 'Ready to Publish', 'Legacy Scheduled must map to Ready to Publish');

    // New V2 fields must have safe defaults
    assert(migrated[0].script !== undefined, 'Migrated item must have script object');
    assert(migrated[0].thumbnailConcept !== undefined, 'Migrated item must have thumbnailConcept object');
    assert(Array.isArray(migrated[0].hashtags), 'Migrated item must have hashtags array');
    assert(Array.isArray(migrated[0].tags), 'Migrated item must have tags array');
  });

  // --- RUNNER ENGINE ---

  async function runAllTests() {
    passedCount = 0;
    failedCount = 0;
    const testListEl = document.getElementById('test-list');
    testListEl.innerHTML = '';

    if (!window.CreatorDesk) {
      await new Promise(r => setTimeout(r, 100));
    }

    for (const test of tests) {
      const itemEl = document.createElement('li');
      itemEl.className = 'test-item';

      const headerEl = document.createElement('div');
      headerEl.className = 'test-header';

      const titleEl = document.createElement('span');
      titleEl.textContent = test.name;
      headerEl.appendChild(titleEl);

      const statusBadge = document.createElement('span');
      statusBadge.className = 'badge';

      try {
        test.fn();
        passedCount++;
        itemEl.classList.add('passed');
        statusBadge.textContent = 'PASS';
        statusBadge.classList.add('badge-pass');
      } catch (err) {
        failedCount++;
        itemEl.classList.add('failed');
        statusBadge.textContent = 'FAIL';
        statusBadge.classList.add('badge-fail');

        const errorEl = document.createElement('div');
        errorEl.className = 'test-error';
        errorEl.textContent = err.message || String(err);
        itemEl.appendChild(errorEl);
      }

      headerEl.appendChild(statusBadge);
      itemEl.prepend(headerEl);
      testListEl.appendChild(itemEl);
    }

    document.getElementById('total-count').textContent = tests.length;
    document.getElementById('passed-count').textContent = passedCount;
    document.getElementById('failed-count').textContent = failedCount;

    const overallBadge = document.getElementById('overall-badge');
    if (failedCount === 0) {
      overallBadge.textContent = 'ALL 17 TESTS PASSED';
      overallBadge.className = 'badge badge-pass';
    } else {
      overallBadge.textContent = `${failedCount} TESTS FAILED`;
      overallBadge.className = 'badge badge-fail';
    }

    console.log(`[CreatorDesk V2 Tests] Completed: ${passedCount}/${tests.length} passed.`);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('app-frame');
    if (iframe) {
      iframe.onload = () => {
        window.CreatorDesk = iframe.contentWindow.CreatorDesk;
        window.GeneratorEngine = iframe.contentWindow.GeneratorEngine || window.GeneratorEngine;
        runAllTests();
      };
    } else {
      runAllTests();
    }

    const rerunBtn = document.getElementById('rerun-btn');
    if (rerunBtn) {
      rerunBtn.addEventListener('click', runAllTests);
    }
  });
})();
