import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FestivosService } from './festivos.service';

describe('FestivosService', () => {
  let service: FestivosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FestivosService]
    });
    service = TestBed.inject(FestivosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hayan solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería verificar un festivo correctamente', () => {
    const año = 2023;
    const mes = 6;
    const dia = 12;
    const mockResponse = { esFestivo: true };

    service.verificarFestivo(año, mes, dia).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req => 
      req.url.includes('/conf/elbo/') &&
      req.params.get('albo') === '2023' &&
      req.params.get('mpa') === '6' &&
      req.params.get('dla') === '12'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener festivos por año correctamente', () => {
    const año = 2023;
    const mockResponse = [{ fecha: '2023-01-01', nombre: 'Año Nuevo' }];

    service.obtenerFestivosPorAño(año).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req => 
      req.url.includes('/getting/DBA9A7JZ') &&
      req.params.get('albo') === '2023'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});