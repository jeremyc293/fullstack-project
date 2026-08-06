import express from "express";
import Playlist from "../models/Playlist.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Playlist
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Playlist name is required.",
      });
    }

    const newPlaylist = await Playlist.create({
      name,
      description,
      user: req.user.id,
      songs: [],
    });

    res.status(201).json({
      message: "Playlist created successfully.",
      playlist: newPlaylist,
    });
  } catch (error) {
    next(error);
  }
});

// Get All Playlists
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const playlists = await Playlist.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
});

// Get One Playlist
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found.",
      });
    }

    res.status(200).json(playlist);
  } catch (error) {
    next(error);
  }
});

// Update Playlist
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const playlist = await Playlist.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        name,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found.",
      });
    }

    res.status(200).json({
      message: "Playlist updated successfully.",
      playlist,
    });
  } catch (error) {
    next(error);
  }
});

// Delete Playlist
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found.",
      });
    }

    res.status(200).json({
      message: "Playlist deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
});

// Add Song to Playlist
router.post("/:id/songs", authMiddleware, async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found.",
      });
    }

    const songAlreadyExists = playlist.songs.some(
      (song) =>
        song.title === req.body.title &&
        song.artist === req.body.artist
    );

    if (songAlreadyExists) {
      return res.status(400).json({
        message: "This song is already in the playlist.",
      });
    }

    playlist.songs.push(req.body);

    await playlist.save();

    res.status(200).json({
      message: "Song added successfully.",
      playlist,
    });
  } catch (error) {
    next(error);
  }
});

// Remove Song from Playlist
router.delete("/:playlistId/songs/:songIndex", authMiddleware, async (req, res, next) => {
  try {
    const playlist = await Playlist.findOne({
      _id: req.params.playlistId,
      user: req.user.id,
    });

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found.",
      });
    }

    playlist.songs.splice(req.params.songIndex, 1);

    await playlist.save();

    res.status(200).json({
      message: "Song removed successfully.",
      playlist,
    });
  } catch (error) {
    next(error);
  }
});

export default router;