import IFirebaseDocument from "./IFirebaseDocument";

class User implements IFirebaseDocument {
  private DocumentID: string;
  public UserID: string;
  public Email: string;
  public Username: string;
  public Groups: JSON[];

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
