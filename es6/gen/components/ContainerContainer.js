/********************************************************************************
 * generated by de.acegen
 ********************************************************************************/




import React, {useState} from "react";

import { Container } from "../../src/components/Container";
import { HeaderContainer } from "./container/HeaderContainer";
import { MainContainer } from "./container/MainContainer";
import { TodosContainer } from "./container/TodosContainer";
import { FooterContainer } from "./container/FooterContainer";
import * as AppState from "../../src/AppState";

export let setContainerState;

export const ContainerContainer = () => {
	
	const [props, setProps] = useState();
	setContainerState = setProps;
				
	if (!props) {
		return null;
	}
	
	return <Container {...props}>
		{ props.header && <HeaderContainer {...props.header }   /> }
		{ props.main && <MainContainer {...props.main }   /> }
		{ props.todos && <TodosContainer {...props.todos }   /> }
		{ props.footer && <FooterContainer {...props.footer }   /> }
	</Container> 
}



/******* S.D.G. *******/



