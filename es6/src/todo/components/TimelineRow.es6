class TimelineRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailsVisibile: false
        };
        this.toggleDetailsVisibility = this.toggleDetailsVisibility.bind(this);
    }

    toggleDetailsVisibility() {
        const detailsVisibile = !this.state.detailsVisibile;
        this.setState({detailsVisibile: detailsVisibile});
    }

    render() {
        return (
            <tr>
                <td>
                    <TimelineCell item={this.props.item} detailsVisibile={this.state.detailsVisibile}
                                  toggleDetailsVisibility={this.toggleDetailsVisibility}/>
                </td>
            </tr>
        );
    }
}

