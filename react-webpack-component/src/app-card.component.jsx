import React, { useCallback, useEffect, useState } from "react";
import ReactShadowRoot from 'react-shadow-root';
import applyStyle from "./applystyle";
const style = require("./app-card.component.scss");
import { connect } from 'react-redux';

const AppCardEl = (props) => {

    const [counter, setCounter] = useState(0);
    const [sharedCount, setSharedCount] = useState(0);
    const [active, setActive] = useState(false);

    var timer;

    function activate(){
        if(!props.disabled){
            if(timer) {
                clearTimeout(timer);
                timer=undefined;
            }
            setActive(true);
            timer = setTimeout(()=>{
                setActive(false);
            },200)
        }
    }

    useEffect(()=>{
        document.body.addEventListener('sharedEvent', e => setSharedCount((el)=>el+1));
    },[])

    const sendShared = useCallback(() => {
        const event = new CustomEvent('sharedEvent', {
            bubbles: true,
            detail: { text: 'hello' }
        });
        document.body.dispatchEvent(event);
    },[])

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

                    <h1>Isolated Store</h1>
                    <p>
                        {props.count || 0}
                    </p>
                    <p>
                    <button onClick={props.handleDecrementClick}>Decrement</button>
                    <button onClick={props.handleIncrementClick}>Increment</button>
                    </p>

                    <h1>sharedEvents</h1>
                    <p>
                        {sharedCount || 0}
                    </p>
                    <p>
                        <button onClick={()=>sendShared()}>sendShared</button>
                    </p>

                    <div className="injected">
                        <slot></slot>
                    </div>
                </div>
            </ReactShadowRoot>
            {props.children}
        </>
    )
}

const mapStateToProps = state => {
    return {
        count: state
    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({type: 'DECREMENT'})
    }
};
export const AppCard = connect(mapStateToProps, mapDispatchToProps)(AppCardEl);

