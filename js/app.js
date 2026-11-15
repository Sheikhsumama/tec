/* Boot: theme, toast, and the router. */
(function(){
  var btn = document.getElementById('theme');
  function applyTheme(t){
    document.documentElement.dataset.theme = t;
    btn.textContent = t === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    try { localStorage.setItem('tec-theme', t); } catch (e) {}
  }
  var saved = 'light';
  try { saved = localStorage.getItem('tec-theme') || 'light'; } catch (e) {}
  applyTheme(saved);
  btn.onclick = function(){ applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); };
  TEC.toast = function(msg){
    var t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(TEC._tt); TEC._tt = setTimeout(function(){ t.classList.remove('show'); }, 1800);
  };
  TEC.router.start();
})();
