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

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default BreweryDay;
