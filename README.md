# id_resolver.js
[![Coverage Status](https://coveralls.io/repos/github/kevinxin90/id_resolver.js/badge.svg?branch=master)](https://coveralls.io/github/kevinxin90/id_resolver.js?branch=master)
[![Build Status](https://travis-ci.com/kevinxin90/id_resolver.js.svg?branch=master)](https://travis-ci.com/kevinxin90/id_resolver.js)
A nodejs package for resolving biomedical ids based on translator node normalization api. The package is built on top of the NCATS Translator [Node Normalization API](https://nodenormalization-sri.renci.org/apidocs/#/Interfaces/get_get_normalized_nodes).


## Install

```
$ npm install @biothings-explorer/id_resolver
```

## Usage

```js
const resolver = require('@biothings-explorer/id_resolver');

// resolve a list of gene ids
const ids = ['NCBIGene:1017', 'NCBIGene:1018', 'HGNC:1177'];

(async () => {
	console.log(await resolver.resolve(ids));
	//=> {'NCBIGene:1017': {...}, 'NCBIGene:1018': {...}, 'HGNC:1177': {...}}
})();

// resolve ids from different types
const ids = ['CHEMBL.COMPOUND:CHEMBL744', 'NCBIGene:1017', 'HP:0001166'];
(async () => {
	console.log(await resolver.resolve(ids);
	//=> {'CHEMBL.COMPOUND:CHEMBL744': {...}, 'NCBIGene:1017': {...}, 'HP:0001166': {...}}
})();
```

## Available Semantic Types & prefixes

- Gene
  - NCBIGene
  - ENSEMBL
  - HGNC
  - UniProtKB 
  - IUPHAR

- Pathway
  - SMPDB

- ChemicalSubstance
  - PUBCHEM
  - INCHIKEY
  - CHEMBL.COMPOUND
  - CHEBI
  - DRUGBANK
  - HMDB
  - KEGG.COMPOUND
  - MESH
  - UNII
  - GTOPDB

- Disease
  - UMLS
  - SNOMEDCT
  - MONDO
  - MESH
  - NCIT
  - HP
  - MEDDRA
  - EFO
  - DOID
  - ORPHANET
  - OMIM
  - ICD-10
  - MP
  - medgen
  - ICD-9

- PhenotypicFeature
  - UMLS
  - SNOMEDCT
  - HP
  - MEDDRA
  - EFO
  - NCIT
  - MESH
  - MP

- Cell
  - CL
  - UMLS
  - NCIT
  - MESH
  - UBERON
  - SNOMEDCT

