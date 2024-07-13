import React from "react"

export const heads = {
    h1: (props: any) => (
        <h1 {...props} className="text-6xl">
            {props.children}
        </h1>
    ),
    h2: (props: any) => (
        <h2 {...props} className="text-5xl">
            {props.children}
        </h2>
    ),
    h3: (props: any) => (
        <h3 {...props} className="text-4xl">
            {props.children}
        </h3>
    ),
    h4: (props: any) => (
        <h4 {...props} className="text-3xl">
            {props.children}
        </h4>
    ),
    h5: (props: any) => (
        <h5 {...props} className="text-2xl">
            {props.children}
        </h5>
    ),
    h6: (props: any) => (
        <h6 {...props} className="text-xl">
            {props.children}
        </h6>
    ),
}