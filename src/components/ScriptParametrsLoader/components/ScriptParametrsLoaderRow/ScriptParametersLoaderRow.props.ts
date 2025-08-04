export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  measureValue: string;
  typeValue: string;
}

export interface ScriptParametersLoaderRowProps {
  name: string;
  desc: string;
  measure: string;
  type: string;
}
