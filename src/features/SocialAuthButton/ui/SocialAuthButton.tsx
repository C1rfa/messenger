"use client";

import clsx from "clsx";
import { useState } from "react";
import { IconType } from "react-icons";
import { BsGithub, BsGoogle, BsSpotify } from "react-icons/bs";


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

    const onButtonClickHandler = () => {
        if (onAuthButtonClick)
        {
            onAuthButtonClick();
        }

        //TODO:AXIOS REQUEST

        //tmp
        console.log(authAction);
        setLoading(true);
        setTimeout(() => { setLoading(false) }, 1000);
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
