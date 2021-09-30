export function getLocataireNom(str: string): string {
    //
    const tab = str.split(" - ");
    return tab[0];

}

export function getLocatairePrenom(str: string): string {
    // 
    const tab = str.split(" - ");
    return tab[1];

}

export function getAnnee(str: string): number {
    // 
    const tab = str.split("-");
    return parseInt(tab[0]);

}
export function getMois(str: string): string {
    // 
    const tab = str.split("-");
    let mois = "";
    switch (tab[1]) {
        case "01":
            mois = "Janvier";
            break;
        case "02":
            mois = "Fevrier";
            break;
        case "03":
            mois = "Mars";
            break;
        case "04":
            mois = "Avril";
            break;
        case "05":
            mois = "Mai";
            break;
        case "06":
            mois = "Juin";
            break;
        case "07":
            mois = "Juillet";
            break;
        case "08":
            mois = "Aout";
            break;
        case "09":
            mois = "Septembre";
            break;
        case "10":
            mois = "Octobre";
            break;
        case "11":
            mois = "Novembre";
            break;
        case "12":
            mois = "Decembre";
            break;
        default:
            break;
    }
    return mois;

}