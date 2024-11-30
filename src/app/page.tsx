"use client";
import { MouseEventHandler, useState } from "react";

const weightedRandom = () => {
    return Math.random() < 0.9 ? 1 : 10;
};

export default function Home() {
    const [state, setState] = useState<number>(0);
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <p className="p-32 font-sans font-bold text-7xl">
                Simple Clicker Website
            </p>
            <Button
                text={state.toString()}
                onclick={() => {
                    const r = weightedRandom();
                    setState(state + r);
                    if (r == 10) alert("Critical hit!");
                }}
            ></Button>
        </div>
    );
}

const Button = ({
    text,
    onclick,
}: {
    text: string;
    onclick: MouseEventHandler;
}) => {
    return (
        <>
            <button
                onClick={onclick}
                className="bg-sky-500 hover:bg-sky-700 rounded-full p-2 w-48 font-sans text-4xl"
            >
                {text}
            </button>
        </>
    );
};
