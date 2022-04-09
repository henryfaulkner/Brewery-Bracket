import IFirebaseDocument from "./IFirebaseDocument";

class BeerScore implements IFirebaseDocument {
  private DocumentID: string;
  public AssociatedScorecardID: string;
  public AssociatedBeerID: string;
  public BeerName: string;
  public Score: number;
  public IsCustom: boolean;

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["AssociatedScorecardID"])
      this.AssociatedScorecardID = json["AssociatedScorecardID"];
    if (json["AssociatedBeerID"])
      this.AssociatedBeerID = json["AssociatedBeerID"];
    if (json["BeerName"]) this.BeerName = json["BeerName"];
    if (json["Score"] !== NaN) this.Score = json["Score"];
    if (json["IsCustom"] != undefined) this.IsCustom = json["IsCustom"];
  }

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default BeerScore;
