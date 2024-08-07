import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PokeApi } from '../../utilities/api'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import PokemonGridComponent from './PokemonGridComponent'
import PokemonController from './PokemonController'

function Pokemon() {
  const [pokemonList, setPokemonList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hadError, setHadError] = useState(false)

  useEffect(() => {
    PokeApi.fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then(async r => {
        const detailedPokemonList = await Promise.all(
          r.results.map(async (pokemon) => {
            try {
              const detailedPokemon = await PokeApi.fetch(pokemon.url)
              return detailedPokemon
            } catch (error) {
              console.error(error)
              return null
            }
          })
        )
        setPokemonList(detailedPokemonList.filter(pokemon => pokemon !== null))
        setIsLoading(false)
      })
      .catch(e => {
        console.error(e)
        setIsLoading(false)
        setHadError(true)
      })
  }, [])

  return hadError ? (
    <div>An error occured</div>
  ) : isLoading ? (
    <div>Loading...</div>
  ) : (
    <Box
    height={'100%'}
    display={'flex'}
    flexDirection={'column'}
    gap={2}
    justifyContent={'start'}
    alignItems={'center'}
    >
      <PokemonController />
      <Grid2
        container
        spacing={1}
        disableEqualOverflow
        sx={{
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {pokemonList?.map((pokemon) => {
          return (
            <PokemonGridComponent key={pokemon.id} pokemon={pokemon} />
          )
        })}
      </Grid2>
    </Box>
  )
}

export default Pokemon