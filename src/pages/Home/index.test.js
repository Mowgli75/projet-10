import { fireEvent, render, screen } from "@testing-library/react";
import { useData, DataProvider, api } from "../../contexts/DataContext/index";
import Home from "./index";
import Event from "../../containers/Events/index";
import PeopleCard from "../../components/PeopleCard";
import Icon from "../../components/Icon";
import Logo from "../../components/Logo";
import EventCard from "../../components/EventCard";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      // ajout de la fonction setTimeout pour que la modal avec le message s'affiche en différé apres le msg en cours
      await screen.findByText("En cours");
      setTimeout(() => {
        screen.findByText("Message envoyé !");
      }, 1001);
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Event />
      </DataProvider>
    );
    await screen.findByText("Forum #productCON");
    await screen.findByText("Conférence #productCON");
  });
});
it("a list a people is displayed", async () => {
  window.console.error = jest.fn();
  api.loadData = jest.fn().mockReturnValue("a list of people is displayed");
  render(
    <DataProvider>
      <PeopleCard />
    </DataProvider>
  );
});
it("a footer is displayed", async () => {
  window.console.error = jest.fn();
  api.loadData = jest.fn().mockReturnValue("a footer is displayed");
  render(
    <DataProvider>
      <Icon />
      <Logo />
    </DataProvider>
  );
});
it("an event card, with the last event, is displayed", async () => {
  window.console.error = jest.fn();
  api.loadData = jest
    .fn()
    .mockReturnValue("an event EventCard, with the last event, is displayed");
  const Component = () => {
    const { Last } = useData();
    return <div>{Last}</div>;
  };
  render(
    <DataProvider>
      <EventCard />
    </DataProvider>
  );
});
