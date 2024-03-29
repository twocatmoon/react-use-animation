import anime from 'animejs'
import React, { useEffect, useRef, useState } from 'react'

export type AnimationParameters = Exclude<anime.AnimeAnimParams, 'targets'>

export function useAnimation <Element extends HTMLElement> (ref: React.RefObject<Element>, paramsIn: AnimationParameters, paramsOut: AnimationParameters): any
export function useAnimation <Element extends HTMLElement> (ref: React.RefObject<Element>, targets: string, paramsIn: AnimationParameters, paramsOut: AnimationParameters): any
export function useAnimation <Element extends HTMLElement> (ref: React.RefObject<Element>, targetsOrParamsIn: AnimationParameters | string, paramsInOrParamsOut: AnimationParameters, paramsOutOnly?: AnimationParameters): any {
    let paramsIn: AnimationParameters = paramsInOrParamsOut
    let paramsOut: AnimationParameters = paramsOutOnly!
    const targetsRef = useRef<Element[]>([])
    const animationRef = useRef<anime.AnimeInstance | null>(null)

    if (typeof targetsOrParamsIn !== 'string') {
        paramsOut = paramsInOrParamsOut
        paramsIn = targetsOrParamsIn
    }

    useEffect(() => {
        if (typeof targetsOrParamsIn === 'string') {
            targetsRef.current = Array.from(ref.current!.querySelectorAll(targetsOrParamsIn))
        } else {
            targetsRef.current = [ref.current!]
        }
    })

    const playIn = () => {
        const targets = targetsRef.current
        anime.remove(targets)
        animationRef.current = anime({
            ...paramsIn,
            targets
        })
    }

    const playOut = () => {
        const targets = targetsRef.current
        anime.remove(targets)
        animationRef.current = anime({
            ...paramsOut,
            targets
        })
    }

    const error = () => {
        return new Error('No animation instance initialized.')
    }

    const pause = () => {
        if (!animationRef.current) throw error()
        animationRef.current.pause()
    }

    const restart = () => {
        if (!animationRef.current) throw error()
        animationRef.current.restart()
    }

    const reverse = () => {
        if (!animationRef.current) throw error()
        animationRef.current.reverse()
    }

    const seek = (time: number) => {
        if (!animationRef.current) throw error()
        animationRef.current.seek(time)
    }

    const getInstance = () => {
        return animationRef.current
    }

    return {
        playIn,
        playOut,
        pause,
        restart,
        reverse,
        seek,
        getInstance
    }
}

export function useToggleAnimation <Element extends HTMLElement> (initiallyVisible: boolean, ref: React.RefObject<Element>, paramsIn: AnimationParameters, paramsOut: AnimationParameters): any
export function useToggleAnimation <Element extends HTMLElement> (initiallyVisible: boolean, ref: React.RefObject<Element>, targets: string, paramsIn: AnimationParameters, paramsOut: AnimationParameters): any
export function useToggleAnimation <Element extends HTMLElement> (initiallyVisible: boolean, ref: React.RefObject<Element>, targetsOrParamsIn: AnimationParameters | string, paramsInOrParamsOut: AnimationParameters, paramsOutOnly?: AnimationParameters): any {
    let paramsIn: AnimationParameters = paramsInOrParamsOut
    let paramsOut: AnimationParameters = paramsOutOnly!
    let targets: string | undefined

    if (typeof targetsOrParamsIn !== 'string') {
        paramsOut = paramsInOrParamsOut
        paramsIn = targetsOrParamsIn
    } else {
        targets = targetsOrParamsIn
    }

    const {
        playIn,
        playOut,
    } = targets 
        ? useAnimation(ref, targets, paramsIn, paramsOut)
        : useAnimation(ref, paramsIn, paramsOut)

    const firstRenderRef = useRef(true)
    const [ visible, setVisible ] = useState(initiallyVisible)

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false
            return
        }
        if (visible) playIn()
        else playOut()
    }, [visible])

    return setVisible
}
