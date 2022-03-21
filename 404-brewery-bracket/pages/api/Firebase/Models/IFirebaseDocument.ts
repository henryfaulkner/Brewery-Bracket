interface IFirebaseDocument {
  GetDocumentID: () => string;
  SetDocumentID: (string) => void;
}

export default IFirebaseDocument;
