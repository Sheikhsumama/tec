/* Anis: voice, typed text, and the interaction area.
   Replies are SCRIPTED (demo mode). No AI service is connected and no keys live in this code. */
window.TEC = window.TEC || {};
TEC.anis = (function(){
  var img = 'assets/anis.jpg';
  var token = 0;
  function speak(text, lang){
    if (!('speechSynthesis' in window)) return;   // browser voice is a temporary fallback
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 0.9; u.pitch = 1.15; u.lang = lang || 'en-GB';
      speechSynthesis.speak(u);
    } catch (e) { /* speech unavailable */ }
  }
  /* Types text into an element and speaks it. A newer call cancels an older one. */
  function say(el, text, after){
    if (!el) return;
    var my = ++token;
    el.textContent = '';
    speak(text);
    var i = 0;
    var timer = setInterval(function(){
      if (my !== token) { clearInterval(timer); return; }
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(timer); if (after) setTimeout(after, 250); }
    }, 30);
  }
  function cancel(){ token++; try { speechSynthesis.cancel(); } catch (e) {} }
  return { img: img, say: say, speak: speak, cancel: cancel };
})();

/* Scripted replies. Every answer is marked as demo in the panel. */
TEC.anisReply = function(raw){
  var q = (raw || '').toLowerCase();
  var s = TEC.state, name = s.name || 'friend';
  if (/help|stuck|hard|difficult|scared|sad|cry|upset/.test(q))
    return 'That is okay. Take a deep breath. Please ask a grown-up sitting with you. They can help you best.';
  if (/hello|\bhi\b|salam|assalam/.test(q)) return 'Hello, ' + name + '! I am glad you are here.';
  if (/teacher|who/.test(q)) return 'Your teachers are Mr. Umar, Mr. David, Mr. Muhammad, Mr. Jensen and Mr. Abdul Hadi. Tap any photo to meet them.';
  if (/today|what now|what should/.test(q)) return TEC.todayType().line;
  if (/week|routine|\bday/.test(q)) return 'Monday to Friday we learn. Saturday is Game Day. Sunday is Explore Day.';
  if (/world|like|interest|favou?rite/.test(q)) {
    if (!s.likes.length) return 'You have not picked any worlds yet. Tap Edit my details to choose some.';
    return 'You like ' + s.likes.map(function(id){ return TEC.likeById(id).name.toLowerCase(); }).join(' and ') + '.';
  }
  if (/name/.test(q)) return 'Your name is ' + name + '.';
  return 'I can tell you about your teachers, today, or your week. Try a button below.';
};

/* Builds the Anis interaction area into `host` and greets the child. */
TEC.anisPanel = function(host, greeting){
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var suggestions = ['Who are my teachers?', 'What is today?', 'Tell me about my week', 'I need help'];
  host.innerHTML =
    '<section class="anis-panel" aria-label="Talk to Anis">' +
      '<button class="anis-face" type="button" aria-label="Tap Anis to hear him again"><img src="' + TEC.anis.img + '" alt="Anis"></button>' +
      '<div class="anis-body">' +
        '<div class="say" aria-live="polite"></div>' +
        '<div class="chips-row">' + suggestions.map(function(s){ return '<button class="chip-btn" type="button">' + s + '</button>'; }).join('') + '</div>' +
        '<form class="ask"><input type="text" maxlength="120" placeholder="Ask Anis something" aria-label="Ask Anis">' +
          '<button class="btn-sm" type="submit">Ask</button>' +
          (SR ? '<button class="mic" type="button" aria-label="Speak to Anis">🎤 Speak</button>' : '') +
        '</form>' +
        '<p class="demo-note">Demo mode: Anis answers with scripted replies. This is not a live AI conversation.</p>' +
      '</div>' +
    '</section>';
  var bubble = host.querySelector('.say');
  function respond(text){ TEC.anis.say(bubble, TEC.anisReply(text)); }
  host.querySelector('.anis-face').onclick = function(){ TEC.anis.say(bubble, greeting || 'Hello! I am Anis.'); };
  host.querySelectorAll('.chip-btn').forEach(function(b){ b.onclick = function(){ respond(b.textContent); }; });
  var form = host.querySelector('.ask'), input = form.querySelector('input');
  form.onsubmit = function(e){
    e.preventDefault();
    var text = input.value.trim();
    if (!text) { TEC.toast('Type something first'); return; }
    input.value = '';
    respond(text);
  };
  var mic = host.querySelector('.mic');
  if (mic && SR) {
    var rec = new SR(); rec.lang = 'en-US'; rec.interimResults = false;
    rec.onresult = function(ev){ input.value = ev.results[0][0].transcript; form.requestSubmit(); };
    rec.onerror = function(){ TEC.toast('I could not hear that. Try again or type.'); };
    mic.onclick = function(){ try { rec.start(); TEC.toast('Listening…'); } catch (e) { TEC.toast('Microphone is busy'); } };
  }
  TEC.anis.say(bubble, greeting || 'Hello! I am Anis.');
  return bubble;
};
