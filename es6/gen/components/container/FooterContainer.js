/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import React from "react";

import { Footer } from "../../../src/components/container/Footer";
import { Filter } from "../../../src/components/container/footer/Filter";
import { ClearDone } from "../../../src/components/container/footer/ClearDone";
import * as AppState from "../../../src/AppState";
import { changeFilter } from "../../todo/ActionFunctions";
import { clearDone } from "../../todo/ActionFunctions";


export const FooterContainer = ( props ) => {
	
	return <Footer {...props} >
		<Filter {...props.filter } value={AppState.getLocation(
			["container", "footer", "filter", "value"]
		)
		} categoryId={AppState.getLocation(
			["container", "footer", "filter", "categoryId"]
		)
		}   onChange={changeFilter}  />
		<ClearDone {...props.clearDone }   onClick={clearDone}  />
	</Footer> 
}



/******* S.D.G. *******/



