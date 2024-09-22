"use client";

import { useCallback, useState } from "react";
import { OverlayContent } from "./OverlayContent";

import clsx from "clsx";


export const AuthenticationPage = () => {
    const [isAnimated, setAnimated] = useState(false);
    const toggleOverlay = useCallback(() => {
        setAnimated((isAnimated) => !isAnimated);
    }, []);

    const leftOverlay: React.ReactNode = (
        <OverlayContent 
            title={"Already have an account?"}
            subtitle={"Sign in with your email & password"}
            overlayButtonText={"Sign In"}
            onOverlayButtonClick={toggleOverlay}
        />
    );
    const rightOverlay: React.ReactNode = (
        <OverlayContent 
            title={"Don't have an account?"}
            subtitle={"Start your journey in one click"}
            overlayButtonText={"Sign Up"}
            onOverlayButtonClick={toggleOverlay}
        />
    );

    const overlayBg =
        "bg-gradient-to-r from-[#EB9FEF] via-[#545677] to-[#03254E]";

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-[#FECEE9] to-[#011C27]">
            <div className="h-4/5 w-4/5 bg-black relative overflow-hidden rounded-lg">
                <div 
                    id="signin"
                    className={clsx(
                        "bg-white absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20",
                        isAnimated && "translate-x-full opacity-0"
                    )}
                >
                    {/* <SigninForm /> */}
                </div>

                <div
                    id="signup"
                    className={clsx(
                        "absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out opacity-0 z-10",
                        isAnimated && "translate-x-full opacity-100 z-50 animate-show"
                    )}
                >
                    <div className="h-full w-full flex justify-center items-center">
                    {/* <SignupForm /> */}
                    </div>
                </div>

                <div
                    id="overlay-container"
                    className={clsx(
                        "absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition duration-700 ease-in-out z-100",
                        isAnimated && "-translate-x-full"
                    )}
                >
                    <div
                        id="overlay"
                        className={clsx(
                            `${overlayBg} relative -left-full h-full w-[200%] transform transition duration-700 ease-in-out translate-x-0`,
                            isAnimated && "translate-x-1/2"
                        )}
                    >
                        <div
                            id="overlay-left"
                            className={clsx(
                                "w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%] transition duration-700 ease-in-out",
                                isAnimated && "translate-x-0"
                            )}
                        >
                            {leftOverlay}
                        </div>
                        <div
                            id="overlay-right"
                            className={clsx(
                                "w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition duration-700 ease-in-out translate-x-0",
                                isAnimated && "translate-x-[20%]"
                            )}
                        >
                            {rightOverlay}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};