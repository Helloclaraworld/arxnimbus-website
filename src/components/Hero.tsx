import ThrivacaDashboard from "./ThrivacaDashboard";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#f6f9fc]">
      {/* 배경: 연한 블루 위에 은은하게 움직이는 브랜드 그라데이션 블롭 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="arx-blob arx-blob-1 -left-40 -top-48 h-[44rem] w-[44rem] opacity-45"
          style={{
            background:
              "radial-gradient(circle at center, #27a9dd 0%, transparent 68%)",
          }}
        />
        <div
          className="arx-blob arx-blob-2 right-[-14rem] top-[-10rem] h-[52rem] w-[52rem] opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, #144992 0%, transparent 68%)",
          }}
        />
        <div
          className="arx-blob arx-blob-1 bottom-[-16rem] left-1/4 h-[40rem] w-[40rem] opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, #27a9dd 0%, transparent 70%)",
          }}
        />
        {/* 텍스트 가독성을 위해 위/아래를 살짝 정리 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f6f9fc]/70 via-transparent to-[#f6f9fc]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-24 sm:py-32 lg:grid-cols-2 lg:gap-14 lg:py-40">
        {/* 왼쪽: 카피 */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#144992]/15 bg-[#144992]/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#144992]">
            It&apos;s not magic. It&apos;s math.
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Quantify cyber and AI exposure.{" "}
            {/* block + w-fit: 항상 새 줄에서 시작하되, 그라데이션은 글자 폭에만 걸리게 */}
            <span className="block w-fit bg-gradient-to-r from-[#144992] to-[#27a9dd] bg-clip-text text-transparent">
              In dollars.
            </span>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Your security tools and AI systems generate massive exposure data,
            but the value is trapped. The{" "}
            <span className="font-display font-semibold text-slate-900">
              Thrivaca
            </span>{" "}
            AI Engine turns it into financial intelligence your board can act
            on.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-[#144992] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0f3a76]"
            >
              See Exposure in Dollars
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:border-[#144992] hover:text-[#144992]"
            >
              How It Works
            </a>
          </div>
        </div>

        {/* 오른쪽: Thrivaca 대시보드 — Apple liquid glass 프레임 */}
        <div className="relative lg:justify-self-end">
          {/* 카드 뒤 은은한 브랜드 글로우 */}
          <div
            className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-40 blur-3xl"
            style={{
              background: "linear-gradient(135deg, #27a9dd 0%, #144992 100%)",
            }}
          />

          <div className="liquid-glass arx-float relative w-full rounded-[1.75rem] p-2.5">
            {/* 대시보드는 불투명 서브레이어 위에 (가독성/접근성) */}
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/80 px-3 py-4 shadow-inner sm:px-5">
              <ThrivacaDashboard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
