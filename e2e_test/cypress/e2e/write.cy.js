beforeEach(() => {
  cy.request("http://localhost:3001/flush");
});

describe("Write", () => {
  it("Write an item", () => {
    cy.visit("/write");
    cy.get("#item-title").type("Test title");
    cy.get("#item-content").type("Test Content");
    cy.contains("Submit").click();

    // Redirect to the main page
    cy.url().should("not.contain", "write");

    cy.get("ul").should("have.lengthOf", 1);
  });
});
