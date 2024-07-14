import React from "react"

const style = 'mb-2 mt-8 pb-1'
export const heads = {
    h1: (props: any) => (
        <h1 {...props} className={`text-6xl ${style}`}>
            {props.children}
        </h1>
    ),
    h2: (props: any) => (
        <h2 {...props} className={`text-5xl ${style}`}>
            {props.children}
        </h2>
    ),
    h3: (props: any) => (
        <h3 {...props} className={`text-4xl ${style}`}>
            {props.children}
        </h3>
    ),
    h4: (props: any) => (
        <h4 {...props} className={`text-3xl ${style}`}>
            {props.children}
        </h4>
    ),
    h5: (props: any) => (
        <h5 {...props} className={`text-2xl ${style}`}>
            {props.children}
        </h5>
    ),
    h6: (props: any) => (
        <h6 {...props} className={`text-xl ${style}`}>
            {props.children}
        </h6>
    ),
}