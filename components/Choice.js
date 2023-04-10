import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react";
import { clsx } from 'clsx';

export default function Choice (props) {

    const choose = (event) => {
        // console.log(event.target);
        if (choice === 0 || choice !== event.target.dataset.id) {
            setChoice(parseInt(event.target.dataset.id))
            props.stateFunc(parseInt(event.target.dataset.id))
            selected = parseInt(event.target.dataset.id)
        }
        else {
            setChoice(0)
            props.stateFunc(0)
            selected = 0;
        }
    }

    let options = props.options;
    let selected = props.selectedState;
    const [choice, setChoice] = useState(selected)
    return (
        <div className='grid grid-cols-4 border border-blue-400 bg-violet-50
        rounded-xl m-7'>
            {options.map((option, i) => {
                return (
                    <div key={option.name}
                    data-id={option.id || 0}
                    className={
                        clsx({
                            "p-1" : true,
                            "m-2" : true,
                            "rounded-xl" : true,
                            "border" : true,
                            "border-blue-600" : true,
                            "bg-blue-600" : selected === option.id,
                            "text-white" : selected === option.id,
                            "text-center" : true
                        })
                    }
                    onClick={choose}
                    >
                            {option.name}
                    </div>
                )
            })}

        </div>
    )
}