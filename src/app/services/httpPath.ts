const protocol = "http://localhost:";
const port = 8081;
const commonApi = "/api/gestionLoyer/";

export const chargePath = {
    add: protocol + port + commonApi + "charge/add",
    findAll: protocol + port + commonApi + "charge/findAll",
    find: protocol + port + commonApi + "charge/find",
    findByLocation: protocol + port + commonApi + "charge/findByLocation",
    update: protocol + port + commonApi + "charge/update",
    delete: protocol + port + commonApi + "charge/delete"

}

export const localPath = {
    add: protocol + port + commonApi + "local/add",
    findAll: protocol + port + commonApi + "local/findAll",
    find: protocol + port + commonApi + "local/find",
    findBySite: protocol + port + commonApi + "local/findBySite",
    update: protocol + port + commonApi + "local/update",
    delete: protocol + port + commonApi + "local/delete"

}

export const locatairePath = {
    add: protocol + port + commonApi + "locataire/add",
    findAll: protocol + port + commonApi + "locataire/findAll",
    find: protocol + port + commonApi + "locataire/find",
    update: protocol + port + commonApi + "locataire/update",
    delete: protocol + port + commonApi + "locataire/delete"

}

export const locationPath = {
    add: protocol + port + commonApi + "location/add",
    findAll: protocol + port + commonApi + "location/findAll",
    findAllValid: protocol + port + commonApi + "location/findAllValid",
    find: protocol + port + commonApi + "location/find",
    findByLocal: protocol + port + commonApi + "location/findByLocal",
    findByLocataire: protocol + port + commonApi + "location/findByLocataire",
    update: protocol + port + commonApi + "location/update",
    delete: protocol + port + commonApi + "location/delete",
    stop: protocol + port + commonApi + "location/stop"

}

export const locationLoyerPath = {
    add: protocol + port + commonApi + "locationLoyer/add",
    findAll: protocol + port + commonApi + "locationLoyer/findAll",
    find: protocol + port + commonApi + "locationLoyer/find",
    findByLocation: protocol + port + commonApi + "locationLoyer/findByLocation",
    update: protocol + port + commonApi + "locationLoyer/update",
    delete: protocol + port + commonApi + "locationLoyer/delete"

}

export const paiementPath = {
    add: protocol + port + commonApi + "paiement/add",
    findAll: protocol + port + commonApi + "paiement/findAll",
    findAllLoyer: protocol + port + commonApi + "paiement/findAllLoyer",
    findAllCharge: protocol + port + commonApi + "paiement/findAllCharge",
    find: protocol + port + commonApi + "paiement/find",
    findByLocation: protocol + port + commonApi + "paiement/findByLocation",
    findLoyerByLocation: protocol + port + commonApi + "paiement/findLoyerByLocation",
    findChargeByLocation: protocol + port + commonApi + "paiement/findChargeByLocation",
    update: protocol + port + commonApi + "paiement/update",
    delete: protocol + port + commonApi + "paiement/delete",
    checkProcess: protocol + port + commonApi + "paiement/checkProcess"

}

export const sitePath = {
    add: protocol + port + commonApi + "site/add",
    findAll: protocol + port + commonApi + "site/findAll",
    find: protocol + port + commonApi + "site/find",
    update: protocol + port + commonApi + "site/update",
    delete: protocol + port + commonApi + "site/delete"

}

export const userPath = {
    add: protocol + port + commonApi + "user/add",
    findAll: protocol + port + commonApi + "user/findAll",
    find: protocol + port + commonApi + "user/find",
    update: protocol + port + commonApi + "user/update",
    delete: protocol + port + commonApi + "user/delete"

}