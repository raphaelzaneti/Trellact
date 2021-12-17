import React from "react";
import ActiveCardInputProvider from "./ActiveCardInput/ActiveCardInput";

export const Providers = props => (
    <ActiveCardInputProvider>
        {props.children}
    </ActiveCardInputProvider>
)