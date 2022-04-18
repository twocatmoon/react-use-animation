import { useRef } from 'react'
import './App.css'
import { useAnimation, useToggleAnimation } from './lib'

function ComponentA () {
    const ref = useRef<HTMLDivElement>(null)

    const { playIn, playOut } = useAnimation(
        ref, 
        {
            opacity: 1,
            easing: 'linear'
        },
        {
            opacity: 0,
            easing: 'linear'
        }
    )

    return (
        <>
            <div ref={ref}>
                Hello, world.
            </div>
            <p>
                <button onClick={playIn}>Animate In</button>
                <button onClick={playOut}>Animate Out</button>
            </p>
        </>
    )
}


function ComponentB () {
    const ref = useRef<HTMLDivElement>(null)

    const setVisible = useToggleAnimation(
        true,
        ref, 
        'p',
        {
            opacity: 1,
            easing: 'linear'
        },
        {
            opacity: 0,
            easing: 'linear'
        }
    )

    return (
        <>
            <div ref={ref}>
                <p>Hello, world.</p>
            </div>
            <p>
                <button onClick={() => setVisible(true)}>Animate In</button>
                <button onClick={() => setVisible(false)}>Animate Out</button>
            </p>
        </>
    )
}

function App () {
    return (
        <div className="App">
            <header className="App-header">
                <p>React Use Animation</p>
                <ComponentA />
                <ComponentB />
            </header>
        </div>
    )
}

export default App
