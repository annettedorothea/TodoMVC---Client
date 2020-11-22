import React from 'react';
import {clearDone} from "../../gen/todo/ActionFunctions";

export default class Footer extends React.Component {

    render() {
        const itemCount = this.props.todoList ? this.props.todoList.filter((todo) => todo.done !== true).length : 0;
        const itemsString = itemCount === 1 ? 'item' : 'items';
        return (
            <footer className="footer">
                <span className="todo-count">{itemCount} {itemsString} left</span>
                <ul className="filters">
                    <li>
                        <a href={`#/${this.props.categoryId}`} className={this.props.filter === 'all' ? 'selected' : ''}>All</a>
                    </li>
                    <li>
                        <a href={`#/${this.props.categoryId}/open`} className={this.props.filter === 'open' ? 'selected' : ''}>Active</a>
                    </li>
                    <li>
                        <a href={`#/${this.props.categoryId}/done`} className={this.props.filter === 'done' ? 'selected' : ''}>Completed</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={() => clearDone()}>Clear completed</button>
            </footer>
        );
    }
}

