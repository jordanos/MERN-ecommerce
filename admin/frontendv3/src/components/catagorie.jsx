function catagorie(){
    return(
        <>
        <h2>Catagories</h2>
        <hr width='180px'/>
        <nav className='nav1'>
            <ui>
                <li className='dropdown'><img src="ele.jpeg" alt="ele" width='70px'/> <strong>Electronics</strong><span>&rsaquo;</span>
                    <ui>
                        <li><strong>Labtop</strong></li><br/>
                        <li><strong>Mobile</strong></li><br/>
                        <li><strong>earphone</strong></li><br/>
                        <li><strong>tv</strong></li><br/>
                    </ui>
                </li><br/>
                <li className='dropdown'><img src="mac.jpg" alt="ele" width='70px'/><strong>Machinery</strong><span>&rsaquo;</span>
                <ui>
                        <li><strong>Labtop</strong></li><br/>
                        <li><strong>Mobile</strong></li><br/>
                        <li><strong>earphone</strong></li><br/>
                        <li><strong>tv</strong></li><br/>
                    </ui>
                </li><br/>
                <li className='dropdown'><img src="game.jpg" alt="ele" width='70px'/><strong>Game</strong><span>&rsaquo;</span></li><br/>
                <li className='dropdown'><img src="clo.jpg" alt="ele" width='70px'/><strong>Cloth</strong><span>&rsaquo;</span></li><br/>
                <li className='dropdown'><img src="car.jpg" alt="ele" width='70px'/><strong>Car</strong><span>&rsaquo;</span></li><br/>
                <li className='dropdown'><img src="all.png" alt="ele" width='70px'/><strong>All Catagories</strong><span>&rsaquo;</span></li><br/>
            </ui>
        </nav>
        </>
    )
}
export default catagorie;