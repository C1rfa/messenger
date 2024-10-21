"use client";

import { useRef, useState } from "react";
import { IconType } from "react-icons";
import { BsGithub, BsGoogle, BsSpotify } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { Id, toast, TypeOptions, Zoom } from "react-toastify";
import clsx from "clsx";


export enum SocailAuthVariations {
    AUTH_WITH_GOOGLE = "google",
    AUTH_WITH_GITHUB = "github",
    AUTH_WITH_SPOTIFY = "spotify"
};

interface SocialAuthButtonProps {
    authAction: SocailAuthVariations,
    iconSize?: number,
    onAuthButtonClick?: () => void,
}

export const SocialAuthButton = (props: SocialAuthButtonProps) => {

    const [isLoading, setLoading] = useState(false);
    const authAction = props.authAction;
    const iconSize = props?.iconSize || 32;
    const onAuthButtonClick = props.onAuthButtonClick;
    let Icon: IconType | null = null; 

    switch (authAction) {
        case SocailAuthVariations.AUTH_WITH_GITHUB:
            Icon = BsGithub;
            break;
        case SocailAuthVariations.AUTH_WITH_GOOGLE:
            Icon = BsGoogle;
            break;
        case SocailAuthVariations.AUTH_WITH_SPOTIFY:
            Icon = BsSpotify;
            break;
    };

    const toastMessageId = useRef<Id>();

    toast.onChange(payload => {
        if (payload.status === "removed") {
            toastMessageId.current = "";
        }
    });

    const displayToastMessage = (message: string, messageType: TypeOptions) => {
        if (toastMessageId.current) {
            toast.update(toastMessageId.current, {
                render: message,
                type: messageType,
                transition: (messageType === "success" ) ? Zoom : null,
            });
        }
        else {
            toastMessageId.current = toast(message, {
                type: messageType,
            });
        }
    };

    const onButtonClickHandler = () => {
        if (onAuthButtonClick)
        {
            onAuthButtonClick();
        }
        setLoading(true);

        signIn(authAction, )
            .then((response) => {
                if (response?.error)
                {
                    displayToastMessage("Invalid Email or Password", "error");
                    setLoading(false);
                }
                else if (response?.ok && response.status === 200)
                {
                    displayToastMessage("Successfully logged in. Redirecting.", "success");
                } 
            });
    };

    return (
        <button type="button" 
        className={clsx(
            "flex w-full justify-center cursor-pointer rounded-md px-4 py-2 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 hover:bg-slate-950 hover:text-white focus:outline-offset-0transition",
            isLoading && "opacity-50 cursor-default"
        )}
            onClick={onButtonClickHandler}
        >
            <Icon size={iconSize} />
        </button>
    );
};
