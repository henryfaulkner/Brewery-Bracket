import IFirebaseDocument from "./IFirebaseDocument";

class CustomBrewery implements IFirebaseDocument {
  public DocumentID: string;
  public Name: string;
  public Description: string;
  public Short_Description: string;
  public Url: string;
  public Facebook_Url: string;
  public Twitter_Url: string;
  public Instagram_Url: string;
  public Address: string;
  public BeerListUrl: string;
  public IsScrapped: boolean;

  public constructor(json) {
    this.Name = json["Name"];
    this.Description = json["Description"];
    this.Short_Description = json["Short_Description"];
    this.Url = json["Url"];
    this.Facebook_Url = json["Facebook_Url"];
    this.Twitter_Url = json["Twitter_Url"];
    this.Instagram_Url = json["Instagram_Url"];
    this.Address = json["Address"];
    this.BeerListUrl = json["BeerListUrl"];
    this.IsScrapped = json["IsScrapped"];
    if (json["DocumentID"]) this.DocumentID = json["DocumentID"];
  }

  get GetDocumentID(): string {
    return this.DocumentID;
  }

  set SetDocumentID(DocumentID: string) {
    this.DocumentID = DocumentID;
  }
}

export default CustomBrewery;
