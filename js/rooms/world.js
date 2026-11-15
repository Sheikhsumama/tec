/* World Explorer Studio — teacher NOT confirmed (teacher: null, shows a neutral placeholder).
   Deep blue night-sky room with stars, a globe, planet and animal charts. Learning about Earth,
   animals and the Sun and Moon through pictures and simple choices. Proposed learning area, not final. */
window.TEC = window.TEC || {};
TEC.rooms = TEC.rooms || {};
TEC.rooms.world = (function(){
  var S = TEC.stage;
  function scene(){
    var s = S.shell({ ceil:'#0D2038', side:'#17365A', back:'#12304F', floor:'#2B5C6E', seam:'#24505F' });
    // stars on the ceiling
    [[120,30],[230,50],[410,20],[520,44],[700,30],[860,52],[980,22],[1110,46],[300,62],[780,62],[160,70],[1040,70]].forEach(function(p){
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="#FFFFFF" opacity=".85"/>';
    });
    // solar system poster on the back wall, under the board
    s += S.textAt(600, 121, '☀️ 🌍 🌙 🪐', 30, '#FFFFFF');
    // left wall: planets and Sun and Moon chart
    s += '<polygon points="' + S.quad('left',0.08,0.36,0.14,0.56) + '" fill="#0F2A46" stroke="#7FB6D9" stroke-width="3"/>';
    s += S.textOn('left',0.15,0.27,'☀️',36) + S.textOn('left',0.29,0.27,'🌍',36);
    s += S.textOn('left',0.15,0.47,'🌙',36) + S.textOn('left',0.29,0.47,'🪐',36);
    // right wall: animals chart
    s += '<polygon points="' + S.quad('right',0.12,0.5,0.14,0.6) + '" fill="#F4F9EC" stroke="#8CC7A0" stroke-width="3"/>';
    s += S.textOn('right',0.2,0.27,'🐘',36) + S.textOn('right',0.33,0.27,'🐟',36);
    s += S.textOn('right',0.2,0.48,'🦁',36) + S.textOn('right',0.33,0.48,'🐧',36);
    // a globe on a stand, front left
    s += '<rect x="143" y="600" width="14" height="40" fill="#B98A3E"/><ellipse cx="150" cy="646" rx="42" ry="10" fill="#B98A3E"/>';
    s += '<circle cx="150" cy="540" r="62" fill="#3C8DD8" stroke="#1D5A8C" stroke-width="4"/>';
    s += '<ellipse cx="130" cy="520" rx="26" ry="18" fill="#6BBF59"/><ellipse cx="176" cy="560" rx="18" ry="26" fill="#6BBF59"/>';
    // a plant and a rock, front right
    s += '<rect x="1020" y="520" width="44" height="34" rx="6" fill="#C75B3A"/><circle cx="1042" cy="500" r="30" fill="#2BA56B"/>';
    s += '<ellipse cx="1000" cy="640" rx="46" ry="18" fill="#7D8C96"/>';
    return S.svg(s, 'World Explorer Studio, looking at the world map board');
  }
  var lessons = [
    { title:'Land and water', letter:'', pic:'🌊', word:'Water', sound:'Land and water',
      hint:'Look at the map. Blue is water. Green and brown is land.',
      board:'<div class="bf-big">🗺</div><div class="bf-word">Blue is water. Green and brown is land.</div>',
      say:'Blue is water. Green and brown is land. Can you find the water?',
      prompt:'Find the water.',
      objects:[ {pic:'🌊', word:'Water', en:'blue', ok:true}, {pic:'🏔', word:'Mountain', en:'land'}, {pic:'🌳', word:'Forest', en:'land'} ],
      okLine:'Yes! The sea is water. It is blue.', noLine:'That is land, not water. Look for the blue.' },
    { title:'Animal homes', letter:'', pic:'🐟', word:'Fish', sound:'Animals and where they live',
      hint:'Which animal lives in the water?',
      board:'<div class="bf-big">🐟 🦁 🐘</div><div class="bf-word">Where do animals live?</div>',
      say:'Which animal lives in the water?',
      prompt:'Which animal lives in the water?',
      objects:[ {pic:'🐟', word:'Fish', en:'lives in water', ok:true}, {pic:'🦁', word:'Lion', en:'lives on land'}, {pic:'🐘', word:'Elephant', en:'lives on land'} ],
      okLine:'Yes! The fish lives in the water and swims.', noLine:'That animal lives on land. Look for the one that swims.' },
    { title:'Sun and Moon', letter:'', pic:'☀️', word:'Sun', sound:'Sun and Moon',
      hint:'The Sun comes out in the day. The Moon comes out at night.',
      board:'<div class="bf-big">☀️ · 🌙</div><div class="bf-word">The Sun shines in the day. The Moon shines at night.</div>',
      say:'Which one shines in the daytime?',
      prompt:'Which one shines in the daytime?',
      objects:[ {pic:'☀️', word:'Sun', en:'day', ok:true}, {pic:'🌙', word:'Moon', en:'night'}, {pic:'⭐', word:'Star', en:'night'} ],
      okLine:'Yes! The Sun shines in the day and gives us light.', noLine:'Not this one. Think about when it is bright outside.' }
  ];
  return {
    id:'world', title:'World Explorer Studio', teacher:null, boardClass:'board--night',
    intro:'Welcome to the World Explorer Studio. Let us explore the Earth, animals, and the Sun and Moon.',
    scene: scene,
    hotspots: [
      { id:'globe', label:'Globe', at: S.atXY(150,540), dialog:{ title:'Our Earth', html: S.grid([
          {label:'Blue', pic:'🌊', say:'Blue is water. The sea covers much of the Earth.'},
          {label:'Green', pic:'🌳', say:'Green and brown is land, where we walk and live.'} ]) } },
      { id:'planets', label:'Sun, Moon and planets', at: S.at('left',0.42,0.72), dialog:{ title:'Sun, Moon and planets', html: S.grid([
          {label:'Sun', pic:'☀️', say:'The Sun is a star that gives us light and warmth.'},
          {label:'Earth', pic:'🌍', say:'The Earth is our home. We live on it.'},
          {label:'Moon', pic:'🌙', say:'The Moon shines at night.'},
          {label:'Saturn', pic:'🪐', say:'Saturn is a planet with rings around it.'} ]) } },
      { id:'animals', label:'Animals chart', at: S.at('right',0.3,0.8), dialog:{ title:'Animals', html: S.grid([
          {label:'Elephant', pic:'🐘', say:'The elephant lives on land.'}, {label:'Fish', pic:'🐟', say:'The fish lives in the water.'},
          {label:'Lion', pic:'🦁', say:'The lion lives on land.'}, {label:'Penguin', pic:'🐧', say:'The penguin lives near the cold sea.'} ]) } }
    ],
    lessons: lessons
  };
})();
