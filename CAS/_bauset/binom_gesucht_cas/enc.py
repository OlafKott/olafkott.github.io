import re,json,base64,os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
R='/home/claude/olafkott.github.io/CAS/'
tpl=open(R+'Wertetabelle/Loesung_CAS_Wertetabelle.html').read()
s=open('Loesung_klar.html').read()
css=re.search(r'<style>.*?</style>',s,re.S).group(0)
body=re.search(r'<body[^>]*>(.*)</body>',s,re.S).group(1)
pt=(css+body).encode()
salt=os.urandom(16); iv=os.urandom(12); code='5348'
k=PBKDF2HMAC(hashes.SHA256(),32,salt,150000).derive(code.encode())
ct=AESGCM(k).encrypt(iv,pt,None)
D={"s":base64.b64encode(salt).decode(),"iv":base64.b64encode(iv).decode(),"ct":base64.b64encode(ct).decode(),"it":150000}
out=re.sub(r'const D=\{.*?\};','const D='+json.dumps(D)+';',tpl,count=1,flags=re.S)
out=out.replace('<title>Lösung CAS-Führerschein Wertetabelle und Graph</title>','<title>Lösung CAS-Führerschein Binomialverteilung: n, k oder p gesucht</title>')
assert 'Binomialverteilung' in out
open(R+'Binomial_Gesucht/Loesung_CAS_Binomial_Gesucht.html','w').write(out)
