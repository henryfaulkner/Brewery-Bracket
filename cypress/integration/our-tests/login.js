/// <reference types="cypress" />

describe("Attempt Login.", () => {
  beforeEach(() => {
    // visit login page
    cy.visit("http://localhost:3000/login-form");
  });

  it("Should attempt login.", () => {
    cy.get("[data-cy=email]").type("testingbot289326@gmail.com");
    cy.get("[data-cy=password]").type("microsoftstealsdata");
    cy.get("[data-cy=login]").click();
    cy.visit("http://localhost:3000/account");
    cy.get("h3").contains("testingbot289326@gmail.com").should("exist");
  });
});
