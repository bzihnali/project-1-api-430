const html = require("html");
let pokedex = require("../../../data/pokedex.json"); // not const because edits

// gets a specific ID from the pokedex
const getID = (req, res) => {
    let dexEntry = pokedex.filter((entry) => (entry.id == req.params.id))
    if (dexEntry.length == 0) {
        res.status = 204;
    } else {
        res.status = 200;
    }
    res.json(dexEntry)
}

// sets edited values of a pokedex entry
const setID = (req, res) => {
    let dexEntryIndex = pokedex.findIndex((entry) => (entry.id == req.params.id))
    let modifiableTraits = ["name", "num", "height", "weight"]
    let modifiedTraits = 0;

    for (const trait of modifiableTraits) {
        if (trait in req.query) {
            if (req.query[trait].length > 0) {
                modifiedTraits++;
                pokedex[dexEntryIndex][trait] = req.query[trait]
            }
        } else if (trait in req.body) {
            if (req.body[trait].length > 0) {
                modifiedTraits++;
                pokedex[dexEntryIndex][trait] = req.body[trait]
            }
        }
    }
    if (modifiedTraits == 0) {
        res.status = 204
    } else {
        res.status = 201
    }

    res.json(pokedex[dexEntryIndex])
}

// gets the pokedex but filters it beforehand (if there are no filters passed, itll return the whole thing)
const getFilteredDex = (req, res) => {
    if (Object.keys(req.query).length == 0) {
        res.json(pokedex)
    } else {
        let results = [];

        let queryChecks = ["types"]
        for (const check of queryChecks) {
            if (check in req.query) {
                if (check == "types") {
                    let typesToCheck = req.query[check].split(",");
                    for (const pokemon of pokedex) {
                        if (typesToCheck.some(el => pokemon["type"].includes(el))) {
                            results.push(pokemon);
                        }
                    }
                }
            }
        }

        if (results.length == 0) {
            res.status = 400;
        } else {
            res.status = 204;
        }
        res.json(results)
    }
};

module.exports = {
    getID,
    setID,
    getFilteredDex,
    pokedex
};