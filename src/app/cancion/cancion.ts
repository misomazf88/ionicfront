export class Cancion {
    id: number;
    titulo: string;
    minutos: number;
    segundos: number;
    interprete: string;
    albumes: Array<any>;
    coleccionista: number;
    favorite: boolean;
    usuariosFavoritos: Array<number>;

    constructor(
        id: number,
        titulo: string,
        minutos: number,
        segundos: number,
        interprete: string,
        albumes: Array<any>,
        coleccionista: number,
        favorite: boolean,
        usuariosFavoritos: Array<number>
    ){
        this.id = id,
        this.titulo = titulo,
        this.minutos = minutos,
        this.segundos = segundos,
        this.interprete = interprete
        this.albumes = albumes
        this.coleccionista = coleccionista
        this.favorite = favorite
        this.usuariosFavoritos = usuariosFavoritos
    }
}
