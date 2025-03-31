import { load } from 'js-yaml';
import { readFile } from 'fs/promises'
import path from 'path'

export default async function initConfig() {
    const configPath = path.join(process.cwd(), 'config.yaml');
    const yml = await readFile(configPath, 'utf-8');
    return load(yml)
}