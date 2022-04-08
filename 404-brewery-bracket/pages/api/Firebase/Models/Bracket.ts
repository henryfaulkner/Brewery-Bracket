import IFirebaseDocument from "./IFirebaseDocument";

class Bracket implements IFirebaseDocument {
  private DocumentID: string;
  public BracketName: string;
  public GroupID: string;

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["BracketName"]) this.BracketName = json["BracketName"];
    if (json["GroupID"]) this.GroupID = json["GroupID"];
  }

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default Bracket;
