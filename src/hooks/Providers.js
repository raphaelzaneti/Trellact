import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";
import CardNameProvider from './CardName/CardName'

export const Providers = props => (
    <ActiveCardInputProvider>
            {props.children}
    </ActiveCardInputProvider>
)