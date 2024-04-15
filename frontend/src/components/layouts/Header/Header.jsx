import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md/index.esm";
import { MdSearch } from "react-icons/md/index.esm";
import { MdShoppingCart } from "react-icons/md/index.esm";
import logo from "../../../images/logos/brandlogo.png";
import { useSelector } from "react-redux";
function Header() {
    const { isAuthenticated } = useSelector((state) => state.userR);
    const profileIconUrl = isAuthenticated ? "/profile" : "/login";
    const options = {
        burgerColor: "#213363",
        burgerColorHover: "#17594A",
        logo,
        navColor1: "#F2FFE9",
        logoHoverSize: "10px",
        logoWidth: "10vmax",
        logoHoverColor: "white",
        link1Text: "Home",
        link2Text: "Products",
        link3Text: "Get Dietary",
        link4Text: "My Profile",
        link1Url: "/",
        link2Url: "/products",
        link3Url: "/dietrecommend",
        link4Url: "/profile",
        link1Size: "1.5vmax",
        link1Color: "#BABD42",
        nav1justifyContent: "flex-end",
        nav2justifyContent: "flex-end",
        nav3justifyContent: "flex-start",
        nav4justifyContent: "flex-start",
        link1ColorHover: "#213363",
        link1Margin: "1.5vmax",
        profileIcon: true,
        profileIconColor: "#82954B",
        ProfileIconElement: MdAccountCircle,
        searchIcon: true,
        searchIconUrl: "/search",
        searchIconColor: "#82954B",
        SearchIconElement: MdSearch,
        cartIcon: true,
        cartIconColor: "#82954B",
        CartIconElement: MdShoppingCart,
        profileIconUrl,
        cartIconUrl: "/cart",
        profileIconColorHover: "213363",
        searchIconColorHover: "213363",
        cartIconColorHover: "213363",
        cartIconMargin: "1.5vmax",
    };
    return (
        <>
            <ReactNavbar {...options} />
        </>
    );
}

export default Header;
