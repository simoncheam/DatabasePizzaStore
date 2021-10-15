import * as React from 'react';
import {Link} from 'react-router-dom'

const Navbar = ()=> {

    return (

        <div className="bg-dark">
			<Link type="button" className="m-2 btn btn-outline-danger" to ="/">
				 Create Order
			</Link>
			<Link type="button" className="m-2 btn btn-outline-danger" to ="/overview">
				All Orders
			</Link>
			
		</div>
    );

}

export default Navbar;