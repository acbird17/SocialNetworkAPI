const router = require("express").Router();
const controller = require("../../controllers/thought-controller");

router.get("/", controller.getThoughts);

router.get("/:id", controller.getOneThought);

router.post("/", controller.postThought);

router.put("/:id", controller.updateThought);

router.delete("/:id", controller.deleteThought);

router.post("/:thoughtID/reactions", controller.postReaction);

router.delete("/:thoughtID/reactions/:reactionID", controller.deleteReaction);

module.exports = router;
