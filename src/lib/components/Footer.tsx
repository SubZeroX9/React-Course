import type { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';

export const Footer: FC = () => {
  const { ready, i18n } = useTranslation('common');

  if (!ready) {
    return null;
  }

  return (
    <footer
      className="py-4 px-4 text-center text-sm border-t"
      style={{
        backgroundColor: 'var(--surface-0)',
        borderColor: 'var(--surface-border)',
        color: 'var(--text-color-secondary)'
      }}
    >
      <Trans
        i18nKey="termsAgreement"
        ns="common"
        i18n={i18n}
        components={{
          1: <strong style={{ color: 'var(--text-color)' }} />
        }}
      />
    </footer>
  );
};
