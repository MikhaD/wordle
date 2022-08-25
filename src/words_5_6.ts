import validFive from "./words_5"
import validSix from "./words_6"

const answers = [
        "choir","motet","chant","credo","zadok","organ","triad","darke","tenor","stave",
        "clerk","minim","dyson","clefs","carol","finzi","sixth","breve","agnus","tempo",
        "neume","slurs","solos","notes","glory","fifth","sicut","verdi","noble","altar",
        "kyrie","elgar","major","vicar","altos","largo","drone","quire","haydn","minor",
        "scale","forte","sharp","parry","dixit","psalm","flats","modus","tutti","lento",
        "verse","holst","tonic","locus","hymns","trill","segue","music","octet","onset",
        "creed","swell","mezzo","lobet","third","molto","canon","stops","pedal","nonet",
        "faure","stall","pitch","vocal","mater","shake","widor","chord","kings","tones",
        "songs","dolce","duets","fugue","arias","lyric","trios","missa","score","voice",
        "aural","abbey","robes","lotti","vigil","arise","round","fugal","fixer","sings",// 100
        "hodie","piano","latin","mundy","ficta","staff","nobis","maria","aston","amens", // amens = may 1st
        "singer","handel","anthem","matins","gloria","choral","treble","rhythm","vierne","second",
        "timbre","rubato","walton","shanty","unison","mozart","custos","decani","softly","larynx",
        "eighth","cantus","ballad","warble","coelos","brahms","brevis","office","presto","rutter",
        "atonal","septet","vivace","tallis","spirit","basses","tuning","dorian","octave","melody",
        "phrase","sextet","palate","lassus","sempre","corpus","preces","tenuto","chapel","chorus",
        "wesley","beamed","nobile","divisi","quaver","batten","record","adagio","petrus","lydian",
        "loudly","regina","nodule","church","kodaly","legato","cantor","plagal","barber","maxima",
        "degree","lieder","stabat","upbeat","harris","subito","intone","firmus","mealor","triste",
        "fourth","hymnal","accent","rubbra","repeat","breath","minima","morley","libera","troppo",//200
        "dvorak","dotted","clucas","dental","gospel","artist","corona","system","gounod","phonic",
        "gruber","ottava","wobble","broken","claque","common","minuet","patter","spinto","triple",
        "elijah","franck","gargle","regina","ledger","uvular","niente","simile","forced","tempus",
        "naylor","attack","arioso","tierce","poston","tuplet","greene","simple","masses","oriana",
    "bishop","farmer","burgon","clarke","nowell","dering","venite","wilbye","allain","studio",//250
    "samson","octavo","crotch","davies","semele","walker","folder","magnum","browne","bingen",
    "pastor","bridge","lament","luther","wachet","ionian","curate","johann","bartok","paulus",
    "tormis","crosby","delius","podium","tongue","bridal","memory","carter","prayer","ritard",
    "martin","direct","arnold","ligeti","brewer","seated","risers","webber","stanza","gjeilo",
    "enrobe","timing","bardos","throat","sonore","archer","listen","byrdle","schutz","samson",//300
    "theory","mahler","finale","encore","tunes","nasal","metre","belto","dufay","pipes",
    "chest","longa","bravo","break","slide","twang",//316
// LIST B, for perpetual use:
        "choir","motet","chant","credo","zadok","organ","triad","darke","tenor","stave",
        "clerk","minim","dyson","clefs","carol","finzi","sixth","breve","agnus","tempo",
        "neume","slurs","solos","notes","glory","fifth","sicut","verdi","noble","altar",
        "kyrie","elgar","major","vicar","altos","largo","drone","quire","haydn","minor",
        "scale","forte","sharp","parry","dixit","psalm","flats","modus","tutti","lento",
        "verse","holst","tonic","locus","hymns","trill","segue","music","octet","onset",
        "creed","swell","mezzo","lobet","third","molto","canon","stops","pedal","nonet",
        "faure","stall","pitch","vocal","mater","shake","widor","chord","kings","tones",
        "songs","dolce","duets","fugue","arias","lyric","trios","missa","score","voice",
        "aural","abbey","robes","lotti","vigil","swoop","round","fugal","fixer","sings",// 100
        "hodie","piano","latin","mundy","ficta","staff","nobis","maria","aston","amens", // amens = may 1st
        "singer","handel","anthem","matins","gloria","choral","treble","rhythm","vierne","second",
        "timbre","rubato","walton","shanty","unison","mozart","custos","decani","softly","larynx",
        "eighth","cantus","ballad","warble","coelos","brahms","brevis","office","presto","rutter",
        "atonal","septet","vivace","tallis","spirit","basses","tuning","dorian","octave","melody",
        "phrase","sextet","palate","lassus","sempre","corpus","preces","tenuto","chapel","chorus",
        "wesley","beamed","nobile","divisi","quaver","batten","record","adagio","petrus","lydian",
        "loudly","regina","nodule","church","kodaly","legato","cantor","plagal","barber","maxima",
        "degree","lieder","stabat","upbeat","harris","subito","intone","firmus","mealor","triste",
        "fourth","hymnal","accent","rubbra","repeat","breath","minima","morley","libera","troppo",//200
        "dvorak","dotted","clucas","dental","gospel","artist","corona","system","gounod","phonic",
        "gruber","ottava","wobble","broken","claque","common","minuet","patter","spinto","triple",
        "elijah","franck","gargle","wagner","ledger","uvular","niente","simile","forced","tempus",
        "naylor","attack","arioso","tierce","poston","tuplet","greene","simple","masses","oriana",
    "bishop","farmer","burgon","clarke","nowell","dering","venite","wilbye","allain","studio",//250
    "samson","octavo","crotch","davies","semele","walker","folder","magnum","browne","bingen",
    "pastor","bridge","lament","luther","wachet","ionian","curate","johann","bartok","paulus",
    "tormis","crosby","delius","podium","tongue","bridal","memory","carter","prayer","ritard",
    "martin","direct","arnold","ligeti","brewer","seated","risers","webber","stanza","gjeilo",
    "enrobe","timing","bardos","throat","sonore","archer","listen","byrdle","schutz","samson",//300
    "theory","mahler","finale","encore","tunes","nasal","metre","belto","dufay","pipes",
    "chest","longa","bravo","break","slide","twang",//316
    ];



const alphabet = "abcdefghijklmnopqrstuvwxyz";

function chunkSubstr(str, size, i) {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let j = 0, o = 0; j < numChunks; ++j, o += size) {
    chunks[j] = alphabet[i] + str.substr(o, size)
  }
  return chunks
}

export function answerLength(gameNum) {
    return answers[gameNum].length;
}

export function createWordLists(numLetters: number): WordData {
    var valid;
    if (numLetters === 5)
        valid = validFive.map((wordblock,i) => chunkSubstr(wordblock,4,i)).reduce((arr,val) => arr.concat(val),[]);
    else {
        valid = validSix.map((wordblock,i) => chunkSubstr(wordblock,5,i)).reduce((arr,val) => arr.concat(val),[]);
    }
    return {
        "words": answers,
        "valid": valid,
    };
}
