import { IScript } from '@/domain/entities/script';

export const mainPageUsecase = {
	title: 'Управление скриптами',
	subtitle: 'Найдите и запустите нужные скрипты или создайте новые',
};

export const APIScripts: IScript[] = Array.from({ length: 50 }, (_, i) => ({
	script_id: i + 1,
	script_name: `Скрипт №${i + 1}`,
	script_description: `Описание скрипта №${i + 1}. Выполняет расчёт параметров для промышленного применения.`,
	in_fields: [
		{
			type: 'number',
			name: `input_param_${i + 1}_a`,
			description: 'Входной числовой параметр A',
			unit: 'м'
		},
		{
			type: 'number',
			name: `input_param_${i + 1}_b`,
			description: 'Входной числовой параметр B',
			unit: 'кг'
		}
	],
	out_fields: [
		{
			type: 'number',
			name: `output_result_${i + 1}`,
			description: 'Результирующее значение расчёта',
			unit: 'Па'
		}
	],
	file_id: 1000 + i,
	owner: (i % 5) + 1, // имитация разных владельцев
	visibility: i % 3 === 0 ? 'global' : 'private',
	created_at: new Date(2024, (i % 12), (i % 28) + 1).toISOString()
}));
