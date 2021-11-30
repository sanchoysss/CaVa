import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DocumentationDto} from "../../models/documentation/documentation-dto";
import {ServiceHelper} from "../helper/service-helper";

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private readonly url: string = this.serviceHelper.url + '/about'

  constructor(private httpClient: HttpClient,
              private serviceHelper: ServiceHelper,
  ) {
  }

  public getDocumentation(): Observable<DocumentationDto> {
    return this.httpClient.get<DocumentationDto>(this.url);
  }
}
