import { useNavigate } from "react-router-dom";

interface FeedbackProps {
    message: string;
    type: string;
    redirectTo?: string;
}

export const Feedback = ({ message, type, redirectTo }: FeedbackProps) => {
    const feedbackBaseClassName = "absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#afafafba] p-2 flex flex-col justify-center items-center gap-2";
    const errorClassName = "text-red-600";
    const successClassName = "text-green-600";
    const className = type === "error" ? `${feedbackBaseClassName} ${errorClassName}` : `${feedbackBaseClassName} ${successClassName}`;


    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(redirectTo? redirectTo : "/companies");
    }


    if (message) {
        return (
            <div className={className}>
                <div className="bg-white mx-auto text-center rounded-md w-2/3 md:w-1/3 shadow-2xl py-4">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <p>{message}</p>
                        <button onClick={handleRedirect} className="bg-blue-500 rounded-sm py-1 text-white w-1/2 md:w-1/3 mx-auto hover:scale-105 hover:font-semibold hover:w-2/5 transition-all duration-500">{redirectTo ? 'Ok':'Ver Empresas'}</button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};


