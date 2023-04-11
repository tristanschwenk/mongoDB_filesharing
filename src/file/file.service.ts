import pkg from 'mongoose';
import mongodb from 'mongodb';
import mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';
import { File } from './file.model.ts';

const { connection, mongo } = pkg

const bucketName = 'file';

class FileService {
  // bucket is lazy-loaded to ensure mongo connection is up
  bucket: mongodb.GridFSBucket;

  async findAll() {
    return File.find()
  }

  // bucket lazy-loading
  private getBucket() {
    if (!this.bucket) {
      this.bucket = new mongo.GridFSBucket(connection.db, {
        bucketName: bucketName
      });
    }
    return this.bucket;
  }

  uploadFile(
    file: Express.Multer.File,
    metadata: Record<string, string>,
  ): Promise<string> {
    // TODO check mimetype is present
    const fileName = `${uuidv4()}.${mime.extension(file.mimetype)}`;

    return new Promise<string>((resolve, reject) => {
      const options = {
        metadata,
        contentType: file.mimetype,
      };
      const uploadStream = this.getBucket().openUploadStream(fileName, options);

      uploadStream.on('finish', () => resolve(fileName));
      uploadStream.on('error', reject);

      uploadStream.write(file.buffer);
      uploadStream.end();
    });
  }

  // Return number of deleted files
  async delete(name: string) {
    const files = await this.getBucket().find({ filename: name }).toArray();
    for (const file of files) {
      this.getBucket().delete(file._id);
    }
    return files.length;
  }

  getAsStream(name: string) {
    return this.getBucket().openDownloadStreamByName(name);
  }
}

export const fileService = new FileService();
