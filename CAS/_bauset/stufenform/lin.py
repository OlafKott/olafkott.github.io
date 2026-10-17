from fractions import Fraction as F
def ref(a, strat='max'):
    A=[[F(x) for x in r] for r in a]; m=len(A); n=len(A[0]); r=0
    for c in range(n):
        if r>=m: break
        cand=[i for i in range(r,m) if A[i][c]!=0]
        if not cand: continue
        p=max(cand,key=lambda i:abs(A[i][c])) if strat=='max' else cand[0]
        A[r],A[p]=A[p],A[r]; pv=A[r][c]; A[r]=[v/pv for v in A[r]]
        for i in range(r+1,m):
            f=A[i][c]; A[i]=[A[i][j]-f*A[r][j] for j in range(n)]
        r+=1
    return A
def rref(a):
    A=ref(a); m=len(A); n=len(A[0])
    for r in range(m-1,-1,-1):
        c=next((j for j,v in enumerate(A[r]) if v!=0),None)
        if c is None: continue
        for i in range(r):
            f=A[i][c]; A[i]=[A[i][j]-f*A[r][j] for j in range(n)]
    return A
def robust(a): return ref(a,'max')==ref(a,'first')
def show(A): return ' | '.join(' '.join(str(v) for v in r) for r in A)
if __name__=='__main__':
    import sys
    tests={
     'A1a':[[1,2,-1,2],[2,-1,3,9],[-1,1,2,5]],
     'A1b':[[3,-1,0,4],[1,0,2,7],[0,1,-1,-1]],
    }
    for k,v in tests.items(): print(k,'robust',robust(v),'\n ref',show(ref(v)),'\n rref',show(rref(v)))
