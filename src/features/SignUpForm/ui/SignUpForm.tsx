"use client";

import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import axios from "axios";
import clsx from "clsx";
import PasswordStrengthBar from 'react-password-strength-bar';


export const SignUpForm = () => {

    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState } = useForm<FieldValues>(
        {
            defaultValues: {
                name: "",
                email: "",
                password: ""
            }
        }
    );
    const { errors } = formState;
    const password = watch("password", false);    

    const onSubmit: SubmitHandler<FieldValues> = useCallback((data) => {
        setLoading(true);
        toast.promise(
            axios.post("/api/register", data)
                .then(() => { /* TODO: REDIRECT TO CONTACT PAGE */ })
                .catch(() => setLoading(false)),
            {
                pending: "In process, please wait",
                success: "Complete. Redirecting",
                error: {render({ data }) {
                    if (data instanceof Error)
                    {
                        return data.message;   
                    }

                    return "Something went wrong";
                }}
            }
        );

    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
                <input
                    type="text"
                    className={clsx(
                        "peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600",
                        isLoading && "opacity-50 cursor-default bg-transparent",
                        errors.name?.message && "border-rose-700 text-rose-700 focus:border-rose-700"
                    )}
                    placeholder="Name"
                    disabled={isLoading}
                    {...register("name", {
                        minLength: {
                            value: 4,
                            message: "Your name must have more than 3 letters"
                        },
                        required: {
                            value: true,
                            message: "Name is required"
                        }
                    })}
                />
                <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                    Name
                </label>
                <p className="text-rose-700 pt-2 text-sm">{ errors.name?.message as string || "​"}</p>
            </div>
        
            <div className="mt-10 relative">
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
                {errors.password?.message ? <p className="text-rose-700 pt-2 text-sm">{ errors.password?.message as string}</p> : <PasswordStrengthBar className="mt-3.5" scoreWordClassName="hidden" password={password}/> }
            </div>

            <input
                type="submit"
                value="Sign up"
                className="mt-20 px-8 py-4 uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
            />
        </form>
    );
}