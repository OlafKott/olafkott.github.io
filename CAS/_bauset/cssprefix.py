import re

def _split_top(css):
    """Zerlegt CSS in Top-Level-Blöcke (prelude, body)."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        prelude = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == '{': depth += 1
            elif css[k] == '}': depth -= 1
            k += 1
        out.append((prelude, css[j+1:k-1]))
        i = k
    return out

def _sel(prelude, pre):
    parts = []
    for s in prelude.split(','):
        s = s.strip()
        if not s:
            continue
        if s == ':root':
            parts.append(pre)
        elif s in ('html', 'body'):
            parts.append(pre)
        elif s == '*':
            parts.append(pre + ' *')
        else:
            parts.append(pre + ' ' + s)
    return ', '.join(parts)

def prefix(css, pre):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    res = []
    for prelude, body in _split_top(css):
        if prelude.startswith('@keyframes'):
            res.append(f'{prelude}{{{body}}}')
        elif prelude.startswith('@media'):
            res.append(f'{prelude}{{\n{prefix(body, pre)}\n}}')
        else:
            res.append(f'{_sel(prelude, pre)}{{{body}}}')
    return '\n'.join(res)
