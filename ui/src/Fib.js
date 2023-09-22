import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: [],
        index: ''
    }

    async componentDidMount() {
        await Promise.all([
            this.fetchValues(),
            this.fetchIndexes()
        ]);
    }

    // methods
    async fetchValues() {
        const { data: { data } } = await axios.get('/api/values/');

        console.dir('from postgres', data);

        this.setState({ values: data });
    }

    async fetchIndexes() {
        const { data: { data } } = await axios.get('/api/values/all-complete');

        console.dir('from redis', data);

        this.setState({ seenIndexes: data });
    }

    async handleSubmit(e) {
        e.preventDefault();

        const response = await axios.post('/api/values', { index: this.state.index });

        console.dir('response: ', response);

        this.setState({ index: '' })
    }

    // rendering
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input value={this.state.index} onChange={({ target: { value } }) => this.setState({ index: value })} />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen</h3>
                {this.state.seenIndexes.map(({ index }) => index).join(', ')}

                <h3>Values</h3>
                {this.state.values.map(({ index, number }) => <div key={index}>
                    For index {index} I calculated {number}
                </div>)}
            </div>
        )
    }
}

export default Fib;