/**
 * ============================================================
 *  PORTFOLIO CHATBOT — Tanishq Mishra
 *  Powered by Claude AI (Anthropic)
 * ============================================================
 *
 *  HOW TO ADD TO YOUR PORTFOLIO:
 *  1. Upload this file to your site (same folder as index.html)
 *  2. Add this tag before </body> in index.html, generic.html,
 *     and elements.html:
 *
 *       <script src="tanishq-chatbot.js"></script>
 *
 *  3. Set up a backend proxy (see BACKEND PROXY section below)
 *     and update PROXY_URL to your endpoint.
 *
 *  ⚠️  NEVER put your Anthropic API key directly in this file.
 * ============================================================
 */

;(function () {

  /* ─────────────────────────────────────────────
     API CONFIGURATION
     Point PROXY_URL to your own backend endpoint
     that forwards to https://api.anthropic.com/v1/messages
  ───────────────────────────────────────────── */
  const PROXY_URL = "/api/chat"; // ← update this to your backend

  /*
   * ── BACKEND PROXY EXAMPLE (Node/Express) ────────────────────
   *
   * require('dotenv').config();
   * const express = require('express');
   * const fetch = require('node-fetch');
   * const app = express();
   * app.use(express.json());
   *
   * app.post('/api/chat', async (req, res) => {
   *   const resp = await fetch('https://api.anthropic.com/v1/messages', {
   *     method: 'POST',
   *     headers: {
   *       'Content-Type': 'application/json',
   *       'x-api-key': process.env.ANTHROPIC_API_KEY,
   *       'anthropic-version': '2023-06-01'
   *     },
   *     body: JSON.stringify(req.body)
   *   });
   *   res.json(await resp.json());
   * });
   * app.listen(3000);
   * ─────────────────────────────────────────────────────────────
   */

  /* ─────────────────────────────────────────────
     SYSTEM PROMPT — pre-filled with Tanishq's info
  ───────────────────────────────────────────── */
  const SYSTEM_PROMPT = `You are a friendly, knowledgeable AI assistant embedded in Tanishq Mishra's personal portfolio website. Help visitors learn about Tanishq, his work, and how to get in touch.

ABOUT TANISHQ:
- Full Name: Tanishq Mishra
- Role: Product Manager & Technical Marketer
- Location: San Francisco, CA (333 12th St, SF, CA 94103)
- Email: Tanishq0630@gmail.com
- Phone: (408) 890-8523
- LinkedIn: https://www.linkedin.com/in/tanishqmishra/
- GitHub: https://github.com/Tanishq0630
- Instagram: https://www.instagram.com/tanishq.tq/
- Bio: Dynamic and motivated professional with experience in Marketing, Product Management, Android and Web Development. Passionate about combining technical skills with strategic thinking to drive business outcomes.

SKILLS & EXPERTISE:
- Product Management (GTM strategy, roadmaps, RICE prioritization, Agile)
- Technical Marketing & Growth
- Data Analysis (Tableau, R Studio, Qualtrics, A/B Testing)
- Android & Web Development
- Market & Consumer Research
- UX/UI Wireframing

PROJECTS:
1. Money App — Developed a digital money transfer wallet with the engineering team. Improved UI/wireframes, built a GTM strategy, reduced delay time for consumers, resulting in 25% of company revenue coming from the digital wallet.

2. Google Photos: Engagement — Created user personas, identified pain points using RICE prioritization, introduced new features to grow engagement. Built metrics for Retention, Churn, and Success on an Agile Product Roadmap.
   Link: https://www.slideshare.net/TanishqMishra11/google-photos-gtmpdfpdf

3. Discord: New Features GTM Strategy — Proposed new features for Discord to expand beyond gaming, acquiring more diverse users.
   Link: https://www.slideshare.net/TanishqMishra11/discord-gtmpdf

4. Unilever — Presented to Asia's CMI Consumer & Market team. Executed Market & Consumer behavior research using Qualtrics, A/B tests, SWOT analysis, and recommendations for Southeast Asia.
   Link: https://drive.google.com/drive/folders/15NcadCi-RQEZym6bnXpYeBbolK7-J6BU

5. Spotify: Data Visualization Using Tableau — Created a data visualization dashboard for Spotify's global growth including demographics, market share, revenue, and competitors.
   Link: https://public.tableau.com/app/profile/tanishq.mishra2699/viz/SpotifyGlobalGrowth/Dashboard1

6. Experimental Design A/B Testing — Performed A/B testing on Surf's KVs for print and digital campaigns to identify high-impact variables.
   Link: https://drive.google.com/drive/folders/1IY8D4pC7eaX0yTwSPK-QgWFQu2NzBekI

7. Denny's vs IHOP (R Programming) — Customer segmentation research using Qualtrics survey data in R, including heatmaps, dendrograms, and comparison charts.
   Link: https://github.com/Tanishq0630/Denny-s-Customer-Seg-Using-R

GUIDELINES:
- Keep replies short and conversational (2–4 sentences max unless listing projects).
- When listing projects, include the name, a one-line description, and the link if available.
- When someone wants to contact Tanishq, give them his email (Tanishq0630@gmail.com) and phone (408-890-8523).
- Be enthusiastic and professional — you're representing Tanishq's personal brand.
- Never make up information. Stick strictly to the details above.
- If asked something you don't know, suggest emailing Tanishq directly.`;

  /* ─────────────────────────────────────────────
     INJECT CSS
  ───────────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700&family=Inter:wght@300;400;500&display=swap');

    #_cb-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }

    #_cb-fab {
      position: fixed; bottom: 28px; right: 28px;
      width: 58px; height: 58px; border-radius: 50%;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 1.5px solid rgba(255,255,255,0.12);
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 0 0 rgba(99,179,237,0.4);
      z-index: 99998; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
      animation: _cb-glow 3s ease-in-out infinite;
    }
    #_cb-fab:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 0 8px rgba(99,179,237,0.15); }
    @keyframes _cb-glow {
      0%, 100% { box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99,179,237,0.1); }
      50% { box-shadow: 0 8px 30px rgba(0,0,0,0.5), 0 0 30px rgba(99,179,237,0.25); }
    }

    #_cb-fab .icon-chat, #_cb-fab .icon-close {
      position: absolute; transition: transform 0.3s ease, opacity 0.3s ease;
    }
    #_cb-fab.open .icon-chat { transform: scale(0) rotate(90deg); opacity: 0; }
    #_cb-fab .icon-close { transform: scale(0) rotate(-90deg); opacity: 0; }
    #_cb-fab.open .icon-close { transform: scale(1) rotate(0); opacity: 1; }

    #_cb-pip {
      position: absolute; top: 0; right: 0;
      width: 15px; height: 15px; border-radius: 50%;
      background: #63b3ed; border: 2px solid #0f0f1a;
      animation: _cb-pip-pulse 2s infinite;
    }
    @keyframes _cb-pip-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(99,179,237,0.6); }
      50% { box-shadow: 0 0 0 5px rgba(99,179,237,0); }
    }

    #_cb-window {
      position: fixed; bottom: 98px; right: 28px;
      width: 370px; max-width: calc(100vw - 40px);
      height: 530px; max-height: calc(100vh - 130px);
      background: #0d0d16;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      display: flex; flex-direction: column;
      z-index: 99999;
      box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,179,237,0.07);
      overflow: hidden;
      transform-origin: bottom right;
      transform: scale(0.88) translateY(20px);
      opacity: 0; pointer-events: none;
      transition: transform 0.35s cubic-bezier(0.34,1.4,0.64,1), opacity 0.25s ease;
    }
    #_cb-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

    #_cb-header {
      padding: 16px 18px;
      background: linear-gradient(135deg, #111122 0%, #0d0d1e 100%);
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex; align-items: center; gap: 12px; flex-shrink: 0;
    }
    #_cb-avatar {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #2b4590, #63b3ed);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; color: #fff;
      box-shadow: 0 0 15px rgba(99,179,237,0.3);
    }
    #_cb-hinfo { flex: 1; min-width: 0; }
    #_cb-hname { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px; color: #f0f0f8; }
    #_cb-hstatus { font-size: 11px; color: #63b3ed; margin-top: 2px; display: flex; align-items: center; gap: 5px; }
    #_cb-hstatus::before { content:''; width:6px; height:6px; border-radius:50%; background:#63b3ed; flex-shrink:0; }
    #_cb-hclose {
      background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.35);
      padding: 5px; border-radius: 8px; display: flex; transition: color 0.2s, background 0.2s;
    }
    #_cb-hclose:hover { color: #f0f0f8; background: rgba(255,255,255,0.07); }

    #_cb-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;
    }
    #_cb-messages::-webkit-scrollbar { width: 3px; }
    #_cb-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

    .cb-msg { display: flex; gap: 8px; align-items: flex-end; animation: _cb-fadein 0.25s ease; }
    @keyframes _cb-fadein { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform:none; } }
    .cb-msg.user { flex-direction: row-reverse; }
    .cb-bubble {
      max-width: 78%; padding: 10px 14px; border-radius: 16px;
      font-size: 13.5px; line-height: 1.55; color: #e8e8f5;
    }
    .cb-msg.bot .cb-bubble {
      background: #1a1a2e; border: 1px solid rgba(255,255,255,0.07);
      border-bottom-left-radius: 4px;
    }
    .cb-msg.user .cb-bubble {
      background: linear-gradient(135deg, #2b4590, #3b6fd4);
      border-bottom-right-radius: 4px; color: #fff;
    }
    .cb-bubble a { color: #63b3ed; text-decoration: underline; }
    .cb-mini-avatar {
      width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #2b4590, #63b3ed);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 10px; color: #fff;
    }

    .cb-typing { display: flex; align-items: center; gap: 5px; padding: 12px 14px; }
    .cb-dot { width: 6px; height: 6px; border-radius: 50%; background: #4a5a8a; animation: _cb-bounce 1.2s infinite; }
    .cb-dot:nth-child(2) { animation-delay: 0.2s; }
    .cb-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes _cb-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }

    #_cb-suggestions {
      padding: 0 12px 10px; display: flex; flex-wrap: wrap; gap: 6px; flex-shrink: 0;
    }
    .cb-chip {
      background: rgba(99,179,237,0.08); border: 1px solid rgba(99,179,237,0.2);
      color: #63b3ed; font-size: 11.5px; padding: 5px 11px; border-radius: 20px;
      cursor: pointer; transition: background 0.2s, border-color 0.2s; white-space: nowrap;
    }
    .cb-chip:hover { background: rgba(99,179,237,0.18); border-color: rgba(99,179,237,0.4); }

    #_cb-footer {
      padding: 12px 14px;
      border-top: 1px solid rgba(255,255,255,0.07);
      background: #0d0d16; flex-shrink: 0;
    }
    #_cb-inputrow { display: flex; align-items: center; gap: 8px; }
    #_cb-input {
      flex: 1; background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px; padding: 10px 14px; font-size: 13px; color: #e8e8f5;
      outline: none; resize: none; transition: border-color 0.2s; font-family: 'Inter', sans-serif;
      max-height: 100px;
    }
    #_cb-input::placeholder { color: rgba(255,255,255,0.25); }
    #_cb-input:focus { border-color: rgba(99,179,237,0.4); }
    #_cb-send {
      width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
      background: linear-gradient(135deg, #2b4590, #63b3ed);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, opacity 0.2s; opacity: 0.5;
    }
    #_cb-send.active { opacity: 1; }
    #_cb-send:hover { transform: scale(1.05); }
    #_cb-branding { text-align: center; font-size: 10px; color: rgba(255,255,255,0.2); margin-top: 8px; }
  `;

  /* ─────────────────────────────────────────────
     INJECT HTML
  ───────────────────────────────────────────── */
  function init () {
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const root = document.createElement('div');
    root.id = '_cb-root';
    root.innerHTML = `
      <!-- FAB button -->
      <button id="_cb-fab" aria-label="Open Tanishq's AI Assistant">
        <div id="_cb-pip"></div>
        <svg class="icon-chat" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#63b3ed" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="icon-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#63b3ed" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <!-- Chat window -->
      <div id="_cb-window" role="dialog" aria-label="Chat with Tanishq's AI Assistant">
        <div id="_cb-header">
          <div id="_cb-avatar">TM</div>
          <div id="_cb-hinfo">
            <div id="_cb-hname">Tanishq's AI Assistant</div>
            <div id="_cb-hstatus">Online • Powered by Claude AI</div>
          </div>
          <button id="_cb-hclose" aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div id="_cb-messages"></div>

        <div id="_cb-suggestions">
          <button class="cb-chip">👨‍💻 About Tanishq</button>
          <button class="cb-chip">🚀 See projects</button>
          <button class="cb-chip">📬 Get in touch</button>
          <button class="cb-chip">🛠 Skills</button>
        </div>

        <div id="_cb-footer">
          <div id="_cb-inputrow">
            <textarea id="_cb-input" placeholder="Ask me anything about Tanishq…" rows="1"></textarea>
            <button id="_cb-send" aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div id="_cb-branding">AI by Claude · tanishqmishra.com</div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    /* ─────────────────────────────────────────────
       STATE & REFERENCES
    ───────────────────────────────────────────── */
    const fab       = document.getElementById('_cb-fab');
    const win       = document.getElementById('_cb-window');
    const closeBtn  = document.getElementById('_cb-hclose');
    const messages  = document.getElementById('_cb-messages');
    const input     = document.getElementById('_cb-input');
    const sendBtn   = document.getElementById('_cb-send');
    const chips     = document.querySelectorAll('.cb-chip');
    const pip       = document.getElementById('_cb-pip');

    let isOpen   = false;
    let isLoading = false;
    let history  = []; // {role, content}[]

    /* ─── Open / Close ─── */
    function toggleChat () {
      isOpen = !isOpen;
      fab.classList.toggle('open', isOpen);
      win.classList.toggle('open', isOpen);
      if (isOpen) {
        pip.style.display = 'none';
        if (messages.children.length === 0) addBotMessage(
          "Hi there! 👋 I'm Tanishq's AI assistant. Ask me about his projects, skills, or how to get in touch!"
        );
        setTimeout(() => input.focus(), 350);
      }
    }

    fab.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    /* ─── Chips ─── */
    chips.forEach(chip => chip.addEventListener('click', () => {
      const map = {
        '👨‍💻 About Tanishq': 'Tell me about Tanishq',
        '🚀 See projects': 'What projects has Tanishq worked on?',
        '📬 Get in touch': 'How can I contact Tanishq?',
        '🛠 Skills': 'What are Tanishq\'s skills?'
      };
      sendMessage(map[chip.textContent] || chip.textContent);
    }));

    /* ─── Input auto-resize & send button state ─── */
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 100) + 'px';
      sendBtn.classList.toggle('active', input.value.trim().length > 0);
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    sendBtn.addEventListener('click', send);

    function send () {
      const text = input.value.trim();
      if (!text || isLoading) return;
      sendMessage(text);
    }

    /* ─── Message rendering ─── */
    function addBotMessage (text) {
      const div = document.createElement('div');
      div.className = 'cb-msg bot';
      div.innerHTML = `
        <div class="cb-mini-avatar">TM</div>
        <div class="cb-bubble">${linkify(escapeHtml(text))}</div>
      `;
      messages.appendChild(div);
      scrollBottom();
    }

    function addUserMessage (text) {
      const div = document.createElement('div');
      div.className = 'cb-msg user';
      div.innerHTML = `<div class="cb-bubble">${escapeHtml(text)}</div>`;
      messages.appendChild(div);
      scrollBottom();
    }

    function showTyping () {
      const div = document.createElement('div');
      div.className = 'cb-msg bot'; div.id = '_cb-typing';
      div.innerHTML = `
        <div class="cb-mini-avatar">TM</div>
        <div class="cb-bubble cb-typing">
          <span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span>
        </div>`;
      messages.appendChild(div); scrollBottom();
    }

    function hideTyping () {
      const el = document.getElementById('_cb-typing');
      if (el) el.remove();
    }

    function scrollBottom () {
      messages.scrollTop = messages.scrollHeight;
    }

    /* ─── API Call ─── */
    async function sendMessage (text) {
      if (isLoading) return;
      isLoading = true;

      addUserMessage(text);
      input.value = ''; input.style.height = 'auto';
      sendBtn.classList.remove('active');

      history.push({ role: 'user', content: text });
      showTyping();

      try {
        const response = await fetch(PROXY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 512,
            system: SYSTEM_PROMPT,
            messages: history
          })
        });

        const data = await response.json();
        hideTyping();

        if (data.content && data.content[0]) {
          const reply = data.content[0].text;
          history.push({ role: 'assistant', content: reply });
          addBotMessage(reply);
        } else {
          addBotMessage("Sorry, I had trouble responding. Please try again or email Tanishq directly at Tanishq0630@gmail.com.");
        }
      } catch (err) {
        hideTyping();
        addBotMessage("Hmm, I couldn't connect right now. You can reach Tanishq at Tanishq0630@gmail.com or (408) 890-8523.");
      }

      isLoading = false;
    }

    /* ─── Helpers ─── */
    function escapeHtml (str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    function linkify (str) {
      return str.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
                .replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>');
    }
  }

  /* ─── Run after DOM ready ─── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
