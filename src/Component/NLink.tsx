import { NavLink } from "react-router-dom";

interface BoxProps {
  children: React.ReactNode;
  link: string;
}

const NLink: React.FC<BoxProps> = ({ link, children }) => {
  return (
    <NavLink
      to={link}
      className={"nav-link"}
      style={({ isActive }) => ({
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "16px",
        backgroundColor: isActive ? "rgb(235, 235, 235)" : "transparent",
        borderRadius: "8px",
        transition: "all 0.2s ease-in-out",
      })}
    >
      {children}
    </NavLink>
  );
};

export default NLink;
