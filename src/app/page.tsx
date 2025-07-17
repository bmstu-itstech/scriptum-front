import {PageLayout} from '@/layouts/PageLayout';
import {mainPageUsecase} from '@/app/page.usecase';
import {ScriptPanel} from '@/components/ScriptsPanel';
import {Search} from '@/components/Search';
import {SearchIcon} from '@/components/icons/SearchIcon';
import {searchUsecase} from '@/components/Search/Search.usecase';
import styles from '@/app/page.module.css';
// export default function Home() {
//   return (
//     <PageLayout title={mainPageUsecase.title} subtitle={mainPageUsecase.subtitle}>
//       <Search
//         callback={async () => {
//           'use server';
//           // Your server logic here
//         }}
//         className={styles.page__search}
//         icon={<SearchIcon />}
//         placeholder={searchUsecase.placeholder}
//       />
//       <ScriptPanel />
//     </PageLayout>
//   );
// }

import { Header } from "@/components/Header";
import { PipelineModal } from '@/layouts/PipelineModal';
import { PipelineStatus } from '@/shared/consts/pipeline';
export default function Home() {
	return (
		<PipelineModal
      status={PipelineStatus.OK}
      title='#0002'
      subtitle='Теплопотеря в трубопроводах'
      timeStart='15.01.2025 14:30:15'
      duration='2м 45с'
      input='Толщина изоляции: 0.05 м.\nДиаметр трубы: 20 м.\nСкорость потока: 15 м./с.\nДавление: -1.2 бар.'
      output='Expected positive pressure, got -1.2'
    />
	);
}
