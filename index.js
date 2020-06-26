const axios = require("axios");

const BASE_URL = "https://nodenormalization-sri.renci.org/get_normalized_nodes?";
const ID_WITH_PREFIXES = ["MONDO", "DOID", "UBERON",
    "EFO", "HP", "CHEBI", "CL", "MGI"];
/**
 * Construct query to node normalization api
 * @param {Array} curies - a list of curies, with max length of 1000
 */
const constructQuery = (curies) => {
    let params = curies.map(curie => 'curie=' + curie).join("&");
    return axios.get(BASE_URL + params)
        .then(res => res.data)
        .catch((err) => {
            res = {};
            curies.map(item => {
                res[item] = {
                    id: {
                        identifier: item,
                        label: item
                    }
                };
                let [prefix, id] = item.split(':');
                if (ID_WITH_PREFIXES.includes(prefix)) {
                    res[item]["bte_equivalent_identifiers"] = {
                        [prefix]: [item]
                    };
                } else {
                    res[item]["bte_equivalent_identifiers"] = {
                        [prefix]: [id]
                    };
                }
            })
            return res;
        })
        .then(res => {
            Object.keys(res).map(input => {
                if (res[input] === null) {
                    res[input] = {
                        id: {
                            identifier: input,
                            label: input
                        }
                    }
                }
                if ("equivalent_identifiers" in res[input]) {
                    res[input]["bte_equivalent_identifiers"] = {};
                    res[input]["equivalent_identifiers"].map(item => {
                        let [prefix, id] = item['identifier'].split(':');
                        if (ID_WITH_PREFIXES.includes(prefix)) {
                            id = prefix + ':' + id;
                        }
                        if (prefix in res[input]["bte_equivalent_identifiers"]) {
                            res[input]["bte_equivalent_identifiers"][prefix].push(id);
                        } else {
                            res[input]["bte_equivalent_identifiers"][prefix] = [id];
                        }

                    })
                }
            })
            return res;
        })
}

module.exports = async (curies) => {
    const chunk_size = 1000;
    let i, j, chunks = [], promises = [];
    for (i = 0, j = curies.length; i < j; i += chunk_size) {
        chunks.push(curies.slice(i, i + chunk_size));
    };
    promises = chunks.map(chunk => constructQuery(chunk));
    let resolved_promises = await Promise.allSettled(promises);
    let res = {};
    resolved_promises.map(item => res = { ...res, ...item.value });
    return res;
}