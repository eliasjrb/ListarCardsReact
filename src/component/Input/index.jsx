import './style.css';

export default function Input ({ onChange, value, type }) {
    return (
        <div>
            <input
                className="text-input"
                onChange={onChange}
                value={value}
                type={type}/>
        </div>
    )
}