import { useState } from "react";
import data from "./data";

const Accordion = () => {
    const [selected, setSelected] = useState<number>(0);
    const [multiSelection, setMultiSelection] = useState<boolean>(true);
    const [selectedArr, setSelectedArr] = useState<number[]>([]);

    const handleSingleSelection = (getCurrentId: number) => {
        setSelected(getCurrentId === selected ? -1 : getCurrentId);
    };

    const handleMultiSelection = (getCurrentId: number) => {
        console.log(getCurrentId);
        const arrCopy = [...selectedArr];
        if (arrCopy.indexOf(getCurrentId) == -1) {
            arrCopy.push(getCurrentId);
        } else {
            arrCopy.splice(getCurrentId, 1);
        }
        setSelectedArr(arrCopy);
    };

    return (
        <div className="flex flex-col justify-self-center bg-gray-950 w-9/12">
            <h1 className="text-3xl font-bold text-slate-100 text-center mb-4">
                Accordion
            </h1>
            <ul className="flex flex-col gap-3 items-center">
                {data && data.length !== 0 ? (
                    data.map((items) => (
                        <li
                            key={items.id}
                            className="flex flex-col bg-slate-800 w-full"
                        >
                            <button
                                type="button"
                                className="w-full h-full border-2 border-slate-700 p-3"
                                onClick={() => {
                                    multiSelection
                                        ? handleSingleSelection(items.id)
                                        : handleMultiSelection(items.id);
                                }}
                            >
                                <span className="text-xl text-gray-100">
                                    {items.question}
                                </span>
                            </button>
                            {multiSelection ? (
                                selected === items.id && (
                                    <p className="w-full text-center pt-4 p-2 text-gray-500 dark:text-gray-400 border-2 border-t-0 border-slate-700">
                                        {items.answer}
                                    </p>
                                )
                            ) : selectedArr.indexOf(items.id) !== -1 ? (
                                <p className="w-full text-center pt-4 p-2 text-gray-500 dark:text-gray-400 border-2 border-t-0 border-slate-700">
                                    {items.answer}
                                </p>
                            ) : null}
                        </li>
                    ))
                ) : (
                    <li>No Data Found</li>
                )}
                <button
                    className="bg-slate-700 p-3 px-5 text-xl font-semibold rounded-xl text-slate-200 uppercase tracking-wider mt-3"
                    onClick={() => {
                        setMultiSelection(!multiSelection);
                    }}
                >
                    {multiSelection ? "multi selection" : "single selection"}
                </button>
            </ul>
        </div>
    );
};

export default Accordion;
