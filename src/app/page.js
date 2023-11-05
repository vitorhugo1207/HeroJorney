'use client';

import { useEffect, useState } from 'react';
import { Search, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import Link from 'next/link';
import Heros from '@/API/Heroes';
import Image from 'next/image';

export default function Home() {
	const [results, setResults] = useState([]);
	const [value, setValue] = useState('');
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

	const handleSearchChange = (e) => {
		let value = e.target.value;
		setValue(value);
		const re = new RegExp(_.escapeRegExp(value), 'i');
		const isMatch = (result) => re.test(result.name);
		setResults(_.filter(herosData, isMatch));
	};

	const resultRenderer = ({ name, images }) => {
		return (
			<div>
				<Image
					src={images.md}
					priority={true}
					alt={name}
					width={50}
					height={50}
					style={{ width: "auto", height: "auto" }}
				/>
				<p className='relative text-right align-top'>{name}</p>
			</div>
		);
	};

	return (
		<>
			<Search
				onSearchChange={handleSearchChange}
				noResultsMessage='Hero no found.'
				resultRenderer={resultRenderer}
				results={results}
				value={value}
			/>
		</>
	);
}
