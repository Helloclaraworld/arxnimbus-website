/**
 * LinkedIn 링크 + 아이콘 공용 모듈.
 * lucide-react 에는 브랜드 아이콘이 없어서(v1 에서 전부 제거됨) 자체 path 를 쓴다.
 * Footer / FinalCTA 두 곳에서 참조하므로 URL 도 여기서 한 번만 정의.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/company/arx-nimbus";

const LINKEDIN_PATH =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.97 0 1.78-.78 1.78-1.74V1.74C24 .78 23.19 0 22.22 0z";

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={LINKEDIN_PATH} />
    </svg>
  );
}
