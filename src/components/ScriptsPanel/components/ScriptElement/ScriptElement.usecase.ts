import type { IScriptItem } from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';

export const scriptElementUsecase1: IScriptItem = {
	scriptId: 1,
	scriptTitle: 'Расчёт потерь давления в трубе или в узких пространствах транспорта',
	subtitle:
		'Скрипт вычисляет потери давления в трубопроводе или скважине из-за трения о стенки трубы и гравитационных эффектов.',
	countOfRuns: 124,
	author: 'Иванов И.И.',
	data: new Date(),
};

export const scriptElementUsecase2: IScriptItem = {
	scriptId: 2,
	scriptTitle: 'Теплопотери в трубопроводах',
	subtitle: 'Определяет, сколько тепла теряет транспортируемая элемент по мере движения по трубе.',
	countOfRuns: 124,
	author: 'Пертов А.И.',
	data: new Date(),
};

export const scriptElementUsecase3: IScriptItem = {
	scriptId: 3,
	scriptTitle: 'Оценка износа материала трубы',
	subtitle:
		'Скрипт прогнозирует скорость коррозии и механического износа трубы на основе условий эксплуатации.',
	countOfRuns: 124,
	author: 'Волт А.Ф.',
	data: new Date(),
};

export const scriptElementUsecase4: IScriptItem = {
	scriptId: 4,
	scriptTitle: 'Расчёт устойчивости ствола',
	subtitle: 'Скрипт оценивает риск обрушения стенок скважины или выдавливания бурового раствора.',
	countOfRuns: 124,
	author: 'Иванов И.И.',
	data: new Date(),
};
