import { useMutation } from "@apollo/client";
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

function QueuedSongList({ queue }) {
  const greaterThanMedium = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  // const song = {
  //   title: "Ocean Man",
  //   artist: "Ween",
  //   thumbnail:
  //     "https://i.ytimg.com/vi/QZShA_a-5r8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG\u0026rs=AOn4CLAco-I7zxLy_hF2Rklh2OT1ZkafRQ",
  // };

  return (
    greaterThanMedium && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="secondary" variant="button">
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  );
}

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  container: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "50px auto 50px",
    gridGap: 12,
    alignItems: "center",
    marginTop: 10,
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

function QueuedSong({ song }) {
  const classes = useStyles();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue));
    },
  });

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } },
    });
  }

  const { thumbnail, artist, title } = song;
  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography variant="subtitle2" className={classes.text}>
          {title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          className={classes.text}
        >
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSongList;
