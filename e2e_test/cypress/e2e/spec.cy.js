describe("Main page", () => {
  it("visit the main page", () => {
    cy.visit("/");
    cy.get("h2").first().contains("Items");
    cy.contains("No items found");
  });

  it("Click write button", () => {
    cy.visit("/");

    cy.contains("Write").click();

    cy.url().should("include", "/write");
  });
});
