describe("app", () => {
  it("subscribes to a custom feed", () => {
    cy.visit("/");
    cy.contains("button", "New feed").should("be.visible").click();

    cy.contains("Subscribe to new feed").should("be.visible");
    cy.get("#url").type("https://smashingmagazine.com/feed");
    cy.get("button").contains("Subscribe").click();
    cy.get("#feed-items li").first().click();
  });

  it("subscribes to a random feed", () => {
    cy.visit("/");
    cy.contains("button", "New feed").should("be.visible").click();

    cy.contains("Subscribe to new feed").should("be.visible");
    cy.get("button").contains("Add random feed").click();
    cy.get("#feed-items li").first().click();
  });

  it("displays an error when trying to subscribe to an invalid feed", () => {
    cy.visit("/");
    cy.contains("button", "New feed").should("be.visible").click();

    cy.contains("Subscribe to new feed").should("be.visible");
    cy.get("#url").type("lol");
    cy.get("button").contains("Subscribe").click();
    cy.contains("Error");
  });
});
