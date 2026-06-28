import { useState } from "react";

const BRAND = {
  bg: "#FAF7F2",
  card: "#F4EFE6",
  border: "rgba(180,140,90,0.18)",
  brown: "#2C1A0E",
  mid: "#6B5240",
  light: "#8C7355",
  accent: "#C4956A",
  accentDark: "#8B5E3C",
};

const sectionStyle = {
  marginBottom: 32,
};

const h2Style = {
  fontSize: 13,
  fontWeight: 700,
  color: BRAND.accentDark,
  borderLeft: `3px solid ${BRAND.accent}`,
  paddingLeft: 10,
  marginBottom: 12,
  lineHeight: 1.6,
};

const pStyle = {
  fontSize: 12,
  color: BRAND.mid,
  lineHeight: 2,
  margin: "0 0 8px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 12,
  color: BRAND.mid,
};

const tdLabelStyle = {
  padding: "10px 12px",
  fontWeight: 700,
  color: BRAND.brown,
  background: "rgba(196,149,106,0.08)",
  borderBottom: `1px solid ${BRAND.border}`,
  whiteSpace: "nowrap",
  verticalAlign: "top",
  width: "36%",
};

const tdValueStyle = {
  padding: "10px 12px",
  borderBottom: `1px solid ${BRAND.border}`,
  lineHeight: 1.8,
  verticalAlign: "top",
};

const TABS = ["特定商取引法", "利用規約", "プライバシーポリシー"];

function Tokusho() {
  return (
    <div>
      <p style={{ ...pStyle, marginBottom: 24 }}>
        ひとりBASECAMPは、特定商取引法に基づき以下の事項を表示します。
      </p>
      <table style={tableStyle}>
        <tbody>
          {[
            ["販売事業者", "株式会社inclusivity"],
            ["運営サービス名", "ひとりBASECAMP"],
            ["所在地", "請求があった場合、遅滞なく開示します"],
            ["電話番号", "請求があった場合、遅滞なく開示します"],
            ["メールアドレス", "v.ray.diary.v@gmail.com"],
            ["運営統括責任者", "請求があった場合、遅滞なく開示します"],
            ["サービス内容", "大人のひとり暮らしを支える会員制コミュニティ（リビング）の提供、オンライン相談会、デジタル存在確認サービス"],
            ["販売価格", "月額 10,000円（税込）\n無料相談会：無料"],
            ["支払い方法", "クレジットカード"],
            ["支払い時期", "お申し込み時および毎月の更新日に自動決済"],
            ["サービス提供時期", "決済完了後、速やかにご利用いただけます"],
            ["解約・退会", "マイページまたはメールにて解約申請を受け付けます。解約のタイミングはご利用の決済システムの仕様に依存します。詳細は確定次第、本ページにて更新します"],
            ["返金について", "サービスの性質上、原則として返金はお受けしておりません。ただし、当社の責に帰すべき事由による場合はこの限りではありません"],
            ["動作環境", "インターネット接続環境および標準的なウェブブラウザが必要です"],
          ].map(([label, value]) => (
            <tr key={label}>
              <td style={tdLabelStyle}>{label}</td>
              <td style={tdValueStyle}>{value.split("\n").map((v, i) => <span key={i}>{v}{i < value.split("\n").length - 1 && <br />}</span>)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Terms() {
  const articles = [
    {
      title: "第1条｜適用",
      body: "本規約は、株式会社inclusivity（以下「当社」）が運営するひとりBASECAMP（以下「本サービス」）の利用に関する条件を、会員と当社との間で定めるものです。会員は本規約に同意のうえ、本サービスをご利用ください。",
    },
    {
      title: "第2条｜会員登録",
      body: "本サービスへの登録は、本規約への同意を条件とします。当社は、登録希望者が以下のいずれかに該当する場合、登録を承認しないことがあります。\n・虚偽の情報を申告した場合\n・過去に本規約に違反したことがある場合\n・その他当社が不適切と判断した場合",
    },
    {
      title: "第3条｜会費・支払い",
      body: "月額会費は10,000円（税込）です。お支払いはクレジットカードによる自動決済となります。会費は月次で自動更新されます。",
    },
    {
      title: "第4条｜解約",
      body: "会員はいつでも解約の申請を行うことができます。解約のタイミングはご利用の決済システムの仕様に依存します。詳細は確定次第、特定商取引法ページにて更新します。",
    },
    {
      title: "第5条｜禁止事項",
      body: "会員は以下の行為を行ってはなりません。\n・他の会員への誹謗中傷・ハラスメント\n・商業目的での勧誘・宣伝活動\n・第三者のなりすまし\n・本サービスの運営を妨害する行為\n・法令または公序良俗に反する行為",
    },
    {
      title: "第6条｜サービスの変更・停止",
      body: "当社は、必要と判断した場合、本サービスの内容を変更または停止することがあります。これにより会員に生じた損害について、当社の故意または重大な過失による場合を除き、責任を負いません。",
    },
    {
      title: "第7条｜免責事項",
      body: "当社は、本サービスに関連して会員に生じた損害について、当社の故意または重大な過失による場合を除き、一切の責任を負いません。また、会員間のトラブルについては、当事者間で解決するものとします。",
    },
    {
      title: "第8条｜規約の変更",
      body: "当社は、本規約を変更する場合、会員に対して変更内容を通知します。変更後も引き続き本サービスを利用した場合、変更後の規約に同意したものとみなします。",
    },
    {
      title: "第9条｜準拠法・裁判管轄",
      body: "本規約の解釈は日本法に準拠します。本サービスに関して紛争が生じた場合、当社の所在地を管轄する裁判所を専属的合意管轄とします。",
    },
  ];

  return (
    <div>
      <p style={{ ...pStyle, marginBottom: 24 }}>
        本利用規約（以下「本規約」）は、ひとりBASECAMPをご利用いただく際の条件を定めるものです。
      </p>
      {articles.map((a) => (
        <div key={a.title} style={sectionStyle}>
          <div style={h2Style}>{a.title}</div>
          <p style={pStyle}>
            {a.body.split("\n").map((line, i) => (
              <span key={i}>{line}{i < a.body.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      ))}
      <p style={{ ...pStyle, color: BRAND.light, marginTop: 24 }}>制定日：2025年　改定日：随時更新</p>
    </div>
  );
}

function Privacy() {
  const articles = [
    {
      title: "1. 取得する情報",
      body: "当社は、以下の情報を取得します。\n・氏名、メールアドレス（登録時）\n・お支払い情報（決済代行業者が管理）\n・本サービスの利用状況・ログ情報\n・お問い合わせ内容",
    },
    {
      title: "2. 利用目的",
      body: "取得した個人情報は、以下の目的で利用します。\n・本サービスの提供および運営\n・会費の決済処理\n・お問い合わせへの対応\n・サービスに関するご連絡\n・サービス改善のための分析",
    },
    {
      title: "3. 第三者提供",
      body: "当社は、以下の場合を除き、会員の個人情報を第三者に提供しません。\n・会員本人の同意がある場合\n・法令に基づく場合\n・人の生命・身体・財産の保護のために必要な場合",
    },
    {
      title: "4. 情報の管理",
      body: "当社は、個人情報の漏洩・滅失・毀損を防止するため、適切なセキュリティ対策を実施します。",
    },
    {
      title: "5. 開示・訂正・削除",
      body: "会員は、自己の個人情報の開示・訂正・削除を求めることができます。ご要望はv.ray.diary.v@gmail.comまでご連絡ください。",
    },
    {
      title: "6. Cookieの使用",
      body: "本サービスでは、利便性向上のためCookieを使用することがあります。ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。",
    },
    {
      title: "7. プライバシーポリシーの変更",
      body: "当社は、本ポリシーを変更する場合、本サービス上にて通知します。変更後も引き続き本サービスを利用した場合、変更後のポリシーに同意したものとみなします。",
    },
    {
      title: "8. お問い合わせ",
      body: "個人情報の取り扱いに関するお問い合わせは、v.ray.diary.v@gmail.comまでご連絡ください。",
    },
  ];

  return (
    <div>
      <p style={{ ...pStyle, marginBottom: 24 }}>
        株式会社inclusivityは、会員の個人情報を適切に保護することを重要な責務と考えています。
      </p>
      {articles.map((a) => (
        <div key={a.title} style={sectionStyle}>
          <div style={h2Style}>{a.title}</div>
          <p style={pStyle}>
            {a.body.split("\n").map((line, i) => (
              <span key={i}>{line}{i < a.body.split("\n").length - 1 && <br />}</span>
            ))}
          </p>
        </div>
      ))}
      <p style={{ ...pStyle, color: BRAND.light, marginTop: 24 }}>制定日：2025年　改定日：随時更新</p>
    </div>
  );
}

export default function LegalPages() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: BRAND.bg, fontFamily: "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>
      {/* ヘッダー */}
      <div style={{ background: BRAND.card, borderBottom: `1px solid ${BRAND.border}`, padding: "20px 24px 0" }}>
        <div style={{ fontSize: 11, color: BRAND.light, marginBottom: 6, letterSpacing: "0.08em" }}>ひとりBASECAMP</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.brown, marginBottom: 20 }}>法的情報</div>
        {/* タブ */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                padding: "10px 4px",
                fontSize: 10,
                fontWeight: active === i ? 700 : 400,
                color: active === i ? BRAND.accentDark : BRAND.light,
                background: "none",
                border: "none",
                borderBottom: active === i ? `2px solid ${BRAND.accentDark}` : "2px solid transparent",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* コンテンツ */}
      <div style={{ padding: "28px 20px 60px", maxWidth: 640, margin: "0 auto" }}>
        {active === 0 && <Tokusho />}
        {active === 1 && <Terms />}
        {active === 2 && <Privacy />}
      </div>
    </div>
  );
}
