import { Request, Response } from "express";
import Resource, { IResource } from "../models/resource.model";

// Create Resource
export const createResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;
        const resource = new Resource({ name, description });
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ message: "Error creating resource", error });
    }
};

// Get All Resources
export const getAllResources = async (req: Request, res: Response): Promise<void> => {
    try {
        const resources: IResource[] = await Resource.find();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resources", error });
    }
};

// Get Single Resource
export const getResourceById = async (req: Request, res: Response): Promise<void> => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }
        res.json(resource);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resource", error });
    }
};

// Update Resource
export const updateResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedResource) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }
        res.json(updatedResource);
    } catch (error) {
        res.status(500).json({ message: "Error updating resource", error });
    }
};

// Delete Resource
export const deleteResource = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedResource = await Resource.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }
        res.json({ message: "Resource deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting resource", error });
    }
};
