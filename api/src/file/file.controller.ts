import { NextFunction, Request, Response } from "express";
import { fileService } from "./file.service.js";
import { Error } from "mongoose";
const ALLOWED_MIMETYPE = ['image/png', 'image/jpeg'];

export const fileController = {
    findAll: async (req: Request, res: Response) => {
        const files = await fileService.findAll()
        return res.status(200).json(files)
    },

    getFile: async (req: Request, res: Response) => {
        try {
            const name = req.params.name;

            const downloadStream = await fileService.getAsStream(name);
            if (!downloadStream) {
                return res.status(404).json({
                    error: 'File not found'
                });
            }

            console.log(downloadStream);

            downloadStream.on('data', (data) => res.status(200).write(data));
            downloadStream.on('error', () =>
                res.status(404).send({
                    message: 'Cannot download the file!'
                }),
            );
            downloadStream.on('end', () => res.end());
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error: err.message
            });
        }
    },

    addFile: async (req: Request, res: Response) => {
        try {
            const file = req.file;
            console.log(file)

            if(!file) return res.status(400).json({message: "need a file"})

            if (!file.mimetype || ALLOWED_MIMETYPE.indexOf(file.mimetype) === -1) {
                return res
                    .status(400)
                    .json({
                        error: `Mimetype must in ${ALLOWED_MIMETYPE}`
                    });
            }

            const fileUploaded = await fileService.uploadFile(file, {
                kind: 'pdf'
            });
            if (!fileUploaded) {
                return res.status(404).json({
                    error: 'failed to upload file'
                });
            }

            return res.status(201).send(fileUploaded);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error: err.message
            });
        }
    },

    // Owner
    deleteFile: async (req: Request, res: Response) => {
        try {
            const name = req.params.name;

            const file = await fileService.delete(name);
            if (!file) {
                return res.status(404).json({
                    error: 'File not found'
                });
            }

            return res.status(200);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error: err.message
            });
        }
    },
}