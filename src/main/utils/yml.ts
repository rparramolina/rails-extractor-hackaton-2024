import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { getEnglishTranslation, getPortugueseTranslation } from './translation';


async function updateYamlValue(
  data: any,
  targetKey: string,
  language: string
): Promise<boolean> {
  for (const key in data) {
    if (typeof data[key] === 'object' && data[key] !== null) {
      const found = await updateYamlValue(data[key], targetKey, language);
      if (found) return true;
    } else if (key === targetKey) {
      const translation =
        language === 'en'
          ? await getEnglishTranslation(data[key])
          : await getPortugueseTranslation(data[key]);

      data[key] = translation;
      return true;
    }
  }
  return false;
}


export async function actualizarYamlDinamico(
  filePath: string,
  targetKey: string,
  language: string
) {
  try {

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContent) as any;
    const updated = await updateYamlValue(data, targetKey, language);
    if (!updated) {
      console.log(`No se encontró la clave ${targetKey} en el archivo YAML.`);
      return;
    }
    const nuevoYaml = yaml.dump(data);

    fs.writeFileSync(filePath, nuevoYaml, 'utf8');
    console.log(`Se actualizó el valor de ${targetKey} con éxito.`);
  } catch (error) {
    console.error('Error al procesar el archivo YAML:', error);
  }
}
