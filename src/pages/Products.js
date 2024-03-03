import ProductCard from '../components/ProductCard';
import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';
import { Breadcrumb, Container, Col, Row } from "react-bootstrap";

export default function Products(){

	const {user} = useContext(UserContext)

	const [products, setProducts] = useState([]);

	const fetchData = () => {
		let fetchUrl = user.isAdmin === true ? 'https://meow-express.onrender.com/b3/products/all' : 'https://meow-express.onrender.com/b3/products/'
		fetch(fetchUrl,{
			headers: {
				'Content-Type': 'application/json', 
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			// console.log(typeof data);

			if (typeof data.message !== "string") {
				setProducts(data)
			} else {
				setProducts(
					data.reverse().map((product) => {
						return (
							<Col xs={6} lg={3} className="mb-2 mb-lg-4" key={product._id}>
								<ProductCard
									id={product._id}
									name={product.name}
									price={product.price.toLocaleString()}
									src={product.src}
								/>
							</Col>
						);
					})
				);
			}
		})
	}

	useEffect(() => {
	    fetchData();
	}, []);

	return(
		<>
			{
				(user.isAdmin === true) ?
					<AdminView productData={products} fetchData={fetchData}/>

				:

					<UserView productData={products}/>
			}
		</>
		)
}