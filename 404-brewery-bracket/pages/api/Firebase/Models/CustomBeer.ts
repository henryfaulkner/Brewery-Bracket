import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomBeer:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The CustomBeer DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedBreweryID:
 *           type: string
 *           description: The associated BreweryObject DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         AssociatedBreweryName:
 *           type: string
 *           description: The associated brewery's name.
 *           example: Creature Comforts Brewing Company
 *         ABV:
 *           type: string
 *           description: The beer's ABV.
 *           example: 6.6%
 *         Description:
 *           type: string
 *           description: The beer's description.
 *           example: Balanced, soft, and juicy. Hopped with Citra, Centennial, and Galaxy.
 *         IBU:
 *           type: string
 *           description: The beer's IBU.
 *           example: 65
 *         Name:
 *           type: string
 *           description: The beer's name.
 *           example: Tropicalia
 *         Style:
 *           type: string
 *           description: The beer's brew-style.
 *           example: India Pale Ale
 */
class BreweryDay implements IFirebaseDocument {
  public DocumentID: string;
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

export default BreweryDay;
