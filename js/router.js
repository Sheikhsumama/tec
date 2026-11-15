/* Hash router: one page, named views, no full reloads. */
window.TEC = window.TEC || {};
TEC.router = (function(){
  function parse(){
    var h = (location.hash || '').replace(/^#\/?/, '');
    var parts = h.split('/');
    return { name: parts[0] || '', arg: parts[1] || '' };
  }
  function isDone(){ return !!(TEC.state.done && TEC.state.name); }
  function go(name, arg){ location.hash = '#/' + name + (arg ? '/' + arg : ''); }
  function render(){
    var r = parse(), app = document.getElementById('app');
    if (!isDone() && r.name !== 'onboard') { location.replace('#/onboard'); return; }
    if (isDone() && (r.name === 'onboard' || r.name === '')) { location.replace('#/home'); return; }
    if (!TEC.views[r.name]) { location.replace(isDone() ? '#/home' : '#/onboard'); return; }
    TEC.anis.cancel();
    app.classList.add('switching');
    setTimeout(function(){
      app.innerHTML = '';
      TEC.views[r.name](app, r.arg);
      app.classList.remove('switching');
      window.scrollTo(0, 0);
      var titles = { onboard:'Welcome', home:'My School', teacher:'My Teacher', profile:'My Details', district:'Classroom District', class:'Classroom' };
      document.title = (titles[r.name] || 'TEC') + ' · TEC Level 1';
    }, 180);
  }
  function start(){
    window.addEventListener('hashchange', render);
    render();
  }
  return { go: go, start: start, render: render, parse: parse };
})();
