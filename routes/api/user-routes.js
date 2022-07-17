const router = require("express").Router();
const controller = require("../../controllers/user-controller");

router.get("/", controller.getUsers);

router.get("/:id", controller.getOneUser);

router.post("/", controller.postUser);

router.put("/:id", controller.updateUser);

router.delete("/:id", controller.deleteUser);

router.post("/:userID/friends/:friendID", controller.postFriend);

router.delete("/:userID/friends/:friendID", controller.deleteFriend);

module.exports = router;
