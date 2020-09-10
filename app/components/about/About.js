import React from 'react';
import {View, Text, BackHandler, Dimensions, ScrollView} from "react-native";

import { useFocusEffect } from '@react-navigation/native';

import AboutStyles from "../../styles/AboutStyles";

const { width } = Dimensions.get("window"); 

const style = AboutStyles(width);


function About(props) {

    useFocusEffect( 
        () => {
          BackHandler.addEventListener('hardwareBackPress', () => { navigation.goBack(); return true});
          return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => true);
          }
        },[]
    );
    
    return (
        <View>
            <ScrollView>
                <Text style={style.largeText}>O aplikaciji</Text>
                <Text style={style.text}>Jednostavna podesiva aplikacija namijenjena za automatsko slanje termina preko sms-a klijentima čitajući termine sa kalendara</Text>
                <Text style={style.text}>Aplikacija ima mogučnost slanja obavijesti klijentima</Text>
                <Text style={style.text}>Aplikacija radi iz pozadine</Text>

                <Text style={style.largeText}>Osnovne potrebe</Text>
                <Text style={style.text}>Uređaj mora biti spojen na internet cijelo vrijeme da bi aplikacija funkcinirala kako spada (zbog osvježavanja kalendara)</Text>
                <Text style={style.text}>Ako se koriste aplikacije za ubrzavanje uređaja treba pripaziti da aplikaciju negase (treba aplikaciju staviti na white list)</Text>
                <Text style={style.text}>Aplikaciji za rad treba dopustiti pristum sms-u i kalendaru, aplikacija će pitati za dopuštenje prilikom pokretanja aplikacije</Text>

                <Text style={style.largeText}>Kalendar</Text>
                <Text style={style.text}>Ako želimo da aplikacija na željeni termin šalje SMS moramo u njegov opis(description) staviti broj telefona</Text>
                <Text style={style.text}>Aplikacija pregledava sve kalendare unutar kalendara za brojeve telefona</Text>
                <Text style={style.text}>Broj telefona mora biti barem sedam znamenki i znamenke moraju biti zajedno, primjer: 0923374316</Text>
                <Text style={style.text}>Svaki termin u kojem nema broja telefona aplikacija će ignorirati</Text>
                <Text style={style.text}>U jedan termin možemo pisati slobodno dodatni tekst u opisu on neće smetati aplikaciji</Text>
                <Text style={style.text}>U jednome termini možemo imati više brojeva telefona, ali oni moraju biti razmaknuti, primjer: 0923374316 0921234567 </Text>
                <Text style={style.text}>Upozorenje: ako unutar poruke jednog termina imamo više brojeva, a automatsko slanje je već poslalo poruke na njih, brojevi unutar njih se 
                nebih trebali dirati jer bi moglo doći do toga da će na jedan broj doći opet ista poruka</Text>
                <Text style={style.text}>Isto tako ako smo već sa automatskim slanjem poslali poruku na broj u terminu nebih trebali u njegov opis trebali dodati novi broj, 
                ako je već potrebno slati u isto vrijeme novu poruku možemo dodati novi termin ili obrisati stari broj u terminu te dodati novi tada će sve biti ok</Text>
                <Text style={style.text}>Ako automatsko slanje za taj dan nije počelo možemo slobodno dodavati/brisati brojeve</Text>

                <Text style={style.largeText}>Tekst poruke</Text>
                <Text style={style.text}>Tekst poruke je poruka koju će klijent dobiti sms-om</Text>
                <Text style={style.text}>Ima tri ključne riječi: TERMIN, DATUM i RED</Text>
                <Text style={style.text}>TERMIN: ključna riječ koja se odnosi na vijeme u koje klijent ima termin, formata: hh:mm, primjer: 17:00</Text>
                <Text style={style.text}>DATUM: ključna riječ koja se odnosi na datum u koje klijent ima termin, formata: DD:MM, primjer: 17.04</Text>
                <Text style={style.text}>RED: ključna riječ koja prebacuje poruku u drugi red, ako želimo prazan red (ili više njih) između teksta možemo koristi ključnu riječ više puta primjer: RED RED (sa razmakom između njih)</Text>
                <Text style={style.text}>Svaka ključna riječ će se pretvoriti u svoj ekvivalent, primjer: TERMIN će u poruci biti 17:00 ili RED koji će prebacit ostatak poruke u sljedeći red</Text>
                <Text style={style.text}>Ključne riječi moraju biti pisane velikim tiskanim slovima</Text>
                <Text style={style.text}>Svaka ključna riječ se može koristiti više puta u jednoj poruci, a poruka može biti i bez njih</Text>
                <Text style={style.text}>Svaki termin i datum su jedinstveni za klijenta</Text>
                <Text style={style.text}>Tekstovi poruke za automatsko slanje i obavijest imaju različite tekstove</Text>

                <Text style={style.largeText}>Automatsko slanje</Text>
                <Text style={style.text}>Automatsko slanje se uključuje pritiskom na gumb</Text>
                <Text style={style.text}>Znamo da je automatsko slanje uključeno tako što vidimo notifikaciju koja nam pokazuje da je aplikacija aktivna, automatsko slanje nemože raditi bez notifikacije</Text>
                <Text style={style.text}>Ako nevidimo notifikaciju, a u aplikaciji piše da je aplikacija aktivna najvjerovatnije je došlo do greške te moramo aplikaciju ponovo upaliti pritiskom na gumb, znati ćemo da radi tako što će se notifikacija pojaviti</Text>
                <Text style={style.text}>Aplikacija će čekati određeno vrijeme za slanje poruka te će početi slati poruke nakon tog vremena</Text>
                <Text style={style.text}>Samo poruke za sutradan će doći u obzir</Text>
                <Text style={style.text}>Sve naknadne termine dodane u kalendar za sutradan, nakon automtaskog vremena aplikacija će poslati trenutka kada vidi termin</Text>

                <Text style={style.largeText}>Preskoči danas</Text>
                <Text style={style.text}>Odnosi se na automatsko slanje</Text>
                <Text style={style.text}>Kada je uključen daje nam mogučnost da preskočimo automatsko slanje za taj dan (današnji) dok je automatsko slanje aktivno</Text>
                <Text style={style.text}>Preskakanje dana se resetira u ponoć te će se sutradan autmatsko slanje normalno nastavit, ako je automatsko slanje uključeno naravno</Text>

                <Text style={style.largeText}>Pošalji odmah</Text>
                <Text style={style.text}>Daje nam mogučnost da pošaljemo odmah poruku na termine koji nisu poslani</Text>
                <Text style={style.text}>Može se koristiti u tandemu sa automatskim slanjem, automatsko slanje neće slati poruke na termini koje su poslane sa ovom mogučnosti i obrnuto</Text>
                <Text style={style.text}>Sa ovom močnosti možemo sami slati termine bez oslanjanja na automatsko slanje (ako nevjerujemo automatskom slanju)</Text>

                <Text style={style.largeText}>Postavke poruke</Text>
                <Text style={style.text}>U njemu možemo namjestiti tekst poruke i vrijeme za automatsko slanje</Text>
                <Text style={style.text}>Ove izmjene vrijede samo za automatsko slanje, ne za obavijest</Text>

                <Text style={style.largeText}>Pošalji obavijest</Text>
                <Text style={style.text}>Mogučnost aplikacije koja nije povezana sa automatskim slanjem</Text>
                <Text style={style.text}>Sa njom možemo poslati poruku klijentima od datuma do datuma kojeg mi poželimo, može biti par dana, tjedan, cijeli mjesec...</Text>
                <Text style={style.text}>Radi isto kao automatsko slanje tako što čita kalendar unutar zadanog vremena, te njen tekst je različit od automatskog slanja</Text>
                <Text style={style.text}>Ako je u određenom vremenu broj klijenta više puta unesen na njegov broj će stići više poruka, ako to neželimo koristimo generalnu poruku</Text>

                <Text style={style.largeText}>Generalna poruka</Text>
                <Text style={style.text}>Sposobnost koja nam garantira da će svaki klijent dobiti samo jednu poruku</Text>
                <Text style={style.text}>Odnosi se samo na obavijest</Text>
                <Text style={style.text}>Dok je ova opcija uključena nemožemo koristiti ključnu riječ TERMIN I DATUM, dok RED možemo slobodno koristit</Text>


                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                <Text style={style.text}></Text>
                

            </ScrollView>
        </View>
    );
}

export default About;