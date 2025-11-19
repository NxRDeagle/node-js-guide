import { readFileSync, writeFileSync } from "fs";
import { readdir } from "fs/promises";
import { join, extname } from "path";

/** Утилита для фикса импортов (добавления расширения у файлов) при сборке проекта в dist */
async function fixImportsInDir(dir) {
  try {
    const files = await readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = join(dir, file.name);

      if (file.isDirectory()) {
        await fixImportsInDir(fullPath);
      } else if (extname(file.name) === ".js") {
        let content = readFileSync(fullPath, "utf8");

        // Заменяем относительные импорты без расширений
        content = content.replace(
          /from\s+['"](\.\.?\/[^'"]*?)(?<!\.js)['"]/g,
          "from '$1.js'"
        );

        writeFileSync(fullPath, content, "utf8");
        console.log(`Fixed imports in: ${fullPath}`);
      }
    }
  } catch (error) {
    console.error("Error fixing imports:", error);
  }
}

// Запускаем для папки dist
fixImportsInDir("./dist");
