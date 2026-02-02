export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  onRemove: (index: number) => {};
}

export interface ScriptParametersLoaderRowProps {
  name: string;
  desc: string;
  measure: string;
  type: string;
}
