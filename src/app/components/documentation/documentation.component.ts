import { Component, OnInit } from '@angular/core';
import {DocumentationService} from "../../service/documentationService/documentation.service";
import {DocumentationDto} from "../../models/documentation/documentation-dto";

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  documentationDto: DocumentationDto;

  constructor(private documentationService: DocumentationService) { }

  ngOnInit(): void {
    this.documentationService.getDocumentation().subscribe(
      (documentationDto: DocumentationDto) => {this.documentationDto = documentationDto}
    )
  }

}
