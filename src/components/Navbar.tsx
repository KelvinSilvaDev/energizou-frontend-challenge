import { NavLink } from "react-router-dom";
import { MOBILE_WIDTH } from "../utils/constants";
import useMediaQuery from "../hooks/useMediaQuery";

interface NavbarProps {
    toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {

    const isMobile = useMediaQuery(MOBILE_WIDTH);

    const handleToggleSidebar = () => {
        toggleSidebar();
    }

    return (
        <ul className={`${isMobile ? 'p-4 py-16 h-screen flex-col gap-16' : 'flex space-x-4'} flex`}>
            <li>
                <NavLink
                    to="/"
                    className={`${isMobile ? 'text-4xl' : 'text-white'} py-1 block text-center`}
                    onClick={handleToggleSidebar}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/companies"
                    className={`${isMobile ? 'text-4xl' : 'text-white'} py-1 block text-center`}
                    onClick={handleToggleSidebar}
                >
                    Listar empresas
                </NavLink>
            </li>
        </ul >
    )
}