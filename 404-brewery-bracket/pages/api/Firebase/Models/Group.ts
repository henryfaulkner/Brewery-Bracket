import IFirebaseDocument from "./IFirebaseDocument";

class Group implements IFirebaseDocument {
  private DocumentID: string;
  public Users: string[]; //Document IDs

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["Users"]) {
      this.Users = json["Users"];
    }
  }

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default Group;
