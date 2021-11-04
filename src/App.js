import React, { useContext, createContext, useReducer } from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, Hidden, useMediaQuery } from "@material-ui/core";
import songReducer from "./reducer";

export const SongContext = createContext({
  song: {
    id: "1b75e238-a646-4750-bdd5-0a65db19dfe7",
    title: "Episode 5: Buy Urbitcoin with Christian Langalis",
    artist: "The Stack",
    thumbnail:
      "https://i1.sndcdn.com/artworks-QKWojf7m5yOVVRVQ-4BzjBA-t500x500.jpg",
    url: "https://soundcloud.com/user-628294386/episode-5-buy-urbitcoin-with-christian-langalis",
    duration: 2546.678,
  },
  isPlaying: false,
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const greaterThanSmall = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSmall ? 80 : 10,
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMedium
              ? {
                  position: "fixed",
                  width: "100%",
                  right: 10,
                  top: 70,
                }
              : {
                  position: "fixed",
                  width: "100%",
                  left: 0,
                  bottom: 70,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
