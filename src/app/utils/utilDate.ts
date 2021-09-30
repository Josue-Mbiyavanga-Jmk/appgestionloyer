export function stringDateToTimeStamp(str: string): number {
    // en millisecondes
    return Date.parse(str);

}

export function timeStampToStringDate(num: number): string {
    // en millisecondes
    const laDate = new Date(num)
    return laDate.toLocaleDateString("fr-FR");

}