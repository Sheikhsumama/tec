/* English Studio — reference classroom.
   The room is drawn in perspective (SVG walls, floor, ceiling), with HTML hotspots for the
   charts, the board and the children's objects. Lessons and activities are scripted demonstrations. */
window.TEC = window.TEC || {};
TEC.rooms = TEC.rooms || {};
TEC.rooms.english = (function(){
  var C = { ceil:'#FFFBEF', wall:'#FFF1C9', side:'#FFE3A0', floor:'#E4B06A', seam:'#D49A4E',
            frame:'#B98A3E', board:'#2E4A3B', boardFrame:'#8A5A2B', paper:'#FFFFFF', shelf:'#B9793C', desk:'#C98A4B' };
  var W = 1200, H = 675;

  /* Point on a side wall. u: 0 = outer edge, 1 = back corner. t: 0 = top, 1 = bottom. */
  function wall(side, u, t){
    var x = side === 'left' ? u * 260 : W - u * 260;
    var top = u * 90, bot = 675 - u * 245;
    return { x: x, y: top + (bot - top) * t };
  }
  function poly(pts){ return pts.map(function(p){ return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '); }
  function chartOnWall(side, u1, u2, t1, t2){
    return '<polygon points="' + poly([wall(side,u1,t1), wall(side,u2,t1), wall(side,u2,t2), wall(side,u1,t2)]) +
           '" fill="' + C.paper + '" stroke="' + C.frame + '" stroke-width="3"/>';
  }
  function scene(){
    var s = '';
    s += '<polygon points="0,0 1200,0 940,90 260,90" fill="' + C.ceil + '"/>';           // ceiling
    s += '<polygon points="0,0 260,90 260,430 0,675" fill="' + C.side + '"/>';           // left wall
    s += '<polygon points="1200,0 940,90 940,430 1200,675" fill="' + C.side + '"/>';     // right wall
    s += '<rect x="260" y="90" width="680" height="340" fill="' + C.wall + '"/>';          // back wall
    s += '<polygon points="0,675 260,430 940,430 1200,675" fill="' + C.floor + '"/>';     // floor
    for (var i = 1; i < 6; i++) {                                                          // floor seams
      var f = i / 6;
      s += '<line x1="' + (260*f - 0) + '" y1="430" x2="' + (1200*f) + '" y2="675" stroke="' + C.seam + '" stroke-width="2"/>';
    }
    s += '<rect x="290" y="130" width="96" height="140" fill="#BFE6FF" stroke="#FFFFFF" stroke-width="8"/>';   // window
    s += '<line x1="338" y1="130" x2="338" y2="270" stroke="#FFFFFF" stroke-width="6"/><line x1="290" y1="200" x2="386" y2="200" stroke="#FFFFFF" stroke-width="6"/>';
    s += '<rect x="420" y="150" width="360" height="210" rx="8" fill="' + C.boardFrame + '"/>';          // board frame
    s += '<rect x="432" y="162" width="336" height="186" rx="4" fill="' + C.board + '"/>';                // chalkboard
    // left wall: alphabet chart and vowels chart, wall shelf below
    s += chartOnWall('left', 0.10, 0.36, 0.14, 0.52);
    s += chartOnWall('left', 0.44, 0.70, 0.20, 0.56);
    s += '<polygon points="' + poly([wall('left',0.10,0.70), wall('left',0.80,0.70), wall('left',0.80,0.76), wall('left',0.10,0.76)]) + '" fill="' + C.shelf + '"/>';
    // right wall: picture vocabulary chart
    s += '<polygon points="' + poly([wall('right',0.14,0.16), wall('right',0.46,0.16), wall('right',0.46,0.60), wall('right',0.14,0.60)]) + '" fill="' + C.paper + '" stroke="' + C.frame + '" stroke-width="3"/>';
    s += '<polygon points="' + poly([wall('right',0.56,0.40), wall('right',0.86,0.40), wall('right',0.86,0.74), wall('right',0.56,0.74)]) + '" fill="#E8F7E4" stroke="' + C.frame + '" stroke-width="3"/>';
    // foreground desks and chairs
    s += '<rect x="70" y="570" width="250" height="26" rx="8" fill="' + C.desk + '"/><rect x="92" y="596" width="12" height="60" fill="' + C.shelf + '"/><rect x="290" y="596" width="12" height="60" fill="' + C.shelf + '"/>';
    s += '<rect x="880" y="570" width="250" height="26" rx="8" fill="' + C.desk + '"/><rect x="902" y="596" width="12" height="60" fill="' + C.shelf + '"/><rect x="1100" y="596" width="12" height="60" fill="' + C.shelf + '"/>';
    // plant in the back corner
    s += '<rect x="240" y="500" width="44" height="30" rx="6" fill="#C75B3A"/><circle cx="262" cy="480" r="30" fill="#2BA56B"/><circle cx="246" cy="470" r="18" fill="#3CC27F"/>';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="English Studio classroom, looking at the board">' + s + '</svg>';
  }
  function pct(p){ return { left: (p.x / W * 100).toFixed(2) + '%', top: (p.y / H * 100).toFixed(2) + '%' }; }

  /* Speak one word with its sound. */
  function say(text){ TEC.anis.speak(text); }
  function grid(items){
    return '<div class="dlg-grid">' + items.map(function(it){
      return '<button type="button" class="dlg-item" data-say="' + it.say + '"><span>' + it.pic + '</span><b>' + it.label + '</b></button>';
    }).join('') + '</div>';
  }
  var hotspots = [
    { id:'alphabet', label:'Alphabet chart', at: pct(wall('left', 0.20, 0.30)), dialog:{ title:'Alphabet chart', html: grid([
        {label:'A a', pic:'🍎', say:'A, ah, apple'}, {label:'B b', pic:'⚽', say:'B, buh, ball'}, {label:'C c', pic:'🐱', say:'C, kuh, cat'},
        {label:'D d', pic:'🐶', say:'D, duh, dog'},  {label:'E e', pic:'🥚', say:'E, eh, egg'},  {label:'F f', pic:'🐟', say:'F, fff, fish'} ]) } },
    { id:'vowels', label:'Vowel chart', at: pct(wall('left', 0.57, 0.52)), dialog:{ title:'Vowels', html: grid([
        {label:'A', pic:'🍎', say:'A, apple'}, {label:'E', pic:'🥚', say:'E, egg'}, {label:'I', pic:'🐛', say:'I, insect'},
        {label:'O', pic:'🐙', say:'O, octopus'}, {label:'U', pic:'☂️', say:'U, umbrella'} ]) } },
    { id:'vocabulary', label:'Picture word chart', at: pct(wall('right', 0.30, 0.38)), dialog:{ title:'Picture words', html: grid([
        {label:'Dog', pic:'🐶', say:'Dog'}, {label:'Cat', pic:'🐱', say:'Cat'}, {label:'Ant', pic:'🐜', say:'Ant'},
        {label:'Apple', pic:'🍎', say:'Apple'}, {label:'Banana', pic:'🍌', say:'Banana'}, {label:'Fish', pic:'🐟', say:'Fish'} ]) } }
  ];

  /* Lessons. Each has a board, a short demonstration and objects on the desk. */
  var lessons = [
    { letter:'A', word:'Apple', pic:'🍎', sound:'A, ah, apple', hint:'Look at the board. Which of these starts with the sound ah?',
      objects:[{pic:'🍎',word:'Apple',ok:true},{pic:'🐶',word:'Dog'},{pic:'🐜',word:'Ant',ok:true},{pic:'🍌',word:'Banana'}] },
    { letter:'B', word:'Ball', pic:'⚽', sound:'B, buh, ball', hint:'Find the objects that start with the sound buh.',
      objects:[{pic:'🐻',word:'Bear',ok:true},{pic:'🍎',word:'Apple'},{pic:'⚽',word:'Ball',ok:true},{pic:'🐟',word:'Fish'}] },
    { letter:'C', word:'Cat', pic:'🐱', sound:'C, kuh, cat', hint:'Find the objects that start with the sound kuh.',
      objects:[{pic:'🐱',word:'Cat',ok:true},{pic:'🐶',word:'Dog'},{pic:'🚗',word:'Car',ok:true},{pic:'🍌',word:'Banana'}] }
  ];

  return {
    id:'english',
    title:'English Studio',
    teacher:'english',
    intro:'Hello! I am Mr. David. Welcome to the English Studio. Look at the board. Can you find the letter A?',
    scene: scene,
    hotspots: hotspots,
    lessons: lessons
  };
})();
