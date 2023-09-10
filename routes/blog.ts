import express, { Request, Response } from "express";

const router = express.Router()
const asyncHandler = require('express-async-handler')
const blogController = require('../controllers/blogControllers')

router.post(
    '/', asyncHandler((req: Request, res: Response)=> blogController.createBlogs(req,res) )
)

router.get(
    '/', asyncHandler((req: Request, res: Response)=> blogController.getBlogs(req,res) )
)

router.put(
    '/', asyncHandler((req: Request, res: Response)=> blogController.updateBlogs(req,res) )
)

router.delete(
    '/', asyncHandler((req: Request, res: Response)=> blogController.deleteBlogs(req,res) )
)

router.get(
    '/search', asyncHandler((req: Request, res: Response)=> blogController.search(req,res) )
)

module.exports = router