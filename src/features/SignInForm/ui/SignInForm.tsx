"use client";

import { useCallback, useRef, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Id, toast, TypeOptions, Zoom } from "react-toastify";
import clsx from "clsx";


export const SignInForm = () => {

    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, formState } = useForm<FieldValues>(
        {
            defaultValues: {
                email: "",
                password: ""
            }
        }
    );
    const { errors } = formState;
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

    const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
        setLoading(true);
        signIn("credentials", { ...data, redirect: false })
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
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
                <input
                    type="text"
                    className={clsx(
                        "peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600",
                        isLoading && "opacity-50 cursor-default bg-transparent",
                        errors.email?.message && "border-rose-700 text-rose-700 focus:border-rose-700"
                    )}
                    placeholder="john@doe.com"
                    disabled={isLoading}
                    {...register("email", {
                        pattern: { 
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
                            message: "Invalid email" 
                        },
                        required: {
                            value: true,
                            message: "Email is required"
                        }
                    })}
                />
                <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                    Email address
                </label>
                <p className="text-rose-700 pt-2 text-sm">{ errors.email?.message as string || "​"}</p>
            </div>
            <div className="mt-10 relative">
                <input
                    type="password"
                    className={clsx(
                        "peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600",
                        isLoading && "opacity-50 cursor-default bg-transparent",
                        errors.password?.message && "border-rose-700 text-rose-700 focus:border-rose-700"
                    )}
                    placeholder="Password"
                    disabled={isLoading}
                    {...register("password", { 
                        minLength: {value: 6, message: "Invalid password"},
                        required: { 
                            value: true, 
                            message: "Invalid password" 
                        } 
                    })}
                />
                <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                    Password
                </label>
                <p className="text-rose-700 pt-2 text-sm">{ errors.password?.message as string || "​"}</p>
            </div>

            <input
                type="submit"
                value="Sign in"
                className={clsx(
                    "mt-10 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer",
                    isLoading && "opacity-50 cursor-default bg-indigo-300 hover:bg-indigo-300"
                )}
                disabled={isLoading}
            />
        </form>
    );
}