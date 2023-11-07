'use client';

import { useEffect, useState } from 'react';
import { Search, Label } from 'semantic-ui-react';
import _ from 'lodash';
import Heros from '@/API/Heroes';
import Image from 'next/image';
import 'semantic-ui-css/semantic.min.css';
import './results.css';
import { TypeAnimation } from 'react-type-animation';
import { Black_And_White_Picture } from 'next/font/google';

function SearchBar({ herosData }) {
	const [results, setResults] = useState([]);
	const [value, setValue] = useState('');

	const handleSearchChange = (e) => {
		let value = e.target.value;
		setValue(value);
		const re = new RegExp(_.escapeRegExp(value), 'i');
		const isMatch = (result) => re.test(result.name);
		setResults(_.filter(herosData, isMatch));
	};

	const resultRenderer = ({ name, images }) => {
		return (
			<div className='grid grid-cols-2 items-center'>
				<Image
					src={images.xs}
					priority={true}
					alt={name}
					width={50}
					height={50}
					style={{ width: 'auto', height: 'auto' }}
				/>
				<Label content={name}></Label>
			</div>
		);
	};

	return (
		<Search
			onSearchChange={handleSearchChange}
			noResultsMessage='Hero no found.'
			resultRenderer={resultRenderer}
			results={results}
			value={value}
		/>
	);
}

export default function Home() {
	const [herosData, setHerosData] = useState([]);

	async function getHerosData() {
		const heros = new Heros();
		const response = await heros.getHeros();
		return response;
	}

	function heroesBackground() {
		let imgs = [];
		for (let hero of herosData) {
			imgs.push(`url(${hero?.images?.lg}) no-repeat`);
		}

		const style = {
			background: imgs.toString(),
		};

		console.log(style);

		return style;
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await getHerosData();
			setHerosData(data);
		};
		fetchData();
	}, []);

	function Slogan() {
		return (
			<TypeAnimation
				sequence={['Search Your Hero', 5000]}
				wrapper='h1'
				cursor={true}
				repeat={Infinity}
			/>
		);
	}

	return (
		<>
			<div style={heroesBackground()} className='absolute top-0 left-0 right-0 bottom-0 -z-1'></div>
			<div className='grid justify-items-center p-20'>
				<Slogan />
				<SearchBar herosData={herosData} />
			</div>
		</>
	);
}
