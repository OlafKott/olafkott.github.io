#!/usr/bin/env python3
"""Kopfzeilen im Stil der Moodle-Kursbilder für die CAS-Arbeitsblätter.
kopf_html(folder, title_html, nr, abschnitt, logo, klein) liefert das <div class="kopf">.
Jedes Thema hat ein eigenes Motiv (SCENES). Koordinaten: viewBox 910 breit, 1 Einheit = 0,2 mm."""
import math

D = '#0f2347'      # Konturfarbe
B = '#1F4E99'      # CAS-Blau
BL = '#6F9BDB'     # helles Blau
BG = '#E8F0FB'     # Hintergrund
RAY = '#D3E1F5'    # Strahlen
DOT = '#A9C2E8'    # Punkte
GR = '#C9D8F0'     # Kästchen
O = '#E07B00'; R = '#D32F2F'; G = '#2E7D32'; P = '#6A5ACD'; SUN = '#FFD27A'
SW = 2.4
SERIF = "Georgia,Caladea,'DejaVu Serif',serif"
SANS = "Calibri,Carlito,Arial,sans-serif"
MONO = "Consolas,'DejaVu Sans Mono',monospace"

# ---------------------------------------------------------------- Bausteine
def t(x, y, s, size=13, fill=D, anchor='start', weight='bold', fam=SERIF, extra=''):
    return (f'<text x="{x}" y="{y}" font-family="{fam}" font-size="{size}" font-weight="{weight}" '
            f'fill="{fill}" text-anchor="{anchor}"{extra}>{s}</text>')

def sub(s):  return f'<tspan dy="3" font-size="0.7em">{s}</tspan><tspan dy="-3"></tspan>'
def sup(s):  return f'<tspan dy="-5" font-size="0.7em">{s}</tspan><tspan dy="5"></tspan>'

def card(x, y, w, h, rot, inner, fill='#fff'):
    cx, cy = x + w / 2, y + h / 2
    return (f'<g transform="rotate({rot} {cx} {cy})"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" '
            f'fill="{fill}" stroke="{D}" stroke-width="{SW}" stroke-linejoin="round"/>'
            f'<g transform="translate({x} {y})">{inner}</g></g>')

def sticker(x, y, s, rot, size=20):
    return (f'<text x="{x}" y="{y}" font-family="\'Arial Black\',\'DejaVu Sans\',Arial,sans-serif" font-weight="900" '
            f'font-size="{size}" fill="{B}" stroke="{D}" stroke-width="2" paint-order="stroke" '
            f'transform="rotate({rot} {x} {y})" text-anchor="middle">{s}</text>')

class Plot:
    """Koordinatensystem in einer Karte (lokale Koordinaten)."""
    def __init__(s, x, y, w, h, xr, yr):
        s.x, s.y, s.w, s.h, s.xr, s.yr = x, y, w, h, xr, yr
    def X(s, v): return s.x + (v - s.xr[0]) / (s.xr[1] - s.xr[0]) * s.w
    def Y(s, v): return s.y + s.h - (v - s.yr[0]) / (s.yr[1] - s.yr[0]) * s.h
    def grid(s, step=1):
        o = []
        v = math.ceil(s.xr[0])
        while v <= s.xr[1]:
            o.append(f'<line x1="{s.X(v):.1f}" y1="{s.y}" x2="{s.X(v):.1f}" y2="{s.y+s.h}"/>'); v += step
        v = math.ceil(s.yr[0])
        while v <= s.yr[1]:
            o.append(f'<line x1="{s.x}" y1="{s.Y(v):.1f}" x2="{s.x+s.w}" y2="{s.Y(v):.1f}"/>'); v += step
        return f'<g stroke="{GR}" stroke-width="0.9">{"".join(o)}</g>'
    def axes(s):
        a = ''
        if s.yr[0] <= 0 <= s.yr[1]:
            a += f'<line x1="{s.x}" y1="{s.Y(0):.1f}" x2="{s.x+s.w}" y2="{s.Y(0):.1f}" stroke="{D}" stroke-width="1.6"/>'
        if s.xr[0] <= 0 <= s.xr[1]:
            a += f'<line x1="{s.X(0):.1f}" y1="{s.y}" x2="{s.X(0):.1f}" y2="{s.y+s.h}" stroke="{D}" stroke-width="1.6"/>'
        return a
    def pts(s, f, a, b, n=40):
        return [(s.X(a + (b - a) * i / n), s.Y(f(a + (b - a) * i / n))) for i in range(n + 1)]
    def curve(s, f, a=None, b=None, col=P, wd=2.6, dash=''):
        a = s.xr[0] if a is None else a; b = s.xr[1] if b is None else b
        p = s.pts(f, a, b)
        d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in p)
        da = f' stroke-dasharray="{dash}"' if dash else ''
        return f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{wd}" stroke-linecap="round"{da}/>'
    def area(s, f, g, a, b, col):
        p = s.pts(f, a, b) + s.pts(g, a, b)[::-1]
        d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in p) + ' Z'
        return f'<path d="{d}" fill="{col}" stroke="none"/>'
    def dot(s, vx, vy, col=R, r=3.4, hollow=False):
        f = '#fff' if hollow else col
        return f'<circle cx="{s.X(vx):.1f}" cy="{s.Y(vy):.1f}" r="{r}" fill="{f}" stroke="{D if not hollow else col}" stroke-width="1.5"/>'
    def clip(s, cid):
        return (f'<clipPath id="{cid}"><rect x="{s.x}" y="{s.y}" width="{s.w}" height="{s.h}"/></clipPath>')

def plotcard(x, y, w, h, rot, xr, yr, draw, cid):
    p = Plot(5, 5, w - 10, h - 10, xr, yr)
    inner = (f'<defs>{p.clip(cid)}</defs>' + p.grid() + p.axes() +
             f'<g clip-path="url(#{cid})">{draw(p)}</g>')
    return card(x, y, w, h, rot, inner)

def bars(p, vals, x0=0, col=BL, hi=None, hicol=O, wfac=0.7):
    o = ''
    for i, v in enumerate(vals):
        c = hicol if (hi and i in hi) else col
        xa, xb = p.X(x0 + i - wfac / 2), p.X(x0 + i + wfac / 2)
        o += (f'<rect x="{xa:.1f}" y="{p.Y(v):.1f}" width="{xb-xa:.1f}" height="{p.Y(0)-p.Y(v):.1f}" '
              f'fill="{c}" stroke="{D}" stroke-width="1.3"/>')
    return o

def mat(x, y, rows, cw=18, rh=14, size=12, colors=None, bar=None):
    """Matrix mit runden Klammern; rows = Liste von Zeilen (Strings)."""
    n, m = len(rows), len(rows[0])
    h = n * rh
    o = (f'<path d="M{x+4},{y} Q{x-2},{y+h/2} {x+4},{y+h}" fill="none" stroke="{D}" stroke-width="1.8" stroke-linecap="round"/>'
         f'<path d="M{x+m*cw+6},{y} Q{x+m*cw+12},{y+h/2} {x+m*cw+6},{y+h}" fill="none" stroke="{D}" stroke-width="1.8" stroke-linecap="round"/>')
    for i, r in enumerate(rows):
        for j, v in enumerate(r):
            c = colors[i][j] if colors else D
            o += t(x + 5 + j * cw + cw / 2, y + i * rh + rh * 0.78, v, size, c, 'middle')
    if bar is not None:
        bx = x + 5 + bar * cw
        o += f'<line x1="{bx}" y1="{y+1}" x2="{bx}" y2="{y+h-1}" stroke="{D}" stroke-width="1.4"/>'
    return o

def brace(x, y, h):
    return (f'<path d="M{x+5},{y} Q{x},{y} {x},{y+5} L{x},{y+h/2-4} Q{x},{y+h/2} {x-4},{y+h/2} '
            f'Q{x},{y+h/2} {x},{y+h/2+4} L{x},{y+h-5} Q{x},{y+h} {x+5},{y+h}" fill="none" stroke="{D}" stroke-width="1.8"/>')

def handheld(x, y, w, h, rot, lines):
    """Kleiner TI-Nspire CX CAS (rotes Modell) mit Displayzeilen."""
    cx, cy = x + w / 2, y + h / 2
    sw = w - 14
    disp = ''.join(t(9 + sw - 4, 13 + i * 9, s, 8.5, D, 'end', 'bold', MONO) if a == 'r'
                   else t(10, 13 + i * 9, s, 8.5, D, 'start', 'bold', MONO) for i, (a, s) in enumerate(lines))
    keys = ''.join(f'<rect x="{8+i*((w-16)/5):.1f}" y="{h-12}" width="{(w-16)/5-3:.1f}" height="5" rx="1.5" fill="#55565c"/>' for i in range(5))
    inner = (f'<rect x="7" y="5" width="{sw}" height="{h-22}" rx="2" fill="#fff" stroke="{D}" stroke-width="1.2"/>'
             f'<rect x="{w/2-6}" y="{h-18}" width="12" height="4" rx="2" fill="#77787e"/>{keys}{disp}')
    return (f'<g transform="rotate({rot} {cx} {cy})"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="7" fill="#2b2b2f" '
            f'stroke="#D93A2B" stroke-width="3"/><g transform="translate({x} {y})">{inner}</g></g>')

# Kartenpositionen (gleich für alle Themen)
AX, AY, AW, AH, AR = 462, 7, 90, 56, 4
BX, BY, BW, BH, BR = 566, 9, 130, 52, -3
S1 = (713, 30, 8); S2 = (717, 63, -6)

def two(a, b, s1, s2):
    return a + b + sticker(S1[0], S1[1], s1, S1[2]) + sticker(S2[0], S2[1], s2, S2[2])

def txtcard(lines, x=BX, y=BY, w=BW, h=BH, rot=BR):
    """lines: (y, svg-text) – bereits fertige <text>-Elemente."""
    return card(x, y, w, h, rot, ''.join(lines))

# ---------------------------------------------------------------- Motive
def sc_grund(i):
    a = handheld(AX + 8, AY - 3, 74, 62, AR, [('l', '2+3·4'), ('r', '14'), ('l', 'exact(.75)'), ('r', '3/4')])
    frac = (t(42, 22, '3', 14, D, 'middle') + f'<line x1="35" y1="26" x2="49" y2="26" stroke="{D}" stroke-width="1.6"/>' +
            t(42, 40, '4', 14, D, 'middle') + t(56, 33, f'= <tspan fill="{O}">0,75</tspan>', 15, D) )
    b = txtcard([frac])
    return two(a, b, '÷', 'x²')

def sc_stat(i):
    def box(p):
        y0, y1 = 1.2, 2.8
        q = [1, 3, 4.5, 6, 9]
        o = f'<line x1="{p.X(q[0])}" y1="{p.Y(2)}" x2="{p.X(q[1])}" y2="{p.Y(2)}" stroke="{D}" stroke-width="1.8"/>'
        o += f'<line x1="{p.X(q[3])}" y1="{p.Y(2)}" x2="{p.X(q[4])}" y2="{p.Y(2)}" stroke="{D}" stroke-width="1.8"/>'
        o += f'<rect x="{p.X(q[1])}" y="{p.Y(y1)}" width="{p.X(q[3])-p.X(q[1])}" height="{p.Y(y0)-p.Y(y1)}" fill="{BL}" stroke="{D}" stroke-width="1.8"/>'
        o += f'<line x1="{p.X(q[2])}" y1="{p.Y(y1)}" x2="{p.X(q[2])}" y2="{p.Y(y0)}" stroke="{R}" stroke-width="2.6"/>'
        for v in (q[0], q[4]):
            o += f'<line x1="{p.X(v)}" y1="{p.Y(1.5)}" x2="{p.X(v)}" y2="{p.Y(2.5)}" stroke="{D}" stroke-width="1.8"/>'
        return o
    a = plotcard(AX, AY, AW, AH, AR, (0, 10), (0, 4), box, f'c{i}a')
    b = plotcard(BX, BY, BW, BH, BR, (-0.5, 6.5), (0, 8), lambda p: bars(p, [2, 4, 7, 5, 3, 1], hi=[2]), f'c{i}b')
    return two(a, b, 'σ', 'Σ')

def sc_reg(i):
    xs = [1, 2, 3, 4, 5, 6, 7]; ys = [1.4, 2.1, 3.3, 3.6, 4.9, 5.4, 6.6]
    a = plotcard(AX, AY, AW, AH, AR, (0, 8), (0, 8),
                 lambda p: p.curve(lambda x: 0.85 * x + 0.5, col=O, wd=2.6) + ''.join(p.dot(x, y, B, 3) for x, y in zip(xs, ys)), f'c{i}a')
    b = txtcard([t(65, 25, f'y = <tspan fill="{O}">m</tspan>·x + <tspan fill="{G}">b</tspan>', 16, D, 'middle'),
                 t(65, 43, 'r ≈ 0,99', 12, '#444', 'middle', 'normal')])
    return two(a, b, 'r', '≈')

def sc_wreg(i):
    a = plotcard(AX, AY, AW, AH, AR, (-3, 3), (-1, 6),
                 lambda p: p.curve(lambda x: 0.6 * x * x, col=P) + ''.join(p.dot(x, 0.6 * x * x + d, B, 2.8) for x, d in [(-2.5, .3), (-1.5, -.3), (-.5, .2), (.6, -.1), (1.6, .3), (2.4, -.3)]), f'c{i}a')
    b = plotcard(BX, BY, BW, BH, BR, (0, 7), (0, 8),
                 lambda p: p.curve(lambda x: 0.4 * 1.55 ** x, col=O) + ''.join(p.dot(x, 0.4 * 1.55 ** x + d, B, 2.8) for x, d in [(1, .3), (2.2, -.2), (3.4, .3), (4.5, -.4), (5.6, .4), (6.4, -.3)])
                 + t(10, 16, f'a·b{sup("x")}', 13, O), f'c{i}b')
    return two(a, b, 'x²', 'x³')

def sc_funk(i):
    f = lambda x: 0.5 * x * x - 2
    a = plotcard(AX, AY, AW, AH, AR, (-3, 4), (-3, 5),
                 lambda p: p.curve(f) + f'<path d="M{p.X(3)},{p.Y(0)} L{p.X(3)},{p.Y(f(3))} L{p.X(0)},{p.Y(f(3))}" fill="none" stroke="{O}" stroke-width="1.8" stroke-dasharray="4 3"/>' + p.dot(3, f(3), R), f'c{i}a')
    b = txtcard([t(65, 23, 'f(x) := 0,5x² − 2', 13, D, 'middle'),
                 t(28, 43, 'f(3) =', 14),
                 f'<rect x="76" y="29" width="36" height="19" rx="4" fill="#FDEBD9" stroke="{O}" stroke-width="1.8"/>', t(94, 43, '2,5', 14, D, 'middle')])
    return two(a, b, ':=', '→')

def sc_wt(i):
    xs = ['−1', '0', '1', '2']; ys = ['1', '0', '1', '4']
    cw = (AW - 30) / 4
    tb = (f'<line x1="5" y1="28" x2="{AW-5}" y2="28" stroke="{D}" stroke-width="1.4"/>'
          f'<line x1="26" y1="8" x2="26" y2="48" stroke="{D}" stroke-width="1.4"/>' + t(15, 22, 'x', 12, D, 'middle', 'bold', SERIF) + t(15, 43, 'y', 12, D, 'middle')
          + ''.join(t(28 + cw * k + cw / 2, 22, v, 11, D, 'middle') + t(28 + cw * k + cw / 2, 43, ys[k], 11, B, 'middle') for k, v in enumerate(xs)))
    a = card(AX, AY, AW, AH, AR, f'<rect x="5" y="8" width="{AW-10}" height="20" fill="#E3ECF8"/>' + tb)
    b = plotcard(BX, BY, BW, BH, BR, (-3, 3), (-0.5, 5),
                 lambda p: p.curve(lambda x: x * x) + ''.join(p.dot(x, x * x, R, 3) for x in (-2, -1, 0, 1, 2)), f'c{i}b')
    return two(a, b, 'x', 'y')

def sc_abschn(i):
    a = plotcard(AX, AY, AW, AH, AR, (-3, 4), (-2, 5),
                 lambda p: p.curve(lambda x: x + 1, -3, 1, col=B) + p.curve(lambda x: 0.5 * (x - 1) ** 2 - 1, 1, 4, col=O)
                 + p.dot(1, 2, B) + p.dot(1, -1, O, hollow=True), f'c{i}a')
    b = txtcard([t(10, 31, 'f(x) =', 13), brace(56, 10, 32),
                 t(63, 22, f'<tspan fill="{B}">x+1</tspan>', 12), t(122, 22, 'x &lt; 1', 9.5, '#444', 'end', 'normal'),
                 t(63, 40, f'<tspan fill="{O}">x²</tspan>', 12), t(122, 40, 'x ≥ 1', 9.5, '#444', 'end', 'normal')])
    return two(a, b, '{', '●')

def sc_graph(i):
    f = lambda x: 0.5 * x ** 3 - 1.5 * x + 1
    a = plotcard(AX, AY, AW, AH, AR, (-2.6, 2.6), (-1.5, 3.5),
                 lambda p: p.curve(f) + p.dot(-1, f(-1), R) + p.dot(1, f(1), R) + p.dot(0, f(0), G), f'c{i}a')
    b = txtcard([t(16, 23, f'<tspan fill="{R}">H</tspan>(−1 | 2)', 13), t(16, 42, f'<tspan fill="{R}">T</tspan>(1 | 0)', 13),
                 t(84, 33, f'<tspan fill="{G}">W</tspan>(0 | 1)', 12)])
    return two(a, b, 'H', 'T')

def sc_fs(i):
    cols = [B, O, G, P]
    a = plotcard(AX, AY, AW, AH, AR, (-3, 3), (-2.5, 4),
                 lambda p: ''.join(p.curve(lambda x, k=k: (k + 1) * 0.35 * x * x - 2, col=c, wd=2.3) for k, c in enumerate(cols)), f'c{i}a')
    b = txtcard([t(65, 25, f'f<tspan dy="3" font-size="0.7em" fill="{O}">t</tspan><tspan dy="-3">(x) = </tspan><tspan fill="{O}">t</tspan>·x² − 2', 14, D, 'middle'),
                 t(65, 43, f'<tspan fill="{O}">t</tspan> = 1; 2; 3; 4', 11, '#444', 'middle', 'normal')])
    return two(a, b, 't', '∞')

def sc_abl(i):
    f = lambda x: 0.4 * x ** 3 - x
    fp = lambda x: 1.2 * x * x - 1
    x0 = 1.5
    a = plotcard(AX, AY, AW, AH, AR, (-2.5, 2.5), (-2, 2.5),
                 lambda p: p.curve(f) + p.curve(lambda x: f(x0) + fp(x0) * (x - x0), col=O, wd=2.3) + p.dot(x0, f(x0), R), f'c{i}a')
    b = txtcard([t(65, 25, 'f′(x) = 1,2x² − 1', 14, D, 'middle'), t(65, 43, 'Steigung der Tangente', 10.5, '#444', 'middle', 'normal')])
    return two(a, b, 'f′', 'm')

def sc_int(i):
    f = lambda x: 0.25 * x * x + 0.5
    a = plotcard(AX, AY, AW, AH, AR, (-0.5, 4), (-0.5, 4),
                 lambda p: p.area(f, lambda x: 0, 1, 3, '#BBD0F0') + p.curve(f) +
                 f'<line x1="{p.X(1)}" y1="{p.Y(0)}" x2="{p.X(1)}" y2="{p.Y(f(1))}" stroke="{B}" stroke-width="1.6"/>'
                 f'<line x1="{p.X(3)}" y1="{p.Y(0)}" x2="{p.X(3)}" y2="{p.Y(f(3))}" stroke="{B}" stroke-width="1.6"/>', f'c{i}a')
    b = txtcard([t(18, 39, '∫', 30, D, 'middle', 'normal'), t(29, 20, '3', 9), t(26, 46, '1', 9),
                 t(36, 34, f'f(x) dx = <tspan fill="{O}">3,17</tspan>', 13)])
    return two(a, b, '∫', 'dx')

def sc_flae(i):
    f = lambda x: -0.4 * x * x + 3; g = lambda x: 0.5 * x - 0.5
    a = plotcard(AX, AY, AW, AH, AR, (-3.5, 3.5), (-2.5, 3.5),
                 lambda p: p.area(f, g, -2.5, 2.2, '#FBD9B5') + p.curve(f) + p.curve(g, col=R, wd=2.3), f'c{i}a')
    h = lambda x: 0.5 * x * (x - 2) * (x + 2) / 1.5
    b = plotcard(BX, BY, BW, BH, BR, (-2.6, 2.6), (-1.6, 1.6),
                 lambda p: p.area(h, lambda x: 0, -2, 0, '#BBD0F0') + p.area(h, lambda x: 0, 0, 2, '#FBD9B5') + p.curve(h)
                 + t(p.X(-1), p.Y(-0.25) + 4, f'A{sub("1")}', 11, B, 'middle') + t(p.X(1), p.Y(0.25) + 4, f'A{sub("2")}', 11, O, 'middle'), f'c{i}b')
    return two(a, b, 'A', '+')

def sc_gl(i):
    f = lambda x: 0.4 * x * x - 1.6
    a = plotcard(AX, AY, AW, AH, AR, (-3.5, 3.5), (-2.5, 3),
                 lambda p: p.curve(f) + p.dot(-2, 0, R) + p.dot(2, 0, R), f'c{i}a')
    b = txtcard([t(65, 24, 'solve(x²−4=0,x)', 12.5, D, 'middle', 'bold', MONO),
                 t(65, 43, f'x = <tspan fill="{R}">−2</tspan> or x = <tspan fill="{R}">2</tspan>', 12.5, D, 'middle')])
    return two(a, b, '=', 'x')

def sc_lgs(i):
    a = plotcard(AX, AY, AW, AH, AR, (-1, 5), (-1, 4),
                 lambda p: p.curve(lambda x: 0.5 * x + 0.5, col=B) + p.curve(lambda x: -x + 4, col=O) + p.dot(7 / 3, 0.5 * 7 / 3 + 0.5, R), f'c{i}a')
    rows = ['x + 2y − z = −9', '3x + y + 2z = 13', '2x − z = −1']
    b = txtcard([brace(12, 7, 38)] + [t(20, 18 + k * 14, r, 11.5) for k, r in enumerate(rows)])
    return two(a, b, 'I', 'II')

def sc_mat(i):
    a = card(AX, AY, AW, AH, AR, t(9, 33, 'A =', 14) + mat(36, 14, [['1', '2'], ['3', '4']], 20, 15, 13))
    b = card(BX, BY, BW, BH, BR, mat(4, 12, [['2', '0'], ['1', '3']], 11, 14, 10.5) + t(43, 31, '·', 16, D, 'middle')
             + mat(48, 12, [['1', '1'], ['0', '2']], 11, 14, 10.5) + t(88, 31, '=', 13, D, 'middle')
             + mat(94, 12, [['2', '2'], ['1', '7']], 11, 14, 10.5, [[O, O], [O, O]]))
    return two(a, b, 'A', 'B')

def sc_stufe(i):
    a = card(AX, AY, AW, AH, AR, mat(5, 7, [['2', '1', '−1', '8'], ['1', '3', '2', '5'], ['1', '1', '2', '4']], 17, 14, 10.5, bar=3))
    Z = [[D, D, D, D], [R, D, D, D], [R, R, D, D]]
    b = card(BX, BY, BW, BH, BR, mat(12, 6, [['1', '0', '0', '2'], ['0', '1', '0', '3'], ['0', '0', '1', '−1']], 24, 13.5, 12, Z, bar=3)
             + f'<path d="M14,20 L40,20 L40,33 L64,33 L64,47" fill="none" stroke="{O}" stroke-width="1.8" stroke-dasharray="3 2"/>')
    return two(a, b, '0', '1')

def sc_lopt(i):
    poly = [(0, 0), (0, 3), (2, 3.5), (4, 2), (4.5, 0)]
    def d(p):
        pp = ' '.join(f'{p.X(x):.1f},{p.Y(y):.1f}' for x, y in poly)
        return (f'<polygon points="{pp}" fill="#BBD0F0" stroke="{B}" stroke-width="2"/>'
                + p.curve(lambda x: -0.75 * x + 5, col=O, wd=2, dash='5 3') + ''.join(p.dot(x, y, R, 2.8) for x, y in poly[1:]))
    a = plotcard(AX, AY, AW, AH, AR, (-0.5, 5.5), (-0.5, 4.5), d, f'c{i}a')
    b = txtcard([t(65, 25, f'Z(x,y) = <tspan fill="{O}">50x + 70y</tspan>', 13, D, 'middle'), t(65, 44, '→ max', 13, R, 'middle')])
    return two(a, b, 'Z', '≤')

def sc_kombi(i):
    cols = [R, B, O, G, P, B, R]
    urn = (f'<path d="M14,10 L76,10 L70,48 Q45,54 20,48 Z" fill="#E3ECF8" stroke="{D}" stroke-width="1.8" stroke-linejoin="round"/>'
           + ''.join(f'<circle cx="{c[0]}" cy="{c[1]}" r="6" fill="{cols[k]}" stroke="{D}" stroke-width="1.4"/>'
                     for k, c in enumerate([(28, 40), (42, 42), (56, 40), (35, 29), (49, 30), (62, 28), (42, 18)])))
    a = card(AX, AY, AW, AH, AR, urn)
    b = txtcard([t(65, 24, f'nCr(5,2) = <tspan fill="{O}">10</tspan>', 13, D, 'middle', 'bold', MONO),
                 t(65, 43, f'5! = <tspan fill="{O}">120</tspan>', 13, D, 'middle', 'bold', MONO)])
    return two(a, b, 'n!', '5')

def sc_bin(i):
    v = [0.2, 1.0, 2.6, 3.8, 3.4, 2.0, 0.8, 0.2]
    a = plotcard(AX, AY, AW, AH, AR, (-0.7, 7.7), (0, 4.4), lambda p: bars(p, v, hi=[3]), f'c{i}a')
    b = txtcard([t(65, 24, 'binomPdf(n,p,k)', 12.5, D, 'middle', 'bold', MONO), t(65, 43, f'P(X = <tspan fill="{O}">k</tspan>)', 13, D, 'middle')])
    return two(a, b, 'p', 'n')

def sc_bing(i):
    c = [0.05, 0.2, 0.45, 0.68, 0.84, 0.93, 0.97, 0.99]
    a = plotcard(AX, AY, AW, AH, AR, (-0.7, 7.7), (0, 1.1),
                 lambda p: bars(p, c, hi=[5, 6, 7]) + f'<line x1="{p.x}" y1="{p.Y(0.9)}" x2="{p.x+p.w}" y2="{p.Y(0.9)}" stroke="{R}" stroke-width="1.8" stroke-dasharray="4 3"/>', f'c{i}a')
    b = txtcard([t(65, 24, 'P(X ≤ k) ≥ 0,9', 13, D, 'middle'), t(65, 44, f'n = <tspan fill="{R}">?</tspan>', 14, D, 'middle')])
    return two(a, b, '?', '≥')

SCENES = {'Grundlagen': sc_grund, 'Lage_und_Streuung': sc_stat, 'Regression': sc_reg, 'Weitere_Regressionen': sc_wreg,
          'Funktionswerte': sc_funk, 'Wertetabelle': sc_wt, 'Abschnittsweise': sc_abschn, 'Graphen': sc_graph,
          'Funktionsscharen': sc_fs, 'Ableitungen': sc_abl, 'Integrale': sc_int, 'Flaechen': sc_flae,
          'Gleichungen': sc_gl, 'LGS': sc_lgs, 'Matrizen': sc_mat, 'Stufenform': sc_stufe, 'Lineare_Optimierung': sc_lopt,
          'Kombinatorik': sc_kombi, 'Binomialverteilung': sc_bin, 'Binomial_Gesucht': sc_bing}

# ---------------------------------------------------------------- Hintergrund und HTML
def background(H, uid, klein=False):
    sx, sy = 600, 2
    rays = ''
    for k in range(24):
        a1, a2 = math.radians(k * 15), math.radians(k * 15 + 7)
        rays += (f'<path d="M{sx},{sy} L{sx+1400*math.cos(a1):.1f},{sy+1400*math.sin(a1):.1f} '
                 f'L{sx+1400*math.cos(a2):.1f},{sy+1400*math.sin(a2):.1f} Z" fill="{RAY}"/>')
    w1, w2 = (H - 4, H - 1) if klein else (H - 23, H - 11)
    return (f'<defs><pattern id="d{uid}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.6" fill="{DOT}"/></pattern>'
            f'<linearGradient id="g{uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>'
            f'<mask id="m{uid}"><rect width="910" height="{H}" fill="url(#g{uid})"/></mask></defs>'
            f'<rect width="910" height="{H}" fill="{BG}"/>{rays}'
            f'<rect width="910" height="{H}" fill="url(#d{uid})" opacity=".55" mask="url(#m{uid})"/>'
            f'<circle cx="{sx}" cy="{sy}" r="22" fill="{SUN}" stroke="{D}" stroke-width="{SW}"/>'
            f'<path d="M0,{w1} C120,{w1-7} 260,{w1-3} 420,{w1+1} C580,{w1+6} 720,{w1-7} 910,{w1-2} L910,{H} L0,{H} Z" fill="{BL}" stroke="{D}" stroke-width="{SW}"/>'
            f'<path d="M0,{w2} C150,{w2-4} 330,{w2-2} 470,{w2+1} C620,{w2+5} 760,{w2-2} 910,{w2-1} L910,{H} L0,{H} Z" fill="{B}" stroke="{D}" stroke-width="{SW}"/>')

def kopf_html(folder, title_html, nr, abschnitt, logo, klein=False, hmm=21.4, uid='k'):
    H = round(910 * hmm / 182, 1)
    uid = f'{uid}{"s" if klein else ""}'
    svg = (f'<svg class="kbg" viewBox="0 0 910 {H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">'
           + background(H, uid, klein) + SCENES[folder](uid) + '</svg>')
    km = '' if klein else '<div class="km"><span>Name:</span><span>Klasse:</span><span>Datum:</span></div>'
    return (f'<div class="kopf{" klein" if klein else ""}" style="height:{hmm}mm">{svg}'
            f'<div class="ktit"><span class="over"><b>{nr}</b>CAS-Führerschein · {abschnitt}</span><h1>{title_html}</h1></div>'
            f'<div class="lg"><img class="logo" src="{logo}" alt="rwb. ahr."></div>{km}</div>')

KOPF_CSS = '''
/* ===== Kopfzeile im Stil der Moodle-Kursbilder ===== */
.kopf{ position:relative; width:100%; margin:-4mm 0 3mm; border:2px solid #1F4E99; border-radius:4mm; overflow:hidden; box-shadow:0 1mm 0 #163a73; flex:0 0 auto; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.kopf .kbg{ position:absolute; inset:0; width:100%; height:100%; display:block; }
.kopf .ktit{ position:absolute; left:4mm; top:1.5mm; width:87mm; }
.kopf .over{ display:inline-block; font-family:Calibri,Carlito,Arial,sans-serif; font-weight:bold; font-size:7pt; line-height:1.3; letter-spacing:.5px; text-transform:uppercase; color:#163a73; background:#fff; border:1.2px solid #0f2347; border-radius:2.5mm; padding:0 2.2mm 0 0; white-space:nowrap; overflow:hidden; }
.kopf .over b{ display:inline-block; background:#1F4E99; color:#fff; padding:0 1.6mm; margin-right:1.6mm; letter-spacing:.3px; }
.kopf h1{ font-family:Georgia,Caladea,'DejaVu Serif','Times New Roman',serif; font-weight:bold; color:#1F4E99; font-size:15pt; line-height:1.1; margin:.6mm 0 0; white-space:nowrap; text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff,0 0 2px #fff; }
.kopf .lg{ position:absolute; right:3mm; top:2mm; background:#fff; border:1.2px solid #0f2347; border-radius:2.5mm; padding:1.3mm 2.4mm; }
.kopf .lg .logo{ height:6.4mm; width:auto; display:block; }
.kopf .km{ position:absolute; left:3mm; right:3mm; bottom:1.6mm; height:5.4mm; background:#fff; border:1.2px solid #0f2347; border-radius:2mm; display:flex; gap:6mm; align-items:flex-end; padding:0 4mm .8mm; font-size:11.5px; color:#444; font-family:Georgia,Caladea,serif; }
.kopf .km span{ flex:1; border-bottom:1px solid #999; padding-bottom:.2mm; }
.kopf .km span:first-child{ flex:1.6; }
.kopf.klein .lg{ top:1.6mm; }
'''
