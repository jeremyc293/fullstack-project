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

export default router;