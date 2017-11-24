export default class BugView {

    static start(eventData) {
        new BugController({
            maxDelay: 3000,
            minBugs: 3,
            maxBugs: 12,
            imageSprite: 'lib/bugs/fly-sprite.png'
        });
    };

}

/*                    S.D.G.                    */
