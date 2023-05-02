import { aliasMutation, aliasQuery } from "../utils/graphql-test-utils";
import { faker } from "@faker-js/faker/locale/id_ID";

describe(
  "Authentication Test",
  { env: { baseApiUrl: "https://apollo-server.vercel.app/" } },
  () => {
    const email = "zylcom@dev.com";
    const password = "rahasia123";
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email();
    const randomPhoneNumber = faker.phone.number("0882 #### ####");
    const registerPassword = "123123123";

    beforeEach(() => {
      cy.log(Cypress.env("baseApiUrl"));

      cy.intercept("POST", Cypress.env("baseApiUrl"), (req) => {
        aliasQuery(req, "Login");
        aliasQuery(req, "GetMyProfile");
        aliasMutation(req, "Register");
      });

      cy.intercept("GET", "https://ip2c.org/s").as("getLocationByIP");
    });

    it("should not allowed to request GetMyProfile if user not logged in", () => {
      cy.visit("/login");

      cy.wait("@gqlGetMyProfileQuery")
        .its("response.body.data.getMyProfile.__typename")
        .should("eq", "UserError");
    });

    it("should fail to login if email is invalid", () => {
      cy.visit("/login");

      cy.getBySel("email-input").type("email");
      cy.getBySel("password-input").type(password);
      cy.getBySel("form-login").submit();

      cy.wait("@gqlLoginQuery")
        .its("response.body.data.authenticate.__typename")
        .should("eq", "AuthFailed");
    });

    it("should fail to login if email is wrong", () => {
      cy.visit("/login");

      cy.getBySel("email-input").type("email@gmail.com");
      cy.getBySel("password-input").type(password);
      cy.getBySel("form-login").submit();

      cy.wait("@gqlLoginQuery")
        .its("response.body.data.authenticate.__typename")
        .should("eq", "AuthFailed");

      cy.contains("Invalid credentials!").should("be.visible");
    });

    it("should fail to login if password is wrong", () => {
      cy.visit("/login");

      cy.getBySel("email-input").type(email);
      cy.getBySel("password-input").type("password");
      cy.getBySel("form-login").submit();

      cy.wait("@gqlLoginQuery")
        .its("response.body.data.authenticate.__typename")
        .should("eq", "AuthFailed");

      cy.contains("Invalid credentials!").should("be.visible");
    });

    it("should allow a user to login", () => {
      cy.visit("/login");

      cy.getBySel("email-input").type(email);
      cy.getBySel("password-input").type(password);
      cy.getBySel("form-login").submit();

      cy.wait("@gqlLoginQuery")
        .its("response.body.data.authenticate")
        .should("have.property", "token");

      cy.url().should("eq", "http://localhost:4173/");
    });

    it("should fail register if email already in use", () => {
      cy.visit("/register");

      cy.getBySel("name-input").type(randomName);
      cy.getBySel("email-input").type(email);

      cy.wait("@getLocationByIP");

      cy.get("#phone-number-input").type(randomPhoneNumber);
      cy.getBySel("password-input").type(registerPassword);
      cy.getBySel("confirm-password-input").type(registerPassword);
      cy.getBySel("form-register").submit();

      cy.wait("@gqlRegisterMutation")
        .its("response.body.data.registerUser.message")
        .should("eq", `Email ${email} already in use!`);

      cy.contains(`Email ${email} already in use!`).should("be.visible");
    });

    it("should fail register if phone number is invalid", () => {
      cy.visit("/register");

      cy.getBySel("name-input").type(randomName);
      cy.getBySel("email-input").type(randomEmail);

      cy.wait("@getLocationByIP");

      cy.get("#phone-number-input").type("123123123123123");
      cy.getBySel("password-input").type(registerPassword);
      cy.getBySel("confirm-password-input").type(registerPassword);
      cy.getBySel("form-register").submit();

      cy.wait("@gqlRegisterMutation")
        .its("response.body.data.registerUser.message")
        .should("eq", "Phone number is invalid!");
    });

    it("should fail register if password length less than 8", () => {
      cy.visit("/register");

      cy.getBySel("name-input").type(randomName);
      cy.getBySel("email-input").type(randomEmail);

      cy.wait("@getLocationByIP");

      cy.get("#phone-number-input").type(randomPhoneNumber);
      cy.getBySel("password-input").type("123");
      cy.getBySel("confirm-password-input").type("123");
      cy.getBySel("form-register").submit();

      cy.wait("@gqlRegisterMutation")
        .its("response.body.data.registerUser.message")
        .should("eq", "Password length must 8 or above!");

      cy.contains("Password length must 8 or above!").should("be.visible");
    });

    it("should fail register if password and confirmation password not equal", () => {
      cy.visit("/register");

      cy.getBySel("name-input").type(randomName);
      cy.getBySel("email-input").type(randomEmail);

      cy.wait("@getLocationByIP");

      cy.get("#phone-number-input").type(randomPhoneNumber);
      cy.getBySel("password-input").type("123");
      cy.getBySel("confirm-password-input").type("1");
      cy.getBySel("form-register").submit();

      cy.wait("@gqlRegisterMutation")
        .its("response.body.data.registerUser.message")
        .should("eq", "Password and confirmation password are not match!");

      cy.contains("Password and confirmation password are not match!").should(
        "be.visible"
      );
    });

    it("should allow user to register new account", () => {
      cy.visit("/register");

      cy.getBySel("name-input").type(randomName);
      cy.getBySel("email-input").type(randomEmail);

      cy.wait("@getLocationByIP");

      cy.get("#phone-number-input").type(randomPhoneNumber);
      cy.getBySel("password-input").type(registerPassword);
      cy.getBySel("confirm-password-input").type(registerPassword);
      cy.getBySel("form-register").submit();

      cy.wait("@gqlRegisterMutation")
        .its("response.body.data.registerUser")
        .should("have.property", "token");

      cy.url().should("eq", "http://localhost:4173/");
    });

    it("should allow a user to login with new account", () => {
      cy.visit("/login");

      cy.getBySel("email-input").type(randomEmail);
      cy.getBySel("password-input").type(registerPassword);
      cy.getBySel("form-login").submit();

      cy.wait("@gqlLoginQuery")
        .its("response.body.data.authenticate")
        .should("have.property", "token");

      cy.url().should("eq", "http://localhost:4173/");
    });
  }
);
