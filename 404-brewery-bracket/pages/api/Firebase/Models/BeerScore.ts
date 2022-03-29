import IFirebaseDocument from "./IFirebaseDocument";

class BeerScore implements IFirebaseDocument {
  private DocumentID: string;
  public AssociatedScorecardID: string;
  public AssociatedBeerId: string;
  public BeerName: string;
  public BeerScore: number;
  public IsCustom: boolean;

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default BeerScore;
