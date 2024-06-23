import React, { useState, useEffect } from 'react';
import PokeApi from '../api/pokeapi';

export default function PokemonList() {
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await PokeApi.fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
            setPokemonData(data.results);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
            <ul>
                {pokemonData.map((pokemon, index) => (
                    <li key={index} className={`mb-2 ${index%2 === 1 ? 'text-red-500' : 'text-gray-400'}`}>
                        {pokemon.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};