import { useForm } from "react-hook-form";
import { Input } from "../Input";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { usePokemon, useDebounce } from "../../hooks";
import { PokemonCard } from "../PokemonCard";

interface FormValues {
  pokemon: string;
}

export const PokemonFinder = () => {
  const { register, reset, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: { pokemon: "" }
  });
  const pokemonName = watch("pokemon");
  const [debouncedPokemonName, resetDebounce] = useDebounce(pokemonName, 2000);

  const { data, error, isLoading, isError, isFetching } = usePokemon(debouncedPokemonName.trim());

  const isUserSearching = (pokemonName && !data && !isError)
  const isLoadingPokemonInfo = isUserSearching || (isLoading || isFetching)

  const handleReset = () => {
    reset({ pokemon: "" });
    resetDebounce("");
  };

  return (
    <div className="container pokemon-finder">
      <h2 className="text-center mb-4">Find Your Pokémon</h2>

      <Form onSubmit={e => e.preventDefault()}>
        <div className="d-flex">
          <Input
            label="Search Pokémon"
            placeholder="Type a Pokémon name here! e.g Bulbasaur!"
            error={errors.pokemon?.message}
            {...register("pokemon")}
            isLoading={isLoadingPokemonInfo}
          />
        </div>
        <div className="d-flex justify-content-end gap-2">
          {pokemonName && (
            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleReset}
              disabled={isLoading || isFetching}
            >
              Reset
            </Button>
          )}
        </div>
      </Form>

      <div className="mt-4">
        {isError && (
          <Alert variant="danger">
            {(error as Error)?.message || "Error fetching Pokémon."}
          </Alert>
        )}

        {data && !isLoading && <PokemonCard className="mx-auto" pokemon={data} />}

        {!pokemonName && !data && !isError && (
          <Alert variant="info" className="text-center">
            Enter a Pokémon name above to search the Pokémon database.
          </Alert>
        )}

        {pokemonName && !data && !isError && (
          <Alert variant="light" className="text-center">
            Waiting for Pokémon data...
          </Alert>
        )}
      </div>
    </div>
  );
}