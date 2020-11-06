context('NewTodoChanged', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:9999/')
    })

    it('should change newTodoInput', () => {
        cy.get('#newTodoInput').type('NEW').should(() => {
            const appState = JSON.parse(localStorage.getItem('appState'));
            expect(appState.newTodo).to.eq('NEW')
        })
    })
})
