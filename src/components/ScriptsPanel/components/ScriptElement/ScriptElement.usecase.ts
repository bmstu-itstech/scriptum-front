import type {IScriptItem} from '@/components/ScriptsPanel/components/ScriptElement/ScriptElement.props';

export const scriptElementUsecase1: IScriptItem = {
    id: 1,
  title: 'Расчёт потерь давления в трубе',
  subtitle:
    'Скрипт вычисляет потери давления в трубопроводе или скважине из-за трения о стенки трубы и гравитационных эффектов.',
  countOfRuns: 124,
  author: 'Иванов И.И.',
  data: new Date(),
};

export const scriptElementUsecase2: IScriptItem = {
  id: 2,
  title: 'Теплопотери в трубопроводах',
  subtitle: 'Определяет, сколько тепла теряет транспортируемая элемент по мере движения по трубе.',
  countOfRuns: 124,
  author: 'Пертов А.И.',
  data: new Date(),
};

export const scriptElementUsecase3: IScriptItem = {
  id: 3,
  title: 'Оценка износа материала трубы',
  subtitle:
    'Скрипт прогнозирует скорость коррозии и механического износа трубы на основе условий эксплуатации.',
  countOfRuns: 124,
  author: 'Волт А.Ф.',
  data: new Date(),
};

export const scriptElementUsecase4: IScriptItem = {
  id: 4,
  title: 'Расчёт устойчивости ствола',
  subtitle: 'Скрипт оценивает риск обрушения стенок скважины или выдавливания бурового раствора.',
  countOfRuns: 124,
  author: 'Иванов И.И.',
  data: new Date(),
};
