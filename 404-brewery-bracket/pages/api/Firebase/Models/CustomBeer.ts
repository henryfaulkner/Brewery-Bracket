import IFirebaseDocument from "./IFirebaseDocument";

class BreweryDay implements IFirebaseDocument {
  private DocumentID: string;
  public AssociatedBreweryID: string;
  public AssociatedBreweryName: string;
  public ABV: number;
  public Description: string;
  public IBU: number;
  public Name: string;
  public Style: string;

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default BreweryDay;
