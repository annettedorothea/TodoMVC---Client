export default class BugView {

    static start(eventData) {
        new BugController({
            maxDelay: 3000,
            minBugs: 1,
            maxBugs: 7,
            imageSprite: 'lib/bugs/fly-sprite.png'
        });
    };

}

/*                    S.D.G.                    */
