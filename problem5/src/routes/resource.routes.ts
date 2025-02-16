import express from "express";
import { createResource, getAllResources, getResourceById, updateResource, deleteResource } from "../controllers/resource.controller";

const router = express.Router();

router.post("/", createResource);
router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;
