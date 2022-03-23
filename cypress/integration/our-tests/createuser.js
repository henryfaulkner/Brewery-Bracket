/// <reference types="cypress" />

describe("Attempt User Creation.", () => {
  beforeEach(() => {
    // visit login page
    cy.visit("http://localhost:3000/login-form");
  });

  it("Should attempt user creation.", () => {
    cy.get("[data-cy=email]").type("testingbot289326@gmail.com");
    cy.get("[data-cy=password]").type("microsoftstealsdata");
    cy.get("[data-cy=createuser]").click();
    cy.visit("http://localhost:3000/account");
    cy.get("h3").contains("testingbot289325@gmail.com").should("exist");
  });
});
