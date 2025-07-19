import { PipelineStatus } from "@/shared/consts/pipeline";

export const tasksPageUsecase = {
	title: 'Мониторинг задач',
	subtitle: 'Отслеживайте выполнение скриптов в реальном времени',
};

export const pipelines = [
	{
		id: 1,
		status: PipelineStatus.ERROR,
		scriptNumber: '#0001',
		scriptName: 'Расчёт потерь давления в трубе',
		timeStart: '15.01.2025 14:30:15',
		duration: '2м 45с',
		input: 'Толщина изоляции: 0.05 м.\nДиаметр трубы: 20 м.\nСкорость потока: 15 м./с.\nДавление: -1.2 бар.',
		output: 'Ошибка: Expected positive pressure, got -1.2'
	},
	{
		id: 2,
		status: PipelineStatus.OK,
		scriptNumber: '#0002',
		scriptName: 'Расчёт теплопотерь',
		timeStart: '16.01.2025 10:15:22',
		duration: '1м 30с',
		input: 'Материал: сталь.\nТолщина стенки: 0.01 м.\nТемпература внутри: 80°C\nТемпература снаружи: 20°C',
		output: 'Теплопотери: 120 Вт/м²\nРекомендация: увеличить изоляцию'
	},
	{
		id: 3,
		status: PipelineStatus.RUNNING,
		scriptNumber: '#0003',
		scriptName: 'Оптимизация энергопотребления',
		timeStart: '17.01.2025 09:05:10',
		duration: '5м 12с',
		input: 'Потребление: 150 кВт/ч\nТариф: 5.2 руб/кВт·ч\nВременной диапазон: 08:00-18:00',
		output: 'Вычисление оптимального графика...'
	},
	{
		id: 4,
		status: PipelineStatus.OK,
		scriptNumber: '#0004',
		scriptName: 'Анализ прочности конструкции',
		timeStart: '18.01.2025 13:42:33',
		duration: '3м 18с',
		input: 'Материал: алюминий 6061\nНагрузка: 500 кг\nТочки крепления: 4\nТемпература: 25°C',
		output: 'Запас прочности: 2.8\nСлабое место: крепление #3'
	},
	{
		id: 5,
		status: PipelineStatus.ERROR,
		scriptNumber: '#0005',
		scriptName: 'Гидродинамическое моделирование',
		timeStart: '19.01.2025 11:20:47',
		duration: '7м 53с',
		input: 'Жидкость: вода\nВязкость: 0.001 Па·с\nСкорость: 3 м/с\nДиаметр: 0.5 м',
		output: 'Ошибка сетки: несоответствие граничных условий'
	},
	{
		id: 6,
		status: PipelineStatus.OK,
		scriptNumber: '#0006',
		scriptName: 'Расчёт экономии от модернизации',
		timeStart: '20.01.2025 16:15:09',
		duration: '1м 05с',
		input: 'Текущие затраты: 1.2 млн руб/мес\nОжидаемая экономия: 15%\nСрок окупаемости: 24 мес',
		output: 'Годовая экономия: 2.16 млн руб\nROI: 18 месяцев'
	},
];
