'use client'

import Image from 'next/image'
import Heros from  '@/API/Heros'
import { useEffect, useState } from 'react';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import '../app/card.css';


export default function Home() {
  const [herosData, setHerosData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const heros = new Heros();
      const response = await heros.getHeros();
      setHerosData(response);
    };
  
    fetchData();
  }, []);
  
  return (
    <main>
        <Card sx={{ minHeight: '340px', width: '250px' }} className='before:'>
          <CardCover>
            <Image
              src="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg"
              fill
              priority={true}
              alt='test'
              sizes="(max-width: 340px) 100vw, (max-width: 280px) 50vw, 33vw"
            />
          </CardCover>
          <CardCover
            sx={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
            }}
          />
          <CardContent sx={{ justifyContent: 'flex-end' }}>
            <Typography level="title-lg" textColor="#fff">
              A-Bomb
            </Typography>
            <Typography
              startDecorator={<ArrowRightIcon />}
              textColor="neutral.300"
            >
              Marvel Comics
            </Typography>
          </CardContent>
        </Card>
    </main>  
  )
}
