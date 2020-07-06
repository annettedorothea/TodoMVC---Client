/* 
 * Copyright (c) 2020, Annette Pohl, Koblenz, Germany
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.

 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * generated with de.acegen 0.9.2
 *
 */




import Event from "./Event";
import ACEController from "./ACEController";

export default class TriggerAction extends Event {
    constructor(action) {
        super(action, 'TriggerAction');
        this.eventData = action;
    }

	publish() {
	    ACEController.addItemToTimeLine({event: this});
	    this.notifyListeners();
	}
	
	notifyListeners() {
	    let i, listener;
	    if (this.eventName !== undefined) {
	        const listenersForEvent = ACEController.listeners[this.eventName];
	        if (listenersForEvent !== undefined) {
	            for (i = 0; i < listenersForEvent.length; i += 1) {
	                listener = listenersForEvent[i];
	                listener(this.eventData);
	            }
	        }
	    }
	}
}




/******* S.D.G. *******/




