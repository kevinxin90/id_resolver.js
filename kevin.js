const resolver = require("./index");

const q = async () => {
    const curies = ["NCBIGene:1017", "HGNC:1771", "CHEMBL.COMPOUND:CHEMBL744", "MONDO:0019623"];
    let res = await resolver(curies);
    console.log(res);
    console.log(res['MONDO:0019623']);
}
const qq = async () => {
    const curies = [
        'DOID:10533'
    ];
    let res = await resolver(curies);
    console.log(res);
}

qq();