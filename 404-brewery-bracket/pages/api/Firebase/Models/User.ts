import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The User's DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         UserID:
 *           type: string
 *           description: The User's associated Firebase auth ID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         Email:
 *           type: string
 *           description: The User's email.
 *           example: temp@hotmail.com
 *         Username:
 *           type: string
 *           description: The User's username.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         Groups:
 *           type: array
 *           items:
 *            type: string
 *           description: List of the User's Groups' DocumentIDs.
 *           example: ["hWWNwskdGOnEdq0KIQ3S", "hWWNwskdGOnEdq0KIQ3S", "hWWNwskdGOnEdq0KIQ3S"]
 */
class User implements IFirebaseDocument {
  private DocumentID: string;
  public UserID: string;
  public Email: string;
  public Username: string;
  public Groups: string[];

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["UserID"]) this.UserID = json["UserID"];
    if (json["Email"]) this.Email = json["Email"];
    if (json["Username"]) this.Username = json["Username"];
    if (json["Groups"]) this.Groups = json["Groups"];
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default User;
