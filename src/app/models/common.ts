export interface MyHttpResponse<T> {
    status: number;
    data: T; // ça peut etre un objet ou undefined cad rien
    message: string; // ça peut etre une chaine 
}

export interface MyHttpResponses<T> {
    status: number;
    data: T[];
    message: string; // ça peut etre une chaine 
}