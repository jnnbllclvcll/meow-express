import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productData, fetchData }) {

	const [products, setProducts] = useState([])

	useEffect(() => {
		const productArr = productData.map(product => {
			console.log("product: ", product);
			return (
				<tr className="text-center align-middle" key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isAvailable ? "text-success" : "text-danger"}>
					{product.isAvailable ? "Available" : "Unavailable"}
					</td>
					<td><EditProduct product={product._id} fetchData={fetchData}/></td>
					<td><ArchiveProduct className="btn btn-danger" product={product._id} isAvailable={product.isAvailable} fetchData={fetchData}/></td>	
				</tr>
			)
		})
		setProducts(productArr)
	}, [productData])

	return(
		<>
			<h1 className="text-center my-4"> Admin Dashboard</h1>

			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>

				<tbody>
					{products}
				</tbody>
			</Table>	
		</>

	)
}