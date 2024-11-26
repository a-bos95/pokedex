import React from 'react'
import PokeImg from './PokeImg'
import PokeStats from './PokeStats'
import PokeInfoBox from './PokeInfoBox'

export default function PokeID({ pokemon }) {
  return (
    <div className='w-[50%] rounded-xl shadow-xl bg-secondary sm:p-3 md:py-5 md:px-10 flex flex-col'>
        <h2 className='font-bold text-[20px] gap-[8px] leading-7 text-white mx-auto'>About {pokemon.pokemon}</h2>
        <div className='flex sm:flex-col lg:flex-row lg:justify-between mt-5'>
            <section className='flex flex-col sm:items-center sm:w-full lg:w-[30%]'>
                <PokeImg src={pokemon.image_url} alt={pokemon.pokemon} />
                <PokeStats location={pokemon.location} hitpoints={pokemon.hitpoints} />
            </section>
            <section className='flex flex-col sm:items-center md:items-start sm:w-full sm:mt-5 lg:w-[60%]'>
                <p className='sm:text-center lg:text-left'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quae cum quasi eum libero earum quibusdam similique rerum vitae, aliquam consequuntur deserunt sequi quas! Quaerat, quia quasi. Sequi, nisi expedita. Fugit veniam a natus commodi ea optio magnam magni pariatur cupiditate quas culpa fugiat odit, labore nesciunt, ipsum facere velit?</p>
                <PokeInfoBox title='Abilities' info={pokemon.abilities} />
                <PokeInfoBox title='Evolutions' info={pokemon.evolutions} />
            </section>
        </div>
    </div>
  )
}
