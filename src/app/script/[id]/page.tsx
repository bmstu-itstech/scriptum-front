import {ScriptInfo} from '@/components/ScriptInfo';
import {ScriptParametrs} from '@/components/ScriptParametrs';
import {PageLayout} from '@/layouts/PageLayout';
import {scriptElementUsecase1} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.usecase';
import {
  ScriptParametersInputUsecase,
  ScriptParametersOutputUsecase,
} from '@/components/ScriptParametrs/ScriptParametrs.usecase';
import {ScriptParametersLayoutUsecase1} from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.usecase';
import {ScriptParametrLayout} from '@/layouts/ScriptParametrsLayout/components/ScriptParametrLayout';

export default function Page() {
  // const [data, isLoading] = useGetScriptByid()
  return (
    <PageLayout>
      <ScriptInfo {...scriptElementUsecase1} />
      <ScriptParametrs header={ScriptParametersInputUsecase.header}>
        {ScriptParametersLayoutUsecase1.params.input.map((item, id) => {
          return <ScriptParametrLayout key={id} typeOfCard='input' {...item} />;
        })}
      </ScriptParametrs>
      <ScriptParametrs header={ScriptParametersOutputUsecase.header}>
        {ScriptParametersLayoutUsecase1.params.output.map((item, id) => {
          return <ScriptParametrLayout key={id} typeOfCard='output' {...item} />;
        })}
      </ScriptParametrs>
    </PageLayout>
  );
}
