describe('Blog App', () =>
{
	const	user =
	{
		username: 'piyumby',
		password: 'split1/2',
		name: 'Bumby'
	}

	const	secondUser =
	{
		username: 'testuser',
		password: 'testuser',
		name: 'testuser'
	}

	beforeEach(() =>
	{
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser);
		cy.visit('');
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

	describe('When logged in', () =>
	{
		const	blog =
		{
			title: 'Test Title',
			author: 'Test Author',
			url: 'e2e.com'
		}

		beforeEach(() =>
		{
			cy.login(user);
		})

		describe('A blog can be created', () =>
		{
			it('through the form', () =>
			{
				cy.contains('create blog').click();
				cy.get('form').within(() =>
				{
					cy.get('input[name="title"]')
						.type(blog.title);
					cy.get('input[name="author"]')
						.type(blog.author);
					cy.get('input[name="url"]')
						.type(blog.url);
					cy.contains('create').click();
				})
				cy.get('html')
					.should('contain', 'Test Title')
					.and('contain', 'Test Author');
			})

			it('directly through the backend', () =>
			{
				cy.createBlog(blog);
				cy.get('html')
					.should('contain', 'Test Title')
					.and('contain', 'Test Author');
			})
		})

		it('A blog can be liked', () =>
		{
			cy.createBlog(blog);
			cy.get('.toggle-button').click();
			cy.get('.likes-button').click();
			cy.get('html')
				.should('contain', 'likes 1');
		})

		describe('Blog deletion', () =>
		{
			beforeEach(() =>
			{
				cy.createBlog(blog);

			})

			it('user who created a blog can delete it', () =>
			{
				cy.get('.toggle-button').click();
				cy.get('.delete-button').click();
				cy.get('html')
					.should('not.contain', 'Test Author');
			})

			it('user who is not owner of a blog cannot delete it', () =>
			{
				cy.get('.logout-button').click();
				cy.login(secondUser);
				cy.get('.toggle-button').click();
				cy.get('.delete-button')
					.should('have.css', 'display', 'none');
			})
		})

		it('Blogs are sorted by most likes', () =>
		{
			const	blog =
			{
				title: 'Test Title1',
				author: 'Test Author1',
				url: 'e2e.com',
				likes: 20
			}
			const	blog2 =
			{
				title: 'Test Title2',
				author: 'Test Author2',
				url: 'e2e.com',
				likes: 10
			}
			const	blog3 =
			{
				title: 'Test Title3',
				author: 'Test Author3',
				url: 'e2e.com',
				likes: 5
			}

			cy.createBlog(blog2);
			cy.createBlog(blog3);
			cy.createBlog(blog);
			cy.get('.blog-title').eq(0).should('contain', 'Test Title1');
			cy.get('.blog-title').eq(1).should('contain', 'Test Title2');
			cy.get('.blog-title').eq(2).should('contain', 'Test Title3');
		})
	})
})