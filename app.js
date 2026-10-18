/**
 * CreatorDesk V2 - AI YouTube Shorts Studio
 * Full-stack client-side application with localStorage persistence,
 * multi-tool generation engine, creator dashboard, workspace, calendar,
 * and JSON import/export backup.
 */

// Storage key used in the browser's localStorage (Maintained for full backward compatibility)
const STORAGE_KEY = 'creatordesk_shorts_v1';

// Initial sample data provided on first visit
const DEFAULT_IDEAS = [
  {
    id: 'short_seed_1',
    title: '5 Hidden iPhone Settings That Save Battery',
    topic: 'Tech Tips',
    hook: 'Stop scrolling! Turn off these 3 battery-draining iPhone settings right now before your battery degrades...',
    summary: 'A 30-second rapid breakdown of 3 hidden iOS settings that stop background battery drain.',
    plannedDate: '2026-10-22',
    status: 'Script Ready',
    description: 'In this Short, we uncover 5 hidden iPhone settings that double your daily battery life! Watch till the end for the most important toggle switch.',
    hashtags: ['#Shorts', '#iPhoneTips', '#TechHacks'],
    tags: ['iphone tips', 'save battery', 'ios 18', 'tech shorts'],
    script: {
      duration: 30,
      scenes: [
        { timeRange: '0s - 5s', section: 'Hook', narration: 'Stop scrolling! Turn off these 3 battery-draining iPhone settings right now...', visual: 'Fast zoom on phone battery icon.', overlayText: 'DO THIS NOW ⚠️' },
        { timeRange: '5s - 22s', section: 'Settings', narration: 'Go to Settings > Privacy > Location Services > System Services and disable Significant Locations.', visual: 'Screen record navigation.', overlayText: 'STEP 1: PRIVACY' },
        { timeRange: '22s - 30s', section: 'CTA', narration: 'Notice your battery lasting way longer! Subscribe for daily tech hacks.', visual: 'Subscribe animation.', overlayText: 'SUBSCRIBE 🔔' }
      ],
      fullScriptText: '[0s-5s] Stop scrolling! Turn off these 3 battery-draining settings.\n[5s-22s] Go to Settings > Privacy > Location Services.\n[22s-30s] Subscribe for daily tech hacks!'
    },
    thumbnailConcept: {
      title: '5 Hidden iPhone Settings',
      concept: 'High-contrast glowing battery overlay with shocked creator face.',
      imagePrompt: 'YouTube Shorts thumbnail: Shocked creator holding glowing smartphone showing 1% battery warning in red neon, dark studio background, 8k --ar 9:16',
      negativePrompt: 'blurry, extra fingers, text, watermark',
      overlayText: 'TURN THIS OFF! ⚠️'
    },
    notes: 'Use sound effect whoosh on step transitions. Keep CapCut captions bold yellow.',
    pinnedComment: '👇 Which iPhone model are you using? Let me know in the comments!',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2
  },
  {
    id: 'short_seed_2',
    title: 'The 50/30/20 Rule Explained in 30 Seconds',
    topic: 'Personal Finance',
    hook: 'If you want to save your first $10,000 this year, here is the simplest money formula every millionaire uses...',
    summary: 'Explains the 50% needs, 30% wants, 20% savings rule for college students and beginners.',
    plannedDate: '2026-10-25',
    status: 'Editing',
    description: 'How to save money with the 50/30/20 budget formula explained in 30 seconds! Subscribe for daily personal finance shorts.',
    hashtags: ['#Shorts', '#MoneyTips', '#Finance'],
    tags: ['budgeting', 'save money', 'personal finance shorts'],
    script: {
      duration: 30,
      scenes: [
        { timeRange: '0s - 5s', section: 'Hook', narration: 'If you want to save your first $10,000 this year, here is the money formula every millionaire uses...', visual: 'Stack of money animation.', overlayText: 'SAVE $10,000 💰' },
        { timeRange: '5s - 22s', section: 'The Rule', narration: '50% goes to rent and food. 30% goes to your fun and guilt-free spending. And 20% gets invested immediately.', visual: 'Pie chart graphic.', overlayText: '50 / 30 / 20' },
        { timeRange: '22s - 30s', section: 'CTA', narration: 'Start today with just $5. Follow for daily money wisdom!', visual: 'Thumbs up.', overlayText: 'FOLLOW FOR MORE 🚀' }
      ],
      fullScriptText: 'The 50/30/20 Rule explained for quick budgeting.'
    },
    thumbnailConcept: {
      title: 'The 50/30/20 Rule',
      concept: 'Split pie chart glowing with green dollar bills.',
      imagePrompt: 'YouTube thumbnail cover: 3D glowing pie chart split into 50, 30, 20 with green neon dollar signs, dark slate background, octane render --ar 9:16',
      negativePrompt: 'distorted, text, blurry',
      overlayText: 'SAVE $10,000'
    },
    notes: 'Add cash register chime sound effect at 15s.',
    pinnedComment: 'What is your current monthly savings goal? Drop it below!',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000
  },
  {
    id: 'short_seed_3',
    title: '3 Morning Habits That Double Your Focus',
    topic: 'Productivity',
    hook: 'Neuroscientists found that doing this 1 thing before 9 AM completely destroys brain fog for the entire day...',
    summary: 'Covers morning sunlight, cold water, and delaying caffeine by 90 minutes.',
    plannedDate: '2026-10-28',
    status: 'Idea',
    description: 'Double your focus with these 3 science-backed morning habits! Simple daily routines to destroy brain fog.',
    hashtags: ['#Shorts', '#Productivity', '#MorningRoutine'],
    tags: ['focus habits', 'morning routine', 'study tips'],
    script: {
      duration: 30,
      scenes: [],
      fullScriptText: ''
    },
    thumbnailConcept: {
      title: '3 Morning Habits for Focus',
      concept: 'Early sunrise contrast with energized creator.',
      imagePrompt: 'YouTube shorts cover: Energized creator at sunrise looking focused, golden hour lighting, clean minimalist desk, 8k --ar 9:16',
      negativePrompt: 'blurry, dark',
      overlayText: 'DO THIS AT 7 AM'
    },
    notes: 'Draft script in Script Studio.',
    pinnedComment: 'What time do you usually wake up? Let me know!',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];

// Application State
const state = {
  ideas: [],
  filters: {
    search: '',
    status: 'ALL',
    topic: 'ALL',
    sort: 'created-desc'
  },
  activeView: 'dashboard',
  currentCalendarDate: new Date(),
  editingId: null,
  workspaceId: null,
  deleteTargetId: null,
  publishTargetId: null,
  engineMode: 'local' // 'local' default
};

// DOM References
let el = {};

/**
 * Initializes and caches all DOM elements.
 */
function initElements() {
  el = {
    // Navigation & Views
    navTabs: document.querySelectorAll('.nav-tab'),
    views: document.querySelectorAll('.studio-view'),
    openSettingsBtn: document.getElementById('open-settings-btn'),
    engineStatusBadge: document.getElementById('engine-status-badge'),

    // Dashboard Elements
    statTotal: document.getElementById('stat-total'),
    statReadyProduce: document.getElementById('stat-ready-produce'),
    statEditing: document.getElementById('stat-editing'),
    statReadyPublish: document.getElementById('stat-ready-publish'),
    statPublished: document.getElementById('stat-published'),
    // Legacy counters for V1 test suite compatibility
    statInProgress: document.getElementById('stat-in-progress'),
    statScheduled: document.getElementById('stat-scheduled'),

    upcomingUploadsList: document.getElementById('upcoming-uploads-list'),
    upcomingCountBadge: document.getElementById('upcoming-count-badge'),
    recentIdeasList: document.getElementById('recent-ideas-list'),
    recentCountBadge: document.getElementById('recent-count-badge'),
    viewCalendarShortcut: document.getElementById('view-calendar-shortcut'),
    viewPlannerShortcut: document.getElementById('view-planner-shortcut'),

    // Quick Actions
    qaNewIdea: document.getElementById('qa-new-idea'),
    qaIdeaLab: document.getElementById('qa-idea-lab'),
    qaTitleGen: document.getElementById('qa-title-gen'),
    qaScriptStudio: document.getElementById('qa-script-studio'),

    // Planner & Filters
    openAddModalBtn: document.getElementById('open-add-modal-btn'),
    emptyStateAddBtn: document.getElementById('empty-state-add-btn'),
    emptyStateSeedBtn: document.getElementById('empty-state-seed-btn'),
    emptyClearFiltersBtn: document.getElementById('empty-clear-filters-btn'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    searchInput: document.getElementById('search-input'),
    filterStatus: document.getElementById('filter-status'),
    filterTopic: document.getElementById('filter-topic'),
    sortSelect: document.getElementById('sort-select'),
    resultsCount: document.getElementById('results-count'),
    ideasGrid: document.getElementById('ideas-grid'),
    emptyStateAll: document.getElementById('empty-state-all'),
    emptyStateFiltered: document.getElementById('empty-state-filtered'),
    toastContainer: document.getElementById('toast-container'),

    // Calendar
    calPrevMonth: document.getElementById('cal-prev-month'),
    calNextMonth: document.getElementById('cal-next-month'),
    calendarMonthYear: document.getElementById('calendar-month-year'),
    calendarDays: document.getElementById('calendar-days'),

    // Idea Lab
    ideaLabForm: document.getElementById('idea-lab-form'),
    ideaNiche: document.getElementById('idea-niche'),
    ideaCustomNicheWrap: document.getElementById('idea-custom-niche-wrap'),
    ideaCustomNiche: document.getElementById('idea-custom-niche'),
    ideaSpecificTopic: document.getElementById('idea-specific-topic'),
    ideaFormat: document.getElementById('idea-format'),
    ideaLang: document.getElementById('idea-lang'),
    ideaAudience: document.getElementById('idea-audience'),
    ideaCount: document.getElementById('idea-count'),
    ideaLabResults: document.getElementById('idea-lab-results'),
    ideaLabResultsCount: document.getElementById('idea-lab-results-count'),

    // Title Gen
    titleGenForm: document.getElementById('title-gen-form'),
    titleTopic: document.getElementById('title-topic'),
    titleTone: document.getElementById('title-tone'),
    titleLang: document.getElementById('title-lang'),
    titleFormatType: document.getElementById('title-format-type'),
    titleKeyword: document.getElementById('title-keyword'),
    titleResults: document.getElementById('title-results'),
    titleResultsCount: document.getElementById('title-results-count'),

    // Description Gen
    descGenForm: document.getElementById('desc-gen-form'),
    descTitle: document.getElementById('desc-title'),
    descTopic: document.getElementById('desc-topic'),
    descKeywords: document.getElementById('desc-keywords'),
    descLang: document.getElementById('desc-lang'),
    descChannel: document.getElementById('desc-channel'),
    descCta: document.getElementById('desc-cta'),
    descResults: document.getElementById('desc-results'),
    descCopyAllBtn: document.getElementById('desc-copy-all-btn'),

    // Script Studio
    scriptGenForm: document.getElementById('script-gen-form'),
    scriptTopic: document.getElementById('script-topic'),
    scriptDuration: document.getElementById('script-duration'),
    scriptLang: document.getElementById('script-lang'),
    scriptTone: document.getElementById('script-tone'),
    scriptResults: document.getElementById('script-results'),
    scriptCopyBtn: document.getElementById('script-copy-btn'),

    // Thumbnail Studio
    thumbGenForm: document.getElementById('thumb-gen-form'),
    thumbTitle: document.getElementById('thumb-title'),
    thumbSubject: document.getElementById('thumb-subject'),
    thumbColor: document.getElementById('thumb-color'),
    thumbMood: document.getElementById('thumb-mood'),
    thumbResults: document.getElementById('thumb-results'),
    thumbResultsCount: document.getElementById('thumb-results-count'),

    // Add/Edit Idea Modal (V1)
    ideaModal: document.getElementById('idea-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalCancelBtn: document.getElementById('modal-cancel-btn'),
    ideaForm: document.getElementById('idea-form'),
    ideaIdInput: document.getElementById('idea-id'),
    formTitle: document.getElementById('form-title'),
    formTopic: document.getElementById('form-topic'),
    formHook: document.getElementById('form-hook'),
    formDate: document.getElementById('form-date'),
    formStatus: document.getElementById('form-status'),
    titleError: document.getElementById('title-error'),
    topicError: document.getElementById('topic-error'),
    hookError: document.getElementById('hook-error'),
    dateError: document.getElementById('date-error'),
    statusError: document.getElementById('status-error'),
    titleCounter: document.getElementById('title-counter'),
    topicCounter: document.getElementById('topic-counter'),
    hookCounter: document.getElementById('hook-counter'),

    // Workspace Modal (V2)
    workspaceModal: document.getElementById('workspace-modal'),
    workspaceCloseBtn: document.getElementById('workspace-close-btn'),
    workspaceTitle: document.getElementById('workspace-title'),
    wsBadgeTopic: document.getElementById('ws-badge-topic'),
    wsStepper: document.getElementById('ws-stepper'),
    wsTabs: document.querySelectorAll('.ws-tab'),
    wsPanels: document.querySelectorAll('.ws-panel'),
    wsTitle: document.getElementById('ws-title'),
    wsTopic: document.getElementById('ws-topic'),
    wsDate: document.getElementById('ws-date'),
    wsHook: document.getElementById('ws-hook'),
    wsSummary: document.getElementById('ws-summary'),
    wsScriptText: document.getElementById('ws-script-text'),
    wsSendToScriptStudioBtn: document.getElementById('ws-send-to-script-studio-btn'),
    wsDescription: document.getElementById('ws-description'),
    wsHashtags: document.getElementById('ws-hashtags'),
    wsTags: document.getElementById('ws-tags'),
    wsPinnedComment: document.getElementById('ws-pinned-comment'),
    wsThumbPrompt: document.getElementById('ws-thumb-prompt'),
    wsThumbNegative: document.getElementById('ws-thumb-negative'),
    wsThumbText: document.getElementById('ws-thumb-text'),
    wsNotes: document.getElementById('ws-notes'),
    wsSaveBtn: document.getElementById('ws-save-btn'),
    wsCancelBtn: document.getElementById('ws-cancel-btn'),

    // Delete Modal
    deleteModal: document.getElementById('delete-modal'),
    deleteModalCloseBtn: document.getElementById('delete-modal-close-btn'),
    deleteCancelBtn: document.getElementById('delete-cancel-btn'),
    deleteConfirmBtn: document.getElementById('delete-confirm-btn'),
    deleteItemTitle: document.getElementById('delete-item-title'),

    // Publish Confirmation Modal
    publishModal: document.getElementById('publish-modal'),
    publishModalCloseBtn: document.getElementById('publish-modal-close-btn'),
    publishCancelBtn: document.getElementById('publish-cancel-btn'),
    publishConfirmBtn: document.getElementById('publish-confirm-btn'),
    publishItemTitle: document.getElementById('publish-item-title'),

    // Settings Modal
    settingsModal: document.getElementById('settings-modal'),
    settingsCloseBtn: document.getElementById('settings-close-btn'),
    settingsDoneBtn: document.getElementById('settings-done-btn'),
    exportJsonBtn: document.getElementById('export-json-btn'),
    importFileInput: document.getElementById('import-file-input'),
    importJsonBtn: document.getElementById('import-json-btn')
  };
}

/* ==========================================================================
   Persistence & Safe Data Migration Layer (Phase 1 & 10)
   ========================================================================== */

/**
 * Normalizes and upgrades legacy idea records without losing any data.
 */
function normalizeIdea(item) {
  if (!item || typeof item !== 'object') return null;

  // Status mapping to V2 workflow
  let status = item.status || 'Idea';
  if (status === 'Scripting') status = 'Script Ready';
  if (status === 'Filming') status = 'Editing';
  if (status === 'Scheduled') status = 'Ready to Publish';

  return {
    id: String(item.id || generateId()),
    title: String(item.title || 'Untitled Short').trim(),
    topic: String(item.topic || 'General').trim(),
    hook: String(item.hook || '').trim(),
    summary: String(item.summary || '').trim(),
    plannedDate: String(item.plannedDate || new Date().toISOString().split('T')[0]),
    status: status,
    description: String(item.description || ''),
    hashtags: Array.isArray(item.hashtags) ? item.hashtags : (typeof item.hashtags === 'string' ? item.hashtags.split(' ') : []),
    tags: Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? item.tags.split(',') : []),
    script: item.script && typeof item.script === 'object' ? item.script : { duration: 30, scenes: [], fullScriptText: '' },
    thumbnailConcept: item.thumbnailConcept && typeof item.thumbnailConcept === 'object' ? item.thumbnailConcept : {
      title: '', concept: '', imagePrompt: '', negativePrompt: '', overlayText: ''
    },
    notes: String(item.notes || ''),
    pinnedComment: String(item.pinnedComment || ''),
    createdAt: Number(item.createdAt) || Date.now(),
    updatedAt: Number(item.updatedAt) || Date.now()
  };
}

/**
 * Loads ideas from localStorage with automatic migration.
 */
function loadIdeasFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveIdeasToStorage(DEFAULT_IDEAS);
      return DEFAULT_IDEAS.map(normalizeIdea);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map(normalizeIdea).filter(Boolean);
    }
    return [];
  } catch (err) {
    console.error('Failed to load ideas from localStorage:', err);
    return [];
  }
}

/**
 * Saves ideas array into browser localStorage.
 */
function saveIdeasToStorage(ideasList) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideasList));
  } catch (err) {
    console.error('Failed to save ideas to localStorage:', err);
    showToast('Failed to save to local storage. Storage might be full.', 'danger');
  }
}

/* ==========================================================================
   CRUD Operations (Phase 8 & Backward Compatibility)
   ========================================================================== */

function generateId() {
  return 'short_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
}

function addIdea(ideaData) {
  const normalized = normalizeIdea({
    ...ideaData,
    id: generateId(),
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  state.ideas.unshift(normalized);
  saveIdeasToStorage(state.ideas);
  updateAppView();
  showToast('Short idea created successfully!', 'success');
  return normalized;
}

function updateIdea(id, ideaData) {
  const index = state.ideas.findIndex(item => item.id === id);
  if (index === -1) return null;

  const current = state.ideas[index];
  const updated = normalizeIdea({
    ...current,
    ...ideaData,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: Date.now()
  });

  state.ideas[index] = updated;
  saveIdeasToStorage(state.ideas);
  updateAppView();
  showToast('Short idea updated successfully!', 'success');
  return updated;
}

function deleteIdea(id) {
  const prevCount = state.ideas.length;
  state.ideas = state.ideas.filter(item => item.id !== id);

  if (state.ideas.length !== prevCount) {
    saveIdeasToStorage(state.ideas);
    updateAppView();
    showToast('Short idea deleted.', 'info');
    return true;
  }
  return false;
}

function getIdeaById(id) {
  return state.ideas.find(item => item.id === id);
}

/* ==========================================================================
   Form Validation
   ========================================================================== */

function validateIdeaForm(values) {
  const errors = {};

  if (!values.title || values.title.trim().length === 0) {
    errors.title = 'Title is required.';
  } else if (values.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  } else if (values.title.trim().length > 100) {
    errors.title = 'Title cannot exceed 100 characters.';
  }

  if (!values.topic || values.topic.trim().length === 0) {
    errors.topic = 'Topic or niche is required.';
  } else if (values.topic.trim().length > 50) {
    errors.topic = 'Topic cannot exceed 50 characters.';
  }

  if (!values.hook || values.hook.trim().length === 0) {
    errors.hook = 'The hook is required.';
  } else if (values.hook.trim().length < 5) {
    errors.hook = 'The hook must be at least 5 characters.';
  } else if (values.hook.trim().length > 250) {
    errors.hook = 'Hook cannot exceed 250 characters.';
  }

  if (!values.plannedDate) {
    errors.plannedDate = 'Please select a planned upload date.';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.plannedDate)) {
    errors.plannedDate = 'Please provide a valid date (YYYY-MM-DD).';
  }

  const validStatuses = [
    'Idea', 'Scripting', 'Script Ready',
    'Filming', 'Editing',
    'Thumbnail Ready',
    'Scheduled', 'Ready to Publish',
    'Published'
  ];
  if (!values.status || !validStatuses.includes(values.status)) {
    errors.status = 'Please choose a valid status.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function clearFormErrors() {
  const fields = ['title', 'topic', 'hook', 'date', 'status'];
  fields.forEach(field => {
    const errorEl = el[`${field}Error`];
    const inputEl = el[field === 'date' ? 'formDate' : `form${field.charAt(0).toUpperCase() + field.slice(1)}`];
    if (errorEl) errorEl.textContent = '';
    if (inputEl) inputEl.classList.remove('is-invalid');
  });
}

function displayFormErrors(errors) {
  clearFormErrors();
  if (errors.title && el.titleError && el.formTitle) {
    el.titleError.textContent = errors.title;
    el.formTitle.classList.add('is-invalid');
  }
  if (errors.topic && el.topicError && el.formTopic) {
    el.topicError.textContent = errors.topic;
    el.formTopic.classList.add('is-invalid');
  }
  if (errors.hook && el.hookError && el.formHook) {
    el.hookError.textContent = errors.hook;
    el.formHook.classList.add('is-invalid');
  }
  if (errors.plannedDate && el.dateError && el.formDate) {
    el.dateError.textContent = errors.plannedDate;
    el.formDate.classList.add('is-invalid');
  }
  if (errors.status && el.statusError && el.formStatus) {
    el.statusError.textContent = errors.status;
    el.formStatus.classList.add('is-invalid');
  }
}

function updateCharCounters() {
  if (el.titleCounter && el.formTitle) {
    el.titleCounter.textContent = `${el.formTitle.value.length} / 100`;
  }
  if (el.topicCounter && el.formTopic) {
    el.topicCounter.textContent = `${el.formTopic.value.length} / 50`;
  }
  if (el.hookCounter && el.formHook) {
    el.hookCounter.textContent = `${el.formHook.value.length} / 250`;
  }
}

/* ==========================================================================
   Filter, Search, and Sort Engine (Phase 9)
   ========================================================================== */

function getFilteredAndSortedIdeas(ideasList, filters) {
  let result = [...ideasList];

  // Text Search across: title, hook, topic, summary, description, tags, notes
  if (filters.search && filters.search.trim() !== '') {
    const term = filters.search.trim().toLowerCase();
    result = result.filter(idea => {
      const titleMatch = (idea.title || '').toLowerCase().includes(term);
      const hookMatch = (idea.hook || '').toLowerCase().includes(term);
      const topicMatch = (idea.topic || '').toLowerCase().includes(term);
      const summaryMatch = (idea.summary || '').toLowerCase().includes(term);
      const descMatch = (idea.description || '').toLowerCase().includes(term);
      const notesMatch = (idea.notes || '').toLowerCase().includes(term);
      const tagsMatch = Array.isArray(idea.tags) && idea.tags.some(t => t.toLowerCase().includes(term));
      const scriptMatch = idea.script && (idea.script.fullScriptText || '').toLowerCase().includes(term);
      return titleMatch || hookMatch || topicMatch || summaryMatch || descMatch || notesMatch || tagsMatch || scriptMatch;
    });
  }

  // Status Filter
  if (filters.status && filters.status !== 'ALL') {
    result = result.filter(idea => idea.status === filters.status);
  }

  // Topic Filter
  if (filters.topic && filters.topic !== 'ALL') {
    result = result.filter(idea => (idea.topic || '').toLowerCase() === filters.topic.toLowerCase());
  }

  // Sorting
  result.sort((a, b) => {
    switch (filters.sort) {
      case 'date-asc':
        return (a.plannedDate || '').localeCompare(b.plannedDate || '');
      case 'date-desc':
        return (b.plannedDate || '').localeCompare(a.plannedDate || '');
      case 'title-asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'created-desc':
      default:
        return (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0);
    }
  });

  return result;
}

function isFilterActive() {
  return (
    (state.filters.search && state.filters.search.trim() !== '') ||
    state.filters.status !== 'ALL' ||
    state.filters.topic !== 'ALL'
  );
}

function isOverdue(dateStr, status) {
  if (!dateStr || status === 'Published') return false;
  const today = new Date().toISOString().split('T')[0];
  return dateStr < today;
}

/* ==========================================================================
   UI Rendering (Phase 2, 8, 9)
   ========================================================================== */

function formatDate(dateStr) {
  if (!dateStr) return 'No date set';
  try {
    const [year, month, day] = dateStr.split('-');
    const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderStats() {
  renderDashboard();
}

/**
 * Phase 2: Renders dynamic Dashboard numbers and lists from real saved data.
 */
function renderDashboard() {
  const total = state.ideas.length;
  const readyProduce = state.ideas.filter(i => i.status === 'Idea' || i.status === 'Script Ready' || i.status === 'Scripting').length;
  const editing = state.ideas.filter(i => i.status === 'Editing' || i.status === 'Filming').length;
  const readyPublish = state.ideas.filter(i => i.status === 'Thumbnail Ready' || i.status === 'Ready to Publish' || i.status === 'Scheduled').length;
  const published = state.ideas.filter(i => i.status === 'Published').length;

  if (el.statTotal) el.statTotal.textContent = total;
  if (el.statReadyProduce) el.statReadyProduce.textContent = readyProduce;
  if (el.statEditing) el.statEditing.textContent = editing;
  if (el.statReadyPublish) el.statReadyPublish.textContent = readyPublish;
  if (el.statPublished) el.statPublished.textContent = published;

  // Legacy element population for V1 test suite compatibility
  if (el.statInProgress) el.statInProgress.textContent = readyProduce + editing;
  if (el.statScheduled) el.statScheduled.textContent = readyPublish;

  // Render Upcoming Planned Uploads
  const upcoming = [...state.ideas]
    .filter(i => i.status !== 'Published')
    .sort((a, b) => (a.plannedDate || '').localeCompare(b.plannedDate || ''))
    .slice(0, 5);

  if (el.upcomingCountBadge) el.upcomingCountBadge.textContent = upcoming.length;

  if (el.upcomingUploadsList) {
    if (upcoming.length === 0) {
      el.upcomingUploadsList.innerHTML = `
        <div class="results-placeholder">
          <p>No upcoming uploads scheduled. Plan your next upload date in the planner!</p>
        </div>
      `;
    } else {
      el.upcomingUploadsList.innerHTML = upcoming.map(item => {
        const overdue = isOverdue(item.plannedDate, item.status);
        return `
          <div class="dash-item-card ${overdue ? 'is-overdue' : ''}" data-id="${escapeHtml(item.id)}">
            <div class="dash-item-info">
              <span class="dash-item-title">${escapeHtml(item.title)}</span>
              <div class="dash-item-meta">
                <span>📅 ${formatDate(item.plannedDate)}</span>
                <span class="badge-tag">${escapeHtml(item.topic)}</span>
                ${overdue ? '<span class="overdue-badge">Overdue</span>' : ''}
              </div>
            </div>
            <span class="status-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(item.status)}</span>
          </div>
        `;
      }).join('');
    }
  }

  // Render Recently Edited Ideas
  const recent = [...state.ideas]
    .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
    .slice(0, 5);

  if (el.recentCountBadge) el.recentCountBadge.textContent = recent.length;

  if (el.recentIdeasList) {
    if (recent.length === 0) {
      el.recentIdeasList.innerHTML = `
        <div class="results-placeholder">
          <p>No recently edited ideas. Create a new idea to start planning!</p>
        </div>
      `;
    } else {
      el.recentIdeasList.innerHTML = recent.map(item => `
        <div class="dash-item-card" data-id="${escapeHtml(item.id)}">
          <div class="dash-item-info">
            <span class="dash-item-title">${escapeHtml(item.title)}</span>
            <div class="dash-item-meta">
              <span>Updated recently</span>
              <span class="badge-tag">${escapeHtml(item.topic)}</span>
            </div>
          </div>
          <span class="status-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(item.status)}</span>
        </div>
      `).join('');
    }
  }
}

/**
 * Phase 9: Calendar Month View Renderer
 */
function renderCalendar(year, month) {
  if (!el.calendarDays || !el.calendarMonthYear) return;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  el.calendarMonthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let html = '';

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    html += `
      <div class="calendar-day other-month">
        <div class="day-header"><span class="day-num">${dayNum}</span></div>
      </div>
    `;
  }

  // Current month days
  const todayStr = new Date().toISOString().split('T')[0];

  for (let day = 1; day <= daysInMonth; day++) {
    const monthFormatted = String(month + 1).padStart(2, '0');
    const dayFormatted = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;
    const isToday = dateStr === todayStr;

    // Find ideas scheduled on this date
    const ideasOnDay = state.ideas.filter(i => i.plannedDate === dateStr);

    html += `
      <div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateStr}">
        <div class="day-header">
          <span class="day-num">${day}</span>
        </div>
        <div class="day-events">
          ${ideasOnDay.map(idea => {
            const overdue = isOverdue(idea.plannedDate, idea.status);
            const isPub = idea.status === 'Published';
            const pillClass = overdue ? 'cal-overdue' : (isPub ? 'cal-published' : '');
            return `
              <div class="cal-event-pill ${pillClass}" data-id="${escapeHtml(idea.id)}" title="${escapeHtml(idea.title)} (${idea.status})">
                ${escapeHtml(idea.title)}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Remaining days to complete grid
  const totalRendered = firstDay + daysInMonth;
  const remaining = (7 - (totalRendered % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    html += `
      <div class="calendar-day other-month">
        <div class="day-header"><span class="day-num">${i}</span></div>
      </div>
    `;
  }

  el.calendarDays.innerHTML = html;
}

/**
 * Dynamically populates the Topic select filter based on unique topics.
 */
function renderTopicFilterOptions() {
  if (!el.filterTopic) return;

  const currentSelection = state.filters.topic;
  const uniqueTopics = Array.from(new Set(state.ideas.map(i => i.topic.trim()).filter(Boolean))).sort();

  let html = '<option value="ALL">All Topics</option>';
  uniqueTopics.forEach(topic => {
    const isSelected = topic.toLowerCase() === currentSelection.toLowerCase() ? 'selected' : '';
    html += `<option value="${escapeHtml(topic)}" ${isSelected}>${escapeHtml(topic)}</option>`;
  });

  el.filterTopic.innerHTML = html;
}

/**
 * Creates HTML markup for an Idea Card in Planner View.
 */
function createIdeaCardHtml(idea) {
  const statusSlug = (idea.status || 'idea').toLowerCase().replace(/\s+/g, '-');
  const overdue = isOverdue(idea.plannedDate, idea.status);

  return `
    <article class="idea-card ${overdue ? 'card-overdue' : ''}" data-id="${escapeHtml(idea.id)}" aria-labelledby="title-${escapeHtml(idea.id)}">
      <div class="card-header">
        <span class="topic-badge">${escapeHtml(idea.topic)}</span>
        <div style="display: flex; gap: 0.35rem; align-items: center;">
          ${overdue ? '<span class="overdue-badge">Overdue</span>' : ''}
          <span class="status-badge status-${statusSlug}">
            ${escapeHtml(idea.status)}
          </span>
        </div>
      </div>

      <h3 id="title-${escapeHtml(idea.id)}" class="card-title">${escapeHtml(idea.title)}</h3>

      <div class="hook-container">
        <div class="hook-label">
          <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>
          </svg>
          Hook (0-5s)
        </div>
        <p class="hook-text">&ldquo;${escapeHtml(idea.hook)}&rdquo;</p>
      </div>

      <div class="card-meta">
        <div class="meta-item">
          <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>${formatDate(idea.plannedDate)}</span>
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">
          ${idea.script && idea.script.fullScriptText ? '📝 Script Ready' : ''}
        </span>
      </div>

      <div class="card-actions">
        <button class="btn btn-primary btn-sm open-workspace-btn" data-id="${escapeHtml(idea.id)}" type="button" aria-label="Open Workspace: ${escapeHtml(idea.title)}">
          <span>Studio Workspace</span>
        </button>
        <button class="btn btn-secondary btn-sm edit-idea-btn" data-id="${escapeHtml(idea.id)}" type="button" aria-label="Quick edit idea: ${escapeHtml(idea.title)}">
          <span>Edit</span>
        </button>
        <button class="btn btn-secondary btn-sm delete-idea-btn" data-id="${escapeHtml(idea.id)}" type="button" aria-label="Delete idea: ${escapeHtml(idea.title)}">
          <span>Delete</span>
        </button>
      </div>
    </article>
  `;
}

/**
 * Main application view refresh engine.
 */
function updateAppView() {
  renderDashboard();
  renderTopicFilterOptions();
  renderCalendar(state.currentCalendarDate.getFullYear(), state.currentCalendarDate.getMonth());

  const filteredIdeas = getFilteredAndSortedIdeas(state.ideas, state.filters);

  // Update results counter
  if (el.resultsCount) {
    const totalCount = state.ideas.length;
    const filteredCount = filteredIdeas.length;
    if (isFilterActive()) {
      el.resultsCount.textContent = `Showing ${filteredCount} of ${totalCount} ideas`;
      if (el.resetFiltersBtn) el.resetFiltersBtn.classList.remove('hidden');
    } else {
      el.resultsCount.textContent = `Showing ${totalCount} idea${totalCount === 1 ? '' : 's'}`;
      if (el.resetFiltersBtn) el.resetFiltersBtn.classList.add('hidden');
    }
  }

  // Empty state handling
  if (state.ideas.length === 0) {
    if (el.ideasGrid) {
      el.ideasGrid.innerHTML = '';
      el.ideasGrid.classList.add('hidden');
    }
    if (el.emptyStateAll) el.emptyStateAll.classList.remove('hidden');
    if (el.emptyStateFiltered) el.emptyStateFiltered.classList.add('hidden');
  } else if (filteredIdeas.length === 0) {
    if (el.ideasGrid) {
      el.ideasGrid.innerHTML = '';
      el.ideasGrid.classList.add('hidden');
    }
    if (el.emptyStateAll) el.emptyStateAll.classList.add('hidden');
    if (el.emptyStateFiltered) el.emptyStateFiltered.classList.remove('hidden');
  } else {
    if (el.emptyStateAll) el.emptyStateAll.classList.add('hidden');
    if (el.emptyStateFiltered) el.emptyStateFiltered.classList.add('hidden');
    if (el.ideasGrid) {
      el.ideasGrid.classList.remove('hidden');
      el.ideasGrid.innerHTML = filteredIdeas.map(createIdeaCardHtml).join('');
    }
  }
}

/* ==========================================================================
   Navigation Router (Phase 12)
   ========================================================================== */

function switchView(viewName) {
  state.activeView = viewName;

  // Update tab highlights
  if (el.navTabs) {
    el.navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-view') === viewName);
    });
  }

  // Update visible view
  if (el.views) {
    el.views.forEach(view => {
      const match = view.id === `view-${viewName}`;
      view.classList.toggle('active', match);
    });
  }

  // Refresh calendar if entering calendar view
  if (viewName === 'calendar') {
    renderCalendar(state.currentCalendarDate.getFullYear(), state.currentCalendarDate.getMonth());
  }
}

/* ==========================================================================
   Workspace Modal Management (Phase 8)
   ========================================================================== */

function openWorkspaceModal(id) {
  const idea = getIdeaById(id);
  if (!idea) return;

  state.workspaceId = id;

  if (el.workspaceTitle) el.workspaceTitle.textContent = idea.title || 'Idea Studio Workspace';
  if (el.wsBadgeTopic) el.wsBadgeTopic.textContent = idea.topic || 'General';

  // Overview fields
  if (el.wsTitle) el.wsTitle.value = idea.title || '';
  if (el.wsTopic) el.wsTopic.value = idea.topic || '';
  if (el.wsDate) el.wsDate.value = idea.plannedDate || '';
  if (el.wsHook) el.wsHook.value = idea.hook || '';
  if (el.wsSummary) el.wsSummary.value = idea.summary || '';

  // Script fields
  if (el.wsScriptText) {
    el.wsScriptText.value = (idea.script && idea.script.fullScriptText) ? idea.script.fullScriptText : '';
  }

  // SEO fields
  if (el.wsDescription) el.wsDescription.value = idea.description || '';
  if (el.wsHashtags) {
    el.wsHashtags.value = Array.isArray(idea.hashtags) ? idea.hashtags.join(' ') : (idea.hashtags || '');
  }
  if (el.wsTags) {
    el.wsTags.value = Array.isArray(idea.tags) ? idea.tags.join(', ') : (idea.tags || '');
  }
  if (el.wsPinnedComment) el.wsPinnedComment.value = idea.pinnedComment || '';

  // Thumbnail fields
  if (el.wsThumbPrompt) {
    el.wsThumbPrompt.value = (idea.thumbnailConcept && idea.thumbnailConcept.imagePrompt) ? idea.thumbnailConcept.imagePrompt : '';
  }
  if (el.wsThumbNegative) {
    el.wsThumbNegative.value = (idea.thumbnailConcept && idea.thumbnailConcept.negativePrompt) ? idea.thumbnailConcept.negativePrompt : '';
  }
  if (el.wsThumbText) {
    el.wsThumbText.value = (idea.thumbnailConcept && idea.thumbnailConcept.overlayText) ? idea.thumbnailConcept.overlayText : '';
  }

  // Notes
  if (el.wsNotes) el.wsNotes.value = idea.notes || '';

  // Update Stepper
  updateWorkflowStepperUI(idea.status);

  // Switch to Overview tab by default
  switchWorkspaceTab('ws-tab-overview');

  if (el.workspaceModal) el.workspaceModal.classList.remove('hidden');
}

function closeWorkspaceModal() {
  if (el.workspaceModal) el.workspaceModal.classList.add('hidden');
  state.workspaceId = null;
}

function updateWorkflowStepperUI(currentStatus) {
  if (!el.wsStepper) return;

  const steps = ['Idea', 'Script Ready', 'Editing', 'Thumbnail Ready', 'Ready to Publish', 'Published'];
  const currentIndex = steps.indexOf(currentStatus);

  const stepBtns = el.wsStepper.querySelectorAll('.step-btn');
  stepBtns.forEach((btn, idx) => {
    btn.classList.remove('active', 'completed');
    if (idx < currentIndex) {
      btn.classList.add('completed');
    } else if (idx === currentIndex) {
      btn.classList.add('active');
    }
  });
}

function switchWorkspaceTab(tabId) {
  if (el.wsTabs) {
    el.wsTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-tab') === tabId));
  }
  if (el.wsPanels) {
    el.wsPanels.forEach(p => p.classList.toggle('active', p.id === tabId));
  }
}

function saveWorkspaceChanges() {
  if (!state.workspaceId) return;

  const current = getIdeaById(state.workspaceId);
  if (!current) return;

  const hashtagsArray = (el.wsHashtags ? el.wsHashtags.value : '')
    .split(' ')
    .map(s => s.trim())
    .filter(Boolean);

  const tagsArray = (el.wsTags ? el.wsTags.value : '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  const updatedData = {
    title: el.wsTitle ? el.wsTitle.value.trim() : current.title,
    topic: el.wsTopic ? el.wsTopic.value.trim() : current.topic,
    plannedDate: el.wsDate ? el.wsDate.value : current.plannedDate,
    hook: el.wsHook ? el.wsHook.value.trim() : current.hook,
    summary: el.wsSummary ? el.wsSummary.value.trim() : current.summary,
    description: el.wsDescription ? el.wsDescription.value.trim() : current.description,
    hashtags: hashtagsArray,
    tags: tagsArray,
    pinnedComment: el.wsPinnedComment ? el.wsPinnedComment.value.trim() : current.pinnedComment,
    notes: el.wsNotes ? el.wsNotes.value.trim() : current.notes,
    script: {
      ...current.script,
      fullScriptText: el.wsScriptText ? el.wsScriptText.value.trim() : ''
    },
    thumbnailConcept: {
      ...current.thumbnailConcept,
      imagePrompt: el.wsThumbPrompt ? el.wsThumbPrompt.value.trim() : '',
      negativePrompt: el.wsThumbNegative ? el.wsThumbNegative.value.trim() : '',
      overlayText: el.wsThumbText ? el.wsThumbText.value.trim() : ''
    }
  };

  updateIdea(state.workspaceId, updatedData);
  closeWorkspaceModal();
  showToast('Workspace changes saved successfully!', 'success');
}

/* ==========================================================================
   Add/Edit Idea Modal (V1 Backward Compatible)
   ========================================================================== */

function openIdeaModal(editId = null) {
  clearFormErrors();
  state.editingId = editId;

  if (editId) {
    const idea = getIdeaById(editId);
    if (!idea) return;

    if (el.modalTitle) el.modalTitle.textContent = 'Edit Short Idea';
    if (el.ideaIdInput) el.ideaIdInput.value = idea.id;
    if (el.formTitle) el.formTitle.value = idea.title;
    if (el.formTopic) el.formTopic.value = idea.topic;
    if (el.formHook) el.formHook.value = idea.hook;
    if (el.formDate) el.formDate.value = idea.plannedDate;
    if (el.formStatus) el.formStatus.value = idea.status;
  } else {
    if (el.modalTitle) el.modalTitle.textContent = 'New Short Idea';
    if (el.ideaForm) el.ideaForm.reset();
    if (el.ideaIdInput) el.ideaIdInput.value = '';

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    if (el.formDate) {
      el.formDate.value = defaultDate.toISOString().split('T')[0];
    }
    if (el.formStatus) el.formStatus.value = 'Idea';
  }

  updateCharCounters();
  if (el.ideaModal) el.ideaModal.classList.remove('hidden');
  if (el.formTitle) el.formTitle.focus();
}

function closeIdeaModal() {
  if (el.ideaModal) el.ideaModal.classList.add('hidden');
  state.editingId = null;
  clearFormErrors();
}

function openDeleteModal(id) {
  const idea = getIdeaById(id);
  if (!idea) return;

  state.deleteTargetId = id;
  if (el.deleteItemTitle) {
    el.deleteItemTitle.textContent = `"${idea.title}"`;
  }
  if (el.deleteModal) el.deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
  if (el.deleteModal) el.deleteModal.classList.add('hidden');
  state.deleteTargetId = null;
}

function openPublishModal(id) {
  const idea = getIdeaById(id);
  if (!idea) return;

  state.publishTargetId = id;
  if (el.publishItemTitle) {
    el.publishItemTitle.textContent = `"${idea.title}"`;
  }
  if (el.publishModal) el.publishModal.classList.remove('hidden');
}

function closePublishModal() {
  if (el.publishModal) el.publishModal.classList.add('hidden');
  state.publishTargetId = null;
}

/* ==========================================================================
   JSON Export & Import (Phase 10)
   ========================================================================== */

function exportDataAsJson() {
  try {
    const backupData = {
      app: 'CreatorDesk',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      count: state.ideas.length,
      ideas: state.ideas
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];

    const link = document.createElement('a');
    link.href = url;
    link.download = `creatordesk-backup-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${state.ideas.length} ideas to JSON backup!`, 'success');
  } catch (err) {
    console.error('Export failed:', err);
    showToast('Failed to export backup JSON.', 'danger');
  }
}

function importDataFromJson(file, mode = 'merge') {
  if (!file) {
    showToast('Please select a JSON file to import.', 'danger');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const parsed = JSON.parse(e.target.result);
      let incomingIdeas = [];

      if (Array.isArray(parsed)) {
        incomingIdeas = parsed;
      } else if (parsed && Array.isArray(parsed.ideas)) {
        incomingIdeas = parsed.ideas;
      } else {
        throw new Error('Invalid backup file format. Expected a list of ideas.');
      }

      const validIdeas = incomingIdeas.map(normalizeIdea).filter(Boolean);
      if (validIdeas.length === 0) {
        throw new Error('No valid ideas found in backup file.');
      }

      if (mode === 'replace') {
        state.ideas = validIdeas;
      } else {
        // Merge mode: Add new ideas avoiding duplicate IDs
        const existingIds = new Set(state.ideas.map(i => i.id));
        validIdeas.forEach(newItem => {
          if (existingIds.has(newItem.id)) {
            // Assign fresh ID if conflicting
            newItem.id = generateId();
          }
          state.ideas.push(newItem);
        });
      }

      saveIdeasToStorage(state.ideas);
      updateAppView();
      if (el.settingsModal) el.settingsModal.classList.add('hidden');
      showToast(`Successfully imported ${validIdeas.length} ideas!`, 'success');
    } catch (err) {
      console.error('Import failed:', err);
      showToast('Import failed: ' + (err.message || 'Malformed JSON file'), 'danger');
    }
  };
  reader.readAsText(file);
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */

function showToast(message, type = 'success') {
  if (!el.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  el.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 250ms ease';
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 250);
  }, 3000);
}

/**
 * Copies text to clipboard with button feedback.
 */
function copyToClipboard(text, buttonElement = null) {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  } else {
    navigator.clipboard.writeText(text);
  }

  showToast('Copied to clipboard! ✓', 'info');

  if (buttonElement) {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = '<span>Copied! ✓</span>';
    buttonElement.disabled = true;
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
      buttonElement.disabled = false;
    }, 1500);
  }
}

/* ==========================================================================
   Event Listeners Setup
   ========================================================================== */

function setupEventListeners() {
  // 1. Navigation Tabs
  if (el.navTabs) {
    el.navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.getAttribute('data-view');
        switchView(view);
      });
    });
  }

  // 2. Settings Modal
  if (el.openSettingsBtn) {
    el.openSettingsBtn.addEventListener('click', () => {
      if (el.settingsModal) el.settingsModal.classList.remove('hidden');
    });
  }
  if (el.engineStatusBadge) {
    el.engineStatusBadge.addEventListener('click', () => {
      if (el.settingsModal) el.settingsModal.classList.remove('hidden');
    });
  }
  if (el.settingsCloseBtn) {
    el.settingsCloseBtn.addEventListener('click', () => el.settingsModal.classList.add('hidden'));
  }
  if (el.settingsDoneBtn) {
    el.settingsDoneBtn.addEventListener('click', () => el.settingsModal.classList.add('hidden'));
  }

  // 3. Export / Import Actions
  if (el.exportJsonBtn) {
    el.exportJsonBtn.addEventListener('click', exportDataAsJson);
  }
  if (el.importJsonBtn && el.importFileInput) {
    el.importJsonBtn.addEventListener('click', () => {
      const file = el.importFileInput.files[0];
      const mode = document.querySelector('input[name="import-mode"]:checked')?.value || 'merge';
      importDataFromJson(file, mode);
    });
  }

  // 4. Quick Action Buttons
  if (el.qaNewIdea) el.qaNewIdea.addEventListener('click', () => openIdeaModal(null));
  if (el.qaIdeaLab) el.qaIdeaLab.addEventListener('click', () => switchView('idea-lab'));
  if (el.qaTitleGen) el.qaTitleGen.addEventListener('click', () => switchView('title-gen'));
  if (el.qaScriptStudio) el.qaScriptStudio.addEventListener('click', () => switchView('script-studio'));

  if (el.viewCalendarShortcut) el.viewCalendarShortcut.addEventListener('click', () => switchView('calendar'));
  if (el.viewPlannerShortcut) el.viewPlannerShortcut.addEventListener('click', () => switchView('planner'));

  // 5. Calendar Navigation
  if (el.calPrevMonth) {
    el.calPrevMonth.addEventListener('click', () => {
      state.currentCalendarDate.setMonth(state.currentCalendarDate.getMonth() - 1);
      renderCalendar(state.currentCalendarDate.getFullYear(), state.currentCalendarDate.getMonth());
    });
  }
  if (el.calNextMonth) {
    el.calNextMonth.addEventListener('click', () => {
      state.currentCalendarDate.setMonth(state.currentCalendarDate.getMonth() + 1);
      renderCalendar(state.currentCalendarDate.getFullYear(), state.currentCalendarDate.getMonth());
    });
  }

  // Calendar item click delegation
  if (el.calendarDays) {
    el.calendarDays.addEventListener('click', (e) => {
      const pill = e.target.closest('.cal-event-pill');
      if (pill) {
        const id = pill.getAttribute('data-id');
        openWorkspaceModal(id);
      }
    });
  }

  // Dashboard item click delegation
  if (el.upcomingUploadsList) {
    el.upcomingUploadsList.addEventListener('click', (e) => {
      const card = e.target.closest('.dash-item-card');
      if (card) {
        const id = card.getAttribute('data-id');
        openWorkspaceModal(id);
      }
    });
  }
  if (el.recentIdeasList) {
    el.recentIdeasList.addEventListener('click', (e) => {
      const card = e.target.closest('.dash-item-card');
      if (card) {
        const id = card.getAttribute('data-id');
        openWorkspaceModal(id);
      }
    });
  }

  // 6. Modal Open/Close (Add/Edit)
  if (el.openAddModalBtn) el.openAddModalBtn.addEventListener('click', () => openIdeaModal(null));
  if (el.emptyStateAddBtn) el.emptyStateAddBtn.addEventListener('click', () => openIdeaModal(null));
  if (el.emptyStateSeedBtn) {
    el.emptyStateSeedBtn.addEventListener('click', () => {
      state.ideas = DEFAULT_IDEAS.map(normalizeIdea);
      saveIdeasToStorage(state.ideas);
      updateAppView();
      showToast('Loaded 3 starter Short concepts!', 'success');
    });
  }

  if (el.modalCloseBtn) el.modalCloseBtn.addEventListener('click', closeIdeaModal);
  if (el.modalCancelBtn) el.modalCancelBtn.addEventListener('click', closeIdeaModal);

  // Overlay clicks
  if (el.ideaModal) {
    el.ideaModal.addEventListener('click', (e) => { if (e.target === el.ideaModal) closeIdeaModal(); });
  }
  if (el.workspaceModal) {
    el.workspaceModal.addEventListener('click', (e) => { if (e.target === el.workspaceModal) closeWorkspaceModal(); });
  }
  if (el.deleteModal) {
    el.deleteModal.addEventListener('click', (e) => { if (e.target === el.deleteModal) closeDeleteModal(); });
  }
  if (el.publishModal) {
    el.publishModal.addEventListener('click', (e) => { if (e.target === el.publishModal) closePublishModal(); });
  }

  // Keydown Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (el.ideaModal && !el.ideaModal.classList.contains('hidden')) closeIdeaModal();
      if (el.workspaceModal && !el.workspaceModal.classList.contains('hidden')) closeWorkspaceModal();
      if (el.deleteModal && !el.deleteModal.classList.contains('hidden')) closeDeleteModal();
      if (el.publishModal && !el.publishModal.classList.contains('hidden')) closePublishModal();
      if (el.settingsModal && !el.settingsModal.classList.contains('hidden')) el.settingsModal.classList.add('hidden');
    }
  });

  // 7. Form Submission (Add / Edit)
  if (el.ideaForm) {
    el.ideaForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        title: el.formTitle ? el.formTitle.value : '',
        topic: el.formTopic ? el.formTopic.value : '',
        hook: el.formHook ? el.formHook.value : '',
        plannedDate: el.formDate ? el.formDate.value : '',
        status: el.formStatus ? el.formStatus.value : 'Idea'
      };

      const validation = validateIdeaForm(formData);
      if (!validation.isValid) {
        displayFormErrors(validation.errors);
        return;
      }

      if (state.editingId) {
        updateIdea(state.editingId, formData);
      } else {
        addIdea(formData);
      }

      closeIdeaModal();
    });
  }

  ['formTitle', 'formTopic', 'formHook'].forEach(ref => {
    if (el[ref]) {
      el[ref].addEventListener('input', () => {
        updateCharCounters();
        if (el[ref].classList.contains('is-invalid')) {
          clearFormErrors();
        }
      });
    }
  });

  // 8. Workspace Modal Actions
  if (el.workspaceCloseBtn) el.workspaceCloseBtn.addEventListener('click', closeWorkspaceModal);
  if (el.wsCancelBtn) el.wsCancelBtn.addEventListener('click', closeWorkspaceModal);
  if (el.wsSaveBtn) el.wsSaveBtn.addEventListener('click', saveWorkspaceChanges);

  // Workspace tab switcher
  if (el.wsTabs) {
    el.wsTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchWorkspaceTab(tab.getAttribute('data-tab'));
      });
    });
  }

  // Stepper clicks
  if (el.wsStepper) {
    el.wsStepper.addEventListener('click', (e) => {
      const stepBtn = e.target.closest('.step-btn');
      if (stepBtn && state.workspaceId) {
        const targetStatus = stepBtn.getAttribute('data-status');
        if (targetStatus === 'Published') {
          // Require confirmation before marking as published
          openPublishModal(state.workspaceId);
        } else {
          updateIdea(state.workspaceId, { status: targetStatus });
          updateWorkflowStepperUI(targetStatus);
        }
      }
    });
  }

  if (el.wsSendToScriptStudioBtn) {
    el.wsSendToScriptStudioBtn.addEventListener('click', () => {
      const idea = getIdeaById(state.workspaceId);
      if (idea) {
        if (el.scriptTopic) el.scriptTopic.value = idea.title || idea.topic;
        closeWorkspaceModal();
        switchView('script-studio');
      }
    });
  }

  // 9. Publish Confirmation
  if (el.publishModalCloseBtn) el.publishModalCloseBtn.addEventListener('click', closePublishModal);
  if (el.publishCancelBtn) el.publishCancelBtn.addEventListener('click', closePublishModal);
  if (el.publishConfirmBtn) {
    el.publishConfirmBtn.addEventListener('click', () => {
      if (state.publishTargetId) {
        updateIdea(state.publishTargetId, { status: 'Published' });
        updateWorkflowStepperUI('Published');
        closePublishModal();
        showToast('Short successfully marked as Published! 🎉', 'success');
      }
    });
  }

  // 10. Delete Confirmation
  if (el.deleteModalCloseBtn) el.deleteModalCloseBtn.addEventListener('click', closeDeleteModal);
  if (el.deleteCancelBtn) el.deleteCancelBtn.addEventListener('click', closeDeleteModal);
  if (el.deleteConfirmBtn) {
    el.deleteConfirmBtn.addEventListener('click', () => {
      if (state.deleteTargetId) {
        deleteIdea(state.deleteTargetId);
        closeDeleteModal();
      }
    });
  }

  // 11. Grid Card Event Delegation
  if (el.ideasGrid) {
    el.ideasGrid.addEventListener('click', (e) => {
      const wsBtn = e.target.closest('.open-workspace-btn');
      if (wsBtn) {
        openWorkspaceModal(wsBtn.dataset.id);
        return;
      }

      const editBtn = e.target.closest('.edit-idea-btn');
      if (editBtn) {
        openIdeaModal(editBtn.dataset.id);
        return;
      }

      const deleteBtn = e.target.closest('.delete-idea-btn');
      if (deleteBtn) {
        openDeleteModal(deleteBtn.dataset.id);
        return;
      }
    });
  }

  // 12. Search & Filter Inputs
  if (el.searchInput) {
    el.searchInput.addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      if (el.clearSearchBtn) {
        el.clearSearchBtn.classList.toggle('hidden', e.target.value.length === 0);
      }
      updateAppView();
    });
  }

  if (el.clearSearchBtn) {
    el.clearSearchBtn.addEventListener('click', () => {
      if (el.searchInput) {
        el.searchInput.value = '';
        state.filters.search = '';
        el.clearSearchBtn.classList.add('hidden');
        updateAppView();
        el.searchInput.focus();
      }
    });
  }

  if (el.filterStatus) {
    el.filterStatus.addEventListener('change', (e) => {
      state.filters.status = e.target.value;
      updateAppView();
    });
  }

  if (el.filterTopic) {
    el.filterTopic.addEventListener('change', (e) => {
      state.filters.topic = e.target.value;
      updateAppView();
    });
  }

  if (el.sortSelect) {
    el.sortSelect.addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      updateAppView();
    });
  }

  const resetFilters = () => {
    state.filters.search = '';
    state.filters.status = 'ALL';
    state.filters.topic = 'ALL';
    state.filters.sort = 'created-desc';

    if (el.searchInput) el.searchInput.value = '';
    if (el.clearSearchBtn) el.clearSearchBtn.classList.add('hidden');
    if (el.filterStatus) el.filterStatus.value = 'ALL';
    if (el.filterTopic) el.filterTopic.value = 'ALL';
    if (el.sortSelect) el.sortSelect.value = 'created-desc';

    updateAppView();
    showToast('Filters cleared', 'info');
  };

  if (el.resetFiltersBtn) el.resetFiltersBtn.addEventListener('click', resetFilters);
  if (el.emptyClearFiltersBtn) el.emptyClearFiltersBtn.addEventListener('click', resetFilters);

  // 13. GENERATOR 1: Idea Lab
  if (el.ideaNiche) {
    el.ideaNiche.addEventListener('change', (e) => {
      if (el.ideaCustomNicheWrap) {
        el.ideaCustomNicheWrap.style.display = e.target.value === 'Custom' ? 'block' : 'none';
      }
    });
  }

  if (el.ideaLabForm) {
    el.ideaLabForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof GeneratorEngine === 'undefined') {
        showToast('Generator engine not loaded.', 'danger');
        return;
      }

      const niche = el.ideaNiche.value === 'Custom' ? (el.ideaCustomNiche.value || 'Custom') : el.ideaNiche.value;
      const topic = el.ideaSpecificTopic.value || niche;
      const format = el.ideaFormat.value;
      const language = el.ideaLang.value;
      const audience = el.ideaAudience.value;
      const count = parseInt(el.ideaCount.value, 10) || 5;

      const generated = GeneratorEngine.generateIdeas({
        niche, topic, format, language, audience, count
      });

      if (el.ideaLabResultsCount) {
        el.ideaLabResultsCount.textContent = `${generated.length} generated`;
      }

      if (el.ideaLabResults) {
        el.ideaLabResults.innerHTML = generated.map((idea, idx) => `
          <div class="concept-card">
            <div class="concept-header">
              <span class="badge-tag">${escapeHtml(idea.niche)}</span>
              <span class="angle-badge">${escapeHtml(idea.format)}</span>
            </div>
            <h4 class="concept-title">${escapeHtml(idea.title)}</h4>
            <div class="concept-hook">&ldquo;${escapeHtml(idea.hook)}&rdquo;</div>
            <p style="font-size: 0.8rem; color: var(--text-secondary);">${escapeHtml(idea.summary)}</p>
            <p class="concept-next-step">💡 <strong>Suggested next step:</strong> ${escapeHtml(idea.nextStep)}</p>
            <div class="concept-actions">
              <button class="btn btn-primary btn-sm save-lab-idea-btn" data-index="${idx}" type="button">
                Save to Planner
              </button>
              <button class="btn btn-secondary btn-sm send-to-title-btn" data-title="${escapeHtml(idea.title)}" type="button">
                To Title Gen
              </button>
              <button class="btn btn-secondary btn-sm send-to-script-btn" data-topic="${escapeHtml(idea.title)}" type="button">
                To Script Studio
              </button>
              <button class="btn btn-secondary btn-sm copy-idea-btn" data-text="${escapeHtml(idea.title + '\nHook: ' + idea.hook)}" type="button">
                Copy
              </button>
            </div>
          </div>
        `).join('');

        // Store active generated batch for quick save
        window._lastGeneratedIdeas = generated;
      }
    });
  }

  // Idea Lab results delegation
  if (el.ideaLabResults) {
    el.ideaLabResults.addEventListener('click', (e) => {
      const saveBtn = e.target.closest('.save-lab-idea-btn');
      if (saveBtn) {
        const idx = parseInt(saveBtn.dataset.index, 10);
        const item = window._lastGeneratedIdeas && window._lastGeneratedIdeas[idx];
        if (item) {
          const created = addIdea({
            title: item.title,
            topic: item.topic || item.niche,
            hook: item.hook,
            summary: item.summary,
            status: 'Idea'
          });
          saveBtn.disabled = true;
          saveBtn.textContent = 'Saved! ✓';
        }
        return;
      }

      const toTitleBtn = e.target.closest('.send-to-title-btn');
      if (toTitleBtn) {
        if (el.titleTopic) el.titleTopic.value = toTitleBtn.dataset.title;
        switchView('title-gen');
        return;
      }

      const toScriptBtn = e.target.closest('.send-to-script-btn');
      if (toScriptBtn) {
        if (el.scriptTopic) el.scriptTopic.value = toScriptBtn.dataset.topic;
        switchView('script-studio');
        return;
      }

      const copyBtn = e.target.closest('.copy-idea-btn');
      if (copyBtn) {
        copyToClipboard(copyBtn.dataset.text, copyBtn);
        return;
      }
    });
  }

  // 14. GENERATOR 2: Title Generator
  if (el.titleGenForm) {
    el.titleGenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof GeneratorEngine === 'undefined') return;

      const topic = el.titleTopic.value;
      const tone = el.titleTone.value;
      const language = el.titleLang.value;
      const videoType = el.titleFormatType.value;
      const keyword = el.titleKeyword ? el.titleKeyword.value : '';

      const titles = GeneratorEngine.generateTitles({
        topic, tone, language, videoType, keyword
      });

      if (el.titleResultsCount) el.titleResultsCount.textContent = `${titles.length} titles`;

      if (el.titleResults) {
        // Idea options selector
        const ideaOptionsHtml = state.ideas.map(i => `<option value="${i.id}">${escapeHtml(i.title.substring(0, 35))}...</option>`).join('');

        el.titleResults.innerHTML = titles.map((t, idx) => `
          <div class="title-item">
            <div class="title-item-header">
              <span class="angle-badge">${escapeHtml(t.angle)}</span>
              <span style="font-size: 0.725rem; color: var(--text-muted);">${escapeHtml(t.tone)} Tone</span>
            </div>
            <input type="text" class="title-text-field" id="title-field-${idx}" value="${escapeHtml(t.title)}" />
            <div class="title-actions">
              <button class="btn btn-secondary btn-sm copy-title-btn" data-target="title-field-${idx}" type="button">Copy</button>
              <select class="select-control title-attach-select" style="max-width: 160px; min-height: 34px; padding: 0.2rem 0.5rem; font-size: 0.75rem;">
                <option value="">Attach to Short...</option>
                ${ideaOptionsHtml}
              </select>
              <button class="btn btn-primary btn-sm create-from-title-btn" data-target="title-field-${idx}" type="button">Add as New</button>
            </div>
          </div>
        `).join('');
      }
    });
  }

  // Title results delegation
  if (el.titleResults) {
    el.titleResults.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.copy-title-btn');
      if (copyBtn) {
        const input = document.getElementById(copyBtn.dataset.target);
        if (input) copyToClipboard(input.value, copyBtn);
        return;
      }

      const createBtn = e.target.closest('.create-from-title-btn');
      if (createBtn) {
        const input = document.getElementById(createBtn.dataset.target);
        if (input && input.value.trim()) {
          addIdea({
            title: input.value.trim(),
            topic: el.titleTopic.value || 'General',
            hook: 'Stop scrolling! Here is what you need to know...',
            status: 'Idea'
          });
          createBtn.disabled = true;
          createBtn.textContent = 'Created! ✓';
        }
        return;
      }
    });

    el.titleResults.addEventListener('change', (e) => {
      const select = e.target.closest('.title-attach-select');
      if (select && select.value) {
        const titleItem = select.closest('.title-item');
        const input = titleItem ? titleItem.querySelector('.title-text-field') : null;
        if (input && input.value.trim()) {
          updateIdea(select.value, { title: input.value.trim() });
          showToast('Updated Short title in planner!', 'success');
        }
      }
    });
  }

  // 15. GENERATOR 3: Description & SEO Generator
  if (el.descGenForm) {
    el.descGenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof GeneratorEngine === 'undefined') return;

      const title = el.descTitle.value;
      const topic = el.descTopic.value;
      const keywords = el.descKeywords ? el.descKeywords.value : '';
      const language = el.descLang ? el.descLang.value : 'english';
      const channelName = el.descChannel ? el.descChannel.value : '';
      const cta = el.descCta ? el.descCta.value : '';

      const seo = GeneratorEngine.generateDescription({
        title, topic, keywords, language, channelName, cta
      });

      window._lastGeneratedSEO = seo;
      if (el.descCopyAllBtn) el.descCopyAllBtn.classList.remove('hidden');

      if (el.descResults) {
        const ideaOptionsHtml = state.ideas.map(i => `<option value="${i.id}">${escapeHtml(i.title.substring(0, 35))}...</option>`).join('');

        el.descResults.innerHTML = `
          <div class="concept-card">
            <div class="concept-header">
              <strong style="font-size: 0.85rem;">Opening Hook (First 2 Lines)</strong>
              <button class="btn btn-secondary btn-sm copy-text-btn" data-text="${escapeHtml(seo.opening)}" type="button">Copy</button>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${escapeHtml(seo.opening)}</p>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <strong style="font-size: 0.85rem;">Full YouTube Description</strong>
              <button class="btn btn-secondary btn-sm copy-text-btn" data-text="${escapeHtml(seo.fullDescription)}" type="button">Copy</button>
            </div>
            <textarea class="form-control textarea-control" rows="5" readonly>${escapeHtml(seo.fullDescription)}</textarea>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <strong style="font-size: 0.85rem;">Hashtags</strong>
              <button class="btn btn-secondary btn-sm copy-text-btn" data-text="${escapeHtml(seo.hashtags)}" type="button">Copy</button>
            </div>
            <p style="font-family: monospace; color: #38bdf8; font-size: 0.85rem;">${escapeHtml(seo.hashtags)}</p>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <strong style="font-size: 0.85rem;">YouTube Studio Tags Box (Comma-separated)</strong>
              <button class="btn btn-secondary btn-sm copy-text-btn" data-text="${escapeHtml(seo.tagsString)}" type="button">Copy Tags</button>
            </div>
            <p style="font-family: monospace; font-size: 0.8rem; color: var(--text-secondary);">${escapeHtml(seo.tagsString)}</p>
          </div>

          <div class="concept-card">
            <div class="concept-header">
              <strong style="font-size: 0.85rem;">Pinned Comment Draft</strong>
              <button class="btn btn-secondary btn-sm copy-text-btn" data-text="${escapeHtml(seo.pinnedComment)}" type="button">Copy</button>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${escapeHtml(seo.pinnedComment)}</p>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; padding-top: 0.5rem;">
            <select id="seo-attach-select" class="select-control" style="flex: 1;">
              <option value="">Attach SEO package to existing Short...</option>
              ${ideaOptionsHtml}
            </select>
            <button id="seo-attach-confirm-btn" class="btn btn-primary btn-sm" type="button">Attach</button>
          </div>
        `;
      }
    });
  }

  if (el.descResults) {
    el.descResults.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.copy-text-btn');
      if (copyBtn) {
        copyToClipboard(copyBtn.dataset.text, copyBtn);
        return;
      }

      if (e.target.id === 'seo-attach-confirm-btn') {
        const select = document.getElementById('seo-attach-select');
        if (select && select.value && window._lastGeneratedSEO) {
          const seo = window._lastGeneratedSEO;
          updateIdea(select.value, {
            description: seo.fullDescription,
            hashtags: seo.hashtags.split(' '),
            tags: seo.tagsList,
            pinnedComment: seo.pinnedComment
          });
          showToast('Attached SEO and description to Short!', 'success');
        }
      }
    });
  }

  if (el.descCopyAllBtn) {
    el.descCopyAllBtn.addEventListener('click', () => {
      if (window._lastGeneratedSEO) {
        const full = `${window._lastGeneratedSEO.fullDescription}\n\n${window._lastGeneratedSEO.hashtags}\n\nTags: ${window._lastGeneratedSEO.tagsString}`;
        copyToClipboard(full, el.descCopyAllBtn);
      }
    });
  }

  // 16. GENERATOR 4: Hook & Script Studio
  if (el.scriptGenForm) {
    el.scriptGenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof GeneratorEngine === 'undefined') return;

      const topic = el.scriptTopic.value;
      const duration = el.scriptDuration.value;
      const language = el.scriptLang.value;
      const tone = el.scriptTone.value;

      const scriptData = GeneratorEngine.generateScript({
        topic, duration, language, tone
      });

      window._lastGeneratedScript = scriptData;
      if (el.scriptCopyBtn) el.scriptCopyBtn.classList.remove('hidden');

      if (el.scriptResults) {
        const ideaOptionsHtml = state.ideas.map(i => `<option value="${i.id}">${escapeHtml(i.title.substring(0, 35))}...</option>`).join('');

        el.scriptResults.innerHTML = `
          <div class="concept-card">
            <strong style="font-size: 0.85rem; margin-bottom: 0.35rem; display: block;">3 Alternative Opening Hooks (0-5s):</strong>
            <ul style="list-style: disc; margin-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
              ${scriptData.hooks.map(h => `<li>&ldquo;${escapeHtml(h)}&rdquo;</li>`).join('')}
            </ul>
          </div>

          <div class="script-scenes-list">
            ${scriptData.scenes.map(s => `
              <div class="scene-card">
                <div class="scene-card-header">
                  <span class="scene-time">${escapeHtml(s.timeRange)}</span>
                  <span class="scene-section-title">${escapeHtml(s.section)}</span>
                </div>
                <p class="scene-narration">&ldquo;${escapeHtml(s.narration)}&rdquo;</p>
                <div class="scene-cues">
                  <span>🎬 <strong>Visual Direction:</strong> ${escapeHtml(s.visual)}</span>
                  <span>💬 <strong>On-Screen Text:</strong> ${escapeHtml(s.overlayText)}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 1rem;">
            <select id="script-attach-select" class="select-control" style="flex: 1;">
              <option value="">Attach script to existing Short...</option>
              ${ideaOptionsHtml}
            </select>
            <button id="script-attach-confirm-btn" class="btn btn-primary btn-sm" type="button">Attach Script</button>
          </div>
        `;
      }
    });
  }

  if (el.scriptCopyBtn) {
    el.scriptCopyBtn.addEventListener('click', () => {
      if (window._lastGeneratedScript) {
        copyToClipboard(window._lastGeneratedScript.fullScriptText, el.scriptCopyBtn);
      }
    });
  }

  if (el.scriptResults) {
    el.scriptResults.addEventListener('click', (e) => {
      if (e.target.id === 'script-attach-confirm-btn') {
        const select = document.getElementById('script-attach-select');
        if (select && select.value && window._lastGeneratedScript) {
          updateIdea(select.value, {
            hook: window._lastGeneratedScript.hooks[0],
            script: window._lastGeneratedScript
          });
          showToast('Attached script to Short idea!', 'success');
        }
      }
    });
  }

  // 17. GENERATOR 5: Thumbnail Concept Studio
  if (el.thumbGenForm) {
    el.thumbGenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (typeof GeneratorEngine === 'undefined') return;

      const title = el.thumbTitle.value;
      const mainSubject = el.thumbSubject.value;
      const colorPreference = el.thumbColor.value;
      const mood = el.thumbMood.value;

      const thumbData = GeneratorEngine.generateThumbnail({
        title, mainSubject, colorPreference, mood
      });

      if (el.thumbResultsCount) el.thumbResultsCount.textContent = `${thumbData.concepts.length} concepts`;

      if (el.thumbResults) {
        const ideaOptionsHtml = state.ideas.map(i => `<option value="${i.id}">${escapeHtml(i.title.substring(0, 35))}...</option>`).join('');

        el.thumbResults.innerHTML = thumbData.concepts.map((concept, idx) => `
          <div class="thumb-concept-card">
            <div class="concept-header">
              <strong style="font-size: 0.95rem; color: #f59e0b;">${escapeHtml(concept.conceptName)}</strong>
              <span class="angle-badge">Prompt Ready</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              <strong>Composition:</strong> ${escapeHtml(concept.composition)}
            </p>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">
              <strong>Lighting & Color:</strong> ${escapeHtml(concept.lighting)}
            </p>
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">AI IMAGE GENERATION PROMPT:</span>
              <div class="prompt-box">${escapeHtml(concept.imagePrompt)}</div>
            </div>
            <div class="concept-actions">
              <button class="btn btn-secondary btn-sm copy-thumb-prompt-btn" data-prompt="${escapeHtml(concept.imagePrompt)}" type="button">
                Copy AI Prompt
              </button>
              <select class="select-control thumb-attach-select" data-index="${idx}" style="max-width: 170px; min-height: 34px; padding: 0.2rem 0.5rem; font-size: 0.75rem;">
                <option value="">Attach to Short...</option>
                ${ideaOptionsHtml}
              </select>
            </div>
          </div>
        `).join('');

        window._lastGeneratedThumbs = thumbData.concepts;
      }
    });
  }

  if (el.thumbResults) {
    el.thumbResults.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.copy-thumb-prompt-btn');
      if (copyBtn) {
        copyToClipboard(copyBtn.dataset.prompt, copyBtn);
        return;
      }
    });

    el.thumbResults.addEventListener('change', (e) => {
      const select = e.target.closest('.thumb-attach-select');
      if (select && select.value && window._lastGeneratedThumbs) {
        const idx = parseInt(select.dataset.index, 10);
        const concept = window._lastGeneratedThumbs[idx];
        if (concept) {
          updateIdea(select.value, {
            thumbnailConcept: {
              concept: concept.conceptName,
              imagePrompt: concept.imagePrompt,
              negativePrompt: concept.negativePrompt,
              overlayText: concept.overlayText
            }
          });
          showToast('Attached thumbnail concept to Short idea!', 'success');
        }
      }
    });
  }
}

/* ==========================================================================
   Initialization (V2)
   ========================================================================== */

function initApp() {
  initElements();
  state.ideas = loadIdeasFromStorage();
  setupEventListeners();
  updateAppView();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Global namespace export for test suite and external extensions
if (typeof window !== 'undefined') {
  window.CreatorDesk = {
    STORAGE_KEY,
    DEFAULT_IDEAS,
    state,
    loadIdeasFromStorage,
    saveIdeasToStorage,
    generateId,
    addIdea,
    updateIdea,
    deleteIdea,
    getIdeaById,
    validateIdeaForm,
    getFilteredAndSortedIdeas,
    isFilterActive,
    renderStats,
    renderDashboard,
    updateAppView,
    openIdeaModal,
    closeIdeaModal,
    openDeleteModal,
    closeDeleteModal,
    openWorkspaceModal,
    closeWorkspaceModal,
    openPublishModal,
    closePublishModal,
    exportDataAsJson,
    importDataFromJson,
    switchView
  };
}
