// Modèle de base
export interface IPaiementBase {
    montant: number;
    description: string;
    type: number; // 1 pour loyer et 2 pour charges
    imageBordereau: string;
    datePaiement: number;
    createAt: number;
    updateAt: number;
    createBy: number;
    status: number;
    locationID: number;
    reste: number;
    state: string;
    locataire: string;
    local: string;

}

// Modèle avec id
export interface IPaiement extends IPaiementBase {
    id: number;
}