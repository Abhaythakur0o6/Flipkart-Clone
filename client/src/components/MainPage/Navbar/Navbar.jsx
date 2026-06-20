import { Link } from "react-router-dom"
import "./Navbar.css"
import { navData } from '../../../constants/Data'

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                {navData.map((data) => {
                    return <Link key={data.id} to={"/categories"} style={{ all: "unset" }}>
                        <div key={data.id} className={`navbar-items ${data.className}`}>
                            <img src={data.url} alt="" />
                            <p>{data.text}</p>
                        </div>
                    </Link>
                })}
            </div>
        </>
    )
}

export default Navbar