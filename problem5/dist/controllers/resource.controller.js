"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getResourceById = exports.getAllResources = exports.createResource = void 0;
const resource_model_1 = __importDefault(require("../models/resource.model"));
// Create Resource
const createResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const resource = new resource_model_1.default({ name, description });
        yield resource.save();
        res.status(201).json(resource);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating resource", error });
    }
});
exports.createResource = createResource;
// Get All Resources
const getAllResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resources = yield resource_model_1.default.find();
        res.json(resources);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching resources", error });
    }
});
exports.getAllResources = getAllResources;
// Get Single Resource
const getResourceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resource = yield resource_model_1.default.findById(req.params.id);
        if (!resource) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }
        res.json(resource);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching resource", error });
    }
});
exports.getResourceById = getResourceById;
// Update Resource
const updateResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedResource = yield resource_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedResource) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }
        res.json(updatedResource);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating resource", error });
    }
});
exports.updateResource = updateResource;
// Delete Resource
const deleteResource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedResource = yield resource_model_1.default.findByIdAndDelete(req.params.id);
        if (!deletedResource) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }
        res.json({ message: "Resource deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting resource", error });
    }
});
exports.deleteResource = deleteResource;
