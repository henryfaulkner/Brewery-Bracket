import { stringify } from "querystring";
import { CustomBeers } from "../CollectionConstants";
import BracketsBreweryObject from "./BracketsBreweryObject";
import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     Bracket:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The Bracket DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         BracketName:
 *           type: string
 *           description: The Bracket's name.
 *           example: Perficient brewery bracket
 *         GroupID:
 *           type: string
 *           description: The Group created for this bracket's DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         Breweries:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/BreweryObject'
 *           description: List of breweries added to bracket.
 *           example: []
 */
class Bracket implements IFirebaseDocument {
  public DocumentID: string;
  public BracketName: string;
  public GroupID: string;
  public Breweries: BracketsBreweryObject[];

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["BracketName"]) this.BracketName = json["BracketName"];
    if (json["GroupID"]) this.GroupID = json["GroupID"];
    if (json["Breweries"]) {
      this.Breweries = json["Breweries"].map((breweryJson: {}) => {
        return new BracketsBreweryObject(breweryJson)
      })
    }
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default Bracket;
