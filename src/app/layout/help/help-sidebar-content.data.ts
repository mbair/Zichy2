export interface HelpSidebarSection {
    title: string;
    items: string[];
}

export interface HelpSidebarContent {
    title: string;
    description: string;
    sections: HelpSidebarSection[];
}

export const HELP_SIDEBAR_CONTENT = {
    default: {
        title: 'Oldalsúgó',
        description: 'Ezen a panelen az aktuális oldalhoz kapcsolódó gyors segítséget találsz.',
        sections: [
            {
                title: 'Általános tanácsok',
                items: [
                    'Használd a táblázatok szűrőit a gyorsabb munkához.',
                    'Mentés után mindig ellenőrizd a sikeres visszajelzést.',
                    'Ha bizonytalan vagy, először a keresés/szűrés funkcióval tájékozódj.'
                ]
            }
        ]
    } satisfies HelpSidebarContent,
    dashboard: {
        title: 'Vezérlőpult súgó',
        description: 'A vezérlőpult a napi működés gyors áttekintését adja.',
        sections: [
            { title: 'Mire használd?', items: ['Ellenőrizd az aktuális fő számokat és trendeket.', 'Innen indulva gyorsan nyisd meg a kapcsolódó modulokat.'] },
            { title: 'Jó gyakorlat', items: ['Napi indításkor nézd át az eltéréseket.', 'Ha szokatlan értéket látsz, menj tovább a részletes oldalra.'] }
        ]
    } satisfies HelpSidebarContent,
    dashboardBanking: {
        title: 'Banking dashboard súgó',
        description: 'Pénzügyi jellegű KPI-k és trendek áttekintése.',
        sections: [
            { title: 'Elemzés', items: ['Nézd az idősoros változásokat, ne csak az aktuális értéket.', 'Szűréskor hasonlítsd össze azonos időablakokat.'] }
        ]
    } satisfies HelpSidebarContent,
    user: {
        title: 'Felhasználó oldal súgó',
        description: 'Itt kezelheted a rendszerfelhasználókat és jogosultságaikat.',
        sections: [
            { title: 'Alap műveletek', items: ['Új felhasználót a "Új" gombbal tudsz felvenni.', 'Szerkesztéshez használd a sor végén lévő ceruza ikont.'] },
            { title: 'Szűrés és keresés', items: ['A táblázat fejlécében oszloponként is tudsz keresni.', 'A listát érdemes név és e-mail szerint szűrni tömeges szerkesztés előtt.'] }
        ]
    } satisfies HelpSidebarContent,
    guest: {
        title: 'Vendég oldal súgó',
        description: 'Vendégadatok, státuszok és NFC hozzárendelések kezelése egy helyen.',
        sections: [
            { title: 'Adatrögzítés', items: ['A vendégprofilon tölts ki minél több kötelező adatot a hibák elkerüléséhez.', 'A mentés előtt ellenőrizd az érkezési/távozási dátumokat.'] },
            { title: 'NFC és jogosultság', items: ['NFC címke rendelésekor ellenőrizd, hogy nincs-e már aktív címke a vendégnél.', 'A vendég státuszát mindig frissítsd check-in/check-out után.'] }
        ]
    } satisfies HelpSidebarContent,
    reservation: {
        title: 'Foglalás oldal súgó',
        description: 'Foglalások létrehozása, módosítása és kapacitás ellenőrzése.',
        sections: [
            { title: 'Foglalás létrehozás', items: ['Először válassz szerződőt, utána add meg az időszakot és létszámot.', 'Ütközés esetén ellenőrizd a szoba kapacitás és elérhetőség mezőket.'] },
            { title: 'Részletek kezelése', items: ['A foglalás kártyán belül tudsz vendégeket gyorsan hozzáadni.', 'Minden módosítás után ments, mielőtt másik rekordra lépsz.'] }
        ]
    } satisfies HelpSidebarContent,
    conference: {
        title: 'Konferencia oldal súgó',
        description: 'Konferenciák adminisztrációja, kérdéssorok és kapcsolódó adatok kezelése.',
        sections: [
            { title: 'Űrlap kitöltés', items: ['A konferencia alapadatok után állítsd be a helyszínt és dátumokat.', 'A segéd oldalsávokból gyorsan ellenőrizheted a mezők jelentését.'] },
            { title: 'Haladó tippek', items: ['Kérdések hozzáadásakor használd a standard sablonokat a konzisztenciához.', 'Mentés után ellenőrizd a listanézetben is, hogy minden adat helyesen jelent meg.'] }
        ]
    } satisfies HelpSidebarContent,
    room: {
        title: 'Szoba oldal súgó',
        description: 'Szobák és szobajellemzők karbantartása.',
        sections: [
            { title: 'Karbantartás', items: ['A szoba típusát és ágybeosztását mindig együtt frissítsd.', 'Inaktív szobát csak akkor állíts be, ha nincs hozzá aktív foglalás.'] },
            { title: 'Minőségbiztosítás', items: ['Mentés előtt nézd át az emelet, épület és férőhely adatait.', 'Az egységes elnevezés segít a gyors keresésben.'] }
        ]
    } satisfies HelpSidebarContent,
    diet: {
        title: 'Étrend oldal súgó',
        description: 'Étrendek és étkezési beállítások kezelése vendégekhez.',
        sections: [
            { title: 'Étrend beállítás', items: ['Minden étrendnél add meg az egyértelmű, rövid nevet.', 'Allergén információkat mindig tüntesd fel a leírásban.'] },
            { title: 'Használat', items: ['Vendégekhez rendelés előtt ellenőrizd, hogy aktív-e az étrend.', 'Duplikáció elkerülésére szűrj név szerint új létrehozás előtt.'] }
        ]
    } satisfies HelpSidebarContent,
    logs: {
        title: 'Napló oldal súgó',
        description: 'Rendszeresemények és audit műveletek áttekintése.',
        sections: [
            { title: 'Keresés', items: ['Szűrj dátumra és eseménytípusra a gyors hibakereséshez.', 'Felhasználó szerinti szűrés segít auditáláskor.'] },
            { title: 'Elemzés', items: ['Gyanús minták esetén ellenőrizd a műveletek időbeli sorrendjét.', 'Nagy mennyiségű naplónál fokozatosan szűkítsd a szűrőket.'] }
        ]
    } satisfies HelpSidebarContent,
    contractingParties: {
        title: 'Szerződők oldal súgó',
        description: 'Szerződő partnerek adatainak létrehozása és kezelése.',
        sections: [
            { title: 'Partneradatok', items: ['Rögzíts pontos kapcsolattartói adatokat és elérhetőségeket.', 'A szerződés azonosítót egységes formátumban használd.'] },
            { title: 'Üzleti folyamat', items: ['Státuszváltás előtt ellenőrizd a kapcsolódó foglalásokat.', 'Inaktiválás előtt jelezd a változást az érintett csapatoknak.'] }
        ]
    } satisfies HelpSidebarContent,
    nfcTag: {
        title: 'NFC címke oldal súgó',
        description: 'NFC címkék kezelése és nyilvántartása.',
        sections: [
            { title: 'Kiosztás', items: ['Kiosztás előtt ellenőrizd a címke állapotát (szabad/használt).', 'Visszavételkor állítsd vissza a címkét szabadra.'] },
            { title: 'Hibaelhárítás', items: ['Olvasási hiba esetén ellenőrizd a címke azonosítót és az eszközt.', 'Dupla hozzárendelés esetén a régi kapcsolatot előbb bontsd.'] }
        ]
    } satisfies HelpSidebarContent,
    profile: {
        title: 'Profil oldal súgó',
        description: 'Saját profil adatai és beállításai.',
        sections: [
            { title: 'Profilkezelés', items: ['Tartsd naprakészen az elérhetőségi adatokat.', 'Módosítás után ments és ellenőrizd vissza az értékeket.'] }
        ]
    } satisfies HelpSidebarContent,
    documentation: {
        title: 'Dokumentáció oldal súgó',
        description: 'A rendszer működését és felépítését leíró tudásbázis.',
        sections: [
            { title: 'Használat', items: ['Új funkció előtt nézd át a kapcsolódó leírást.', 'Kereséshez használd a böngésző oldalon belüli keresőjét (Ctrl+F).'] }
        ]
    } satisfies HelpSidebarContent,
    pagesFaq: {
        title: 'FAQ oldal súgó',
        description: 'Gyakran ismételt kérdések és gyors válaszok.',
        sections: [
            { title: 'Tippek', items: ['Először itt keresd a visszatérő problémák megoldását.', 'Ha új kérdés merül fel, javasold FAQ bővítését.'] }
        ]
    } satisfies HelpSidebarContent,
    pagesHelp: {
        title: 'Help oldal súgó',
        description: 'Általános használati útmutatók és segédanyagok.',
        sections: [
            { title: 'Mikor használd?', items: ['Ha folyamatlépésben elakadsz, itt találsz részletes leírást.', 'Az útmutatók alapján ellenőrizd a jogosultságokat is.'] }
        ]
    } satisfies HelpSidebarContent,
    pagesInvoice: {
        title: 'Invoice oldal súgó',
        description: 'Számlázási nézet és kapcsolódó adatok kezelése.',
        sections: [
            { title: 'Pontosság', items: ['Rögzítés előtt ellenőrizd a partner és összeg adatokat.', 'Minden mentett rekordnál validáld a dátumot és státuszt.'] }
        ]
    } satisfies HelpSidebarContent,
    pagesEmpty: {
        title: 'Empty oldal súgó',
        description: 'Üres mintanézet fejlesztéshez vagy tartalmi bővítéshez.',
        sections: [
            { title: 'Használat', items: ['Új oldal prototípus készítésére használható.', 'Tartalom feltöltés előtt egyeztesd az elvárt mezőket.'] }
        ]
    } satisfies HelpSidebarContent,
    authLogin: {
        title: 'Bejelentkezés súgó',
        description: 'Belépés a rendszerbe.',
        sections: [
            { title: 'Belépési tippek', items: ['Ellenőrizd a felhasználónevet és jelszót.', 'Sikertelen belépésnél használd az elfelejtett jelszó funkciót.'] }
        ]
    } satisfies HelpSidebarContent,
    authForgotPassword: {
        title: 'Elfelejtett jelszó súgó',
        description: 'Jelszó-visszaállítási folyamat támogatása.',
        sections: [
            { title: 'Lépések', items: ['Add meg a regisztrált e-mail címedet.', 'A kapott linket rövid időn belül használd fel.'] }
        ]
    } satisfies HelpSidebarContent,
    authRegister: {
        title: 'Regisztráció súgó',
        description: 'Új fiók létrehozásának támogatása.',
        sections: [
            { title: 'Kitöltés', items: ['Minden kötelező mezőt tölts ki.', 'A regisztráció után ellenőrizd az e-mail visszaigazolást.'] }
        ]
    } satisfies HelpSidebarContent,
    authNewPassword: {
        title: 'Új jelszó megadása',
        description: 'Biztonságos jelszó beállítása.',
        sections: [
            { title: 'Biztonság', items: ['Legalább 12 karakteres, erős jelszót válassz.', 'Ne használd újra korábbi jelszavadat.'] }
        ]
    } satisfies HelpSidebarContent,
    authVerification: {
        title: 'Verifikáció súgó',
        description: 'Fiók megerősítés és aktiválás.',
        sections: [
            { title: 'Teendő', items: ['Nyisd meg az e-mailben kapott megerősítő linket.', 'Lejárt link esetén kérj újat.'] }
        ]
    } satisfies HelpSidebarContent,
    authLockscreen: {
        title: 'Zárolt képernyő súgó',
        description: 'Munkamenet folytatása zárolás után.',
        sections: [
            { title: 'Feloldás', items: ['Add meg a jelszavad a folytatáshoz.', 'Sikertelenség esetén jelentkezz be újra.'] }
        ]
    } satisfies HelpSidebarContent,
    authAccess: {
        title: 'Hozzáférés megtagadva',
        description: 'Nincs jogosultság az oldal megtekintéséhez.',
        sections: [
            { title: 'Teendő', items: ['Ellenőrizd a jogosultsági szintedet.', 'Szükség esetén kérj hozzáférést adminisztrátortól.'] }
        ]
    } satisfies HelpSidebarContent,
    authError: {
        title: 'Hitelesítési hiba súgó',
        description: 'Hiba történt a bejelentkezési folyamatban.',
        sections: [
            { title: 'Hibaelhárítás', items: ['Próbálj újra bejelentkezni néhány perc múlva.', 'Tartós hiba esetén jelezd a supportnak.'] }
        ]
    } satisfies HelpSidebarContent,
    conferenceForm: {
        title: 'Konferencia űrlap súgó',
        description: 'Publikus jelentkezési űrlap kitöltés támogatása.',
        sections: [
            { title: 'Kitöltési tanács', items: ['A kötelező mezőket pontosan töltsd ki, különösen a dátumokat.', 'Hibajelzés esetén ellenőrizd a formátumot és próbáld újra.'] }
        ]
    } satisfies HelpSidebarContent,
    foodCounter: {
        title: 'Ételszámláló súgó',
        description: 'Valós idejű étkezési létszám és számláló adatok kezelése.',
        sections: [
            { title: 'Használat', items: ['A számláló állapotát rendszeresen ellenőrizd műszak közben.', 'Eltérés esetén frissítsd az adatkapcsolatot.'] },
            { title: 'Pontosság', items: ['Műszakzáráskor egyeztesd az adatokat a napi jelentéssel.', 'Jelentős kilengéseket azonnal vizsgálj ki.'] }
        ]
    } satisfies HelpSidebarContent,
    kitchenCalendar: {
        title: 'Konyhai naptár súgó',
        description: 'Napi étkezési és konyhai ütemezések áttekintése.',
        sections: [
            { title: 'Tervezés', items: ['Használj dátumszűrést a napi és heti tervezéshez.', 'Ütközés esetén priorizáld a fix eseményeket.'] },
            { title: 'Operatív tanács', items: ['A mennyiségek finomhangolásához hasonlítsd az előző napok adatait.', 'Külön jelöld az allergén-érzékeny igényeket.'] }
        ]
    } satisfies HelpSidebarContent,
    landing: {
        title: 'Kezdő oldal súgó',
        description: 'Rövid bemutató és navigáció a fő funkciókhoz.',
        sections: [
            { title: 'Navigáció', items: ['Innen gyorsan elérheted a fő modulokat.', 'Belépés után a bal oldali menüből válaszd ki a feladatodhoz tartozó oldalt.'] },
            { title: 'Első lépések', items: ['Admin feladatokhoz nyisd meg a felhasználó és szerepkör oldalakat.', 'Operatív munkához használd a foglalás, vendég és szoba modulokat.'] }
        ]
    } satisfies HelpSidebarContent,
    notFound: {
        title: 'Nem található oldal',
        description: 'Az adott útvonal nem érhető el.',
        sections: [
            { title: 'Teendő', items: ['Ellenőrizd az URL-t vagy navigálj vissza a menüből.', 'Ha létező oldalra mutatott a link, jelezd az adminnak.'] }
        ]
    } satisfies HelpSidebarContent,
    localizedDatePicker: {
        title: 'Dátumválasztó debug súgó',
        description: 'Fejlesztői tesztoldal lokalizált dátummezők ellenőrzéséhez.',
        sections: [
            { title: 'Tesztelés', items: ['Validáld a dátumformátumot nyelvváltás után is.', 'Ellenőrizd a minimum/maximum dátum korlátozásokat.'] }
        ]
    } satisfies HelpSidebarContent
} as const;
