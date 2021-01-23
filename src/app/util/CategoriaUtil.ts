export class CategoriaUtil {
    private static categoriaIcons : string[] = [
        "fas fa-shopping-basket",
        "fas fa-shipping-fast",
        "fas fa-glass-martini-alt",
        "fas fa-money-check",    
        "fas fa-car",
        ""
      ];

      private static subCategoriaNombres : string[] = [
        "Bebida",
        "Alimento",
        "Higiene",
        "Limpieza",
        "Mascotas",
        "Hogar",
        "Boludeces",
        "Otros",
        "Comida",
        "Postre",
        "Entretenimiento",
        "Farmacia",
        "Tecnologia",
        "Regalo",
        "Ferreteria",
        "Vestimenta",
        "Combustible",
        "Mantenimiento",
        "Mecanico"
      ];


    public static getCategoriaString(index : string) : string {
        switch (index) {
            case "1":
                return "Supermercado"
            break;
      
            case "2":
                return "Delivery"
            break;
      
            case "3":
                return  "Salida"
            break;
      
            case "4":
                return "Compra"
            break;
      
            case "5":
                return "Vehiculo"
            break;
      
            case "6":
                return "Otros"
            break;

            default:
                return "";
            break
          }
    }

    public static getCategoriaIcon(index : number) : string {
        return this.categoriaIcons[index];
    }

    public static getAllCategoriaIcon() : string[] {
        return this.categoriaIcons;
    }

    public static getSubCategoriaString(index : number) : string {
        return this.subCategoriaNombres[index];
    }
}