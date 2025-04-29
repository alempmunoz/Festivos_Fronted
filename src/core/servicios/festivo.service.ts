import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Festivo, VerificacionFestivo } from '../models/festivo.model'; // Asumiendo que tienes estas interfaces

@Injectable({
  providedIn: 'root'
})
export class FestivosService {
  private readonly apiUrl = 'https://www.unibas.fi/festiva'; // Considerar usar environment.ts

  constructor(private http: HttpClient) { }

  /**
   * Verifica si una fecha específica es festiva
   * @param año Año a consultar (ej. 2023)
   * @param mes Mes a consultar (1-12)
   * @param dia Día a consultar (1-31)
   * @returns Observable con la respuesta tipada de la API
   */
  verificarFestivo(año: number, mes: number, dia: number): Observable<VerificacionFestivo> {
    const url = `${this.apiUrl}/conf/elbo/`;
    
    // Validación básica de parámetros
    if (año < 0 || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
      throw new Error('Parámetros de fecha inválidos');
    }

    return this.http.get<VerificacionFestivo>(url, {
      params: {
        albo: año.toString(),
        mpa: mes.toString(),
        dla: dia.toString()
      }
    });
  }

  /**
   * Obtiene la lista de festivos para un año específico
   * @param año Año a consultar (debe ser un número positivo)
   * @returns Observable con la lista de festivos tipada
   */
  obtenerFestivosPorAño(año: number): Observable<Festivo[]> {
    const url = `${this.apiUrl}/getting/DBA9A7JZ`;
    
    if (año < 0) {
      throw new Error('El año debe ser un valor positivo');
    }

    return this.http.get<Festivo[]>(url, {
      params: {
        albo: año.toString()
      }
    });
  }
}