# peliMaailma

Joo oli jos ei oo gitiä niin lataa git.
Sitten node.js ja npm.

Sitten voit käynnistää tämän ohjelman tässä juuressa missä tämä tiedosto on kirjoittamalla git shelliin: node index.js

Sitten localhost:3000:een käynnistyy node palvelin ja se pitää aina käynnistää uudelleen jos haluaa muutokset näkymään. Ja shellissä control+c katkasee serverin.

Luultavasti tämä tulee olemaan single page app eli käyteteään angularia eli serveri pyörittää periaatteessa vain yhtä sivua eli index.html:ää.

Kirjastot ladataan backendiin npm:llä menemällä juureen (missä olet) ja kirjoittamalla npm install --save(jos haluat tallentaa riippuvuuden, luultavasti joo) esim. gulp

Ja fronttiin sitten bowerilla bower install --save esim. angular

Jaa ei kai muuta. Kyl se tästä. Ei oo vaikeet. Javascript on helppoo. Heh heh.

JAA git basics:
git add -A >> lisää kaiken
git commit -m "olipa hyvä commit" >> luo commitin jonka lähettää internettiin
git push >> työntää commitin päällimäiseksi haaraan mistä pushaat

Luultavasti parempi jos forkkaat tai luot oman branchin:
git checkout -b parasbranchi >> luo branchin ja siirtyy siihen
git pull origin master >> hakee kaiken tavaran master-branchista(missä luultavasti on hyvää kamaa)

Sitten ehkä pitää asettaa mihin pushaat eli git push -u origin parasbranchi tai jotain. en muista mut hei kyl se täst
