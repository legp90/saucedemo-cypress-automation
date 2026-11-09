import LoginPage from '../support/pages/LoginPage'
const loginPage = new LoginPage()
describe('Pruebas de Login', () => {
    let userData;

beforeEach(() => {
  cy.fixture("users").then((data) => {
    userData = data
  });
});
    beforeEach(() => {
    loginPage.visit()
        })
    
    it('debe redirigir al inventario de productos cuando las credenciales son validas', () => {    
        loginPage.login(userData.standardUser.username, userData.standardUser.password)
        cy.url().should('include', 'inventory.html')
        })
    
    it('debe exigir el nombre de usuario cuando los campos estan vacios', () => {    
        loginPage.login("", "")
        loginPage.loginButton.click()
        loginPage.errorMessage.should('be.visible').and('include.text', 'Username is required')
        })

    it('debe exigir la contraseña cuando este campo esta vacio', () => {
        loginPage.login(userData.standardUser.username, "")
        loginPage.errorMessage.should('be.visible').and('include.text', 'Password is required')
        })

    it('debe mostrar error cuando la contraseña no coincide', () => {
        loginPage.login(userData.standardUser.username, "SECRET_SAUCE")
        loginPage.errorMessage.should('be.visible').and('include.text', 'Username and password do not match')
        cy.url().should("not.include", "inventory.html")
        })
        
    it('debe restringir el ingreso y mostrar error cuando la cuenta este bloqueada', () => {
        loginPage.login(userData.lockedOutUser.username, userData.lockedOutUser.password)
        loginPage.errorMessage.should('be.visible').and('include.text', 'Sorry, this user has been locked out')
        cy.url().should("not.include", "inventory.html")
        })
    }) 
    