import {PageLayout} from '@/layouts/PageLayout';

export default function Page() {
  // const [data, isLoading] = useGetScriptByid()
  return <PageLayout>
    <ScriptInfo />
  <ScriptParametrs /> 
    </PageLayout>;
}
