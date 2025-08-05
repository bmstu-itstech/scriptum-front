export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  // onUpdate: () => {};
  onRemove: (index: number) => {};
}

export interface ScriptParametersLoaderRowProps {
  name: string;
  desc: string;
  measure: string;
  type: string;
}
