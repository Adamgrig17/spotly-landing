import { APP_QR_PATH, APP_QR_SIZE } from '@/lib/app-qr-path';
import { APP_LINK } from '@/lib/promo';

const QUIET = 2;

export function AppQr() {
  const view = APP_QR_SIZE + QUIET * 2;
  return (
    <a className="promo-qr" href={APP_LINK}>
      <svg
        viewBox={`${-QUIET} ${-QUIET} ${view} ${view}`}
        role="img"
        aria-labelledby="promo-qr-title"
      >
        <title id="promo-qr-title">QR για λήψη του Spotly, οδηγεί στο /app</title>
        <rect x={-QUIET} y={-QUIET} width={view} height={view} fill="#ffffff" />
        <path d={APP_QR_PATH} fill="#0B0B0D" />
      </svg>
      Σκάναρε για να κατεβάσεις το app
    </a>
  );
}
