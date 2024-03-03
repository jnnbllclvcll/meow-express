import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProduct from '../components/FeaturedProduct';

export default function Home(){
	const data = {
		title: "Meow Express",
		content: "Discover Purrfection at Meow Express! 😺 Premium products for pampered felines. From cozy beds to playful toys, find everything your cat needs to thrive. Visit us today! #MeowExpress",
		destination: "/products",
		label: "Shop now!"
	}

	return (
		<>
			
			<Banner data={data}/>
			<Highlights />
			<FeaturedProduct />
		</>
	)
}