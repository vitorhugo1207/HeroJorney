'use client';

import Image from 'next/image';
import Heros from '@/API/Heros';
import { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import '../app/card.css';

function Cards({ herosData }) {
	function cardModel(hero) {
		return (
			<div className='overflow-hidden rounded-lg' key={hero?.id}>
        <Card
          sx={{
            minHeight: '340px',
            width: '250px',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: '2px',
            borderColor: '#0f172a',
          }}
          className='card'>
          <CardCover>
            <Image
              src={hero?.images?.lg}
              fill
              priority={true}
              alt={hero?.name}
              sizes='(max-width: 340px) 100vw, (max-width: 280px) 50vw, 33vw'
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            }}
          />
          <CardContent
            sx={{ justifyContent: 'flex-end' }}
            className='text-center'>
            <Typography level='title-lg' textColor='#fff'>
              {hero?.name}
            </Typography>
            <Typography textColor='neutral.300'>
              {hero?.biography?.publisher}
            </Typography>
          </CardContent>
        </Card>
      </div>
		);
	}

	function genCards() {
		let cards = [];

		for (const hero of herosData) {
			cards.push(cardModel(hero));
		}

		return cards;
	}

	return genCards();
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
		<>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-6 p-10'>
        <Cards herosData={herosData} />
      </div>
		</>
	);
}
