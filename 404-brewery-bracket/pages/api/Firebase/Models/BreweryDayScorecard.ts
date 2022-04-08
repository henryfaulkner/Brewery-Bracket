import IFirebaseDocument from "./IFirebaseDocument";

class BreweryDayScorecard implements IFirebaseDocument {
  public DocumentID: string;
  public AssociatedBreweryDayID: string;
  public AssociatedBreweryID: string;
  public AssociatedBreweryName: string;
  public AssociatedUserID: string;
  public AverageBeerScore: number;
  public EnvironmentScore: number;
  public LocationScore: number;

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["AssociatedBreweryDayID"])
      this.AssociatedBreweryDayID = json["AssociatedBreweryDayID"];
    if (json["AssociatedBreweryID"])
      this.AssociatedBreweryID = json["AssociatedBreweryID"];
    if (json["AssociatedBreweryName"])
      this.AssociatedBreweryName = json["AssociatedBreweryName"];
    if (json["AssociatedUserID"])
      this.AssociatedUserID = json["AssociatedUserID"];
    if (json["AverageBeerScore"] !== NaN)
      this.AverageBeerScore = json["AverageBeerScore"];
    if (json["EnvironmentScore"] !== NaN)
      this.EnvironmentScore = json["EnvironmentScore"];
    if (json["LocationScore"] !== NaN)
      this.LocationScore = json["LocationScore"];
  }

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default BreweryDayScorecard;
