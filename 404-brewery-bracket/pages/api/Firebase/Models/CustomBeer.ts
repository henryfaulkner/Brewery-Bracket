import IFirebaseDocument from "./IFirebaseDocument";

class CustomBeer implements IFirebaseDocument {
  private DocumentID: string;
  public AssociatedBreweryID: string;
  public AssociatedBreweryName: string;
  public ABV: number;
  public Description: string;
  public IBU: number;
  public Name: string;
  public Style: string;

  public constructor(json) {
    this.AssociatedBreweryID = json["AssociatedBreweryID"];
    this.AssociatedBreweryName = json["AssociatedBreweryName"];
    this.ABV = json["ABV"];
    this.IBU = json["IBU"];
    this.Description = json["Description"];
    this.Name = json["Name"];
    this.Style = json["Style"];
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default CustomBeer;
