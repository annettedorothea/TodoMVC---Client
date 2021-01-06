/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/


import {button, div, editedTodo, input, label, li} from "../../../gen/components/ReactHelper";
import {deleteTodo, editTodo, toggleTodo} from "../../../gen/todo/ActionFunctions";

export function jsx(attributes) {
    if (attributes.editedTodo && attributes.editedTodo.id === attributes.id) {
        return editedTodo({...attributes});
    }
    return li(
        undefined,
        {
            className: attributes.done ? 'completed' : '',
            id: attributes.id
        },
        [
            div(
                undefined,
                {
                    className: "view",
                    id: attributes.id
                },
                [
                    input(
                        {
                            id: attributes.id,
                            className: "toggle",
                            type: "checkbox",
                            checked: attributes.done,
                            onChange: () => toggleTodo(attributes.id)
                        }
                    ),
                    label(
                        attributes.description,
                        {
                            id: `edit_${attributes.id}`,
                            onDoubleClick: () => editTodo(attributes.id)
                        }
                    ),
                    button(
                        undefined,
                        {
                            id: `delete_${attributes.id}`,
                            className: "destroy",
                            onClick: () => deleteTodo(attributes.id)
                        }
                    )
                ]
            )
        ]
    );
}


/******* S.D.G. *******/



