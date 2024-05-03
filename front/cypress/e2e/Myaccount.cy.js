/* eslint-disable no-undef */

/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    // cy.visit('http://127.0.0.1:8080/')
    cy.request({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/signin/',
        body: {
            email: 'cheburek@h1892at.com',
            password: '123'
        }
    }).then((response) => {
        const token = response.body.tokens.access
        Cypress.env('access', response.body.tokens.access);
        Cypress.env('refresh', response.body.tokens.refresh);
        Cypress.env('user_id', response.body.id);
        Cypress.env('mock-access-token', response.body.tokens.access);
        Cypress.env('mock-refresh-token', response.body.tokens.refresh);
        Cypress.env('mock-user-id', response.body.id);
        
        Cypress.env('token', `Bearer ${token}`)
        
    })
})

function addAuthorizationHeader(req) {
    const token = Cypress.env('token');
    req.headers['Authorization'] = token;
    req.headers['authorization'] = token;
    
}

Cypress.Commands.add('loginViaStore', () => {
  cy.window().then(win => {
    // Access the store from the window object
    
    cy.wait(200)
    const store = window.__appStore__;
    // Commit mutation or dispatch action to update the store's state
    store.commit('updateStorage', {
      access: Cypress.env('mock-access-token'),
      refresh: Cypress.env('mock-refresh-token'),
      user_id: Cypress.env('mock-user-id')
    });

    // Optionally, save the state to localStorage if VuexPersist is used
    localStorage.setItem('super-calculator', JSON.stringify({
      refreshToken: Cypress.env('mock-refresh-token'),
      accessToken: Cypress.env('mock-access-token'),
      user_id: Cypress.env('mock-user-id'),
    }));
  });
});

beforeEach(() => {
    cy.login()
    // cy.loginViaStore()
})

describe('empty spec', () => {
    it('passes', () => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/registration')
        cy.visit('http://127.0.0.1:8080/login')
        cy.visit('http://127.0.0.1:8080/about')
        cy.visit('http://127.0.0.1:8080/myaccount.html')
    })
})

describe('Text', () => {
    it('Visits the app root url', () => {
        cy.visit('http://127.0.0.1:8080/')
        cy.intercept('*', addAuthorizationHeader);

        

        cy.visit('http://127.0.0.1:8080/myaccount.html')
        cy.wait(200)
        
        cy.get('#aboutmeTable').find('tr')
        .should('have.length.of.at.least', 1);
    })
})

context('Window', () => {

    it('cy.window() - get the global window object', () => {
        
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')
        cy.window().should('have.property', 'top')
    })

    it('cy.document() - get the document object', () => {
        
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })

    it('cy.title() - get the title', () => {
        
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')
        
    })
})


context('Viewport', () => {
   
    it('cy.viewport() - set the viewport size and dimension', () => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html/')

       
        cy.viewport(2999, 2999)

        

        cy.viewport('macbook-15')
        cy.wait(200)
        cy.viewport('macbook-13')
        cy.wait(200)
        cy.viewport('macbook-11')
        cy.wait(200)
        cy.viewport('ipad-2')
        cy.wait(200)
        cy.viewport('ipad-mini')
        cy.wait(200)
        cy.viewport('iphone-6+')
        cy.wait(200)
        cy.viewport('iphone-6')
        cy.wait(200)
        cy.viewport('iphone-5')
        cy.wait(200)
        cy.viewport('iphone-4')
        cy.wait(200)
        cy.viewport('iphone-3')
        cy.wait(200)

        
        cy.viewport('ipad-2', 'portrait')
        cy.wait(200)
        cy.viewport('iphone-4', 'landscape')
        cy.wait(200)

        
    })
})

context('Utilities', () => {
    beforeEach(() => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')
    })

    it('Cypress._ - call a lodash method', () => {
        // https://on.cypress.io/_
        cy.request('https://jsonplaceholder.cypress.io/users')
            .then((response) => {
                let ids = Cypress._.chain(response.body).map('id').take(3).value()

                expect(ids).to.deep.eq([1, 2, 3])
            })
    })

    it('Cypress.Promise - instantiate a bluebird promise', () => {
        // https://on.cypress.io/promise
        let waited = false

        /**
         * @return Bluebird<string>
         */
        function waitOneSecond() {
            // return a promise that resolves after 1 second
            return new Cypress.Promise((resolve, reject) => {
                setTimeout(() => {
                    // set waited to true
                    waited = true

                    // resolve with 'foo' string
                    resolve('foo')
                }, 1000)
            })
        }

        cy.then(() => {
            
            return waitOneSecond().then((str) => {
                expect(str).to.eq('foo')
                expect(waited).to.be.true
            })
        })
    })
})

context('Navigation', () => {
    beforeEach(() => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')
    })

    it('cy.reload() - reload the page', () => {
        // https://on.cypress.io/reload
        cy.wait(200)
        cy.reload()
        cy.wait(200)
        // reload the page without using the cache
        cy.reload(true)
    })

    it('cy.visit() - visit a remote url', () => {
       
        cy.visit('http://127.0.0.1:8080/myaccount.html', {
            timeout: 100000, // increase total time for the visit to resolve
            onBeforeLoad(contentWindow) {
                // contentWindow is the remote page's window object
                expect(typeof contentWindow === 'object').to.be.true
            },
            onLoad(contentWindow) {
                // contentWindow is the remote page's window object
                expect(typeof contentWindow === 'object').to.be.true
            },
        })
    })
})

context('Spies, Stubs, and Clock', () => {
    it('cy.spy() - wrap a method in a spy', () => {
        // https://on.cypress.io/spy
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')

        const obj = {
            foo() {
            },
        }

        const spy = cy.spy(obj, 'foo').as('anyArgs')

        obj.foo()

        expect(spy).to.be.called
    })

    it('cy.spy() retries until assertions pass', () => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')

        const obj = {
            /**
             * Prints the argument passed
             * @param x {any}
             */
            foo(x) {
                console.log('obj.foo called with', x)
            },
        }

        cy.spy(obj, 'foo').as('foo')

        setTimeout(() => {
            obj.foo('first')
        }, 500)

        setTimeout(() => {
            obj.foo('second')
        }, 2500)

        cy.get('@foo').should('have.been.calledTwice')
    })

    it('cy.stub() - create a stub and/or replace a function with stub', () => {
        // https://on.cypress.io/stub
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')

        const obj = {
            /**
             * prints both arguments to the console
             * @param a {string}
             * @param b {string}
             */
            foo(a, b) {
                console.log('a', a, 'b', b)
            },
        }

        const stub = cy.stub(obj, 'foo').as('foo')

        obj.foo('foo', 'bar')

        expect(stub).to.be.called
    })

})

context('Location', () => {
    beforeEach(() => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html')
    })

    it('cy.hash() - get the current URL hash', () => {
        // https://on.cypress.io/hash
        cy.hash().should('be.empty')
    })

    it('cy.location() - get window.location', () => {
        // https://on.cypress.io/location
        cy.location().should((location) => {
            expect(location.hash).to.be.empty
            expect(location.href).to.eq('http://127.0.0.1:8080/myaccount.html')
            expect(location.host).to.eq('127.0.0.1:8080')
            expect(location.hostname).to.eq('127.0.0.1')
            expect(location.origin).to.eq('http://127.0.0.1:8080')
            expect(location.pathname).to.eq('/myaccount.html')
            expect(location.port).to.eq('8080')
            expect(location.protocol).to.eq('http:')
            expect(location.search).to.be.empty
        })
    })

    it('cy.url() - get the current URL', () => {
        // https://on.cypress.io/url
        cy.url().should('eq', 'http://127.0.0.1:8080/myaccount.html')
    })
})

context('Assertions', () => {
    beforeEach(() => {
        cy.intercept('*', addAuthorizationHeader);
        cy.visit('http://127.0.0.1:8080/myaccount.html', {delay: 1000})
    })

    describe('Implicit Assertions', () => {
        it('.should() - make an assertion about the current subject', () => {
            // https://on.cypress.io/should
            

           
            cy.get('#aboutmeTable').find('tr')
                // finds first <td> element with text content matching regular expression
                .should('be.visible')

            
        })
    })

    describe('Explicit Assertions', () => {
        // https://on.cypress.io/assertions
        it('expect - make an assertion about a specified subject', () => {
            // We can use Chai's BDD style assertions
            expect(true).to.be.true
            const o = {foo: 'bar'}

            expect(o).to.equal(o)
            expect(o).to.deep.equal({foo: 'bar'})
            // matching text using regular expression
            expect('FooBar').to.match(/bar$/i)
        })

    })
})

