import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The Group's DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         Users:
 *           type: array
 *           items:
 *            type: string
 *           description: List of Group's Users' DocumentIDs.
 *           example: ["hWWNwskdGOnEdq0KIQ3S", "hWWNwskdGOnEdq0KIQ3S", "hWWNwskdGOnEdq0KIQ3S"]
 */
class Group implements IFirebaseDocument {
  private DocumentID: string;
  public Users: string[]; //Document IDs

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["Users"]) {
      this.Users = json["Users"];
    }
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default Group;
