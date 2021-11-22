import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Lancamento } from '../model/lancamento';
import { BasicCrudService, httpOptions } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BasicCrudService<Lancamento> {

  constructor(private http: HttpClient) {
    super(`${environment.url}/lancamentos`, http);
  }

  postFile(idConta: string, fileToUpload: File) {

    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    let body = JSON.stringify({ idConta: idConta, file: formData });
    console.log(body);
    
    const URL = `${environment.url}/lancamentos/carga?idConta=${idConta}&file=${formData}`;

    return this.http.post(
      URL,
      body,
      httpOptions
    ).pipe(catchError(this.handleError('create')));
  }
}
