'use client'

{/* 
import { PipelineButton } from '@/shared/PipelineButton';
<PipelineButton status={PipelineStatus.OK}/>
<PipelineButton status={PipelineStatus.ERROR}/>
<PipelineButton status={PipelineStatus.RUNNING}/> 
*/}


import { PipelineModalLayout } from '@/layouts/PipelineModalLayout';
import { PipelineStatus } from '@/shared/consts/pipeline';
import { useState } from 'react';


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

	return (
		<>
      <button onClick={() => setIsOpen(true)}>НАЖМИ АЛЕ</button>
      <PipelineModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}
        status={PipelineStatus.ERROR}
        title='#0002'
        subtitle='Теплопотеря в трубопроводах'
        timeStart='15.01.2025 14:30:15'
        duration='2м 45с'
        input={'Толщина изоляции: 0.05 м.\nДиаметр трубы: 20 м.\nСкорость потока: 15 м./с.\nДавление: -1.2 бар.'}
        output='Expected positive pressure, got -1.2'
      />
    </>
	);
}
