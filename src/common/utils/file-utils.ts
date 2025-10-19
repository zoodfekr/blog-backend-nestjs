import { mkdirp } from 'mkdirp'
import { UplpoadFileDto } from "../dtos/upload_file.dto";
import sharp from 'sharp';
import path from 'path';

export const saveImage = async (
    file: Express.Multer.File,
    body: UplpoadFileDto,
) => {
    const safeFolder = String(body.folder || '').replace(/[^a-zA-Z0-9-_]/g, '');
    const destination = path.join('files', safeFolder);
    const originalNameWithoutExt = (file.originalname || '')
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9-_\.]/g, '_');
    const fileName = `${Date.now()}-${originalNameWithoutExt}.webp`;

    mkdirp.sync(destination);


    await sharp(file.buffer).webp().toFile(path.join(destination, fileName));

    return `${safeFolder}/${fileName}`;
};

// npm i sharp
// npm i mkdirp