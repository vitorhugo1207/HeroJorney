'use client';

import { useEffect, useState } from 'react';
import { Search, Label } from 'semantic-ui-react';
import _ from 'lodash';
import Heros from '@/API/Heroes';
import Image from 'next/image';
import 'semantic-ui-css/semantic.min.css';
import './results.css';

function SearchBar({herosData}) {
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
					src={images.md}
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
		<div className='grid grid-cols-1 justify-items-center p-10'>
			<Search
				onSearchChange={handleSearchChange}
				noResultsMessage='Hero no found.'
				resultRenderer={resultRenderer}
				results={results}
				value={value}
			/>
		</div>
	);
}

export default function Home() {
	const [herosData, setHerosData] = useState([]);

	async function getHerosData() {
		const heros = new Heros();
		const response = await heros.getHeros();
		return response;
	}

	useEffect(() => {
		const fetchData = async () => {
			const data = await getHerosData();
			setHerosData(data);
		};
		fetchData();
	}, []);

	return (
		<SearchBar herosData={herosData} />
	);
}
