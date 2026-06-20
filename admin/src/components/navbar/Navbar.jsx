import "./Navbar.css"
const Navbar = ({heading}) => {
    return (
        <>
            <div className="navbar">
                <div className="navbar-heading">
                    <h2>{heading}</h2>
                </div>
                <div className="navbar-admin">
                    <p className='admin-image'>A</p>
                    <p>Admin</p>
                </div>
            </div>
        </>
    )
}

export default Navbar
