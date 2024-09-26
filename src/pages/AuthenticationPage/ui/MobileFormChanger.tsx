import clsx from "clsx";

interface MobileFormChangerProps {
    children: React.ReactNode;
    classNames?: string; 
    toggleForm: () => void;
};

export const MobileFormChanger = (props: MobileFormChangerProps) => {
    return (
        <div className={clsx("lg:hidden block text-center", props.classNames)}>
            <div
                onClick={props.toggleForm}
                className="cursor-pointer"
            >
                    <span className="text-xl font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        {props.children}
                    </span>
            </div>
        </div>  
    );
};
