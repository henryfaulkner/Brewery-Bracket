import { stringify } from "querystring";
import { CustomBeers } from "../CollectionConstants";
import BreweryObject from "./BreweryObject";
import IFirebaseDocument from "./IFirebaseDocument";

class Bracket implements IFirebaseDocument {
  public DocumentID: string;
  public BracketName: string;
  public GroupID: string;
  public Breweries: BreweryObject[];

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["BracketName"]) this.BracketName = json["BracketName"];
    if (json["GroupID"]) this.GroupID = json["GroupID"];
    if (json["Breweries"]) {
      this.Breweries = json["Breweries"].map((breweryJson: {}) => {
        return new BreweryObject(breweryJson)
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
