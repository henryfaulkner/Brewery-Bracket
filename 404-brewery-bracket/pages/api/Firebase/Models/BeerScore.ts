import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     BeerScore:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The BeerScore DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedScorecardID:
 *           type: string
 *           description: The parent Scorecard's DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedBeerID:
 *           type: string
 *           description: The rated Beer's DocumentID.
 *           example: 5AMl62z2XDmgrh2XsI2O
 *         BeerName:
 *           type: string
 *           description: The rated beer's name.
 *           example: Ukiyo Premium Lager Beer
 *         Score:
 *           type: integer
 *           description: The given score.
 *           example: 5
 */
class BeerScore implements IFirebaseDocument {
  private DocumentID: string;
  public AssociatedScorecardID: string;
  public AssociatedBeerID: string;
  public BeerName: string;
  public Score: number;

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["AssociatedScorecardID"])
      this.AssociatedScorecardID = json["AssociatedScorecardID"];
    if (json["AssociatedBeerID"])
      this.AssociatedBeerID = json["AssociatedBeerID"];
    if (json["BeerName"]) this.BeerName = json["BeerName"];
    if (json["Score"] !== NaN) this.Score = json["Score"];
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default BeerScore;
