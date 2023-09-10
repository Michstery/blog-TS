"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const asyncHandler = require('express-async-handler');
const blogController = require('../controllers/blogControllers');
router.post('/', asyncHandler((req, res) => blogController.createBlogs(req, res)));
router.get('/', asyncHandler((req, res) => blogController.getBlogs(req, res)));
router.put('/', asyncHandler((req, res) => blogController.updateBlogs(req, res)));
router.delete('/', asyncHandler((req, res) => blogController.deleteBlogs(req, res)));
router.get('/search', asyncHandler((req, res) => blogController.search(req, res)));
module.exports = router;
