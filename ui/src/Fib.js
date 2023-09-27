import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: [],
        index: '',
        message: '',
    }

    async componentDidMount() {
        await Promise.all([
            this.fetchValues(),
            this.fetchIndexes()
        ]);
    }

    // custom methods
    fetchValues = async () => {
        const { data: { data } } = await axios.get('/api/values/');

        if (data) this.setState({ values: data });
    }

    fetchIndexes = async () => {
        const { data: { data } } = await axios.get('/api/values/all-complete');

        if (data) this.setState({ seenIndexes: data });
    }

    handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post('/api/values', { index: this.state.index });

            this.setState({ index: '', message: response?.data?.message })
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}>{this?.state?.message}</h2>

                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input value={this.state.index} onChange={({ target: { value } }) => this.setState({ index: value })} />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen</h3>
                {this?.state?.values.map(({ index }) => index).join(', ')}

                <h3>Values</h3>
                {this?.state?.seenIndexes?.map(({ index, value }) => <div key={index}>
                    For index {index} I calculated {value}
                </div>)}
            </div>
        )
    }
}

export default Fib;