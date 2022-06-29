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
        "aural","abbey","robes","lotti","vigil","arise","round","fugal","fixer","sings",
        "hodie","piano","latin","mundy","ficta","staff","nobis","maria","aston","amens", // amens = may 1st
        "singer","handel","anthem","matins","gloria","choral","treble","rhythm","vierne","second",
        "timbre","rubato","walton","shanty","unison","mozart","custos","decani","softly","larynx",
        "eighth","cantus","ballad","warble","coelos","brahms","brevis","office","presto","rutter",
        "atonal","septet","vivace","tallis","spirit","basses","tuning","dorian","octave","melody",
        "phrase","sextet","palate","lassus","sempre","corpus","preces","tenuto","chapel","chorus",
        "wesley","beamed","nobile","divisi","quaver","batten","record","adagio","petrus","lydian",
        "loudly","regina","nodule","church","kodaly","legato","cantor","plagal","barber","maxima",
        "degree","lieder","stabat","upbeat","harris","subito","intone","firmus","mealor","triste",
        "fourth","hymnal","accent","rubbra","repeat","breath","minima","morley","libera","troppo",
        "dvorak","dotted","clucas","gospel","corona","system","gounod","phonic","gruber","ottava",
        "elijah","franck","gargle","regina","ledger","niente","simile","tempus","naylor","attack",
        "tierce","poston","tuplet","greene","masses","byrdle","samson","theory","finale","encore"
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
