import { mkdirp } from 'mkdirp'
import { UplpoadFileDto } from "../dtos/upload_file.dto";
import sharp from 'sharp';
import path from 'path';
import { UplpoadFilesDto } from '../dtos/upload_files.dto';

export const saveImage = async (
    file: Express.Multer.File,
    body: UplpoadFileDto,
) => {
    const safeFolder = String(body.folder || '').replace(/[^a-zA-Z0-9-_]/g, '');
    const destination = path.join('files', safeFolder);
    const originalNameWithoutExt = (file.originalname || '').replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_\.]/g, '_');
    const fileName = `${Date.now()}-${originalNameWithoutExt}.webp`;

    mkdirp.sync(destination);


    await sharp(file.buffer)
        .resize({ 
            width: body.width && body.width > 0 ? body.width : 200, 
            height: body.height && body.height > 0 ? body.height : 200 
        })
        .webp()
        .toFile(path.join(destination, fileName));

    return `${safeFolder}/${fileName}`;
};


export const saveImages = async (
    files: Array<Express.Multer.File>,
    body: UplpoadFilesDto,
) => {
    const safeFolder = String(body.folder || '').replace(/[^a-zA-Z0-9-_]/g, '');
    const destination = path.join('files', safeFolder);

    mkdirp.sync(destination);

    const fileNames: string[] = [];

    for (const file of files) {

        const originalNameWithoutExt = (file.originalname || '').replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-_\.]/g, '_');
        const fileName = `${Date.now()}-${originalNameWithoutExt}.webp`;
        const outputPath = path.join(destination, fileName);

        await sharp(file.buffer)
            .resize({ 
                width: body.width && body.width > 0 ? body.width : 200, 
                height: body.height && body.height > 0 ? body.height : 200 
            })
            .webp()
            .toFile(outputPath);

        fileNames.push(`${safeFolder}/${fileName}`);
    }

    return fileNames;
};
// npm i sharp
// npm i mkdirp