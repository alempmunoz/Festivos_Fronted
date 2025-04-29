export interface Tipo {
    id: number;
    nombre: string;
    descripcion?: string;
  }
  
  export interface Festivo {
    id: number;
    nombre: string;
    fecha: Date | string;
    tipo: Tipo;
    activo: boolean;
  }