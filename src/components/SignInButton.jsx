import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/esm/Dropdown";
import { Button } from "react-bootstrap";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <>
        {/* <DropdownButton variant="secondary" className="ml-auto" drop="left" title="Outlook Sign In">
            <Dropdown.Item as="button" onClick={() => handleLogin("popup")}>Sign in</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleLogin("redirect")}>Sign in using Redirect</Dropdown.Item>
        </DropdownButton> */}

        <Button variant="secondary" className="ml-auto" drop="left" onClick={() => handleLogin("popup")}>Outlook Sign in</Button>&nbsp;
        {/* <Button variant="secondary"  drop="left" onClick={() => handleLogin("popup")}>Google Sign in</Button> */}

        </>
    )
}