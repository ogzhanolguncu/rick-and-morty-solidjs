import { Component, For, createSignal, onMount, createEffect } from "solid-js";
import axios from "axios";

import { EpisodeResponse } from "./types/api";
import EpisodeWrapper from "./components/EpisodeWrapper";

const fetchEpisodes = async (optionalUrl?: string) =>
  axios.get<EpisodeResponse>(
    optionalUrl ?? "https://rickandmortyapi.com/api/episode"
  );

const App: Component = () => {
  const [episodes, setEpisodes] = createSignal<EpisodeResponse>();

  const fetchMoreImages = async () => {
    if (episodes()?.info?.next) {
      const { data } = await fetchEpisodes(episodes()?.info.next as any);
      //@ts-ignore
      const modifiedEpisodes = [...episodes()?.results, ...data.results];
      setEpisodes((prevState) => ({
        ...prevState,
        results: modifiedEpisodes,
        info: data.info,
      })) as EpisodeResponse;
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchMoreImages();
    }
  };

  createEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onMount(async () => {
    setEpisodes((await fetchEpisodes()).data);
  });

  return (
    <div class="flex justify-center items-center flex-col p-10">
      <h2 class=" font-medium text-4xl my-5">Rick and Morty</h2>
      <div style={{ width: "1000px" }}>
        <For
          each={episodes()?.results.slice(0, 2)}
          fallback={<p>Loading...</p>}
        >
          {(episode) => (
            <div>
              <EpisodeWrapper episode={episode} />{" "}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
