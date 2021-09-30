// Modèle de base
export interface IChargeBase {
    total: number;
    montant: number;
    snel: number;
    regideso: number;
    autres: number;
    mois: string;
    annee: number;
    state: string;
    datePaiement: number;
    dateSolde: number;
    createAt: number;
    updateAt: number;
    createBy: number;
    locationID: number;
    status: number;
    locataire: string;
    local: string;
}

// Modèle avec id
export interface ICharge extends IChargeBase {
    id: number;
}