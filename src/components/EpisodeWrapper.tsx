import { Component, createSignal, For } from "solid-js";

import { EpisodeDetails } from "../types/api";
import CharacterCard from "./CharacterCard";

type Props = {
  episode: EpisodeDetails;
};

const EpisodeWrapper: Component<Props> = ({ episode }) => {
  const [loadCount, setLoadCount] = createSignal(6);
  const [counter, setCounter] = createSignal(1);

  const totalPage = Math.ceil(episode.characters.length / 6);

  const handleLoadMore = () => {
    if (counter() < totalPage) {
      setLoadCount((prevState) => prevState + 6);
      setCounter((prevState) => prevState + 1);
    }
  };

  const episodeNumber = episode.episode.substring(
    episode.episode.length - 2,
    episode.episode.length
  );

  const seasonNumber = episode.episode.substring(1, 3);
  return (
    <div class="rounded-md border-solid border p-5 border-black mt-5">
      <p className="text-3xl">
        #{episode.id}-{episode.name}
      </p>
      <p className="text-xl my-2">
        {`This is the
          ${episodeNumber}st episode in ${seasonNumber}st session. It was aired on ${episode.air_date}. There are total of ${episode.characters.length} featured in this episode.`}
      </p>
      <div class="grid grid-cols-3 gap-4">
        <For
          each={episode.characters.slice(0, loadCount())}
          fallback={<p>Loading...</p>}
        >
          {(character) => <CharacterCard characterUrl={character} />}
        </For>
        {loadCount() !== episode.characters.length && (
          <>
            <div></div>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLoadMore}
            >
              Load More!
            </button>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
};

export default EpisodeWrapper;
