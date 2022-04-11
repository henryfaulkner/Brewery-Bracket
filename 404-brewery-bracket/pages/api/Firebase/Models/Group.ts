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

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default Group;
