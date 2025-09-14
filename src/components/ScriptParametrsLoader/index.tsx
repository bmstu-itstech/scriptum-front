'use client';
import { ScriptParametrsLayout } from '@/layouts/ScriptParametrsLayout';
import { memo, type FC } from 'react';
import { Props } from '@/components/ScriptParametrsLoader/ScriptParametrsLoader.props';
import stylesLayout from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import styles from '@/components/ScriptParametrsLoader/ScriptParametersLoader.module.css';
import ScriptParametersLoaderRow from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderRow/index';
import { FieldArray } from 'formik';
import { ExtendedBlock } from '@/shared/ExtendedBlock';
import { ScriptParametrsLoaderHeader } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderHeader';
import { ScriptParametersLoaderPreblock } from '@/components/ScriptParametrsLoader/components/ScriptParametrsLoaderPreblock';

export const ScriptParametrsLoader: FC<Props> = memo(({ params, type, className, ...props }) => {
  const name = type === 'input' ? 'inputParams' : 'outputParams';

  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <ScriptParametrsLayout
          className={className}
          headerClassname={stylesLayout.smallPadding}
          header={<ScriptParametrsLoaderHeader params={params} type={type} push={push} />}
          {...props}>
          {<ScriptParametersLoaderPreblock type={type} isEmpty={params.length === 0} />}
          <ExtendedBlock
            mainExtendedClassname={styles.extendedBlock__main}
            contentClassname={styles.extendedBlock__content}>
            {params.map((row, ind) => (
              <ScriptParametersLoaderRow
                key={row.id}
                arrayName={name}
                index={ind}
                onRemove={() => remove(ind)}
                {...row}
              />
            ))}
          </ExtendedBlock>
        </ScriptParametrsLayout>
      )}
    </FieldArray>
  );
});

ScriptParametrsLoader.displayName = 'ScriptParametrsLoader';
