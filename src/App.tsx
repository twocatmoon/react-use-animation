import { useRef } from 'react'
import './App.css'

function App () {
    const ref = useRef<HTMLDivElement>(null)

    

    return (
        <div className="App">
            <header className="App-header">
                <p>React Use Animation</p>
                <p>
                    <div ref={ref}></div>
                </p>
                <p>
                    <button>Animate In</button>
                    <button>Animate Out</button>
                </p>
            </header>
        </div>
    )
}

export default App
