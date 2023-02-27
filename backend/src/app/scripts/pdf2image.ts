import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { basename, dirname } from 'path';
// import { pdf } from 'pdf-to-img';
import pdf2img from 'pdf-img-convert';
import { exit } from 'process';

async function main(args: string[]) {
    const path = args[0];
    if (existsSync(path) === false) {
        const err = new Error('Invalid path');
        err.name = 'PathError';
        throw err;
    }
    // const pages = await pdf(path);
    // await writeFile(basename(path, '.pdf') + 'hello.png', pages);
    const buff = await pdf2img.convert(path);
    await writeFile(basename(path, '.pdf') + 'hello.png', buff);
}

const args = process.argv.slice(2);
main(args)
    .then(() => exit(0))
    .catch((e) => {
        console.error(e);
        exit(1);
    });
