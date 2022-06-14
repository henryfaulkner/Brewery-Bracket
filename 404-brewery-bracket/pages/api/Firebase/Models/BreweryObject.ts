import IFirebaseDocument from "./IFirebaseDocument";

/**
 * @swagger
 * components:
 *   schemas:
 *     BreweryObject:
 *       type: object
 *       properties:
 *         DocumentID:
 *           type: string
 *           description: The BreweryObject DocumentID.
 *           example: hWWNwskdGOnEdq0KIQ3S
 *         Name:
 *           type: string
 *           description: The brewery's name.
 *           example: "Creature Comfort Brewery"
 *         Description:
 *           type: string
 *           description: Full description of brewery.
 *           example: "It's a great brewery in Athens, GA. Go Dawgs!"
 *         Short_Description:
 *           type: string
 *           description: Abbreviated description of brewery.
 *           example: "A brewery in Athens, GA. Go Dawgs!"
 *         Url:
 *           type: string
 *           description: Brewery's website url.
 *           example: https://creaturecomfortsbeer.com/
 *         Facebook_Url:
 *           type: string
 *           description: Brewery's Facebook url.
 *           example: https://www.facebook.com/CreatureComfortsBeer/
 *         Twitter_Url:
 *           type: string
 *           description: Brewery's Twitter url.
 *           example: https://mobile.twitter.com/creaturebeer
 *         Instagram_Url:
 *           type: string
 *           description: Brewery's Instagram url.
 *           example: https://www.instagram.com/creaturecomfortsbeer/
 *         Address:
 *           type: string
 *           description: Brewery's address.
 *           example: 271 W Hancock Ave, Athens, GA 30601
 */
class BreweryObject implements IFirebaseDocument {
  public DocumentID: string;
  public Name: string;
  public Description: string;
  public Short_Description: string;
  public Url: string;
  public Facebook_Url: string;
  public Twitter_Url: string;
  public Instagram_Url: string;
  public Address: string;

  public constructor(json) {
    this.Name = json["Name"];
    this.Description = json["Description"];
    this.Short_Description = json["Short_Description"];
    this.Url = json["Url"];
    this.Facebook_Url = json["Facebook_Url"];
    this.Twitter_Url = json["Twitter_Url"];
    this.Instagram_Url = json["Instagram_Url"];
    this.Address = json["Address"];
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default BreweryObject;
