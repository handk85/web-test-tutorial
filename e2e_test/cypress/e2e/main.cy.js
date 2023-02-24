beforeEach(() => {
  cy.request("http://localhost:3001/flush");
});

describe("Write view test", () => {
  it("Wrtie an item", () => {
    cy.visit("http://localhost:3000/write");
    cy.get("#item-title").type("Test title");
    cy.get("#item-content").type("Test content");
    cy.contains("Submit").click();

    cy.url().should("not.contain", "write");

    cy.get("ul").should("have.lengthOf", 1);
  });
});
