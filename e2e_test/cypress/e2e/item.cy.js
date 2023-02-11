const testItem = {
  title: "Test title",
  content: "Test content!!!!",
};

beforeEach(() => {
  // Flush database before testing
  cy.request("http://localhost:3001/flush");

  // Add an item for testing
  cy.visit("/write");
  cy.get("#item-title").type(testItem.title);
  cy.get("#item-content").type(testItem.content);
  cy.contains("Submit").click();
});

describe("Item", () => {
  it("Access to an item", () => {
    cy.get("li").children("a").click();
    cy.url().should("include", "/item/0");

    cy.get("h1").contains(testItem.title);
    cy.get("pre").contains(testItem.content);
  });

  it("Access to invalid item", () => {
    cy.visit("/item/321");
    cy.contains("Item cannot be found");
  });
});
