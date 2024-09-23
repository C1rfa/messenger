"use client";

import clsx from "clsx";
import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";


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

    const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
        //TODO: AXIOS REQUEST WHEN BD IS READY

        //tmp
        console.log(data);
        setLoading(true);
        setTimeout(() => { setLoading(false) }, 1000);
    }, []);

    return (
        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
                <input
                    id="email"
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
                    className={clsx(
                        "absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm",
                        errors.email?.message && "text-rose-700 peer-placeholder-shown:text-rose-700 peer-focus:text-rose-700 focus:border-rose-700"
                    )}
                >
                    Email address
                </label>
                <p className="text-rose-700 pt-2 text-sm">{ errors.email?.message as string || "​"}</p>
            </div>
            <div className="mt-10 relative">
                <input
                    type="password"
                    id="password"
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
                    className={clsx(
                        "absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm",
                        errors.password?.message && "text-rose-700 peer-placeholder-shown:text-rose-700 peer-focus:text-rose-700 focus:border-rose-700"
                    )}
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