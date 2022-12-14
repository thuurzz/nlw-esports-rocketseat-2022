import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./components/Forms/Input";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";

export type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, [open]);

  function handleCloseModal(isOpen: boolean) {
    setOpen(false);
  }

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20 ">
        Seu{" "}
        <span className="bg-clip-text text-transparent bg-nwl-linear-gradient">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CreateAdBanner />
        <CreateAdModal
          games={games}
          onOpenChange={() => handleCloseModal(open)}
        />
      </Dialog.Root>
    </div>
  );
}

export default App;
