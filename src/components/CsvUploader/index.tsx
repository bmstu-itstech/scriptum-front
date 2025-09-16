'use client';

import type { CsvUploaderProps } from '@/components/CsvUploader/CsvUploader.props';
import { useCustomToast } from '@/hooks/other/useCustomToast';
import { useState, useCallback } from 'react';
import styles from './CsvUploader.module.css';

function parseCsv(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content !== 'string') {
        return reject('Файл пустой или недопустимый.');
      }

      const values = content.split(';').map((v) => v.trim());
      resolve(values);
    };

    reader.onerror = () => reject('Ошибка при чтении файла.');
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
        const values = await parseCsv(file);
        setFileName(file.name);
        onParsed(values);
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
    if (file && file.type === 'text/csv') {
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
            Перетащите CSV-файл или <u>нажмите</u>, чтобы выбрать
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
    </div>
  );
};
