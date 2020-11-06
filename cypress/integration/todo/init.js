context('Init', () => {
    beforeEach(() => {
    })

    context('#', () => {
        it('should set filter to all', () => {
            cy.visit('http://127.0.0.1:9999/')
            cy.wait(500).should(() => {
                const appState = JSON.parse(localStorage.getItem('appState'));
                expect(appState.filter).to.eq('all')
            })
        })
    })
    context('/#/active', () => {
        it('should set filter to open', () => {
            cy.visit('http://127.0.0.1:9999/#/active')
            cy.wait(500).should(() => {
                const appState = JSON.parse(localStorage.getItem('appState'));
                expect(appState.filter).to.eq('open')
            })
        })
    })
    context('/#/completed', () => {
        it('should set filter to done', () => {
            cy.visit('http://127.0.0.1:9999/#/completed')
            cy.wait(500).should(() => {
                const appState = JSON.parse(localStorage.getItem('appState'));
                expect(appState.filter).to.eq('done')
            })
        })
    })
})
