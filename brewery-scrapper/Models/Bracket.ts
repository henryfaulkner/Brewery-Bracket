import { stringify } from "querystring";
import IFirebaseDocument from "./IFirebaseDocument";

class Bracket implements IFirebaseDocument {
  public DocumentID: string;
  public BracketName: string;
  public GroupID: string;

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["BracketName"]) this.BracketName = json["BracketName"];
    if (json["GroupID"]) this.GroupID = json["GroupID"];
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default Bracket;
