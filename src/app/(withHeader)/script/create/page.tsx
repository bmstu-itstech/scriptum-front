import {PageLayout} from '@/layouts/PageLayout';
import {ScriptParametrsLayout} from '@/layouts/ScriptParametrsLayout';
import {pageCreateUsecase} from '@/app/(withHeader)/script/create/page.usecase';
import {InputLayout} from '@/layouts/InputLayout';
import {InfoBlockLayout} from '@/layouts/InfoBlockLayout';
import styles from '@/app/(withHeader)/script/create/page.module.css';
import cn from 'classnames';
import stylesLayout from '@/layouts/ScriptParametrsLayout/ScriptParametrsLayout.module.css';
import {ScriptParametrsLoader} from '@/components/ScriptParametrsLoader';

export default function CreatePage() {
  return (
    <PageLayout>
      <InfoBlockLayout
        headerClassname={styles.infoblock__header}
        contentClassname={styles.infoblock__content}
        // mainExtendedClassname={}
        className={styles.infoblock}
        header={pageCreateUsecase.main.header}>
        <div className={styles.flex}>
          <InputLayout
            type='text'
            inputTitle={pageCreateUsecase.main.blocks.scriptTitle.title}
            placeholder={pageCreateUsecase.main.blocks.scriptTitle.placeholder}
            errorText={pageCreateUsecase.main.blocks.scriptTitle.errorText}
          />
          <InputLayout
            type='file'
            inputTitle={pageCreateUsecase.main.blocks.scriptCode.title}
            placeholder={pageCreateUsecase.main.blocks.scriptCode.placeholder}
            errorText={pageCreateUsecase.main.blocks.scriptCode.errorText}
          />
        </div>
        <InputLayout
          type='text'
          inputClassName={styles.desc}
          inputTitle={pageCreateUsecase.main.blocks.scriptDesc.title}
          placeholder={pageCreateUsecase.main.blocks.scriptDesc.placeholder}
          errorText={pageCreateUsecase.main.blocks.scriptDesc.errorText}
        />
      </InfoBlockLayout>
      <ScriptParametrsLoader
        type='input'
        // headerClassname={stylesLayout.smallPadding}
        // header={pageCreateUsecase.input.header}
        //   </div>
        // }
      />
    </PageLayout>
  );
}
