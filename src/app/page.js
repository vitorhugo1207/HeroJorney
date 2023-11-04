'use client'

import Image from 'next/image'
import Heros from  '@/API/Heros'
import { useEffect, useState } from 'react';

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
    <main className=''>
      <p>{console.log(herosData[1])}</p>
    </main>  
  )
}
