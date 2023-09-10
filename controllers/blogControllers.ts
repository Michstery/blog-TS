import express, { NextFunction, Request, Response } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async getBlogs(req: Request, res: Response) {
    const { page, limit, dateFrom, dateTo, ...rest } = req.query;
    const query = {
      ...rest,
    };

    if (req.query.id) {
        const newId = Number(req.query.id)
      let uniqueBlog = await prisma.Blog.findUnique({
        where: { id: newId },
      });
      res.json(uniqueBlog);
    }

    const allBlogs = await prisma.Blog.findMany();
    res.json(allBlogs);
  },

  async createBlogs(req: Request, res: Response) {
    const newBlog = await prisma.Blog.create({
      data: req.body,
    });
    res.json(newBlog);
  },
  
  async updateBlogs(req: Request, res: Response) {
    if (req.query.id) {
        const newId = Number(req.query.id)
        let updatedBlog = await prisma.Blog.update({
        where: { id: newId },
        data: req.body
      });
      res.json(updatedBlog);
    } else {
        res.json({message: 'Query the id for the blog to be updated'})
    }
  },

  async deleteBlogs(req: Request, res: Response) {
    if (req.query.id) {
        const newId = Number(req.query.id)
        let uniqueBlog = await prisma.Blog.findUnique({
            where: { id: newId },
        });
        if (!uniqueBlog) {
            res.json({message: 'Enter the correct id to be deleted in query'})
        }
        let deletedBlog = await prisma.Blog.delete({
        where: { id: newId },
      });
      res.json(`The blog with id ${newId} has been Deleted Successfully`);
    } else {
        res.json({message: 'Query the id for the blog to be deleted'})
    }
  },

  async search(req: Request, res: Response) {
    const { page, limit, keyword, ...query } = req.query
    const searchedBlogs = await prisma.Blog.findMany({
        where: {
            OR: [
              {
                title: {
                    mode: 'insensitive',
                    contains: keyword
                },
              },
              { authorName: { 
                mode: 'insensitive',
                contains:  keyword
               } },
            ]
        }
    })
    res.json(searchedBlogs)
  }

};
