import AbstractRenderListEvent from "../../../gen/todo/events/AbstractRenderListEvent";

export default class RenderListEvent extends AbstractRenderListEvent {
    prepareDataForView() {
        this.eventData = JSON.parse(JSON.stringify(this.eventParam));
        if (this.eventData.data === undefined) {
        	this.eventData.data = {};
        }
    }
}

/*       S.D.G.       */
