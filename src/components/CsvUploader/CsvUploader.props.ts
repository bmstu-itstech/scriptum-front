export type CsvUploaderProps = {
  onParsed: (data: { headers: string[]; values: string[] }, file: File) => void;
};
