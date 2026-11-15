/* Shared perspective helpers for the classroom scenes.
   All rooms use the same 1200 x 675 frame: ceiling, left wall, right wall, back wall, floor.
   Each room then adds its own walls, furniture and objects, so the rooms look different. */
window.TEC = window.TEC || {};
TEC.stage = (function(){
  var W = 1200, H = 675;

  /* Point on a side wall. u: 0 = outer edge, 1 = back corner. t: 0 = top, 1 = bottom. */
  function wall(side, u, t){
    var x = side === 'left' ? u * 260 : W - u * 260;
    var top = u * 90, bot = H - u * 245;
    return { x: x, y: top + (bot - top) * t };
  }
  function poly(pts){ return pts.map(function(p){ return p.x.toFixed(1) + ',' + p.y.toFixed(1); }).join(' '); }
  function quad(side, u1, u2, t1, t2){
    return poly([wall(side,u1,t1), wall(side,u2,t1), wall(side,u2,t2), wall(side,u1,t2)]);
  }
  /* Room shell: ceiling, both side walls, back wall, floor and floor seams. */
  function shell(c){
    var s = '';
    s += '<polygon points="0,0 1200,0 940,90 260,90" fill="' + c.ceil + '"/>';
    s += '<polygon points="0,0 260,90 260,430 0,675" fill="' + c.side + '"/>';
    s += '<polygon points="1200,0 940,90 940,430 1200,675" fill="' + c.side + '"/>';
    s += '<rect x="260" y="90" width="680" height="340" fill="' + c.back + '"/>';
    s += '<polygon points="0,675 260,430 940,430 1200,675" fill="' + c.floor + '"/>';
    for (var i = 1; i < 6; i++) {
      var f = i / 6;
      s += '<line x1="' + (260*f) + '" y1="430" x2="' + (1200*f) + '" y2="675" stroke="' + c.seam + '" stroke-width="2"/>';
    }
    return s;
  }
  /* Text placed on a wall, in wall coordinates. */
  function textOn(side, u, t, str, size, fill){
    var p = wall(side, u, t);
    return '<text x="' + p.x.toFixed(1) + '" y="' + p.y.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" font-size="' + size + '" font-weight="700" fill="' + (fill || '#2b2b2b') + '">' + str + '</text>';
  }
  /* Text at a plain point on the 1200 x 675 frame (back wall, floor, ceiling). */
  function textAt(x, y, str, size, fill){
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="middle" font-size="' + size + '" font-weight="700" fill="' + (fill || '#2b2b2b') + '">' + str + '</text>';
  }
  function svg(inner, label){
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + label + '">' + inner + '</svg>';
  }
  /* Hotspot position (percent of the stage) for a wall point or a frame point. */
  function at(side, u, t){ var p = wall(side, u, t); return pct(p.x, p.y); }
  function atXY(x, y){ return pct(x, y); }
  function pct(x, y){ return { left: (x / W * 100).toFixed(2) + '%', top: (y / H * 100).toFixed(2) + '%' }; }
  /* Dialog grid. Each item speaks data-say (in data-lang if given). */
  function grid(items){
    return '<div class="dlg-grid">' + items.map(function(it){
      return '<button type="button" class="dlg-item"' + (it.lang ? ' data-lang="' + it.lang + '"' : '') + ' data-say="' + it.say + '"><span>' + (it.pic || '') + '</span><b>' + it.label + '</b>' + (it.en ? '<small>' + it.en + '</small>' : '') + '</button>';
    }).join('') + '</div>';
  }
  return { W: W, H: H, wall: wall, poly: poly, quad: quad, shell: shell, textOn: textOn, textAt: textAt, svg: svg, at: at, atXY: atXY, grid: grid };
})();
