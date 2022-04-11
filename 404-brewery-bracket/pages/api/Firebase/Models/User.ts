import IFirebaseDocument from "./IFirebaseDocument";

class User implements IFirebaseDocument {
  private DocumentID: string;
  public UserID: string;
  public Email: string;
  public Groups: JSON[];

  public constructor(json) {
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
    if (json["UserID"]) this.UserID = json["UserID"];
    if (json["Email"]) this.Email = json["Email"];
    if (json["Groups"]) this.Groups = json["Groups"];
  }

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default User;
