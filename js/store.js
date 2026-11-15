/* Student state. Same storage key as the earlier prototype, so saved students still enter. */
(function(){
  var KEY = 'tec-l1';
  var state = { name:'', age:null, likes:[], done:false };
  try { Object.assign(state, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* storage blocked: keep defaults */ }
  if (!Array.isArray(state.likes)) state.likes = [];
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { TEC.toast && TEC.toast('Could not save on this device'); } }
  TEC.state = state;
  TEC.setState = function(patch){ Object.assign(state, patch); save(); };
})();
