import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';

import { BuscarService } from './buscar.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {
  HttpModule,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

export const testData = {
  'page': 2,
  'per_page': 3,
  'total': 12,
  'total_pages': 4,
  'data': [
    {
      'id': 4,
      'first_name': 'Eve',
      'last_name': 'Holt',
      'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg'
    },
    {
      'id': 5,
      'first_name': 'Charles',
      'last_name': 'Morris',
      'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg'
    },
    {
      'id': 6,
      'first_name': 'Tracey',
      'last_name': 'Ramos',
      'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg'
    }
  ]
};

describe('BuscarService', () => {
  let service;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        BuscarService,
        { provide: XHRBackend, useClass: MockBackend, useValue: { get: Observable.of(testData) } },
      ]
    });

    service = TestBed.get(BuscarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('implementation methods', () => {

    it('should return an Observable<String[]>',
      inject([BuscarService, XHRBackend], (buscarService, mockBackend) => {

        const mockResponse = {
          'page': 2,
          'per_page': 3,
          'total': 12,
          'total_pages': 4,
          'data': [
            {
              'id': 4,
              'first_name': 'Eve',
              'last_name': 'Holt',
              'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg'
            },
            {
              'id': 5,
              'first_name': 'Charles',
              'last_name': 'Morris',
              'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg'
            },
            {
              'id': 6,
              'first_name': 'Tracey',
              'last_name': 'Ramos',
              'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg'
            }
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        buscarService.buscar().subscribe(
          (resultado) => {
            expect(resultado.data.length).toBe(3);
            expect(resultado.data[0].first_name).toEqual('Eve');
            expect(resultado.data[1].first_name).toEqual('Charles');
            expect(resultado.data[2].first_name).toEqual('Tracey');
          },
          (error: any) =>
            console.error('Error status: ', error.status, 'Error details: ', error),
          () => console.log('Observable completo!')
        );
      }));
  });

  it('should resolve test data', fakeAsync(() => {
    console.log('aaaaaxaaaaa');
    const spy = spyOn(service, 'buscar').and.callFake(() => {
      console.log('CALL = spyon');
      return Observable.of(testData);
    });

    service.buscar().subscribe(
      (resultado) => {
        // expect(resultado.data.length).toBe(3);
        // expect(resultado.data[0].first_name).toEqual('Eve');
        // expect(resultado.data[1].first_name).toEqual('Charles');
        // expect(resultado.data[2].first_name).toEqual('Tracey');

        expect(resultado).toEqual(testData);
        expect(spy.calls.any()).toEqual(true);
      },
      (error: any) =>
        console.error('Error status: ', error.status, 'Error details: ', error),
      () => console.log('Observable completo!')
    );
  }));
});
