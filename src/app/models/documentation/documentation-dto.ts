export class DocumentationDto {
  version: string;
  creation: string;
  update: string;

  constructor(
    version: string = '',
    creation: string = '',
    update: string = '',
    ) {
    this.version = version;
    this.creation = creation;
    this.update = update;
  }
}
