import IFirebaseDocument from "./IFirebaseDocument";

class BreweryObject implements IFirebaseDocument {
  public id: string;
  public name: string;
  public Description: string;
  public Short_Description: string;
  public Url: string;
  public Facebook_Url: string;
  public Twitter_Url: string;
  public Instagram_Url: string;
  public Address: string;
  public UntappdBreweryUid: string;

  public constructor(json) {
    this.name = json["name"];
    this.Description = json["Description"];
    this.Short_Description = json["Short_Description"];
    this.Url = json["Url"];
    this.Facebook_Url = json["Facebook_Url"];
    this.Twitter_Url = json["Twitter_Url"];
    this.Instagram_Url = json["Instagram_Url"];
    this.Address = json["Address"];
    this.UntappdBreweryUid = json["UntappdBreweryUid"];
    if (json["id"]) this.id = json["id"];
  }

  get GetDocumentID(): string {
    return this.id;
  }

  set SetDocumentID(DocumentID: string) {
    this.id = DocumentID;
  }
}

export default BreweryObject;
