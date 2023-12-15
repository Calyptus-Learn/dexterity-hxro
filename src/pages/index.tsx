import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Hxro Dexterity Scaffold</title>
        <meta
          name="description"
          content="Hxro Dexterity Scaffold"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
