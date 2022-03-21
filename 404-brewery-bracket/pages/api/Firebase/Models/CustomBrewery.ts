import IFirebaseDocument from "./IFirebaseDocument";

class CustomBrewery implements IFirebaseDocument {
  private DocumentID: string;
  public Name: string;
  public Description: string;
  public Short_Description: string;
  public Url: string;
  public Facebook_Url: string;
  public Twitter_Url: string;
  public Instagram_Url: string;
  public Address: string;

  public constructor(
    Name: string,
    Description: string,
    Short_Description: string,
    Url: string,
    Facebook_Url: string,
    Twitter_Url: string,
    Instagram_Url: string,
    Address: string,
    DocumentID?: string
  ) {
    this.Name = Name;
    this.Description = Description;
    this.Short_Description = Short_Description;
    this.Url = Url;
    this.Facebook_Url = Facebook_Url;
    this.Twitter_Url = Twitter_Url;
    this.Instagram_Url = Instagram_Url;
    this.Address = Address;
    if (DocumentID) this.DocumentID = DocumentID;
  }

  public GetDocumentID(): string {
    return this.DocumentID;
  }

  public SetDocumentID(DocumentID: string): void {
    this.DocumentID = DocumentID;
  }
}

export default CustomBrewery;
