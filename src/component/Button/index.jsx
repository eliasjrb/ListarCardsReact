import './style.css';
import { Component } from 'react';

export class Button extends Component {
    render() {
        const {text, acao, disabled } = this.props
        return (
            <button onClick={acao} disabled={disabled}>
                {text}
            </button>
        )
    }
}