export class Livraison {
    id: string;
    id_prods: string;
    prix_prod: string;
    quantite: string;
    prix_total: string;
    is_livrer: string;
    is_annuler: number;
    del: number;
}

export class MenuItem {
    id: string;
    name: string;
    price: string;
    quantity = 0;
}

export class MenuItemCart {
    id: string;
    name: string;
    price: string;
    quantity: number;
}
