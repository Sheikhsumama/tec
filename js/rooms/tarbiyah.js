/* Tarbiyah & Character Room — Mr. Abdul Hadi. Warm, peaceful and welcoming: a window with a tree,
   family pictures, a gratitude wall, a story board and a sharing cushion. Situations, not lectures. */
window.TEC = window.TEC || {};
TEC.rooms = TEC.rooms || {};
TEC.rooms.char = (function(){
  var S = TEC.stage;
  function scene(){
    var s = S.shell({ ceil:'#FFF9F2', side:'#E6F3E0', back:'#FFEADB', floor:'#D9B68C', seam:'#C39B70' });
    // window with a tree outside, back left
    s += '<rect x="296" y="130" width="110" height="130" rx="6" fill="#D8F0FF" stroke="#FFFFFF" stroke-width="8"/>';
    s += '<circle cx="350" cy="184" r="34" fill="#6CC08A"/><circle cx="326" cy="200" r="22" fill="#5AB27A"/><circle cx="376" cy="198" r="22" fill="#5AB27A"/>';
    s += '<rect x="345" y="210" width="10" height="34" fill="#8A5A2B"/>';
    // kind words along the back wall, under the board
    s += S.textAt(600, 121, 'Be kind · Share · Say thank you', 22, '#7A4B2A');
    // left wall: family and friends frames
    s += '<polygon points="' + S.quad('left',0.08,0.36,0.12,0.38) + '" fill="#FFFFFF" stroke="#8A5A2B" stroke-width="5"/>';
    s += '<polygon points="' + S.quad('left',0.08,0.36,0.48,0.74) + '" fill="#FFFFFF" stroke="#8A5A2B" stroke-width="5"/>';
    s += S.textOn('left',0.22,0.25,'👨‍👩‍👧',38) + S.textOn('left',0.22,0.61,'🧑‍🤝‍🧑',38);
    // right wall: gratitude wall on cork
    s += '<polygon points="' + S.quad('right',0.12,0.5,0.12,0.66) + '" fill="#D9A86C" stroke="#8A5A2B" stroke-width="5"/>';
    s += S.textOn('right',0.2,0.25,'🙏',34) + S.textOn('right',0.34,0.25,'❤',34,'#E5484D') + S.textOn('right',0.2,0.5,'🤝',34) + S.textOn('right',0.34,0.5,'💚',34);
    s += S.textOn('right',0.27,0.62,'Thank you',17,'#5A3A1C');
    // a sharing cushion on the floor, and two small cushions
    s += '<ellipse cx="600" cy="588" rx="200" ry="40" fill="#F7C6B4" stroke="#E79E82" stroke-width="4"/>';
    s += '<circle cx="130" cy="584" r="26" fill="#8CC7A0"/><circle cx="1070" cy="584" r="26" fill="#8CC7A0"/>';
    // a plant to look after, front right
    s += '<rect x="1000" y="500" width="48" height="36" rx="6" fill="#C75B3A"/><circle cx="1024" cy="478" r="34" fill="#2BA56B"/><circle cx="1006" cy="466" r="18" fill="#3CC27F"/>';
    return S.svg(s, 'Tarbiyah and Character Room, looking at the story board');
  }
  var lessons = [
    { title:'Sharing', letter:'', pic:'🧸', word:'Two toys, none for the friend', sound:'Sharing',
      hint:'A friend has no toys. What is a kind thing we could do?',
      board:'<div class="bf-big">🧸🚂 · 🧒</div><div class="bf-word">A child has two toys. Another child has none. What could we do?</div>',
      say:'A child has two toys. Another child has none. What could we do?',
      prompt:'A child has two toys. Another child has none. What could we do?',
      objects:[ {pic:'🤝', word:'Share one toy', en:'kind', ok:true}, {pic:'🙅', word:'Keep both', en:'not kind'}, {pic:'🚶', word:'Walk away', en:'not kind'} ],
      okLine:'Yes! Sharing one toy makes our friend happy. Sharing makes everyone happy.',
      noLine:'Let us think. How would the friend feel? What could make the friend happy?' },
    { title:'Thank you', letter:'', pic:'🎁', word:'Someone gave you a present', sound:'Thank you',
      hint:'Someone is kind to you. What do we say?',
      board:'<div class="bf-big">🎁 → 🙏</div><div class="bf-word">Someone is kind. What do we say?</div>',
      say:'Someone gave you a present. What do we say?',
      prompt:'Someone gave you a present. What do we say?',
      objects:[ {pic:'🙏', word:'Thank you', en:'a kind word', ok:true}, {pic:'🙅', word:'Say nothing', en:'not kind'}, {pic:'🚶', word:'Go away', en:'not kind'} ],
      okLine:'Yes! Thank you shows that we are grateful.', noLine:'Look at the friend. How would they feel? Try another answer.' },
    { title:'Honesty', letter:'', pic:'🥛', word:'You broke a cup by accident', sound:'Honesty',
      hint:'You broke something by accident. What is the honest thing to say?',
      board:'<div class="bf-big">🥛 💥</div><div class="bf-word">You broke a cup by accident. What do you say?</div>',
      say:'You broke a cup by accident. What do you say?',
      prompt:'You broke a cup by accident. What do you say?',
      objects:[ {pic:'🙇', word:'I am sorry, I broke it', en:'honest', ok:true}, {pic:'🙅', word:'It was not me', en:'not honest'}, {pic:'🚶', word:'Hide it', en:'not honest'} ],
      okLine:'Yes! Telling the truth and saying sorry is brave and kind.', noLine:'Let us think. What would help the grown-up trust you?' }
  ];
  return {
    id:'char', title:'Tarbiyah & Character Room', teacher:'char', boardClass:'board--paper',
    intro:'Hello! Welcome to the Tarbiyah and Character Room. Let us think about kind things we can do.',
    scene: scene,
    hotspots: [
      { id:'family', label:'Family and friends', at: S.at('left',0.3,0.86), dialog:{ title:'Family and friends', html: S.grid([
          {label:'Family', pic:'👨‍👩‍👧', say:'Our family loves us and helps us.'},
          {label:'Friends', pic:'🧑‍🤝‍🧑', say:'Friends play together and share.'} ]) } },
      { id:'gratitude', label:'Gratitude wall', at: S.at('right',0.3,0.74), dialog:{ title:'Gratitude wall', html: S.grid([
          {label:'Thank you', pic:'🙏', say:'Thank you.'}, {label:'Please', pic:'❤', say:'Please.'},
          {label:'Sharing', pic:'🤝', say:'Sharing is kind.'}, {label:'Caring', pic:'💚', say:'We care for living things.'} ]) } },
      { id:'plant', label:'Caring for plants', at: S.atXY(1024,400), dialog:{ title:'Caring for living things', html: S.grid([
          {label:'Water the plant', pic:'🪴', say:'We water the plant so it can grow.'} ]) } }
    ],
    lessons: lessons
  };
})();
