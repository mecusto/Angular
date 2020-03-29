import { ListaItem } from './lista-item.model';

export class Lista {
    id: number;
    title: string;
    createdOn: Date;
    endOn: Date;
    ended: boolean;
    items: ListaItem[];

    constructor(titulo: string) {
        this.id = new Date().getTime();
        this.title = titulo;
        this.createdOn = new Date();
        this.ended = false;
        this.items = [];
    }

}