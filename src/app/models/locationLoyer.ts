// Modèle de base
export interface ILocationLoyerBase {
    mois: string;
    annee: number;
    state: string;
    montant: number;
    datePaiement: number;
    dateSolde: number;
    createAt: number;
    updateAt: number;
    createBy: number;
    locationID: number;
    loyerNet: number;
    status: number;
    locataire: string;
    local: string;
}
export interface ILocationLoyerCustom {
    mois: string;
    annee: number;
    state: string;
    montant: number;
    datePaiement: number;
    dateSolde: number;
    createBy: number;
    locationID: number;
    loyerNet: number;

}

// Modèle avec id
export interface ILocationLoyer extends ILocationLoyerBase {
    id: number;
}