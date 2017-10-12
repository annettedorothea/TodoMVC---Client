class NewTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    onKeyPress(event) {
        if (event.charCode === 13) {
            new CreateTodoAction({description: this.state.value}).apply();
            this.setState({value: ''});
        }
    }

    render() {
        return (
            <input
                value={this.state.value}
                placeholder="What needs to be done?"
                onKeyPress={this.onKeyPress}
                onChange={this.onChange}
                className="new-todo"
            />
        );
    }
}

