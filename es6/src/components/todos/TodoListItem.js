/********************************************************************************
 * generated by de.acegen 1.1.0
 ********************************************************************************/


import {button, div, input, label, li} from "../../../gen/components/ReactHelper";
import {
    deleteTodo,
    editedTodoChanged,
    editedTodoKeyPressed,
    editTodo,
    toggleTodo
} from "../../../gen/todo/ActionFunctions";

export function uiElement(attributes) {
    if (attributes.editedTodoId === attributes.id) {
        return li(
            {
                class: "editing",
                id: attributes.id
            },
            [
                input(
                    {
                        class: "edit",
                        value: attributes.editedDescription,
                        onKeyPress: (event) => editedTodoKeyPressed(event.charCode),
                        onChange: (event) => editedTodoChanged(event.target.value),
                        id: attributes.id
                    }
                )
            ]
        );
    }
    return li(
        {
            class: attributes.done ? 'completed' : '',
            id: attributes.id
        },
        [
            div(
                {
                    class: "view",
                    id: attributes.id
                },
                [
                    input(
                        {
                            id: `checkbox_${attributes.id}`,
                            class: "toggle",
                            type: "checkbox",
                            checked: attributes.done,
                            onChange: () => toggleTodo(attributes.id)
                        }
                    ),
                    label(
                        {
                            id: `edit_${attributes.id}`,
                            onDoubleClick: () => editTodo(attributes.id)
                        },
                        [attributes.description]
                    ),
                    button(
                        {
                            id: `delete_${attributes.id}`,
                            class: "destroy",
                            onClick: () => deleteTodo(attributes.id)
                        }
                    )
                ]
            )
        ]
    );
}


/******* S.D.G. *******/



