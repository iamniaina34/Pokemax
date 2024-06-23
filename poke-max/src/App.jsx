import PokemonList from './components/PokemonList'
import './css/app.css'

export default function App() {

  return (
    <div className="w-full">
      <h1 className="text-3xl text-center font-bold">
        Catch 'em all !
      </h1>
      <PokemonList />
    </div>
  )
}
