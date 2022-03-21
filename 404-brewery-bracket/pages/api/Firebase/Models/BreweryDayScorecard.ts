import IFirebaseDocument from "./IFirebaseDocument";

class BreweryDay implements IFirebaseDocument {
  private DocumentID: string;
  public AssociatedBreweryDayID: string;
  public AssociatedBreweryID: string;
  public AssociatedBreweryName: string;
  public AssociatedUserID: string;
  public BeerScoreAggregate: number;
  public EnvironmentScore: number;
  public LocationScore: number;

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default BreweryDay;
