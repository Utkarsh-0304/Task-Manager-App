import { useNavigate } from "react-router-dom";
import { CgSidebarOpen } from "react-icons/cg";
import { FiHome } from "react-icons/fi";
import { VscGithubProject, VscIssues } from "react-icons/vsc";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex flex-col ${isOpen ? "w-64" : "w-16"
                } border-r transition-all duration-300 bg-white h-full`}
        >
            <div className={`flex items-center ${isOpen ? "justify-end" : "justify-center"} p-2`}>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="hover:cursor-pointer p-1 rounded hover:bg-gray-100"
                >
                    <CgSidebarOpen size={24} />
                </button>
            </div>

            <div className="flex flex-col w-full">
                {[
                    { title: "Home", link: "home", icon: <FiHome size={24} /> },
                    { title: "Issues", link: "issue", icon: <VscIssues size={24} /> },
                    { title: "Projects", link: "project", icon: <VscGithubProject size={24} /> },
                ].map((item) => (
                    <div
                        key={item.title}
                        className={`mx-auto p-3 w-full hover:bg-gray-100 hover:cursor-pointer border-gray-100 border-b flex items-center ${isOpen ? "justify-start pl-6" : "justify-center"}`}
                        onClick={() => navigate(`/${item.link}`)}
                        title={!isOpen ? item.title : ""}
                    >
                        <span className={`flex gap-2 items-center justify-center transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 hidden"}`}>
                            {item.icon}{item.title}
                        </span>
                        {!isOpen && <span className="text-xs truncate">{item.icon}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
