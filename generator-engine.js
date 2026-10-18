/**
 * CreatorDesk V2 - Local Generation Engine
 * 100% Free, Offline, and Client-Side Template Engine.
 * Supports English, Hindi, and Hinglish across multiple niches, formats, and tones.
 * Clearly labeled as template-based generator (no fake AI claims).
 */

const GeneratorEngine = (function () {
  'use strict';

  // Helper: Pick random item from an array without immediate repetition
  function pickRandom(arr) {
    if (!arr || arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Helper: Shuffle array
  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  // Helper: Capitalize
  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /* ==========================================================================
     1. IDEA LAB TEMPLATES & GENERATOR
     ========================================================================== */

  const IDEA_TEMPLATES = {
    english: {
      tutorial: [
        {
          title: "How to Master {topic} in Under 30 Seconds",
          summary: "A step-by-step rapid tutorial revealing the most effective shortcut for {topic}.",
          hook: "Stop struggling with {topic}! Do this simple 1-step tweak right now...",
          format: "Tutorial",
          nextStep: "Record screen capture showing the exact before and after comparison."
        },
        {
          title: "The Only {topic} Cheat Code You Will Ever Need",
          summary: "Breaks down a beginner-friendly formula for {topic} that saves hours of wasted effort.",
          hook: "Nobody talks about this {topic} trick, but professional creators use it every day...",
          format: "Tutorial",
          nextStep: "Write a bulleted 3-part script and outline the on-screen arrows."
        }
      ],
      facts: [
        {
          title: "3 {topic} Myths Everyone Still Believes in 2026",
          summary: "Debunks the 3 most common misconceptions surrounding {topic} with surprising facts.",
          hook: "Think you know the truth about {topic}? Myth #2 is going to blow your mind...",
          format: "Quick Facts / Myths",
          nextStep: "Source 2 punchy visual b-roll clips that prove each myth wrong."
        },
        {
          title: "The Shocking Secret Behind {topic} Nobody Realizes",
          summary: "Explains an intriguing underlying reality of {topic} that challenges conventional thinking.",
          hook: "If you care about {topic}, what I am about to tell you will change your entire perspective...",
          format: "Quick Facts / Myths",
          nextStep: "Prepare high-contrast stats or graph overlays for visual retention."
        }
      ],
      challenge: [
        {
          title: "Can You Beat This {topic} Challenge in 15 Seconds?",
          summary: "A fast-paced interactive challenge designed to provoke comments and replays.",
          hook: "98% of people fail this {topic} test on the first try. Can you spot it?",
          format: "Challenge",
          nextStep: "Add a 15-second on-screen countdown timer to keep viewer eyes glued."
        }
      ],
      comparison: [
        {
          title: "{topic}: Free Method vs. Paid Pro Setup",
          summary: "A clear side-by-side battle testing whether expensive gear or free hacks win.",
          hook: "Does spending money on {topic} actually give you better results? Let's test it!",
          format: "Comparison / Vs",
          nextStep: "Create a 50/50 vertical split screen layout showing the side-by-side test."
        }
      ],
      list: [
        {
          title: "Top 3 {topic} Tools You Must Try Today",
          summary: "Curates the top three game-changing resources or tips for {topic}.",
          hook: "Here are 3 game-changing {topic} discoveries that feel completely illegal to know...",
          format: "Top List",
          nextStep: "Prepare 3 quick screen demos and highlight tool #3 as the best one."
        }
      ],
      story: [
        {
          title: "How One Small {topic} Mistake Ruined Everything",
          summary: "A cautionary storytelling Short showing what happens when a critical rule is ignored.",
          hook: "It took 5 seconds to make this {topic} mistake, but 6 months to fix the damage...",
          format: "Story / Drama",
          nextStep: "Film with dramatic close-up lighting and suspenseful background audio."
        }
      ],
      reaction: [
        {
          title: "Reacting to the Wildest {topic} Trend Right Now",
          summary: "Breaks down a hot trend or bizarre technique in {topic} with candid creator reactions.",
          hook: "I cannot believe people are actually doing this with {topic}...",
          format: "Reaction / Commentary",
          nextStep: "Position reaction facecam in the bottom-right corner over the source clip."
        }
      ],
      funny: [
        {
          title: "POV: Trying {topic} for the First Time Ever",
          summary: "Relatable comedic sketch contrasting expectations versus harsh reality in {topic}.",
          hook: "Expectation vs. Reality when starting out with {topic} is too painful...",
          format: "Funny Moment / Meme",
          nextStep: "Plan 2 quick comedic sound effects (record scratch, dramatic violin)."
        }
      ]
    },
    hindi: {
      tutorial: [
        {
          title: "{topic} को 30 सेकंड में आसान तरीके से सीखें",
          summary: "{topic} के लिए सबसे असरदार और तेज ट्रिक जो हर क्रिएटर को जाननी चाहिए।",
          hook: "अगर आप भी {topic} में परेशान हो रहे हैं, तो ये 1 आसान सेटिंग तुरंत बदल लें...",
          format: "Tutorial",
          nextStep: "स्क्रीन रिकॉर्डिंग में रेड एरो से हाइलाइट करके स्टेप्स दिखाएं।"
        },
        {
          title: "{topic} का यह सीक्रेट तरीका कोई नहीं बताएगा",
          summary: "{topic} का एक स्मार्ट तरीका जिससे घंटों का काम मिनटों में पूरा हो जाएगा।",
          hook: "रुकिए! {topic} करते समय ये गलती 90% लोग करते हैं, आप मत करना...",
          format: "Tutorial",
          nextStep: "3 पॉइंट्स का बुलेट स्क्रिप्ट तैयार करें और वॉइसओवर रिकॉर्ड करें।"
        }
      ],
      facts: [
        {
          title: "{topic} के 3 सबसे बड़े झूठ जो सब सच मानते हैं",
          summary: "{topic} से जुड़ी 3 ऐसी बातें जो सिर्फ अफवाह हैं और असली सच्चाई क्या है।",
          hook: "क्या आप भी {topic} का यह झूठ सच मानते हैं? नंबर 3 देखकर आप हैरान रह जाएंगे...",
          format: "Quick Facts / Myths",
          nextStep: "हाई-कंट्रास्ट टेक्स्ट और प्रूफ स्क्रीनशॉट तैयार रखें।"
        }
      ],
      comparison: [
        {
          title: "{topic}: सस्ता तरीका vs महंगा तरीका",
          summary: "दोनों तरीकों की तुलना करके देखें कि कौन सा तरीका ज्यादा फायदेमंद है।",
          hook: "क्या {topic} में पैसे खर्च करना वाकई जरूरी है? आइए लाइव टेस्ट करके देखते हैं...",
          format: "Comparison / Vs",
          nextStep: "स्प्लिट स्क्रीन में दोनों नतीजों को साथ रखकर दिखाएं।"
        }
      ],
      list: [
        {
          title: "{topic} के 3 सबसे कमाल के ट्रिक्स 2026",
          summary: "तीन ऐसे टिप्स जो {topic} में आपके रिजल्ट को दोगुना कर देंगे।",
          hook: "ये 3 {topic} ट्रिक्स आपका घंटों का समय बचाएंगी, आखिरी वाली सबसे खास है...",
          format: "Top List",
          nextStep: "नंबर 3 को सबसे पावरफुल रखकर रिटेंशन बढ़ाएं।"
        }
      ]
    },
    hinglish: {
      tutorial: [
        {
          title: "{topic} Master Karo Sirf 30 Seconds Mein",
          summary: "Super fast and practical guide for {topic} that works instantly.",
          hook: "Agar aap {topic} try kar rahe ho, toh ye 1 secret trick miss mat karna...",
          format: "Tutorial",
          nextStep: "Phone screen record karke clear arrows aur zoom-in effects lagayein."
        },
        {
          title: "Ye {topic} Trick Aapko Pehle Kyu Nahi Pata Thi?",
          summary: "Pro creators ka hidden shortcut for {topic} explained in simple Hinglish.",
          hook: "Stop scrolling! {topic} ka ye feature dekh kar aap bologe: pehle kyu nahi pata tha...",
          format: "Tutorial",
          nextStep: "First 3 seconds mein problem dikhayein aur turant solution reveal karein."
        }
      ],
      facts: [
        {
          title: "{topic} Ke 3 Biggest Myths Jo Sab Sach Maante Hain",
          summary: "Debunking top 3 myths about {topic} with solid logic and live proof.",
          hook: "Sach batao, kya aap bhi {topic} ke baare mein ye baat maante the? Check karo...",
          format: "Quick Facts / Myths",
          nextStep: "Fact #3 par punchy question pooch kar comments drive karein."
        }
      ],
      comparison: [
        {
          title: "{topic}: Free Vs Paid Reality Check",
          summary: "Real test comparing free vs expensive solutions for {topic}.",
          hook: "Kya {topic} ke liye paise kharch karna worth it hai? Aaj final sach janenge...",
          format: "Comparison / Vs",
          nextStep: "Side-by-side split screen visual prepare karein."
        }
      ],
      list: [
        {
          title: "Top 3 {topic} Hacks Jo Har Creator Ko Chahiye",
          summary: "Three must-have shortcuts and tools for {topic} lovers.",
          hook: "Ye 3 {topic} hacks aapka daily kaam 10x aasan bana denge, no. 2 mera favorite hai...",
          format: "Top List",
          nextStep: "Text animation overlay lagayein har point ke saath."
        }
      ]
    }
  };

  /**
   * Generates a batch of distinct ideas from local templates.
   */
  function generateIdeas(params) {
    const niche = (params.niche || 'Technology').trim();
    const specificTopic = (params.topic || niche).trim();
    const format = (params.format || 'all').toLowerCase();
    const lang = (params.language || 'english').toLowerCase();
    const count = Math.min(Math.max(parseInt(params.count, 10) || 5, 1), 10);
    const audience = params.audience || 'General Viewers';

    const langGroup = IDEA_TEMPLATES[lang] || IDEA_TEMPLATES.english;
    let pool = [];

    // Filter by format or aggregate all
    if (format !== 'all' && langGroup[format]) {
      pool = [...langGroup[format]];
    } else {
      Object.keys(langGroup).forEach(fmtKey => {
        pool.push(...langGroup[fmtKey]);
      });
    }

    // Fallback if pool is small
    if (pool.length < count) {
      Object.keys(IDEA_TEMPLATES.english).forEach(fmtKey => {
        pool.push(...IDEA_TEMPLATES.english[fmtKey]);
      });
    }

    // Shuffle pool to prevent repetitive sequential results
    const shuffled = shuffle(pool);
    const results = [];
    const usedTitles = new Set();

    for (let i = 0; i < shuffled.length && results.length < count; i++) {
      const item = shuffled[i];
      const title = item.title.replace(/{topic}/g, specificTopic);
      if (usedTitles.has(title)) continue;
      usedTitles.add(title);

      results.push({
        id: 'gen_idea_' + Date.now() + '_' + i,
        title: title,
        topic: specificTopic,
        niche: niche,
        summary: item.summary.replace(/{topic}/g, specificTopic) + ` Targeted for ${audience}.`,
        hook: item.hook.replace(/{topic}/g, specificTopic),
        format: item.format,
        nextStep: item.nextStep,
        language: capitalize(lang),
        engine: 'Local Creator Template Engine'
      });
    }

    return results;
  }

  /* ==========================================================================
     2. TITLE GENERATOR
     ========================================================================== */

  const TITLE_PATTERNS = {
    english: {
      curiosity: [
        { pattern: "Why Nobody is Talking About {topic}", angle: "Intrigue & Pattern Interrupt" },
        { pattern: "The Hidden Truth About {topic} Revealed", angle: "Curiosity & Insider Knowledge" },
        { pattern: "I Tested {topic} for 7 Days (Here Is What Happened)", angle: "Personal Experiment & Curiosity" },
        { pattern: "Is {topic} Actually Dead in 2026?", angle: "Contrarian Provocation" },
        { pattern: "Stop Doing {topic} Like This Right Now", angle: "Urgent Warning & Loss Aversion" }
      ],
      funny: [
        { pattern: "When You Try {topic} For The First Time Ever 💀", angle: "Relatable Comedy & Meme Culture" },
        { pattern: "Expectation vs. Reality: {topic} Edition", angle: "Humorous Contrast" },
        { pattern: "Me Thinking {topic} Was Easy (Huge Mistake)", angle: "Self-deprecating Humor" },
        { pattern: "Only Real {topic} Lovers Will Understand This", angle: "Community In-Joke" }
      ],
      educational: [
        { pattern: "How to Master {topic} in 60 Seconds (Beginner Guide)", angle: "High-Utility Speed Tutorial" },
        { pattern: "3 Rules of {topic} You Must Never Break", angle: "Authoritative Framework" },
        { pattern: "The Secret Formula to Improve Your {topic}", angle: "Actionable Step-by-Step Blueprint" },
        { pattern: "What Experts Never Tell You About {topic}", angle: "Industry Insider Perspective" }
      ],
      energetic: [
        { pattern: "This {topic} Trick Changed Everything!", angle: "High Energy Transformation" },
        { pattern: "The Most Insane {topic} You Will See Today", angle: "Superlative Hype" },
        { pattern: "Level Up Your {topic} In 10 Seconds!", angle: "Instant Gratification & Speed" }
      ],
      suspenseful: [
        { pattern: "The Shocking Mistake Destroying Your {topic}", angle: "Fear of Missing Out (FOMO)" },
        { pattern: "They Don't Want You To Know This {topic} Secret", angle: "Conspiracy & Taboo Knowledge" }
      ]
    },
    hindi: {
      curiosity: [
        { pattern: "{topic} का यह काला सच कोई नहीं बताता", angle: "गहरी उत्सुकता और छिपा हुआ सच" },
        { pattern: "अगर आप {topic} करते हैं तो सावधान हो जाइए!", angle: "चेतावनी और नुकसान से बचाव" },
        { pattern: "क्या 2026 में {topic} बंद होने वाला है?", angle: "ट्रेंडिंग सवाल और जिज्ञासा" }
      ],
      educational: [
        { pattern: "{topic} को सिर्फ 30 सेकंड में समझें", angle: "सरल और तेज ज्ञान" },
        { pattern: "{topic} की 3 सबसे जरूरी ट्रिक्स", angle: "प्रैक्टिकल और उपयोगी टिप्स" }
      ],
      energetic: [
        { pattern: "ये {topic} ट्रिक देखकर होश उड़ जाएंगे!", angle: "हाई एनर्जी और सरप्राइज" }
      ]
    },
    hinglish: {
      curiosity: [
        { pattern: "{topic} Ka Ye Secret Koi Nahi Batayega", angle: "Curiosity & Insider Hack" },
        { pattern: "Stop! {topic} Mein Ye Galti Mat Karna", angle: "Urgent Warning & Attention Grabber" },
        { pattern: "Kya {topic} 2026 Mein Worth It Hai?", angle: "Direct Question for Viewer Comments" }
      ],
      educational: [
        { pattern: "How To Master {topic} In 1 Minute (Easy Guide)", angle: "Fast & Practical Value" },
        { pattern: "{topic} Ke 3 Game Changing Rules", angle: "Clear Actionable Advice" }
      ],
      energetic: [
        { pattern: "Ye {topic} Trick Aapka Time 10x Bachayegi!", angle: "High-Benefit Energy Hook" }
      ]
    }
  };

  /**
   * Generates targeted title options with angle breakdowns.
   */
  function generateTitles(params) {
    const topic = (params.topic || 'YouTube Shorts').trim();
    const tone = (params.tone || 'curiosity').toLowerCase();
    const lang = (params.language || 'english').toLowerCase();
    const videoType = params.videoType || 'Short';
    const keyword = (params.keyword || '').trim();

    const langGroup = TITLE_PATTERNS[lang] || TITLE_PATTERNS.english;
    const toneGroup = langGroup[tone] || langGroup.curiosity || TITLE_PATTERNS.english.curiosity;

    const results = [];
    toneGroup.forEach(item => {
      let finalTitle = item.pattern.replace(/{topic}/g, topic);
      if (keyword && !finalTitle.toLowerCase().includes(keyword.toLowerCase())) {
        finalTitle += ` (${keyword})`;
      }
      if (videoType === 'Short' && !finalTitle.includes('#Shorts') && lang === 'english') {
        finalTitle += ' #Shorts';
      }
      results.push({
        title: finalTitle,
        angle: item.angle,
        tone: capitalize(tone),
        language: capitalize(lang),
        engine: 'Local Creator Template Engine'
      });
    });

    return results;
  }

  /* ==========================================================================
     3. DESCRIPTION & SEO GENERATOR
     ========================================================================== */

  function generateDescription(params) {
    const title = (params.title || 'My YouTube Short').trim();
    const topic = (params.topic || 'Content Planning').trim();
    const niche = (params.niche || 'Tech').trim();
    const lang = (params.language || 'english').toLowerCase();
    const channel = (params.channelName || '').trim();
    const cta = (params.cta || 'Subscribe for daily short tutorials!').trim();
    const userKeywords = (params.keywords || '').split(',').map(s => s.trim()).filter(Boolean);
    const links = (params.links || '').trim();

    // 1. Opening hook sentence
    let opening = "";
    if (lang === 'hindi') {
      opening = `इस वीडियो में हम बात करेंगे ${title} के बारे में। अगर आप ${topic} में रुचि रखते हैं, तो यह शॉर्ट आपके लिए बहुत काम का है!`;
    } else if (lang === 'hinglish') {
      opening = `Is video mein dekhiye ${title}! Agar aap ${topic} seekhna chahte hain toh ye Short last tak zaroor dekhein.`;
    } else {
      opening = `In this Short, we break down ${title}! Watch till the end to discover the fastest way to get results with ${topic}.`;
    }

    // 2. Full Description Body
    let fullDesc = `${opening}\n\n`;
    if (userKeywords.length > 0) {
      fullDesc += `Key Topics Covered:\n• ` + userKeywords.slice(0, 4).join('\n• ') + `\n\n`;
    }
    if (cta) {
      fullDesc += `🔔 ${cta}\n`;
    }
    if (channel) {
      fullDesc += `Follow ${channel} for more high-value daily shorts!\n`;
    }
    if (links) {
      fullDesc += `\nHelpful Links:\n${links}\n`;
    }
    fullDesc += `\n💬 Question of the day: What is your biggest challenge with ${topic}? Let me know in the comments!`;

    // 3. Relevant Hashtags (clean, relevant, no spam)
    const cleanTopicTag = '#' + topic.replace(/[^a-zA-Z0-9]/g, '');
    const cleanNicheTag = '#' + niche.replace(/[^a-zA-Z0-9]/g, '');
    const hashtags = ['#Shorts', '#YouTubeShorts', cleanTopicTag, cleanNicheTag, '#ViralShorts'].filter(Boolean);

    // 4. YouTube Tags (comma-separated for Studio tag box)
    const ytTags = [
      topic.toLowerCase(),
      `${topic.toLowerCase()} tips`,
      `${topic.toLowerCase()} tutorial`,
      niche.toLowerCase(),
      'youtube shorts',
      'shorts video',
      ...userKeywords.map(k => k.toLowerCase())
    ].slice(0, 10);

    // 5. Pinned comment suggestion
    let pinnedComment = "";
    if (lang === 'hindi') {
      pinnedComment = `👇 आपका ${topic} से जुड़ा सबसे बड़ा सवाल क्या है? कमेंट में बताएं, मैं हर कमेंट का जवाब दूंगा! 🚀`;
    } else if (lang === 'hinglish') {
      pinnedComment = `👇 Aapka ${topic} ko lekar sabse favorite tip kaunsa laga? Comment mein zaroor batayein! 🚀`;
    } else {
      pinnedComment = `👇 Did you know about this before? Drop your favorite tip in the comments below! Don't forget to like & subscribe! 🚀`;
    }

    return {
      opening,
      fullDescription: fullDesc,
      hashtags: hashtags.join(' '),
      tagsList: ytTags,
      tagsString: ytTags.join(', '),
      pinnedComment,
      disclaimer: "SEO suggestions based on creator best practices. Rankings depend on audience retention and engagement.",
      engine: 'Local Creator Template Engine'
    };
  }

  /* ==========================================================================
     4. HOOK & SHORT SCRIPT STUDIO
     ========================================================================== */

  function generateScript(params) {
    const topic = (params.topic || 'Productivity Hacks').trim();
    const duration = parseInt(params.duration, 10) || 30; // 15, 30, or 60 seconds
    const lang = (params.language || 'english').toLowerCase();
    const tone = (params.tone || 'energetic').toLowerCase();
    const format = (params.format || 'tutorial').toLowerCase();

    // Opening hooks
    let hooks = [];
    if (lang === 'hindi') {
      hooks = [
        `रुकिए! अगर आप भी ${topic} कर रहे हैं, तो ये बहुत बड़ी गलती है...`,
        `सिर्फ 30 सेकंड में जानिये ${topic} का असली सीक्रेट...`,
        `क्या आपको पता है 99% लोग ${topic} में यह गलती करते हैं?`
      ];
    } else if (lang === 'hinglish') {
      hooks = [
        `Stop scrolling! Agar aap ${topic} use karte ho, toh ye setting abhi check karo...`,
        `Ye hai ${topic} ka sabse bada secret jo pro creators use karte hain...`,
        `Kya aapko pata hai ${topic} ka ye hack aapka hours of work save karega?`
      ];
    } else {
      hooks = [
        `Stop scrolling! If you are doing ${topic}, you need to see this right now...`,
        `This one tiny ${topic} tweak completely changes everything...`,
        `99% of people get ${topic} completely wrong. Here is how to fix it in 30 seconds...`
      ];
    }

    // Scenes breakdown based on duration
    let scenes = [];
    if (duration === 15) {
      scenes = [
        {
          timeRange: "0s - 3s",
          section: "Hook",
          narration: hooks[0],
          visual: "Fast camera push-in. High-energy creator expression pointing at camera.",
          overlayText: "DO THIS NOW ⚠️"
        },
        {
          timeRange: "3s - 11s",
          section: "Core Value",
          narration: lang === 'hindi'
            ? `बस इस 1 स्टेप को फॉलो करें: अपने सेटिंग्स में जाइये और इस ऑप्शन को ऑन कर दीजिये।`
            : lang === 'hinglish'
            ? `Bas ye 1 step follow karo: direct settings mein jao aur ye secret toggle switch enable karo.`
            : `Here is the fix: jump straight into your settings and toggle this one hidden switch on.`,
          visual: "Screen recording zoom-in on target action with glowing red circle.",
          overlayText: "STEP 1: ENABLE"
        },
        {
          timeRange: "11s - 15s",
          section: "Payoff & CTA",
          narration: lang === 'hindi'
            ? `फायदा खुद देखिये! रोज ऐसी ट्रिक्स के लिए अभी सब्सक्राइब करें।`
            : lang === 'hinglish'
            ? `Instant result dekhiye! Roz aisi tricks ke liye subscribe zaroor karein.`
            : `Notice the instant difference! Subscribe now for daily creator hacks.`,
          visual: "Thumbs up or fast loop transition to restart the video.",
          overlayText: "SUBSCRIBE FOR MORE 🔔"
        }
      ];
    } else if (duration === 60) {
      scenes = [
        {
          timeRange: "0s - 5s",
          section: "The Hook",
          narration: hooks[0],
          visual: "Intense close-up. Fast zoom. Bold red alert text on screen.",
          overlayText: "STOP! WATCH THIS 🚨"
        },
        {
          timeRange: "5s - 15s",
          section: "The Problem",
          narration: lang === 'hindi'
            ? `ज्यादातर लोग सोचते हैं कि ${topic} बहुत मुश्किल है और घंटों बर्बाद करते हैं। लेकिन असली वजह है एक गलत तकनीक।`
            : lang === 'hinglish'
            ? `Most creators think ${topic} bohot hard hai aur hours waste karte hain. But the real problem is wrong technique.`
            : `Most creators waste hours on ${topic} thinking they need expensive gear or hours of time. But that is completely wrong.`,
          visual: "B-roll of frustrated creator looking at screen with red 'X' graphic.",
          overlayText: "THE WRONG WAY ❌"
        },
        {
          timeRange: "15s - 32s",
          section: "Step 1: The Blueprint",
          narration: lang === 'hindi'
            ? `स्टेप 1: सबसे पहले अपना फोकस बेसिक पर रखें। इस आसान फॉर्मूले को लागू करें और गैर-जरूरी चीजें हटा दें।`
            : lang === 'hinglish'
            ? `Step 1: Pehle focus basic par rakhein. Is simple formula ko apply karein aur unnecessary stuff delete karein.`
            : `Step 1: Strip away the clutter. Apply this simple 3-part framework that immediately cleans up your workflow.`,
          visual: "Screen demonstration with animated bullet points appearing on screen.",
          overlayText: "STEP 1: SIMPLIFY"
        },
        {
          timeRange: "32s - 48s",
          section: "Step 2: The Secret Tweak",
          narration: lang === 'hindi'
            ? `स्टेप 2: अब यह सीक्रेट ट्रिक लगाइये। यह एक बदलाव आपके रिजल्ट को सीधे 2 गुना बेहतर बना देगा।`
            : lang === 'hinglish'
            ? `Step 2: Ab ye secret trick lagayein. Ye ek tweak aapka output sidha 2x boost kar dega.`
            : `Step 2: Here is where the magic happens. Implement this pro tweak and watch your output quality double.`,
          visual: "Side-by-side comparison proof showing 2x speed increase.",
          overlayText: "STEP 2: 2X BOOST ⚡"
        },
        {
          timeRange: "48s - 60s",
          section: "Conclusion & Loop CTA",
          narration: lang === 'hindi'
            ? `इसे आज ही ट्राय करें। कमेंट में बताएं आप अगली ट्रिक किस पर देखना चाहते हैं, और सब्सक्राइब करना न भूलें!`
            : lang === 'hinglish'
            ? `Ise aaj hi try karein! Comment mein batayein next video kis par chahiye, aur subscribe karein!`
            : `Try this today! Drop a comment on what topic you want next, and smash subscribe for daily shorts!`,
          visual: "Creator smiles, points to subscribe button animation in lower third.",
          overlayText: "SAVE & SUBSCRIBE 📌"
        }
      ];
    } else {
      // Default 30s
      scenes = [
        {
          timeRange: "0s - 5s",
          section: "The Hook",
          narration: hooks[0],
          visual: "Fast snap or finger click. Camera zooms quickly onto subject.",
          overlayText: "STOP SCROLLING ⚠️"
        },
        {
          timeRange: "5s - 13s",
          section: "The Problem / Context",
          narration: lang === 'hindi'
            ? `अगर आप भी ${topic} में यही पुरानी गलती कर रहे हैं, तो आपका बहुत समय बर्बाद हो रहा है।`
            : lang === 'hinglish'
            ? `Agar aap ${topic} mein ye mistake repeat kar rahe ho, toh aapka bohot time waste ho raha hai.`
            : `If you are still doing ${topic} the old manual way, you are losing tons of precious time.`,
          visual: "Quick cut to error state or relatable reaction.",
          overlayText: "MISTAKE EXPOSED 🚫"
        },
        {
          timeRange: "13s - 24s",
          section: "The Solution / Secret",
          narration: lang === 'hindi'
            ? `इसके बजाय यह तरीका अपनाएं। यह ट्रिक आपके पूरे काम को चुटकियों में आसान बना देगी।`
            : lang === 'hinglish'
            ? `Iske bajaye ye shortcut use karo. Ye simple setting aapka kaam super fast bana degi.`
            : `Instead, use this exact shortcut. It completely streamlines the entire process in seconds.`,
          visual: "Crisp screen recording with animated zoom on the solution.",
          overlayText: "PRO SHORTCUT 💡"
        },
        {
          timeRange: "24s - 30s",
          section: "Payoff & Loop CTA",
          narration: lang === 'hindi'
            ? `ट्राय करके देखिये! ऐसी ही काम की टिप्स के लिए अभी सब्सक्राइब करें।`
            : lang === 'hinglish'
            ? `Try karke dekhein! Aisi hi practical tips ke liye channel ko subscribe karein.`
            : `Try it out and see the difference! Subscribe now so you never miss another tip.`,
          visual: "Subscribe button animation with bell icon chime.",
          overlayText: "SUBSCRIBE 🔔"
        }
      ];
    }

    const fullScriptText = scenes.map(s => `[${s.timeRange}] (${s.section})\nSpoken: "${s.narration}"\nVisuals: ${s.visual}\nOn-Screen Text: ${s.overlayText}`).join('\n\n');

    return {
      duration,
      hooks,
      scenes,
      fullScriptText,
      engine: 'Local Creator Template Engine'
    };
  }

  /* ==========================================================================
     5. THUMBNAIL CONCEPT STUDIO
     ========================================================================== */

  function generateThumbnail(params) {
    const title = (params.title || 'My Viral Short').trim();
    const topic = (params.topic || 'Tech Hacks').trim();
    const niche = (params.niche || 'Tech').trim();
    const mood = (params.mood || 'High Energy / Neon').trim();
    const colorPreference = (params.colorPreference || 'Red & Black').trim();
    const mainSubject = (params.mainSubject || 'Shocked creator holding glowing smartphone').trim();

    const concepts = [
      {
        conceptName: "High-Contrast Curiosity Hero",
        composition: "Close-up portrait of the main subject on the right 2/3, looking directly into the lens with high emotion. High contrast lighting.",
        background: `Dark textured background with vibrant ${colorPreference} accent rim lighting and soft volumetric smoke.`,
        subject: mainSubject,
        lighting: `Dramatic studio key light on subject face, vibrant ${colorPreference} edge-light separating subject from dark backdrop.`,
        overlayText: "DON'T DO THIS! ⚠️",
        imagePrompt: `Cinematic YouTube Shorts thumbnail concept: ${mainSubject}, high emotional expression, dramatic lighting, vibrant ${colorPreference} rim light, hyper-detailed, 8k resolution, octane render style, shallow depth of field, 9:16 vertical ratio --ar 9:16`,
        negativePrompt: "blurry, low quality, distorted face, extra fingers, text, watermark, artifacts, muted colors, dark muddy shadows"
      },
      {
        conceptName: "50/50 Split Screen Battle",
        composition: "Vertical split down the center. Left side shows 'BEFORE / WRONG' in desaturated cool tones; right side shows 'AFTER / PRO' in vibrant saturated tones.",
        background: "Subtle split gradient with glowing neon divider line down the middle.",
        subject: `Two contrasting states of ${topic}: messy/frustrated on left, glowing clean mastery on right.`,
        lighting: "Cool fluorescent desaturated on left vs. warm golden hour & vibrant studio glow on right.",
        overlayText: "WRONG vs RIGHT",
        imagePrompt: `YouTube thumbnail split screen comparison: side-by-side comparison of ${topic}, left side sad desaturated, right side ecstatic glowing victory, bold saturated ${colorPreference} color grading, studio lighting, hyper-realistic, 8k, --ar 9:16`,
        negativePrompt: "distorted faces, bad anatomy, text, watermark, low quality render, dull lighting"
      },
      {
        conceptName: "Glowing Focus Object",
        composition: "Extreme foreground object held towards the viewer, creating an illusion of 3D depth, with the creator blurred in the background.",
        background: `Clean minimalist backdrop illuminated with subtle ${colorPreference} neon backlight.`,
        subject: `Hands holding the core item representing ${topic}, radiating an ethereal glow.`,
        lighting: "Subsurface scattering, glowing object casting real light onto hands and fingers.",
        overlayText: "THIS CHANGES IT",
        imagePrompt: `Macro dynamic close-up for YouTube Shorts cover: hands holding glowing futuristic ${topic} device, radiating intense ${colorPreference} light rays, shallow depth of field, cinematic 3D render, Unreal Engine 5, 8k --ar 9:16`,
        negativePrompt: "extra limbs, misshapen hands, text, blurry subject, watermark"
      }
    ];

    return {
      title,
      topic,
      niche,
      mood,
      colorPreference,
      concepts,
      disclaimer: "These are thumbnail visual concepts and text prompts for free AI image generation tools (e.g., Midjourney, Flux, Stable Diffusion, DALL-E).",
      engine: 'Local Creator Template Engine'
    };
  }

  // Public API
  return {
    generateIdeas,
    generateTitles,
    generateDescription,
    generateScript,
    generateThumbnail
  };
})();

// Export globally for browser & test environments
if (typeof window !== 'undefined') {
  window.GeneratorEngine = GeneratorEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GeneratorEngine;
}
