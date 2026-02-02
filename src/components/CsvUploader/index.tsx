'use client';

import type { CsvUploaderProps } from '@/components/CsvUploader/CsvUploader.props';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { useState, useCallback } from 'react';
import styles from './CsvUploader.module.css';

function parseCsv(file: File): Promise<{ headers: string[]; values: string[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content !== 'string') {
        return reject('Файл пустой или недопустимый');
      }

      const lines = content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length < 2) {
        return reject('Файл должен содержать строку заголовков и строки с данными');
      }

      const headers = lines[0].split(';').map((v) => v.trim());
      const dataLine = lines[1];
      const values = dataLine.split(';').map((v) => v.trim());

      if (headers.length !== values.length) {
        return reject('Количество заголовков не совпадает с количеством значений');
      }

      resolve({ headers, values });
    };

    reader.onerror = () => reject('Ошибка при чтении файла');
    reader.readAsText(file);
  });
}

export const CsvUploader: React.FC<CsvUploaderProps> = ({ onParsed }) => {
  const notify = useCustomToast();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      try {
        const csvData = await parseCsv(file);
        setFileName(file.name);
        onParsed(csvData, file);
      } catch (err) {
        notify(err instanceof Error ? err.message : String(err), 'error');
      }
    },
    [notify, onParsed],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.uploader}>
      <label
        htmlFor='csv-upload'
        className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}>
        {fileName ? (
          <span className={styles.filename}>{fileName}</span>
        ) : (
          <span className={styles.placeholder}>
            Перетащите файл или <u>нажмите</u>, чтобы выбрать
          </span>
        )}
        <input
          id='csv-upload'
          type='file'
          accept='.csv'
          className={styles.input}
          onChange={handleInputChange}
        />
      </label>
      <div className={styles.hint}>
        Загрузите CSV-файл с разделителем в виде точки с запятой (;), в котором первая строка
        содержит заголовки столбцов
      </div>
    </div>
  );
};
