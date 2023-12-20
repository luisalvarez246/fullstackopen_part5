// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- This will bypass login UI --
Cypress.Commands.add('login', (user) =>
{
	cy.request('POST', `${Cypress.env('BACKEND')}/login`, user)
		.then(({ body }) =>
		{
			localStorage.setItem('loggedUser', JSON.stringify(body));
			cy.visit('');
		})
})

// -- This will add a new blog directly through --
Cypress.Commands.add('createBlog', ({ title, author, url }) =>
{
	cy.request(
		{
			url: `${Cypress.env('BACKEND')}/blogs`,
			method: 'POST',
			body: { title, author, url },
			headers:
			{
				Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
			}
		})
	cy.visit('');
})