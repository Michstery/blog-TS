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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
    getBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = req.query, { page, limit, dateFrom, dateTo } = _a, rest = __rest(_a, ["page", "limit", "dateFrom", "dateTo"]);
            const query = Object.assign({}, rest);
            if (req.query.id) {
                const newId = Number(req.query.id);
                let uniqueBlog = yield prisma.Blog.findUnique({
                    where: { id: newId },
                });
                res.json(uniqueBlog);
            }
            const allBlogs = yield prisma.Blog.findMany();
            res.json(allBlogs);
        });
    },
    createBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = yield prisma.Blog.create({
                data: req.body,
            });
            res.json(newBlog);
        });
    },
    updateBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.id) {
                const newId = Number(req.query.id);
                let updatedBlog = yield prisma.Blog.update({
                    where: { id: newId },
                    data: req.body
                });
                res.json(updatedBlog);
            }
            else {
                res.json({ message: 'Query the id for the blog to be updated' });
            }
        });
    },
    deleteBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.id) {
                const newId = Number(req.query.id);
                let uniqueBlog = yield prisma.Blog.findUnique({
                    where: { id: newId },
                });
                if (!uniqueBlog) {
                    res.json({ message: 'Enter the correct id to be deleted in query' });
                }
                let deletedBlog = yield prisma.Blog.delete({
                    where: { id: newId },
                });
                res.json(`The blog with id ${newId} has been Deleted Successfully`);
            }
            else {
                res.json({ message: 'Query the id for the blog to be deleted' });
            }
        });
    },
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = req.query, { page, limit, keyword } = _a, query = __rest(_a, ["page", "limit", "keyword"]);
            const searchedBlogs = yield prisma.Blog.findMany({
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
                                contains: keyword
                            } },
                    ]
                }
            });
            res.json(searchedBlogs);
        });
    }
};
