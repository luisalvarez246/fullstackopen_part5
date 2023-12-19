describe('Blog App', () =>
{
	const	user =
	{
		username: 'piyumby',
		password: 'split1/2',
		name: 'Bumby'
	}

	beforeEach(() =>
	{
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		cy.request('POST', 'http://localhost:3003/api/users', user);
		cy.visit('http://localhost:5173');
	})

	it('front page can be opened', () =>
	{
		cy.contains('log in to application');
	})

	it('frontpage shows login form', () =>
	{
		cy.get('form').within(() =>
		{
			cy.get('input[name="username"]')
				.should('exist')
				.should('have.attr', 'type', 'text');
			cy.get('input[name="password"]')
				.should('exist')
				.should('have.attr', 'type', 'password');
			cy.get('#login-button')
				.should('exist')
				.should('have.attr', 'type', 'submit');
		})
	})

	describe('Login functionality', () =>
	{
		it('succeeds with correct credentials', () =>
		{
			cy.get('#username').type(user.username);
			cy.get('#password').type(user.password);
			cy.get('#login-button').click();

			cy.contains(`${user.username} logged in`);
		})

		it('fails with wrong credentials', () =>
		{
			cy.get('#username').type('incorrect');
			cy.get('#password').type('unknown');
			cy.get('#login-button').click();

			cy.get('.error')
				.should('have.css', 'color', 'rgb(255, 0, 0)');
			cy.contains('incorrect logged in')
				.should('not.exist');
		})
	})
})