describe("Home Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display the Marvel logo and header text", () => {
    // cy.get("header img").should("have.attr", "src").and("include", "logo.svg");
    cy.get("header h1").should("contain", "EXPLORE O UNIVERSO");
    cy.get("header p").should("contain", "Mergulhe no domínio deslumbrante");
  });

  it("should toggle order by name", () => {
    cy.get('[data-testid="order-toggle"]').click();
    cy.get('[aria-label="Lista de personagens"]').should("contain", "Zzzax");
  });

  it("should search for characters", () => {
    cy.get('input[placeholder="Procure por heróis"]').type("Hulk");
    cy.get('[aria-label="Lista de personagens"]').should("contain", "Hulk");
  });

  it("should toggle the favorites filter", () => {
    cy.get('button[aria-label="Aplicar filtro de favoritos"]').click();
    cy.get('[aria-label="Lista de personagens"]').should("not.exist");
    cy.get('button[aria-label="Remover filtro de favoritos"]').click();
    cy.get('[aria-label="Lista de personagens"]').should("exist");
  });

  it("should paginate through characters", () => {
    cy.get('[aria-label="Paginação"] button').contains("2").click();
    cy.get('[aria-label="Lista de personagens"]').should("exist");
    cy.get('[aria-label="Paginação"] button').contains("1").click();
    cy.get('[aria-label="Lista de personagens"]').should("exist");
  });
});
