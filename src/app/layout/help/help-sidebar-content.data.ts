export interface HelpSidebarSection {
    title: string;
    items: string[];
}

export interface HelpSidebarContent {
    title: string;
    description: string;
    sections: HelpSidebarSection[];
}

function section(title: string, items: string[]): HelpSidebarSection {
    return { title, items };
}

function help(title: string, description: string, sections: HelpSidebarSection[]): HelpSidebarContent {
    return { title, description, sections };
}

export const HELP_SIDEBAR_CONTENT = {
    default: help(
        'Oldalsúgó',
        'Ez a panel az aktuális képernyő használatának legfontosabb lépéseit foglalja össze, hogy új felhasználóként is biztonsággal tudd végigvinni a napi feladatot.',
        [
            section('Hogyan használd ezt a súgót?', [
                'Először nézd meg a képernyő tetején lévő választókat, szűrőket és állapotjelzőket, mert ezek határozzák meg, hogy mit látsz a listában.',
                'Ha táblázatos oldalon dolgozol, mindig szűkíts előbb konferenciára, dátumra vagy státuszra, és csak utána kezdj tömeges műveletbe.',
                'Szerkesztés után keresd a sikeres mentés visszajelzését, majd ellenőrizd a lista vagy a részletező nézet alapján, hogy az adat tényleg a várt formában jelent meg.'
            ]),
            section('Biztonságos munkamenet', [
                'Új rekord létrehozásakor először a kötelező mezőket töltsd ki, utána állítsd be a kényelmi vagy opcionális adatokat.',
                'Törlés helyett sokszor biztonságosabb tiltani vagy inaktiválni egy elemet, ha nem vagy biztos benne, hogy máshol már használatban van.',
                'Ha egy képernyőn több ikon van egy sor végén, mindig nézd meg az eszköztippet: ugyanaz a rekord több külön művelethez is tartozhat.'
            ]),
            section('Mikor kérj segítséget?', [
                'Ha ugyanarra az adatra több helyen ellentmondó értéket látsz, előbb ne javíts manuálisan, hanem ellenőrizd a kapcsolódó modult is.',
                'Ha valamilyen rekord hiányzik a listából, először nézd át a szűrőket, a konferencia-kiválasztást és az engedélyezett státuszt.',
                'Ha egy művelet üzleti következménye nem egyértelmű, inkább állj meg a mentés előtt, és egyeztess a folyamat gazdájával.'
            ])
        ]
    ),
    dashboard: help(
        'Vezérlőpult',
        'A vezérlőpult a napi induló nézet: innen látod a legfontosabb darabszámokat, és innen döntöd el, melyik modulban kell tovább dolgozni.',
        [
            section('Mit mutat ez az oldal?', [
                'A felső kártyák gyors állapotképet adnak a konferenciák, vendégek, szobák és NFC címkék aktuális mennyiségéről.',
                'A grafikonok trendet mutatnak, nem végleges elszámolást: arra valók, hogy észrevedd az eltérést, és továbbmenj a megfelelő részletes oldalra.',
                'A tevékenységlista arra jó, hogy lásd, történt-e friss adminisztráció a rendszerben, például új rögzítés vagy módosítás.'
            ]),
            section('Ajánlott napi rutin', [
                'Műszakkezdéskor nézd át a fő darabszámokat, különösen azt, hogy van-e szobára váró vagy feltűnően alacsony kihasználtság.',
                'Ha az NFC arány vagy a vendégszám szokatlan, nyisd meg a megfelelő modult, és ott ellenőrizd a hiányzó vagy hibás rekordokat.',
                'Szervezői nézetben mindig válassz konferenciát, mert a kártyák és határidők csak így értelmezhetők helyesen.'
            ]),
            section('Mire figyelj?', [
                'A dashboard a gyors döntést támogatja; rekordot javítani vagy részletesen elemezni általában nem itt kell.',
                'Ha egy KPI nem reálisnak tűnik, hasonlítsd össze a vendég-, foglalás- és szobaoldallal, mert az eltérés gyakran hiányos hozzárendelésből ered.',
                'Ne csak az abszolút számot nézd, hanem azt is, hogy melyik modul felé mutat további teendőt.'
            ])
        ]
    ),
    dashboardBanking: help(
        'Pénzügyi dashboard',
        'Ez a nézet összesített pénzügyi és aktivitási mutatókat mutat. Elsősorban áttekintésre való, nem elsődleges adatkarbantartásra.',
        [
            section('Mire használd?', [
                'Használd gyors trendellenőrzésre: bevételi alakulás, időszakok összevetése, kiugró eltérések azonosítása.',
                'A dashboard alapján azt döntsd el, kell-e továbblépned egy részletesebb listába vagy kimutatásba.',
                'Ha teszt- vagy mintaadatot látsz, ezt a nézetet tájékozódásra használd, ne üzleti döntés alapjaként.'
            ]),
            section('Jó gyakorlat', [
                'Mindig azonos időablakokat hasonlíts össze, különben a különbségek félrevezetők lehetnek.',
                'A trend fontosabb, mint egyetlen kártya pillanatnyi értéke.',
                'Ha kiugró adatot látsz, keresd meg a kapcsolódó forráslistát, és ott ellenőrizd a konkrét rekordokat.'
            ]),
            section('Mire figyelj?', [
                'A dashboardon látható összeg és darabszám sokszor aggregált adat, ezért nem feltétlenül egyezik meg egyetlen listaoldal pillanatnyi szűrt állapotával.',
                'Ne végezz kézi korrekciót pusztán dashboard-adat alapján.',
                'Ha bizonytalan vagy az adat eredetében, auditáld vissza a forrásmodult.'
            ])
        ]
    ),
    user: help(
        'Felhasználók',
        'Ezen az oldalon kezeled a rendszerbe belépő felhasználókat, a szerepköröket és a szervezőkhöz tartozó szerződő kapcsolatokat.',
        [
            section('Első használatkor', [
                'A listában először név, szerepkör vagy e-mail szerint keress rá arra a felhasználóra, akit módosítani szeretnél.',
                'Új felhasználót csak akkor hozz létre, ha biztos vagy benne, hogy nem létezik már más néven vagy másik e-mail címmel.',
                'A szerepkör kiválasztása előtt gondold végig, hogy admin, szervező vagy más működési szintű hozzáférésre van-e szükség.'
            ]),
            section('Szervezőhöz tartozó szerződők', [
                'Szervező szerepkörnél a jogi entitások és a kapcsolódó szerződők itt rendelhetők hozzá a felhasználóhoz.',
                'Az „Alapértelmezett” kapcsolat az a szerződő, amelyet a rendszer előtöltésre vagy elsődleges választásra használhat.',
                'Ha egy szervező több jogi entitással dolgozik, csak akkor vegyél fel újat, ha a meglévő kapcsolatok valóban nem fedik le a működést.'
            ]),
            section('Gyakori hibák elkerülése', [
                'Ne adj túl széles jogosultságot csak azért, hogy egy felhasználó „mindent lásson”; a szerepkörnek a tényleges feladathoz kell illeszkednie.',
                'Mentés után ellenőrizd vissza a listában, hogy a név, szerepkör, e-mail és telefon is a várt formában jelent meg.',
                'Törlés előtt nézd meg, hogy a felhasználóhoz tartozik-e aktív folyamat, szervezői kapcsolat vagy auditnyom a rendszerben.'
            ])
        ]
    ),
    guest: help(
        'Vendégek',
        'Ez a legfontosabb operatív lista a napi munkában: itt kezeled a vendégadatokat, a szobához rendelést, az étrendet, az NFC címkét és a szobakulcs állapotát.',
        [
            section('Ajánlott munkamenet', [
                'Mindig konferencia kiválasztásával kezdj, különben könnyen olyan vendéglistán dolgozol, amely nem a jelenlegi feladathoz tartozik.',
                'A sorok kibontásával részletesen ellenőrizheted az érkezést, távozást, szobát, dokumentumokat és kapcsolódó adatokat, mielőtt módosítasz.',
                'Ha tömeges ellenőrzést végzel, használd együtt a név-, szoba-, étrend-, NFC- és dátumszűrőket a gyorsabb szűkítéshez.'
            ]),
            section('Mire jók a fő műveletek?', [
                'Az import csak a rendszerhez készült sablonfájllal működik megbízhatóan; import után mindig ellenőrizd a hibajelzéseket és a mintarekordokat.',
                'Az export akkor hasznos, ha konferencia-, státusz- vagy egyéb szűrő után szeretnél ellenőrizni vagy külső feldolgozásra átadni adatot.',
                'Az NFC- és kulcsikonok gyors operatív műveletekhez valók: címke hozzárendelés, kulcs kiadás, visszavétel és állapotellenőrzés.'
            ]),
            section('Mire figyelj különösen?', [
                'Ha egy vendégnél hibás vagy hiányzó étrend látszik, azt mielőbb javítsd, mert a konyhai és ételkiadási folyamatok erre épülnek.',
                'A vendég szobája és foglalása nem ugyanaz: ha kétség merül fel, a foglalás gombbal nyisd meg a kapcsolódó foglalási rekordot.',
                'NFC címke kiosztásakor mindig győződj meg róla, hogy a vendégnél nincs már aktív címke vagy nyitott kulcskezelési helyzet.'
            ])
        ]
    ),
    reservation: help(
        'Foglalások',
        'A foglalás oldal a szobabeosztás és a kapacitáskezelés központja. Itt látod, hogy ki melyik szobában van, kik várnak szobára, és hol van túlterhelés vagy speciális elhelyezési igény.',
        [
            section('Mielőtt módosítasz', [
                'Először válassz konferenciát, mert a felső mutatók, a szabad kapacitás és a listanézet csak így értelmezhető helyesen.',
                'A felső számok gyors jelzők: összes ágy, regisztrált vendég, foglalással rendelkező vendég és szobára váró vendég.',
                'Ha a „Szobára várók” szám magas, a legfontosabb feladat általában nem új foglalás felvitele, hanem a meglévő kiosztás rendezése.'
            ]),
            section('Hogyan olvasd a sorokat?', [
                'A szoba cellában egyszerre látszik a szobaszám, az épület, az emelet, az ágytípus és a fontos elhelyezési jelzések.',
                'A baby bed és matrac ikonok figyelmeztetnek arra, hogy a szoba kiosztásában speciális elhelyezési igény vagy kapacitásnyomás van.',
                'A sor kibontásával részletes képet kapsz a vendéglistáról, a tartózkodási időről, a kapacitásról, a megjegyzésekről és a foglalás megbízhatóságáról.'
            ]),
            section('Jó gyakorlat foglaláskezeléshez', [
                'Új foglalás létrehozásakor először az időszakot és a konferenciát ellenőrizd, utána válassz szobát, majd nézd meg, hogy a férőhely és a speciális igények még beleférnek-e.',
                'A túlterhelt vagy „utolsó férőhely” állapotú foglalásokat kezeld azonnal, mert ezekből lesznek a későbbi bejelentkezési problémák.',
                'Mentés előtt ellenőrizd a státuszt, a megjegyzést és azt, hogy a vendégek tényleg a megfelelő foglaláshoz tartoznak-e.'
            ])
        ]
    ),
    conference: help(
        'Konferenciák',
        'A konferencia oldal a rendezvény törzsadatait kezeli: időszak, étkezési határok, szervező, szerződő, regisztrációs űrlap és a vendégoldalon megjelenő kiegészítő mezők.',
        [
            section('Új konferencia felvitele', [
                'A név, a kezdő és záró dátum, valamint az első és utolsó étkezés együtt adja meg a konferencia működési keretét, ezért ezeket mindig együtt ellenőrizd.',
                'A regisztrációs link automatikusan épül a konferencia nevéből, de mentés előtt mindig nézd meg, hogy valóban a várt URL jött-e létre.',
                'A szervező és a szerződő kapcsolat külön üzleti szerep: ne keverd össze a rendezvény felelősét a számlázási vagy jogi entitással.'
            ]),
            section('Mire jók a sor végi ikonok?', [
                'A másolás és megnyitás ikon a regisztrációs űrlap gyors ellenőrzésére való: új konferenciánál ezt mindig érdemes végigkattintani.',
                'Az információ ikon a formmezők alá vagy buborékba kerülő segítő szövegeket kezeli, a kérdőjel ikon pedig az extra szervezői kérdéssort.',
                'A ceruza a konferencia törzsadatát módosítja, a kibontott sor pedig az összes fontos kapcsolattartói és határidő adatot összefoglalja.'
            ]),
            section('Gyakori hibák elkerülése', [
                'A regisztráció vége és a vendégmódosítás határideje üzletileg kritikus dátumok; ezek hibája az egész űrlapfolyamatot félreviheti.',
                'Kérdés vagy mezőinformáció mentése után nyisd meg a publikus űrlapot is, és nézd meg, hogy valóban a kívánt nyelven és helyen jelenik-e meg.',
                'Ha szobatípusokkal és kiosztással is dolgozol, a konferencia létrehozása után használd a szobákhoz kötődő binder funkciót is.'
            ])
        ]
    ),
    room: help(
        'Szobák',
        'A szobaoldal a fizikai kapacitás és a konferenciákhoz rendelt szobatípusok karbantartására szolgál. Innen lehet eldönteni, milyen készletből tudsz foglalni és ágyazni.',
        [
            section('Mit kezel ez az oldal?', [
                'A lista megmutatja a szobaszámot, épületet, emeletet, ágytípust, pótágy-szabályt és a kapcsolódó konferenciákat vagy szobatípust.',
                'Konferencia nélkül a teljes szobakészletet látod; konferencia kiválasztása után a fókusz a konferenciához tartozó szobatípusokra kerül.',
                'Az export a szobakészlet vagy a szűrt részhalmaz külső ellenőrzéséhez hasznos.'
            ]),
            section('Ajánlott munkamenet', [
                'Ha kapacitásproblémát keresel, előbb szűrj épületre, ágytípusra vagy pótágyra, és csak utána kezdj módosítani.',
                'Ha konferencia-specifikus szobatípust akarsz beállítani, előbb válaszd ki a konferenciát, különben a lista más nézetben működik.',
                'Új szobánál mindig együtt ellenőrizd a szobaszámot, a kódot, az épületet, az emeletet, az ágytípust és a férőhelyet.'
            ]),
            section('Mire figyelj?', [
                'A hibás szobatípus vagy pótágy-beállítás később hibás foglalási döntéseket okoz, ezért ezek nem „másodlagos” mezők.',
                'Ha egy szoba inaktív vagy hiányos, nézd meg, van-e hozzá aktív konferencia vagy foglalás, mielőtt módosítod.',
                'A komment mező rövid operatív információra való; üzleti szabályt vagy hosszú leírást inkább ne itt tárolj.'
            ])
        ]
    ),
    diet: help(
        'Étrendek',
        'Az étrendoldal a vendégeknél és a konyhai összesítésekben használt étrendkészletet kezeli. A jó elnevezés és színkiosztás gyorsabb operatív munkát eredményez.',
        [
            section('Mire való?', [
                'Itt hozhatod létre és módosíthatod azokat az étrendkategóriákat, amelyek a vendégekhez rendelhetők.',
                'A színkód nem díszítés: a listákban és egyes operatív nézetekben gyors vizuális azonosítást támogat.',
                'Az „Engedélyezve” állapot azt szabályozza, hogy az étrend továbbra is használható-e új hozzárendeléseknél.'
            ]),
            section('Ajánlott karbantartás', [
                'Új étrend létrehozásakor rövid, egyértelmű és a személyzet által azonnal felismerhető nevet használj.',
                'Mielőtt új kategóriát hozol létre, szűrj rá név szerint, hogy elkerüld a duplikált vagy majdnem azonos étrendeket.',
                'Ha egy étrendet már nem használtok, inkább tiltsd le, mintsem töröld, hogy a régi rekordok értelmezhetők maradjanak.'
            ]),
            section('Mire figyelj?', [
                'A félreérthető étrendnév a konyhai oldalon és az ételkiadásnál is hibát okozhat.',
                'Színváltás előtt gondold végig, hogy a személyzet fejben milyen színhez milyen étrendet köt.',
                'Mentés után ellenőrizd a vendégoldalon is, hogy az étrend valóban a kívánt formában jelenik-e meg.'
            ])
        ]
    ),
    logs: help(
        'Napló',
        'A naplóoldal auditálásra és hibakövetésre szolgál. Itt tudod visszanézni, hogy ki, mikor, melyik modulban milyen műveletet végzett, és mi volt a rendszer válasza.',
        [
            section('Hogyan szűkíts gyorsan?', [
                'Először dátumra vagy időszakra szűrj, mert a legtöbb hibaelhárítás időhöz kötött.',
                'Ezután válassz modult és művelettípust, például import, login, tag hozzárendelés vagy módosítás.',
                'Ha tudod, ki végezte a műveletet, a felhasználó szerinti szűrés drasztikusan csökkenti a zajt.'
            ]),
            section('Hogyan olvasd a rekordokat?', [
                'A státuszkód segít elkülöníteni a sikeres műveleteket a hibás hívásoktól; a 200/201 tipikusan sikeres, a 400/500 hibás válasz.',
                'A kibontott sor megmutatja a módosítás előtti és utáni állapotot, így pontosan látható, melyik mező változott.',
                'A válasz mező sokszor rövid hibaok vagy backend-visszajelzés, ezért ezt mindig együtt nézd a modul- és művelettípussal.'
            ]),
            section('Mikor hasznos igazán?', [
                'Ha egy felhasználó azt mondja, hogy „elmentettem, de nem jelent meg”, a napló az első hely, ahol ezt ellenőrizni érdemes.',
                'NFC, food counter vagy import probléma esetén itt gyorsan látszik, hogy a rendszer egyáltalán fogadta-e a műveletet.',
                'Audithelyzetben ne csak a műveletet, hanem annak időpontját és végrehajtóját is dokumentáld.'
            ])
        ]
    ),
    contractingParties: help(
        'Szerződők',
        'Ez az áttekintő oldal a szervezők és jogi entitások közötti kapcsolatot mutatja meg. Elsősorban ellenőrző és hibakereső nézet, nem részletes szerkesztőfelület.',
        [
            section('Mit látsz itt?', [
                'A felső kártyák megmutatják, hány kapcsolat, szervező, jogi entitás és hiányos kontakt áll rendelkezésre.',
                'A táblázat egy sorban mutatja a szervezőt, a hozzá tartozó szerződőt, a kapcsolattartót és az állapotcímkéket.',
                'Az „Alapértelmezett” címke azt jelzi, melyik kapcsolatot fogja a rendszer elsőként használni ott, ahol automatikus előtöltés történik.'
            ]),
            section('Mire figyelj ellenőrzéskor?', [
                'A hiányos kapcsolattartó adatokat kezeld prioritással, mert ezekből lesznek a későbbi szerződéses és kommunikációs elakadások.',
                'Ha egy kapcsolat inaktív, nézd meg, hogy szervezői oldalon vagy jogi entitás oldalon lett-e letiltva.',
                'Globális kereséskor használj szervezői nevet, e-mailt, adószámot vagy kapcsolattartói adatot attól függően, mi áll rendelkezésedre.'
            ]),
            section('Mikor kell továbblépni másik modulba?', [
                'Ha a kapcsolatot javítani kell, a tényleges szerkesztés jellemzően a felhasználó vagy a kapcsolódó adminisztrációs folyamat oldalán történik.',
                'Ha egy konferencián rossz szerződő töltődik elő, itt ellenőrizd először, hogy a szervezőhöz mely kapcsolat van alapértelmezettként beállítva.',
                'Frissítés után töltsd újra az oldalt vagy használd a Frissítés gombot, ha ellenőrizni akarod a javítás eredményét.'
            ])
        ]
    ),
    nfcTag: help(
        'NFC címkék',
        'Az NFC címkeoldal a fizikai címkekészlet nyilvántartására szolgál: itt látod, melyik címke aktív, melyik vendéghez tartozik, és mikor változott utoljára.',
        [
            section('Új címke rögzítése', [
                'Új címke létrehozásakor előbb válassz színt, majd érintsd a címkét az olvasóhoz, hogy az azonosító automatikusan bekerüljön.',
                'Az azonosító mező nem manuális gépelésre készült; a megbízható rögzítéshez mindig olvasd be a fizikai címkét.',
                'A címkét csak akkor engedélyezd, ha valóban használható állapotú és a rendszer helyesen beolvasta.'
            ]),
            section('Mit ellenőrizz a listában?', [
                'A vendég oszlop segít gyorsan látni, hogy egy címke szabad-e, vagy már valakihez hozzá van rendelve.',
                'A létrehozás és módosítás dátuma hasznos, ha egy hibás vagy elveszett címke előéletét keresed.',
                'Az engedélyezett/tiltott állapot legyen összhangban a valós készlettel; a tiltott címke ne maradjon véletlenül aktív használatban.'
            ]),
            section('Gyakori hibák', [
                'Ne törölj címkét csak azért, mert jelenleg nincs hozzárendelve; előbb döntsd el, hogy újrahasználható, tiltandó vagy hibás-e.',
                'Ha ugyanazt az azonosítót több helyen látod gyanúsan, ellenőrizd a vendégoldalon a hozzárendeléseket és a naplóban a művelettörténetet.',
                'A címke nyilvántartása és a vendéghez rendelés kapcsolódik egymáshoz, de nem ugyanaz a művelet: szükség esetén a vendégoldalon fejezd be a folyamatot.'
            ])
        ]
    ),
    profile: help(
        'Profil',
        'A profiloldal a saját adataid gyors ellenőrzésére és karbantartására szolgál. Itt nem rendszerjogosultságot kezelsz, hanem a saját felhasználói adataidat.',
        [
            section('Mit érdemes karbantartani?', [
                'Tartsd naprakészen az e-mail címet és a telefonszámot, mert ezekre támaszkodnak a belső egyeztetések és értesítések.',
                'Ha a név vagy az elérhetőség változott, mentsd el, majd ellenőrizd vissza a megjelenített értékeket.',
                'A profiloldal arra való, hogy a saját rekordod helyes legyen; más felhasználó módosítását a felhasználó oldalon végezd.'
            ]),
            section('Mire figyelj?', [
                'Ha mentés után nem látod a módosítást, ellenőrizd, hogy valóban sikeres visszajelzést kaptál-e.',
                'Ha jogosultsági vagy szerepkör-problémád van, azt nem itt kell javítani.',
                'A profil akkor jó, ha az operatív csapat gyorsan el tud érni szükség esetén.'
            ])
        ]
    ),
    documentation: help(
        'Dokumentáció',
        'A dokumentáció oldal a rendszer működésének, belső szabályainak és háttérfolyamatainak írásos összefoglalója. Akkor hasznos, ha a művelet mögötti logikát szeretnéd megérteni.',
        [
            section('Mikor nyisd meg?', [
                'Új modul első használata előtt, vagy ha egy mező üzleti jelentése nem egyértelmű.',
                'Ha eljárásrendet, háttérszabályt vagy működési összefüggést keresel, nem csak gombhasználatot.',
                'Ha egy kollégának szabályos folyamatot kell átadnod, innen érdemes kiindulni.'
            ]),
            section('Hogyan olvass hatékonyan?', [
                'Először keresd meg a kapcsolódó modult, és csak azután olvass részletes háttéranyagot.',
                'Hosszabb oldalon használd a böngésző keresőjét, hogy gyorsan megtaláld a kulcsszavakat.',
                'A dokumentációt mindig a tényleges admin képernyővel együtt értelmezd.'
            ]),
            section('Mire figyelj?', [
                'Ha a dokumentáció és a képernyő viselkedése eltér, azt jelöld hibaként, ne próbáld kitalálni a „helyes” működést.',
                'A dokumentáció magyaráz, de nem helyettesíti az auditálható adatforrást.',
                'Ha hiányzó részt találsz, érdemes külön feljegyezni a pótlásra.'
            ])
        ]
    ),
    pagesFaq: help(
        'GYIK',
        'A GYIK oldal a visszatérő kérdések gyors megválaszolására való. Első elakadásnál érdemes itt kezdeni, mert sok hiba valójában ismétlődő felhasználói helyzet.',
        [
            section('Mire használd?', [
                'Gyors válasz keresésére, amikor nem teljes folyamatleírásra, csak egy konkrét kérdésre van szükséged.',
                'Új kolléga betanításakor kiinduló listaként, hogy milyen tipikus kérdések merülnek fel.',
                'Első szintű hibaelhárításra, mielőtt adminisztrátori segítséget kérsz.'
            ]),
            section('Jó gyakorlat', [
                'Először a kulcsszóra vagy a legközelebbi folyamatra keress rá.',
                'Ha megtaláltad a kapcsolódó választ, ellenőrizd a tényleges képernyőn is, hogy a lépés megfelel-e a jelenlegi állapotnak.',
                'Ha egy kérdés gyakran visszatér, érdemes a GYIK bővítését javasolni.'
            ]),
            section('Mire figyelj?', [
                'A GYIK rövid válaszokra való; összetett folyamatnál a dokumentáció pontosabb forrás lehet.',
                'Ha a válasz régi UI-ra utal, azt jelöld hibaként.',
                'Ne kezeld hivatalos üzleti szabályként azt, ami csak gyors tippként szerepel.'
            ])
        ]
    ),
    pagesHelp: help(
        'Segédanyagok',
        'Ez az oldal általános használati útmutatók és rövidebb belső segédanyagok gyűjtőhelye. Akkor hasznos, ha nem egy konkrét rekordot kezelsz, hanem egy teljes folyamatot szeretnél végigérteni.',
        [
            section('Mikor használd?', [
                'Ha egy teljes feladatmenetet kell először megismerned, például vendégkezelés, foglalási javítás vagy ellenőrzési sorrend.',
                'Ha egy modul használata mögötti napi rutinra vagy szerepkör szerinti teendőkre vagy kíváncsi.',
                'Ha az oldalsúgó rövid pontjai után részletesebb leírásra van szükséged.'
            ]),
            section('Hogyan dolgozz vele?', [
                'Olvasás közben nyisd meg a kapcsolódó admin oldalt is, hogy azonnal tudd követni a lépéseket.',
                'Ha egy folyamat több modult érint, jegyezd fel a sorrendet, és ne csak egyetlen képernyő alapján döntsd el a következő lépést.',
                'A leírásokat mindig a saját jogosultsági szinteddel értelmezd.'
            ]),
            section('Mire figyelj?', [
                'A segédanyag célja a magabiztos használat, nem az, hogy helyettesítse a napi kontrollt vagy az auditot.',
                'Ha a valós folyamat eltér attól, amit itt olvasol, azt érdemes javításra jelezni.',
                'Bonyolult vagy ritka eseteknél a napló és a dokumentáció együtt ad teljes képet.'
            ])
        ]
    ),
    pagesInvoice: help(
        'Számlázás / Invoice',
        'Ez az oldal a számlázáshoz kapcsolódó nézetekhez és háttérinformációkhoz tartozik. Pénzügyi adat esetén mindig különösen fontos a pontosság és a visszaellenőrzés.',
        [
            section('Mire figyelj elsőként?', [
                'Minden partner-, dátum- és összegadatot kétszer ellenőrizz, mielőtt végleges műveletet indítasz.',
                'Ha a számla vagy elszámolás konferenciához kötődik, ellenőrizd a kapcsolódó szerződőt és a határidőket is.',
                'Pénzügyi nézetben a legkisebb elírás is további adminisztratív hibát okozhat.'
            ]),
            section('Biztonságos ellenőrzés', [
                'Mindig nézd meg, hogy a partner valóban a megfelelő jogi entitás-e.',
                'A dátummezőknél figyelj arra, hogy a rendszer milyen formátumban és mely időszakra értelmezi az adatot.',
                'Ha eltérést látsz, keresd meg a forrásmodult, és ne csak ezen a nézeten próbáld javítani.'
            ])
        ]
    ),
    pagesEmpty: help(
        'Üres mintaoldal',
        'Ez a nézet jellemzően fejlesztési vagy bővítési célra fenntartott mintaoldal. Operatív adatrögzítésre általában nem használatos.',
        [
            section('Mire jó?', [
                'Új oldal- vagy komponensötletek kipróbálására.',
                'Fejlesztési vagy tesztelési demonstrációra.',
                'Olyan helyzetekre, amikor a tényleges funkció még nincs bekötve.'
            ]),
            section('Mit ne várj tőle?', [
                'Nem végleges üzleti folyamatot vagy éles működést.',
                'Nem teljeskörű adatkezelést vagy auditnyomot.',
                'Nem minden itt látott elem feltétlenül része a végleges rendszernek.'
            ])
        ]
    ),
    authLogin: help(
        'Bejelentkezés',
        'A bejelentkezési oldal a rendszerbe való biztonságos belépéshez tartozik. Ha itt elakadsz, először az azonosítók és a hozzáférési jogosultság ellenőrzése a fontos.',
        [
            section('Sikeres belépéshez', [
                'Használd a regisztrált e-mail címet és a hozzá tartozó jelszót.',
                'Sikertelen belépésnél először ellenőrizd, hogy nincs-e félregépelt karakter vagy rossz billentyűzetkiosztás.',
                'Ha többször hibázol, inkább indíts jelszó-visszaállítást, mintsem találgass.'
            ]),
            section('Mire figyelj?', [
                'Ha a rendszer a munkamenet lejártára hivatkozik, egyszerűen jelentkezz be újra.',
                'Ha jogosultságod van, de mégsem jutsz be, lehet, hogy nem hitelesítési, hanem szerepkör-probléma áll a háttérben.',
                'Közös eszközön mindig ügyelj a kijelentkezésre a munka végén.'
            ])
        ]
    ),
    authForgotPassword: help(
        'Elfelejtett jelszó',
        'Ez a folyamat akkor segít, ha hozzáférésed van a regisztrált e-mail címedhez, de a jelszavadat elfelejtetted vagy már nem használható.',
        [
            section('Lépések', [
                'Add meg pontosan azt az e-mail címet, amellyel a rendszerben szerepelsz.',
                'A kapott levélben érkező hivatkozást mielőbb nyisd meg, mert időkorlátos lehet.',
                'Ha nem érkezik levél, ellenőrizd a spam mappát is.'
            ]),
            section('Mire figyelj?', [
                'Ha az e-mail cím hibás vagy már nem aktív, a jelszó-visszaállítás nem fog működni.',
                'Többszöri kérés esetén mindig a legfrissebb levél hivatkozását használd.',
                'Ha a folyamat elakad, ne hozz létre új fiókot a régi helyett anélkül, hogy egyeztetnél.'
            ])
        ]
    ),
    authRegister: help(
        'Regisztráció',
        'A regisztráció új hozzáférés létrehozására szolgál. Ezt csak akkor használd, ha valóban új felhasználóra van szükség, és nem egy meglévő rekordhoz kell hozzáférést rendezni.',
        [
            section('Kitöltéskor', [
                'Minden kötelező mezőt pontosan tölts ki, különösen az e-mail címet és a névmezőket.',
                'Csak olyan adatot adj meg, amelyre a későbbi azonosítás és kapcsolattartás is épülhet.',
                'A regisztráció után ellenőrizd a visszaigazoló üzeneteket és az esetleges e-mailes megerősítést.'
            ]),
            section('Mire figyelj?', [
                'Ne hozz létre új regisztrációt meglévő hozzáférés helyett, ha a probléma csak jelszó- vagy jogosultsági jellegű.',
                'Az admin felhasználók és a napi operatív felhasználók létrehozásának folyamata eltérhet egymástól.',
                'Kétség esetén inkább egyeztess, mielőtt duplikált felhasználó jönne létre.'
            ])
        ]
    ),
    authNewPassword: help(
        'Új jelszó',
        'Az új jelszó megadása akkor sikeres, ha a választott jelszó erős, egyedi és a felhasználó később is meg tudja jegyezni vagy biztonságosan tárolni tudja.',
        [
            section('Jó jelszó kiválasztása', [
                'Használj hosszú, egyedi jelszót, amit nem alkalmazol más rendszerben.',
                'Kerüld a könnyen kitalálható személyes adatokat vagy ismert mintákat.',
                'Ha a szervezet használ jelszókezelőt, ott tárold a friss jelszót.'
            ]),
            section('Mire figyelj?', [
                'Ha a link lejárt, kérj új jelszó-visszaállító levelet.',
                'Sikeres mentés után próbálj bejelentkezni az új jelszóval, hogy biztosan aktiválódott a módosítás.',
                'Közös gépen ne hagyd nyitva a munkamenetet a jelszócsere után.'
            ])
        ]
    ),
    authVerification: help(
        'Verifikáció',
        'Ez az oldal a fiók megerősítésére szolgál. A célja, hogy biztos legyen: a megadott elérhetőség valóban a felhasználóhoz tartozik.',
        [
            section('Teendő', [
                'Nyisd meg a megerősítő linket abból az e-mailből, amelyet a rendszer küldött.',
                'Ha több megerősítő levelet kaptál, a legfrissebbet használd.',
                'Sikeres verifikáció után érdemes rögtön kipróbálni a belépést.'
            ]),
            section('Mire figyelj?', [
                'A lejárt vagy többször felhasznált link általában már nem működik.',
                'Ha a verifikáció után sincs hozzáférésed, valószínűleg nem e-mail-, hanem jogosultsági probléma van.',
                'A verifikáció nem helyettesíti a megfelelő szerepkör hozzárendelését.'
            ])
        ]
    ),
    authLockscreen: help(
        'Zárolt képernyő',
        'A zárolt képernyő arra szolgál, hogy rövid távollét után folytathasd a munkát anélkül, hogy minden adatot újra fel kellene építeni a rendszerben.',
        [
            section('Feloldás', [
                'A munkamenet folytatásához add meg a szükséges hitelesítési adatot vagy lépj vissza a normál belépési folyamatra.',
                'Ha nem vagy biztos benne, hogy a zárolás előtt minden mentve lett, feloldás után ellenőrizd a kritikus rekordokat.',
                'Közös munkaállomáson ez a képernyő plusz biztonsági rétegként működik.'
            ]),
            section('Mire figyelj?', [
                'Ha a feloldás nem sikerül, ne próbálkozz végtelenül; lehet, hogy a munkamenet közben lejárt.',
                'Sikertelen feloldás után az újrabelépés a biztos út.',
                'A zárolt állapot nem garantálja, hogy a háttérben minden adat érintetlen maradt.'
            ])
        ]
    ),
    authAccess: help(
        'Hozzáférés megtagadva',
        'Ez a képernyő azt jelzi, hogy a felhasználó be van jelentkezve, de az adott oldalhoz nincs megfelelő jogosultsága.',
        [
            section('Mit ellenőrizz először?', [
                'Győződj meg róla, hogy valóban a megfelelő felhasználóval vagy bejelentkezve.',
                'Nézd meg, hogy az oldal admin-, szervezői vagy más speciális szerepkört igényel-e.',
                'Ha új jogosultságot kaptál, próbálj meg kijelentkezni és újra belépni.'
            ]),
            section('Mikor kell továbblépni?', [
                'Ha biztosan kellene hozzáférésednek lennie, jelezd az adminisztrátornak a pontos oldalt és a műveletet.',
                'Ne kérj általános admin jogot csak azért, hogy egyetlen képernyőhöz hozzáférj.',
                'A jogosultsági hiba nem rendszerhiba, amíg nincs ellenőrizve a szerepkör.'
            ])
        ]
    ),
    authError: help(
        'Hitelesítési hiba',
        'Ez a képernyő a bejelentkezési vagy azonosítási folyamat közben fellépő technikai hibák jelzésére szolgál.',
        [
            section('Első lépések', [
                'Próbáld meg újra a műveletet néhány perc múlva, különösen akkor, ha rövid hálózati vagy szolgáltatási hiba lehet a háttérben.',
                'Ellenőrizd, hogy stabil internetkapcsolat áll-e rendelkezésre.',
                'Ha a hiba ismétlődik, jegyezd fel, milyen művelet közben jelent meg.'
            ]),
            section('Mire figyelj?', [
                'Ha a hiba minden belépésnél azonnal jelentkezik, érdemes support felé továbbítani.',
                'Technikai hibánál a felhasználói adatok helyes megadása önmagában nem feltétlenül elég a folytatáshoz.',
                'A hibajelenséget mindig a pontos időponttal és oldallal együtt érdemes jelenteni.'
            ])
        ]
    ),
    conferenceForm: help(
        'Konferencia űrlap',
        'Ez a publikus jelentkezési űrlap a vendégek pontos regisztrációjára szolgál. A kitöltés minősége közvetlenül hat a szobabeosztásra, az étkeztetésre és a kötelező adatszolgáltatásra.',
        [
            section('Kitöltési sorrend', [
                'Először a személyes és kötelező adatokat töltsd ki, utána haladj a szállás-, étkezési és egyéb kiegészítő mezők felé.',
                'Figyeld a dátumokat és a határidőket a fejlécben, mert a szervezői és vendégoldali időablak eltérhet.',
                'A mezők melletti információs ikonok vagy segítő szövegek azért vannak, hogy pontosan ugyanazt add meg, amire a szervező számít.'
            ]),
            section('Mire figyelj különösen?', [
                'Az érkezési és távozási dátum, valamint az első és utolsó étkezés együtt értelmezendő; ezekből számol a rendszer több háttérfolyamatot.',
                'Ha kérdés vagy extra mező látszik, azt a konferencia szervezője állította be, ezért ne hagyd figyelmen kívül, ha rád vonatkozik.',
                'Dokumentumfeltöltésnél ellenőrizd, hogy a megfelelő oldal és olvasható kép került-e be.'
            ]),
            section('Hibajelzés esetén', [
                'A piros jelzések általában kötelező vagy hibás formátumú mezőre utalnak; ezek javítása nélkül a mentés nem lesz sikeres.',
                'Ha nem vagy biztos egy mező jelentésében, inkább a szervezőt kérdezd, mert az űrlap egyes mezői konferenciánként eltérhetnek.',
                'Beküldés után mindig várd meg a sikeres visszajelzést.'
            ])
        ]
    ),
    foodCounter: help(
        'Ételszámláló',
        'Ez az oldal valós idejű ételkiadási pultként működik. A célja, hogy az NFC címke beolvasása után azonnal látszódjon, hogy a vendég jogosult-e az aktuális étkezésre.',
        [
            section('Műszak közben így használd', [
                'A fejlécben mindig nézd meg, hogy melyik étkezés van nyitva, mert a rendszer az aktuális meal ciklusra számol.',
                'A zöld vagy piros Wi-Fi jelzi, hogy él-e a kapcsolat; piros kapcsolatnál ne tekintsd véglegesnek a megjelenített állapotot.',
                'A vendégadat, étrend, korosztály és konferencia együtt adja meg a kiadás operatív döntési alapját.'
            ]),
            section('Mit jelentenek az állapotok?', [
                'Az „Étel kiadva” azt jelenti, hogy a vendég az aktuális étkezésre jogosult és még nem vette át azt.',
                'A „Nincs előfizetve” arra utal, hogy az adott vendégnek az adott időpontra nincs megfelelő étkezési jogosultsága.',
                'A „Már átvett étel” jelzés megakadályozza a duplikált kiadást ugyanabban az étkezési ciklusban.'
            ]),
            section('Mire figyelj?', [
                'Beolvasásnál várd meg, amíg a rendszer feldolgozza a kódot; ugyanazon címke gyors ismétlése félreérthető helyzetet okozhat.',
                'Ha a kijelzett adat nem egyezik a valósággal, ellenőrizd a vendég étrendjét, dátumát és a foglalás időszakát a háttérmodulokban.',
                'Kapcsolati hiba vagy bizonytalan állapot esetén inkább ellenőrizd vissza a vendéget, mintsem hibás ételkiadást engedj át.'
            ])
        ]
    ),
    kitchenCalendar: help(
        'Konyhai naptár',
        'A konyhai naptár heti bontásban mutatja, hogy az egyes étrendekből hány gyermek- és felnőtt adag várható reggelire, ebédre és vacsorára.',
        [
            section('Hogyan olvasd a táblát?', [
                'Először válassz egy dátumot; a rendszer annak a hétnek a bontását mutatja meg.',
                'A „Összesen” sor adja a napi teljes mennyiséget, alatta étrendenként látszik a bontás.',
                'Minden nap három étkezésre van bontva, és külön oszlopot kap a gyermek és a felnőtt adag.'
            ]),
            section('Mit jelentenek a színek?', [
                'A mai nap kék kiemelést kap, így gyorsan látszik az aktuális napi teendő.',
                'A sárga cella módosulást vagy eltérést jelez, ezért ezeket érdemes külön átnézni.',
                'A kiemelt összesítő és étrendsor együtt mutatja meg, honnan ered a napi változás.'
            ]),
            section('Operatív használat', [
                'Műszakkezdéskor ellenőrizd az aktuális nap összesítő sorát, utána nézd meg a speciális étrendek sorait.',
                'Ha szokatlan ugrást látsz, ellenőrizd, történt-e vendégmódosítás, étrendváltozás vagy új regisztráció.',
                'A naptár tervezésre való; az egyedi vendégszintű eltérést a vendég- vagy foglalásoldalon tudod visszakeresni.'
            ])
        ]
    ),
    landing: help(
        'Kezdő oldal',
        'A kezdő oldal tájékozódási pont: innen indulva tudod eldönteni, melyik modulban kell folytatnod a munkát vagy a regisztrációt.',
        [
            section('Mire jó?', [
                'Áttekintést ad a rendszer céljáról és a fő belépési pontokról.',
                'Új felhasználónak segít megérteni, mely modul milyen feladathoz tartozik.',
                'Belépés előtt vagy után gyors navigációs kiindulópontként használható.'
            ]),
            section('Mit érdemes tudni?', [
                'Az operatív napi munkát általában nem itt végzed, hanem a bal oldali menü megfelelő moduljában.',
                'Ha első alkalommal használod a rendszert, érdemes a vezérlőpulttal kezdeni.',
                'A kezdő oldal inkább orientációt ad, mintsem részletes munkafolyamatot.'
            ])
        ]
    ),
    notFound: help(
        'Az oldal nem található',
        'Ez a képernyő azt jelenti, hogy a megnyitott útvonal nem létezik, át lett nevezve, vagy nincs hozzá érvényes elérés.',
        [
            section('Mit tegyél ilyenkor?', [
                'Ellenőrizd az URL-t, különösen akkor, ha kézzel másoltad vagy könyvjelzőből nyitottad meg.',
                'Próbálj visszanavigálni a menüből egy ismert, működő modulra.',
                'Ha linkről jutottál ide, jegyezd fel, melyik oldalról érkeztél.'
            ]),
            section('Mikor jelezd hibának?', [
                'Ha a menüből vagy egy működőnek hitt gombból jutottál ide.',
                'Ha korábban működő útvonal hirtelen megszűnt.',
                'Ha ugyanaz a hiba több felhasználónál is jelentkezik.'
            ])
        ]
    ),
    localizedDatePicker: help(
        'Dátumválasztó debug',
        'Ez fejlesztői ellenőrzőoldal a lokalizált dátummezők viselkedésének tesztelésére. Operatív használatra nem szolgál.',
        [
            section('Mire használd?', [
                'Nyelvi, formátum- és navigációs hibák reprodukálására.',
                'Minimum/maximum dátum és alapértelmezett érték ellenőrzésére.',
                'Billentyűzetes és egérrel történő bevitel összevetésére.'
            ]),
            section('Mire figyelj?', [
                'A debug oldalon látott viselkedést mindig hasonlítsd össze legalább egy éles űrlapmezővel is.',
                'Ha nyelvváltás után marad hibás formátum, azt külön jelöld.',
                'A debug nézet technikai vizsgálatra való, nem végfelhasználói útmutató.'
            ])
        ]
    )
};
