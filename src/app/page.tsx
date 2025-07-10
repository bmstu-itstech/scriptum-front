import {PageLayout} from '@/layouts/PageLayout';
import {mainPageUsecase} from '@/app/page.usecase';
import { ScriptPanel } from '@/components/ScriptsPanel';
export default function Home() {
  return (
    <PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
      {/* <Search /> */}
      <ScriptPanel />
    </PageLayout>
  );
}
