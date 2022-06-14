import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     BreweryDayScorecard:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The BreweryDayScorecard DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedBracketID:
 *           type: string
 *           description: The associated Bracket's DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedBreweryID:
 *           type: string
 *           description: The associated BreweryObject DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedBreweryName:
 *           type: string
 *           description: The associated brewery's name.
 *           example: Creature Comforts Brewing Company
 *         AssociatedUserID:
 *           type: string
 *           description: The asscoiated User's DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AverageBeerScore:
 *           type: string
 *           description: The average score, aggregated from BeerScore(s), EnvironmentScore, and LocationScore.
 *           example: 4.5
 *         EnvironmentScore:
 *           type: string
 *           description: The User's rating for the brewery's environment.
 *           example: 4
 *         LocationScore:
 *           type: string
 *           description:  The User's rating for the brewery's location convenience.
 *           example: 3
 */
class BreweryDayScorecard implements IFirebaseDocument {
  public DocumentID: string;
  public AssociatedBracketID: string;
  public AssociatedBreweryID: string;
  public AssociatedBreweryName: string;
  public AssociatedUserID: string;
  public AverageBeerScore: number;
  public EnvironmentScore: number;
  public LocationScore: number;

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["AssociatedBracketID"])
      this.AssociatedBracketID = json["AssociatedBracketID"];
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

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default BreweryDayScorecard;
