import React, { useEffect, useState } from "react";
import ReactShadowRoot from 'react-shadow-root';
import applyStyle from "./applystyle";
const style = require("./app-card.component.scss");

export function AppCard(props) {

    const [counter, setCounter] = useState(0);
    const [active, setActive] = useState(false);

    var timer;

    useEffect(() => {
        console.log(props);
    }, [])

    function activate(){
        if(timer) {
            clearTimeout(timer);
            timer=undefined;
        }
        setActive(true);
        timer = setTimeout(()=>{
            setActive(false);
        },200)
    }

    return (
        <>
            <ReactShadowRoot>
                {applyStyle(style)}
                <div className={"card "+(props.disabled?'':'activable')+" "+(active?'active':'')} onClick={()=>activate()}>
                    <h2>
                        {props.name}
                    </h2>
                    <h1>
                        Titolo in react
                    </h1>
                    <p>
                        {counter}
                    </p>
                    <button onClick={()=>{
                        setCounter(counter+1);
                        props.oncarded && props.oncarded({detail:counter+1});
                    }}>
                        bottone in react
                    </button>
                    <div className="injected">
                        <slot></slot>
                    </div>
                </div>
            </ReactShadowRoot>
            {props.children}
        </>
    )
}