import { useState, useEffect, useRef } from "react";

// ── token system ──────────────────────────────────────────
const T = {
  bg:       "#F7F3ED",
  bgDeep:   "#EFE8DC",
  bgCard:   "#FAF7F2",
  ink:      "#1E1208",
  mid:      "#5C3D1E",
  muted:    "#9B7B5A",
  accent:   "#C4956A",
  accentDk: "#8B5E3C",
  line:     "rgba(196,149,106,0.22)",
  white:    "#FDFAF6",
};

const font = {
  display: "'Hiragino Mincho ProN', 'Yu Mincho', 'Georgia', serif",
  body:    "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif",
};

// ── shared styles ─────────────────────────────────────────
const section = (extra = {}) => ({
  padding: "72px 24px",
  maxWidth: 680,
  margin: "0 auto",
  ...extra,
});

const btn = (variant = "primary") => ({
  display: "inline-block",
  padding: "15px 36px",
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.08em",
  cursor: "pointer",
  border: "none",
  fontFamily: font.body,
  ...(variant === "primary" ? {
    background: T.accentDk,
    color: T.white,
  } : {
    background: "transparent",
    color: T.accentDk,
    border: `1px solid ${T.accentDk}`,
  }),
});

// ── fade-in hook ──────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(18px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ── sections ──────────────────────────────────────────────

function Hero() {
  return (
    <div style={{
      minHeight: "100svh",
      background: T.bgDeep,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px 28px 60px",
      position: "relative",
      overflow: "hidden",
    }}>


      <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
        <FadeIn>
          <div style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            color: T.muted,
            fontFamily: font.body,
            marginBottom: 28,
            textTransform: "uppercase",
          }}>
            Hitori BASECAMP
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 style={{
            fontFamily: font.display,
            fontSize: "clamp(28px, 7vw, 44px)",
            fontWeight: 400,
            color: T.ink,
            lineHeight: 1.55,
            letterSpacing: "0.04em",
            margin: "0 0 32px",
          }}>
            大人の<br />
            『贅沢な孤独』に<br />
            備えるリビング。
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p style={{
            fontFamily: font.body,
            fontSize: 13,
            color: T.mid,
            lineHeight: 2,
            margin: "0 0 48px",
            maxWidth: 400,
          }}>
            ひとりを選んだ大人が、落ち着いて寛げる居場所。
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button style={btn("primary")}
              onClick={() => document.getElementById("diagnostic")?.scrollIntoView({ behavior: "smooth" })}>
              スキル診断を受ける
            </button>
            <button style={btn("secondary")}
              onClick={() => document.getElementById("line")?.scrollIntoView({ behavior: "smooth" })}>
              LINEで覗いてみる
            </button>
          </div>
        </FadeIn>
      </div>


    </div>
  );
}

function Empathy() {
  const items = [
    "夜ひとりでいると、漠然とした不安が浮かんでくることがある",
    "緊急のとき、真っ先に連絡できる人の顔が、すぐ浮かばない",
    "ひとりの人生で何が足りていて、何が足りていないのか、自分でもよくわかっていない",
    "話を聞いてくれる人はいても、本当の意味での相談相手がいない",
  ];

  return (
    <div style={{ background: T.bg, padding: "72px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 10, letterSpacing: "0.2em", color: T.muted,
            fontFamily: font.body, marginBottom: 24, textTransform: "uppercase",
          }}>
            Does this sound familiar
          </div>
          <h2 style={{
            fontFamily: font.display, fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 400, color: T.ink, lineHeight: 1.7,
            margin: "0 0 40px", letterSpacing: "0.03em",
          }}>
            こんな感覚、<br />ありませんか。
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{
                padding: "20px 0",
                borderBottom: `1px solid ${T.line}`,
                display: "flex", gap: 20, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: T.accent, marginTop: 8, flexShrink: 0,
                }} />
                <p style={{
                  fontFamily: font.body, fontSize: 14,
                  color: T.mid, lineHeight: 1.9, margin: 0,
                }}>
                  {item}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p style={{
            fontFamily: font.body, fontSize: 13,
            color: T.muted, lineHeight: 2,
            margin: "40px 0 0", fontStyle: "italic",
          }}>
            ひとりで抱えることは、ありません。
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

function Concept() {
  return (
    <div style={{ background: T.bgDeep, padding: "72px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 10, letterSpacing: "0.2em", color: T.muted,
            fontFamily: font.body, marginBottom: 24, textTransform: "uppercase",
          }}>
            What is Hitori BASECAMP
          </div>
          <h2 style={{
            fontFamily: font.display, fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 400, color: T.ink, lineHeight: 1.7,
            margin: "0 0 32px", letterSpacing: "0.03em",
          }}>
            ひとりBASECAMPとは。
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: font.body, fontSize: 14,
            color: T.mid, lineHeight: 2.1, margin: "0 0 40px",
          }}>
            ひとりで生きることを選んだ大人のための、会員制のリビングです。
            <br /><br />
            ここは大人のサードプレイス。リラックスと落ち着きを感じる居場所です。
            <br /><br />
            自分の気持ち、将来のこと、親のこと、お金のこと、健康のこと、誰にも言えない本音や不安な気持ち。ひとりを前提にした会話が、自然に生まれる場所を作っています。
            <br /><br />
            管理人がいて、仲間がいる。そういうリビングです。
          </p>
        </FadeIn>

        {/* 3つの柱 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[
            { label: "話す", body: "本音を持ち寄れる仲間と、ゆるく会話する" },
            { label: "備える", body: "5つのスキル診断で、自分の現在地を知る" },
            { label: "続ける", body: "管理人がいて、仲間がいる。いつでも寛げるリビング" },
          ].map(({ label, body }, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div style={{
                display: "flex", gap: 24,
                padding: "24px 0",
                borderBottom: `1px solid ${T.line}`,
                alignItems: "flex-start",
              }}>
                <div style={{
                  fontFamily: font.display, fontSize: 18,
                  color: T.accent, flexShrink: 0, width: 56,
                  letterSpacing: "0.05em",
                }}>
                  {label}
                </div>
                <p style={{
                  fontFamily: font.body, fontSize: 13,
                  color: T.mid, lineHeight: 1.9, margin: 0,
                }}>
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

function Diagnostic({ onNavigate }) {
  return (
    <div id="diagnostic" style={{ background: T.bgCard, padding: "72px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 10, letterSpacing: "0.2em", color: T.muted,
            fontFamily: font.body, marginBottom: 24, textTransform: "uppercase",
          }}>
            Skill Check
          </div>
          <h2 style={{
            fontFamily: font.display, fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 400, color: T.ink, lineHeight: 1.7,
            margin: "0 0 24px", letterSpacing: "0.03em",
          }}>
            まず、自分の現在地を<br />知ることから。
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: font.body, fontSize: 13,
            color: T.mid, lineHeight: 2, margin: "0 0 32px",
          }}>
            防衛・マネー・デジタル・インフラ・つながり。<br />
            5つのスキルを、15の問いで診断します。所要時間は5〜10分です。
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          {/* 診断カード */}
          <div style={{
            background: T.bgDeep,
            border: `1px solid ${T.line}`,
            borderRadius: 4,
            padding: "32px 28px",
            marginBottom: 32,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "20代・30代・40代・50代・60代に対応",
                "スキル別レーダーチャートで結果を可視化",
                "スコアに応じた年代特有のアドバイス",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    border: `1px solid ${T.accent}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
                  </div>
                  <p style={{ fontFamily: font.body, fontSize: 13, color: T.mid, margin: 0, lineHeight: 1.7 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <button style={{ ...btn("primary"), width: "100%", textAlign: "center" }}
            onClick={() => onNavigate("diagnostic")}>
            無料でスキル診断を受ける
          </button>
          <p style={{
            fontFamily: font.body, fontSize: 11,
            color: T.muted, textAlign: "center",
            margin: "12px 0 0", lineHeight: 1.7,
          }}>
            登録不要・無料・5〜10分
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

function LineSection() {
  return (
    <div id="line" style={{ background: T.bgDeep, padding: "72px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            fontSize: 10, letterSpacing: "0.2em", color: T.muted,
            fontFamily: font.body, marginBottom: 24, textTransform: "uppercase",
          }}>
            Join us
          </div>
          <h2 style={{
            fontFamily: font.display, fontSize: "clamp(20px, 5vw, 28px)",
            fontWeight: 400, color: T.ink, lineHeight: 1.7,
            margin: "0 0 24px", letterSpacing: "0.03em",
          }}>
            リビングへの<br />入口は、LINEです。
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: font.body, fontSize: 13,
            color: T.mid, lineHeight: 2, margin: "0 0 32px",
          }}>
            公式LINEを登録すると、診断アプリへのアクセスと無料相談会のご案内をお届けします。
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div style={{
            background: T.bgCard,
            border: `1px solid ${T.line}`,
            borderRadius: 4,
            padding: "28px",
            marginBottom: 28,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "登録特典：スキル診断アプリへのアクセス",
                "無料相談会のご案内",
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    fontFamily: font.body, fontSize: 11,
                    color: T.accent, flexShrink: 0, marginTop: 2,
                  }}>
                    ▸
                  </div>
                  <p style={{ fontFamily: font.body, fontSize: 13, color: T.mid, margin: 0, lineHeight: 1.8 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <button style={{ ...btn("primary"), width: "100%", textAlign: "center" }}
            onClick={() => onNavigate("diagnostic")}>
            LINEで登録する
          </button>
        </FadeIn>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      background: T.ink,
      padding: "48px 24px",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{
          fontFamily: font.display, fontSize: 16,
          color: T.accent, marginBottom: 8, letterSpacing: "0.06em",
        }}>
          ひとりBASECAMP
        </div>
        <p style={{
          fontFamily: font.body, fontSize: 11,
          color: "rgba(255,255,255,0.35)", lineHeight: 1.8,
          margin: "0 0 24px",
        }}>
          株式会社inclusivity
        </p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
          {[
            { label: "特定商取引法", href: "#" },
            { label: "利用規約", href: "#" },
            { label: "プライバシーポリシー", href: "#" },
            { label: "お問い合わせ", href: "mailto:v.ray.diary.v@gmail.com" },
          ].map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: font.body, fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none", letterSpacing: "0.05em",
            }}>
              {label}
            </a>
          ))}
        </div>

        <p style={{
          fontFamily: font.body, fontSize: 10,
          color: "rgba(255,255,255,0.2)", margin: 0,
          letterSpacing: "0.05em",
        }}>
          © 2026 株式会社inclusivity. All rights reserved.
        </p>
      </div>
    </div>
  );
}

// ── main ─────────────────────────────────────────────────
export default function LP({ onNavigate }) {
  return (
    <div style={{ background: T.bg, fontFamily: font.body }}>
      <Hero />
      <Empathy />
      <Concept />
      <Diagnostic />
      <LineSection />
      <Footer />
    </div>
  );
}
