import { useState, useEffect } from "react";

const SKILLS = [
  { key: "防衛", label: "防衛・セーフティネット", color: "#7B4F2E", light: "#D6EAF8", icon: "🛡" },
  { key: "マネー", label: "マネー・ポートフォリオ", color: "#5C6B3A", light: "#D5F5E3", icon: "💴" },
  { key: "デジタル", label: "デジタル・セキュリティ", color: "#7B4F5C", light: "#E8DAEF", icon: "🔐" },
  { key: "インフラ", label: "ライフインフラ維持", color: "#8B5E3C", light: "#FDEBD0", icon: "🏠" },
  { key: "つながり", label: "サードプレイス接続", color: "#4A7B6F", light: "#D1F2EB", icon: "🔗" },
];

const INTROS = {
  "20代": "自由でいたいのに、漠然と不安がある。それは、まだ「ひとりでいきる設計」が始まっていないからかもしれない。",
  "30代": "仕事の責任と、人生の岐路が同時にやってくる年代。ひとりでいくと決めたなら、「なんとなく」では間に合わなくなる時期がきている。",
  "40代": "体力の変化を感じ始め、親の老いも視界に入ってくる。「老後」が急にリアルになる40代の現在地を、5つの軸で点検しよう。",
  "50代": "親の介護や見送りが現実になり、自分自身の健康と老後のお金が急に怖くなる年代。今から手を打てることは、まだある。",
  "60代": "定年退職とともに、社会との接点が一気に減る。身元保証、デジタル遺品、孤立——言葉にするのが怖い問題ほど、早めに向き合う価値がある。",
};

const QUESTIONS = {
  "20代": {
    "防衛": [
      "一人暮らしの夜に体調が急変したとき、翌朝までに気づいてくれる人が、SNSのフォロワーではなく生身の関係の中にいる",
      "「緊急のとき頼れる人」を具体的に思い浮かべたとき、職場と親以外の名前が1人以上出てくる",
      "メンタルがしんどいとき、SNSに吐き出す以外の方法で誰かに話せる場所が生活の中にある",
    ],
    "マネー": [
      "毎月の手取りから何にいくら使っているかを把握しており、「気づいたら残高が減っていた」状態になっていない",
      "「年金をもらえるかわからない」という不安を漠然と抱えたままにせず、新NISAやiDeCoで自分なりの備えを始めている",
      "物価が上がり続ける中で、今の会社以外でも収入を得られる手段を「まだ若いから」と先送りにせず考えたことがある",
    ],
    "デジタル": [
      "SNSに使っている時間が、他人の充実した生活を見て消耗するだけになっていないか定期的に振り返っている",
      "「簡単に稼げる」「今だけのチャンス」系のDMや勧誘を、冷静に見切れる判断力がある",
      "重要なアカウント（銀行・行政）のパスワードを使い回しておらず、自分ひとりで管理できている",
    ],
    "インフラ": [
      "賃貸契約や入院時に「保証人」が必要な場面を、親以外でカバーできる手段をおおまかに知っている",
      "入院や手術が必要になったとき、医療同意書にサインできる人が、親や家族以外に具体的にいる",
      "ひとりで生きていく前提で、遺言書や任意後見制度が自分にも関係があると認識している",
    ],
    "つながり": [
      "仕事でも親でもない、ゆるく月1回以上会える関係が、スマホの外の現実に存在する",
      "「ひとりが楽」という感覚と「孤立」は違うと理解しており、意識的に緩やかな繋がりを維持しようとしている",
      "結婚・恋愛以外の場で、自分の本音や不安をフラットに話せる仲間や場がある",
    ],
  },
  "30代": {
    "防衛": [
      "激務が続いて体や心が限界に近いとき、職場以外に「異変に気づいてくれる人」が生活の中にいる",
      "数日間誰とも連絡を取らない状態が続いても、誰かが気づいてくれる仕組みが生活に組み込まれている",
      "メンタルが追い詰められたとき、仕事のパフォーマンスが落ちる前に話せる場所が職場以外にある",
    ],
    "マネー": [
      "ひとりで老後を迎える前提で、生涯収支をざっくりでも試算したことがある",
      "転職・独立・このまま継続、それぞれの収入シナリオを感覚ではなく数字で考えたことがある",
      "激務をこなしながらも、今の会社以外でも通用するスキルや収入手段を意識的に育てている",
    ],
    "デジタル": [
      "マッチングアプリや出会い系で知り合った相手への個人情報の渡し方を、意識的にコントロールしている",
      "ロマンス詐欺・投資詐欺が、孤独感や出会いを求めている30代を特に標的にしていることを知っている",
      "ネットバンキング・証券口座の情報を、万が一のとき自分以外の信頼できる人が処理できる形で管理している",
    ],
    "インフラ": [
      "賃貸・入院など保証人が必要な場面を、親以外でカバーできる手段を知っている",
      "入院・手術時に医療同意書へのサインや退院後のサポートを、親や恋人以外の誰が担うか考えたことがある",
      "ひとりで生きる前提で、任意後見制度や身元保証サービスの概要を把握している",
    ],
    "つながり": [
      "周囲が次々と家庭を持つ中で、職場以外の対等な人間関係を意識的に維持・更新しようとしている",
      "マッチングアプリに疲弊したとき、恋愛以外の目的で人と繋がれる場所が生活の中にある",
      "「まだ結婚しないの」という親や周囲のプレッシャーを、否定されずにフラットに話せる場がある",
    ],
  },
  "40代": {
    "防衛": [
      "自分の体調に異変があったとき、24時間以内に気づいてもらえる人や仕組みが、家族以外に生活の中にある",
      "急に働けなくなったとき、誰にも頼らず収入と生活を支える公的制度（傷病手当金・就業不能保険など）を理解している",
      "親の体調急変や介護が始まったとき、自分ひとりで抱え込まずに動ける「初動の手順」を考えたことがある",
    ],
    "マネー": [
      "ひとり世帯として老後に「いくら必要か」を、自分の数字で一度でも試算したことがある",
      "新NISAを活用しており、誰にも頼らず定年まで自分で資産を育てる方針を持っている",
      "親の介護費用が自分の老後資金に影響してくる可能性を、自分ひとりの問題として試算したことがある",
    ],
    "デジタル": [
      "金融資産・保険・年金などの重要情報を、万が一のとき信頼できる人が把握できる形で整理している",
      "SNSやサブスクリプションサービスを、自分亡き後に誰かが適切に処理できる状態にしている",
      "フィッシング詐欺・投資詐欺・なりすまし被害に対して、ひとりで判断できる具体的な予防策を実践している",
    ],
    "インフラ": [
      "「ひとりで一生賃貸か、購入か」について、感覚ではなく自分なりの根拠を持った結論が出ている",
      "入院・手術が必要になったとき、医療同意・緊急連絡・退院後のサポートを親以外の誰が担うか具体的に決めている",
      "「身元保証人」が必要な場面を、親が頼れなくなった後も自分でカバーできる手段を考えたことがある",
    ],
    "つながり": [
      "仕事以外の場所で、ひとりでいることを肯定しながら定期的に顔を合わせられる関係が生活の中にある",
      "「何かあったとき連絡しあえる」関係が、職場でも親でもない人の中に2人以上いる",
      "ひとりで生きることへの不安や本音を、否定されずにフラットに話せる場や仲間がある",
    ],
  },
  "50代": {
    "防衛": [
      "睡眠をとっても疲れが抜けない状態が続いており、「年のせい」で片付けず自分で原因を探ろうとしている",
      "突然の入院・手術に備えた緊急連絡先・医療情報を、親族以外の誰かが把握している",
      "親の介護や看取りを経験して、「自分の老後の介護を誰に頼むか」を自分ごととして考え始めている",
    ],
    "マネー": [
      "65歳以降の年金見込み額を把握したうえで、ひとり世帯としての月々の不足額を計算したことがある",
      "定年後も誰にも頼らず資産を使い続けるための「取り崩し戦略」を具体的に考えたことがある",
      "「もう遅いかもしれない」と感じながらも、今からできる収入手段や資産の備えを諦めずに動いている",
    ],
    "デジタル": [
      "ネットバンキング・証券口座・年金情報を、自分に何かあったとき信頼できる人が対処できる状態にしている",
      "「手軽に老後資金を増やせる」という勧誘に対して、疲れていても冷静にひとりで判断できる習慣がある",
      "職場でのデジタル化・新ツールの導入を「自分には無理」と諦めず、少しずつ自分で習得しようとしている",
    ],
    "インフラ": [
      "入院・施設入居・賃貸更新に必要な「身元保証人」を、親族以外でも確保できる手段を知っている",
      "自分の財産・医療・介護に関する意思を、誰かに任せず法的に有効な形で自分で残す準備を始めている",
      "ひとりで定年後を生きる前提で、60歳以降の収入シナリオを「なんとかなる」にせず具体的に考えたことがある",
    ],
    "つながり": [
      "職場での疎外感や「戦力外」の感覚を抱えながらも、職場以外に自分をそのまま受け入れてくれる場や関係がある",
      "定年後に急に減る社会との接点を、誰かに用意してもらうのではなく自分で補う場や活動を今から築いている",
      "「やりたいことはあるのに体も脳も動かない」という感覚を、責められずに話せる仲間や場がある",
    ],
  },
  "60代": {
    "防衛": [
      "自宅で急に倒れたとき、親族以外の仕組みや関係で24時間以内に誰かが気づいてくれる体制が整っている",
      "孤立死のリスクを自分ごととして認識し、足跡が途絶えたときに気づいてもらえる仕組みを自分で生活に組み込んでいる",
      "緊急搬送された際に、医療スタッフが持病・服薬・緊急連絡先をすぐ確認できる準備を自分でしている",
    ],
    "マネー": [
      "現在の貯蓄と年金だけで何歳まで生活できるかを自分で計算したことがあり、漠然とした不安のままにしていない",
      "退職金の使い方について、誰かに任せず自分なりの具体的な方針を持っており、勧誘に乗らない自信がある",
      "葬儀・お墓・死後の手続き費用を、誰にも頼らず自分で準備する見通しを持っている",
    ],
    "デジタル": [
      "金融口座・保険・年金などの情報を、自分に何かあったとき信頼できる人がすぐ把握・処理できるよう整理している",
      "SNS・サブスク・写真データなどデジタル遺品の処理方針を自分で決め、誰かに伝えている",
      "電話やネットを使った詐欺の最新手口を自分で把握しており、疲れていても騙されない習慣がある",
    ],
    "インフラ": [
      "入院・施設入居・賃貸更新に必要な身元保証人を、親族に頼らずカバーできる具体的な手段を確保している",
      "自分の意思（医療・介護・財産・葬儀）を、誰かに任せず法的に有効な形で自分で残している",
      "「終活」として行うべき手続きの全体像を自分で把握し、優先順位をつけて少しずつ取り組んでいる",
    ],
    "つながり": [
      "定年退職後も、肩書きや職場に依存せず自分で見つけた場や役割が生活の中に定期的にある",
      "ひとりで生きる前提で、何かあったとき頼りあえる対等な関係を親族以外に自分で築いている",
      "「ひとりの老後の生き方・価値観」を、遠慮なくフラットに話せる仲間や場を自分で持っている",
    ],
  },
};

const ADVICE_BY_AGE = {
  "20代": {
    "防衛": {
      high: { label: "ひとりの夜も、見えない備えがある", text: "SNSの繋がりとは別に、生身のセーフティネットが育っています。緊急連絡先を年に一度見直す習慣を続けていけば、この先も安心です。" },
      mid:  { label: "「まだ大丈夫」が一番危ない", text: "「いざとなれば親に頼める」という感覚が、備えの空白を生みやすい年代です。親以外で緊急時に頼れる人を、まず1人だけ意識して探してみてください。" },
      low:  { label: "ひとりで倒れたとき、誰が気づくか", text: "今は元気だから、と後回しにしがちですが、孤立のリスクは年齢に関係ありません。まず緊急連絡先を1人決めることが、最初の一歩になります。" },
    },
    "マネー": {
      high: { label: "20代で動き始めた差は、あとで大きくなる", text: "早い段階で収支の把握と資産形成を始められています。このまま積立を続けながら、収入の複線化も少しずつ意識してみてください。" },
      mid:  { label: "「なんとなく使う」がいちばん怖い", text: "物価が上がり続ける中で、手取りの流れを把握していないと気づいたときには手遅れになります。まず月の収支を書き出すことから始めてみてください。" },
      low:  { label: "年金に頼れない時代の、20代の現実", text: "「老後はまだ先」という感覚は自然ですが、20代に始めるのと30代に始めるのでは、積み上がる資産に大きな差が生まれます。まず月1,000円からでも積立を始める選択肢を検討してみてください。" },
    },
    "デジタル": {
      high: { label: "デジタルの扱いに、自分なりの軸がある", text: "SNSとの距離感と詐欺への警戒が両立できています。詐欺の手口は進化するので、年に一度は最新情報を確認する習慣を続けてください。" },
      mid:  { label: "SNSで消耗している時間、気づいていますか", text: "他人の「充実した生活」を見て消耗する時間は、静かに自己肯定感を削ります。まずスマホのスクリーンタイムを確認することから始めてみてください。" },
      low:  { label: "若い世代こそ、詐欺のターゲットになる", text: "「副業で稼げる」「今だけのチャンス」系の勧誘は、将来への不安を感じている20代を狙っています。パスワードの使い回しをやめることが、最初の防衛になります。" },
    },
    "インフラ": {
      high: { label: "ひとりで生きる設計が、静かに始まっている", text: "保証人問題や法的な備えへの意識が早い段階で育っています。任意後見制度の概要を把握しておくと、30代以降の準備がスムーズになります。" },
      mid:  { label: "「保証人は親に頼めばいい」が通じなくなる日", text: "親が保証人になれなくなるのは、思ったより早くやってきます。身元保証サービスの存在を知っておくだけで、いざというときの選択肢が広がります。" },
      low:  { label: "ひとりで生きるインフラは、誰も用意してくれない", text: "賃貸・入院・緊急時に必要な仕組みは、自分で調べて備えるしかありません。まず「身元保証サービス」で検索することを、次の休日の小さな宿題にしてみてください。" },
    },
    "つながり": {
      high: { label: "SNSの外に、居場所がある", text: "オフラインの繋がりが育っています。「ひとりが楽」と「孤立しない」を両立できている状態は、この先の大きな安心になります。" },
      mid:  { label: "フォロワーは増えても、頼れる人は増えない", text: "SNS上の繋がりと、いざというときに動いてくれる関係は別物です。月に一度、仕事以外の誰かと直接会う機会をつくってみることから始めてみてください。" },
      low:  { label: "「ひとりが楽」と「孤立」は、違う", text: "夜ひとりでいることへの居心地のよさと、緊急時に誰もいないという状況は別の話です。まずひとりで生きることを肯定的に話せる場を、ひとつ探してみてください。" },
    },
  },
  "30代": {
    "防衛": {
      high: { label: "激務の中でも、見えないセーフティネットがある", text: "職場以外に異変を気づいてくれる仕組みが育っています。仕事の状況が変わっても機能するよう、年に一度は点検する習慣を続けてください。" },
      mid:  { label: "倒れたとき、誰が最初に気づくか", text: "激務が続くと「自分のことは後回し」になりがちです。職場以外に定期的に連絡を取り合う関係を1人でも持つことが、見えないセーフティネットになります。" },
      low:  { label: "30代の孤立は、静かに進む", text: "仕事が忙しいほど、人間関係は職場だけに集約されていきます。数日音信不通になったとき気づいてくれる仕組みを、まず1つだけ考えてみてください。" },
    },
    "マネー": {
      high: { label: "ひとりで生きる数字が、見えている", text: "生涯収支の試算と複数の収入シナリオが描けています。親の介護費用が自分の老後資金に与える影響も、早めに織り込んでおくと安心です。" },
      mid:  { label: "転職・独立を考えるなら、数字が先", text: "「なんとかなる」という感覚だけでキャリアの分岐点に立つのは危険です。ひとり世帯の老後に必要な金額を、まずざっくり試算してみてください。" },
      low:  { label: "激務をこなしながら、お金の設計は後回しになっていませんか", text: "忙しさを理由に収支の把握を先送りにしていると、気づいたときに備えが薄い状態になります。まずねんきんネットで年金見込み額を確認することから始めてみてください。" },
    },
    "デジタル": {
      high: { label: "デジタルのリスクを、自分で管理できている", text: "マッチングアプリの情報管理と詐欺への警戒が両立できています。口座情報の整理も含め、年に一度の棚卸しを続けてください。" },
      mid:  { label: "出会い系・マッチングアプリは、個人情報の宝庫", text: "相手に渡した情報は取り戻せません。プロフィールに載せる情報の範囲を、もう一度見直してみることをおすすめします。" },
      low:  { label: "孤独感を狙う詐欺は、30代が標的になりやすい", text: "ロマンス詐欺や投資詐欺は、出会いを求めている30代を特に狙っています。パスワード管理の見直しと口座情報の整理を、まず1つずつ進めてみてください。" },
    },
    "インフラ": {
      high: { label: "ひとりで生きるインフラが、静かに整っている", text: "保証人問題や法的な備えへの意識が育っています。任意後見契約の内容を5年に一度見直す習慣を持てると、さらに安心です。" },
      mid:  { label: "「親が保証人になれる」という前提は、崩れ始めている", text: "30代の今、親はまだ元気かもしれませんが、10年後は違います。身元保証サービスの概要と費用感を把握しておくことが、将来の選択肢を広げます。" },
      low:  { label: "入院・手術のとき、誰がサインするか考えたことがありますか", text: "恋人も家族も近くにいない状況で、医療同意が必要になる場面は突然やってきます。まず任意後見制度を検索して概要だけ把握することから始めてみてください。" },
    },
    "つながり": {
      high: { label: "周囲が家庭を持っても、自分の居場所がある", text: "職場以外の対等な人間関係が育っています。マッチングアプリとは別の繋がりの場を持てていることが、この先の大きな安心になります。" },
      mid:  { label: "既婚の友人が増えるほど、話せる場が減る", text: "周囲が家庭を持ち始めると、ひとりの感覚を共有できる場が自然に減っていきます。恋愛以外の目的で集まれる場を、ひとつ試してみてください。" },
      low:  { label: "マッチングアプリの疲弊が、孤立を加速させる", text: "出会いを求めて消耗し続けると、人と会うこと自体が億劫になります。まず恋愛とは切り離した場で、ゆるく繋がれるコミュニティを探してみてください。" },
    },
  },
  "40代": {
    "防衛": {
      high: { label: "40代の備えが、静かに機能している", text: "緊急時の仕組みと介護への初動が意識できています。親の状況が変化するにつれて、年に一度の見直しを続けていくことが重要です。" },
      mid:  { label: "親の老いと自分の老後が、同時にリアルになる年代", text: "「まだ大丈夫」が通じなくなるのが40代です。傷病手当金の仕組みと、緊急時に頼れる人を今一度確認しておくことをおすすめします。" },
      low:  { label: "40代で備えが薄いと、50代以降に直撃する", text: "親の介護と自分の健康リスクが重なる前に、動ける時間はまだあります。まず緊急連絡先と医療情報を一枚の紙にまとめることから始めてみてください。" },
    },
    "マネー": {
      high: { label: "ひとり世帯の老後設計が、数字で見えている", text: "NISAの活用と老後の試算が揃っています。親の介護費用が自分の計画に与える影響を定期的に見直すことで、さらに精度が上がります。" },
      mid:  { label: "「なんとかなる」では、ひとりの老後は乗り切れない", text: "ひとり世帯の老後は、誰かと費用を分担できません。ねんきんネットで年金見込み額を確認し、月々の不足額を数字で把握することが先決です。" },
      low:  { label: "親の介護費用が、自分の老後資金を削る可能性がある", text: "40代で資産設計が手つかずのまま親の介護が始まると、二重の経済的打撃になります。まず月の収支の把握と、NISAの口座開設を検討してみてください。" },
    },
    "デジタル": {
      high: { label: "デジタル資産の整理が、ひとりの備えになっている", text: "金融情報の管理とデジタル遺品への意識が育っています。詐欺の手口は進化するので、年に一度は最新情報を確認する習慣を続けてください。" },
      mid:  { label: "口座・保険・サブスクの情報、誰かが把握していますか", text: "自分に何かあったとき、信頼できる人がすぐ動けるかどうかが重要です。エンディングノートに金融情報をまとめることを、次の週末の小さな作業にしてみてください。" },
      low:  { label: "40代を狙う投資詐欺は、老後不安につけ込んでくる", text: "「定年後の資産を増やしたい」という気持ちを狙った詐欺が増えています。まずパスワードの使い回しをやめ、重要な口座情報を整理することから始めてみてください。" },
    },
    "インフラ": {
      high: { label: "ひとりで生きるインフラが、着実に整っている", text: "住まいの方針と身元保証の備えが揃っています。任意後見契約の内容を5年ごとに見直す習慣を持てると、さらに安心です。" },
      mid:  { label: "「親が頼れなくなったとき」を、今から考える", text: "身元保証人が必要な場面は、思ったより早くやってきます。身元保証サービスの概要と費用感を調べることを、近いうちに一度やっておくことをおすすめします。" },
      low:  { label: "入院・手術・施設入居、すべてに「保証人」が必要になる", text: "ひとりで生きるうえで、身元保証の問題は避けて通れません。まず地域の法テラスや市区町村の無料相談窓口を検索して、選択肢を把握することから始めてみてください。" },
    },
    "つながり": {
      high: { label: "ひとりでいることを肯定できる場がある", text: "仕事以外の人間関係が育っています。「何かあったとき連絡しあえる」関係を、引き続き丁寧に維持していくことが大切です。" },
      mid:  { label: "職場の人間関係だけに頼っていると、定年後に孤立する", text: "40代の今から職場以外の繋がりを育てておかないと、定年後に一気に孤立するリスクがあります。月に一度、仕事以外の場で誰かと会う機会をつくることから始めてみてください。" },
      low:  { label: "ひとりでいることへの本音を、話せる場がありますか", text: "40代でひとりを選んでいることへの不安や本音は、なかなか話せる場がありません。まずひとりで生きることを肯定的に語り合えるコミュニティを探してみてください。" },
    },
  },
  "50代": {
    "防衛": {
      high: { label: "慢性的な疲労と向き合いながら、備えが育っている", text: "体の変化を自覚しながら、緊急時の仕組みが整っています。介護の経験を自分の老後設計にも活かしていくことが、次のステップになります。" },
      mid:  { label: "「疲れているだけ」が、見逃しにつながる", text: "50代の体の変化は、疲労と病気の境目がわかりにくくなります。緊急連絡先の整備と、かかりつけ医への定期受診をまず優先してみてください。" },
      low:  { label: "介護する側が倒れたとき、誰が気づくか", text: "親の介護で自分の健康管理が後回しになっている人が多い年代です。まず自分の緊急連絡先と医療情報を整理することから始めてみてください。" },
    },
    "マネー": {
      high: { label: "ひとりの老後を、数字で乗り切る準備がある", text: "年金の不足額と取り崩し戦略が見えています。「もう遅いかもしれない」ではなく、今から動いた分が確実に積み上がっていきます。" },
      mid:  { label: "定年まであと数年——「なんとかなる」では間に合わない", text: "ひとり世帯の老後に必要な金額は、想定よりも大きくなりがちです。まずねんきんネットで年金見込み額を確認し、月々の不足額を数字で把握してみてください。" },
      low:  { label: "「もう遅い」と思った瞬間が、動き始めるタイミング", text: "50代でも、今から動けば老後資金に差が出ます。まず月の収支の把握と、退職金を含めた資産の全体像を紙に書き出すことから始めてみてください。" },
    },
    "デジタル": {
      high: { label: "デジタルの変化に、自分なりについていけている", text: "口座情報の整理と詐欺への警戒が揃っています。職場のデジタル化への対応も、自分のペースで続けていくことが大切です。" },
      mid:  { label: "疲れているときほど、詐欺に引っかかりやすい", text: "「老後資金を増やしたい」という不安につけ込む詐欺は、50代を特に狙っています。口座情報の整理と、信頼できる人への共有を近いうちに進めてみてください。" },
      low:  { label: "デジタル遺品の問題は、50代から考え始める", text: "口座・保険・SNSの情報が整理されていないと、自分に何かあったとき周囲が困ります。エンディングノートへの記入を、まず一項目だけ始めてみてください。" },
    },
    "インフラ": {
      high: { label: "定年後を見据えた設計が、静かに進んでいる", text: "身元保証と法的な備えが整いつつあります。60歳以降の収入シナリオを複数描いておくことが、次のステップになります。" },
      mid:  { label: "「まだ早い」と思ったときが、動き始めるタイミング", text: "任意後見制度や遺言書は、判断力が落ちる前に整えるものです。まず法テラスや市区町村の無料相談窓口を検索して、選択肢を把握することから始めてみてください。" },
      low:  { label: "定年後の収入が途絶えたとき、生活を支えるのは自分だけ", text: "ひとりで定年後を生きる前提では、早めの準備が命綱になります。まず身元保証サービスの存在を知ることと、60歳以降の収入シナリオをざっくり考えることから始めてみてください。" },
    },
    "つながり": {
      high: { label: "職場以外に、自分の居場所がある", text: "疎外感を抱えながらも、職場以外の繋がりが育っています。定年後もこの繋がりが機能するよう、今から少しずつ育てていくことが大切です。" },
      mid:  { label: "定年後に「行く場所がない」は、今から防げる", text: "50代の今から動かないと、定年後に社会との接点が一気に失われます。地域・趣味・学びの場に、まず一度だけ参加してみることをおすすめします。" },
      low:  { label: "「やりたいけど動けない」を、話せる場がありますか", text: "体と脳が思い通りに動かない感覚は、50代特有の孤独です。まずひとりで生きることを肯定的に語り合えるコミュニティを、ひとつ探してみてください。" },
    },
  },
  "60代": {
    "防衛": {
      high: { label: "ひとりでも、見えないセーフティネットがある", text: "孤立死への意識と緊急時の仕組みが自分で整えられています。仕組みが機能しているか、年に一度は確認する習慣を続けてください。" },
      mid:  { label: "「誰かが気づいてくれる」は、仕組みがなければ起きない", text: "近所や知人との緩やかな繋がりが、孤立死を防ぐ最大の備えです。足跡が途絶えたときに気づいてもらえる仕組みを、まず一つ生活に組み込んでみてください。" },
      low:  { label: "孤立死のリスクは、退職後に一気に高まる", text: "職場という日常の接点がなくなると、気づけば誰とも会っていない日が続きます。まず緊急連絡先の整備と、定期的に顔を合わせる場を一つつくることから始めてみてください。" },
    },
    "マネー": {
      high: { label: "自分で計算し、自分で備えている", text: "資産の見通しと葬儀費用まで含めた備えが整っています。退職金の勧誘には引き続き慎重に対応しながら、年に一度の資産確認を続けてください。" },
      mid:  { label: "退職金は、一度失うと取り戻せない", text: "退職金をめぐる勧誘は、定年後の不安につけ込んで近づいてきます。「何歳まで生活できるか」を自分で計算することが、騙されない最大の防衛になります。" },
      low:  { label: "誰にも頼れないなら、数字を把握することが命綱", text: "ひとりで老後を生きる前提では、資産の見通しを自分で持つことが不可欠です。まず現在の貯蓄と年金でいつまで生活できるかを、紙に書いて計算してみてください。" },
    },
    "デジタル": {
      high: { label: "デジタル遺品の整理が、静かに進んでいる", text: "口座情報の共有とデジタル遺品への備えが整っています。詐欺の手口は進化するので、年に一度は最新情報を確認する習慣を続けてください。" },
      mid:  { label: "口座・保険の情報、誰かが把握していますか", text: "自分に何かあったとき、信頼できる人がすぐ動けるかどうかが重要です。エンディングノートに金融情報を一項目ずつまとめていくことから始めてみてください。" },
      low:  { label: "疲れているときの電話・メール、一度立ち止まる習慣を", text: "60代を狙う詐欺は「急かす」「不安を煽る」手口が多いです。まず重要な情報を整理し、怪しいと感じたら一人で判断しない習慣をつけることから始めてみてください。" },
    },
    "インフラ": {
      high: { label: "ひとりで生きる法的な備えが、自分で整っている", text: "身元保証と意思表示が法的な形で整えられています。内容を5年ごとに見直す習慣を続けることで、状況の変化にも対応できます。" },
      mid:  { label: "「終活」は、元気なうちにしか動けない", text: "判断力が落ちてからでは、任意後見や遺言書の整備が難しくなります。まず法テラスや市区町村の無料相談窓口に問い合わせることから始めてみてください。" },
      low:  { label: "施設入居・入院・賃貸更新、すべてに保証人が必要になる", text: "ひとりで生きるうえで、身元保証の問題は避けて通れません。まず「身元保証サービス」を検索して、選択肢と費用感を把握することから始めてみてください。" },
    },
    "つながり": {
      high: { label: "定年後も、自分で居場所をつくれている", text: "肩書きに頼らない繋がりが育っています。今ある場や関係を薄く長く維持していくことが、この先の大きな安心になります。" },
      mid:  { label: "退職後、「行く場所」を自分でつくれていますか", text: "定年退職とともに社会との接点が一気に減る人が多い年代です。まず地域・趣味・学びの場に一度参加してみることをおすすめします。" },
      low:  { label: "「ひとりの老後の話」を、遠慮なく話せる場がありますか", text: "老後の生き方への不安や本音は、なかなか話せる場がありません。まずひとりで生きることを肯定的に語り合えるコミュニティを、ひとつ探してみてください。" },
    },
  },
};

const TOTAL_LABELS = [
  { min: 60, max: 75, label: "バランス自立型", color: "#5C7A3A", msg: "5つの柱が高水準で整っています。定期的な見直しと更新を続けながら、さらなる「増築フェーズ」へ進んでいけます。" },
  { min: 45, max: 59, label: "着実前進型",     color: "#7B6B4A", msg: "基盤は整いつつあります。スコアの低いスキルを中心に、次の一手を一つだけ決めてみてください。" },
  { min: 30, max: 44, label: "準備着手型",     color: "#C4813A", msg: "知識はあっても実装が追いついていない状態です。「防衛」と「マネー」から、自分のペースで少しずつ動き始めていけます。" },
  { min: 0,  max: 29, label: "現在地確認型",   color: "#A04030", msg: "備えの空白が多い状態ですが、今気づけたことに意味があります。ひとりで抱え込まず、まずは話せる場を探してみてください。" },
];

function getAdviceLevel(score) {
  if (score >= 11) return "high";
  if (score >= 6)  return "mid";
  return "low";
}
function getTotalType(total) {
  return TOTAL_LABELS.find(t => total >= t.min && total <= t.max);
}
function buildQuestions(age) {
  const list = [];
  SKILLS.forEach((s, si) => {
    QUESTIONS[age][s.key].forEach((q, qi) => {
      list.push({ skill: s.key, skillIdx: si, qIdx: qi, text: q });
    });
  });
  return list;
}

// ── AI SUMMARY GENERATOR ──────────────────────────────────────────────────────
async function generateSummary(age, skillScores, totalScore, answers, questions) {
  const skillDetails = SKILLS.map(s => {
    const sc = skillScores[s.key];
    const level = getAdviceLevel(sc);
    const qAnswers = questions
      .filter(q => q.skill === s.key)
      .map((q, i) => `Q${i+1}（${answers[questions.indexOf(q)]}点）：${q.text}`)
      .join('\n');
    return `【${s.label}】${sc}/15点（${level === 'high' ? '高' : level === 'mid' ? '中' : '低'}）\n${qAnswers}`;
  }).join('\n\n');

  const sorted = [...SKILLS].sort((a, b) => skillScores[a.key] - skillScores[b.key]);
  const lowest = sorted.slice(0, 2).map(s => `${s.label}（${skillScores[s.key]}点）`).join('、');
  const highest = sorted.slice(-2).map(s => `${s.label}（${skillScores[s.key]}点）`).join('、');

  const prompt = `あなたは「生きてる証」という大人のひとり生き方設計サービスの管理人（管理人）のアシスタントです。
以下の診断データをもとに、面談前に管理人が読む「面談前サマリー」を作成してください。

【基本情報】
年代：${age}
合計スコア：${totalScore}/75点
最低スキル：${lowest}
最高スキル：${highest}

【全回答データ】
${skillDetails}

以下の形式で出力してください。数字の羅列ではなく、この人物の「状態・傾向・背景にある感情」を読み取った所見にしてください。
管理人が面談前30秒で人物像を把握できる内容にすること。
低体温・知的なトーンで。「！」は使わない。

---
■ 総合所見（3〜4文）
この人物の全体的な状態・傾向・背景にある感情を読み取って記述

■ 要注目スキル（低スコア順・最大3つ）
🔴 スキル名（点数）
　→ 具体的な状態の読み取り（1〜2文）

■ 強みスキル（高スコア・最大2つ）
✅ スキル名（点数）
　→ 具体的な強みの読み取り（1文）

■ 面談で聞くべきこと（箇条書き・3項目）
・
・
・

■ リビング訴求ポイント（1〜2文）
この人物にリビングを勧めるなら、どの切り口が最も響くか
---`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  return data.content?.[0]?.text || "サマリーの生成に失敗しました。";
}

// ── RADAR CHART ───────────────────────────────────────────────────────────────
function RadarChart({ scores }) {
  const cx = 160, cy = 160, r = 110;
  const n = SKILLS.length;
  const angles = SKILLS.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);
  const point = (val, angle, maxVal = 15) => ({
    x: cx + r * (val / maxVal) * Math.cos(angle),
    y: cy + r * (val / maxVal) * Math.sin(angle),
  });
  const rings = [3, 6, 9, 12, 15];
  const dataPoints = SKILLS.map((s, i) => point(scores[s.key] || 0, angles[i]));
  const polyPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
  const axisPoints = angles.map(a => ({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }));
  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 320 }}>
      {rings.map(ring => (
        <polygon key={ring}
          points={angles.map(a => `${(cx + r * (ring/15) * Math.cos(a)).toFixed(1)},${(cy + r * (ring/15) * Math.sin(a)).toFixed(1)}`).join(" ")}
          fill="none" stroke="#D4C4B0" strokeWidth="0.8" strokeDasharray={ring === 15 ? "none" : "3,3"} />
      ))}
      {axisPoints.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#D4C4B0" strokeWidth="0.8" />)}
      <path d={polyPath} fill="rgba(180,140,100,0.18)" stroke="#C4956A" strokeWidth="2.5" strokeLinejoin="round" />
      {dataPoints.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="5" fill={SKILLS[i].color} stroke="#fff" strokeWidth="1.5" />)}
      {SKILLS.map((s, i) => {
        const lp = { x: cx + (r + 20) * Math.cos(angles[i]), y: cy + (r + 20) * Math.sin(angles[i]) };
        const anchor = Math.abs(lp.x - cx) < 5 ? "middle" : lp.x > cx ? "start" : "end";
        return (
          <g key={i}>
            <text x={lp.x} y={lp.y - 5} textAnchor={anchor} fill={s.color} fontSize="12" fontWeight="700">{s.icon}</text>
            <text x={lp.x} y={lp.y + 9} textAnchor={anchor} fill="#3D2B1A" fontSize="9" fontWeight="600">{s.key}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("age");
  const [age, setAge] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [animIn, setAnimIn] = useState(true);
  const [showConsent, setShowConsent] = useState(false);
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const questions = age ? buildQuestions(age) : [];
  const total = questions.length;

  const skillScores = {};
  SKILLS.forEach(s => { skillScores[s.key] = 0; });
  Object.entries(answers).forEach(([idx, val]) => {
    const q = questions[parseInt(idx)];
    if (q) skillScores[q.skill] = (skillScores[q.skill] || 0) + val;
  });
  const totalScore = Object.values(skillScores).reduce((a, b) => a + b, 0);

  const selectAge = (a) => { setAge(a); setAnswers({}); setQIndex(0); setSelected(null); setScreen("quiz"); };
  const handleScore = (score) => setSelected(score);
  const goNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [qIndex]: selected };
    setAnswers(newAnswers);
    setSelected(null);
    setAnimIn(false);
    setTimeout(() => {
      if (qIndex + 1 >= total) setScreen("result");
      else setQIndex(qIndex + 1);
      setAnimIn(true);
    }, 220);
  };
  const goPrev = () => {
    if (qIndex === 0) return;
    setAnimIn(false);
    setTimeout(() => { setQIndex(qIndex - 1); setSelected(answers[qIndex - 1] ?? null); setAnimIn(true); }, 220);
  };
  const restart = () => { setScreen("age"); setAge(null); setAnswers({}); setQIndex(0); setSelected(null); setShowConsent(false); setConsentAgreed(false); setSummary(""); setSummaryGenerated(false); };

  const handleBookingClick = () => setShowConsent(true);
  const handleConsentAgree = async () => {
    setConsentAgreed(true);
    setShowConsent(false);
    setSummaryLoading(true);
    setSummaryGenerated(false);
    try {
      const s = await generateSummary(age, skillScores, totalScore, answers, questions);
      setSummary(s);
      setSummaryGenerated(true);
    } catch(e) {
      setSummary("サマリーの生成中にエラーが発生しました。");
      setSummaryGenerated(true);
    }
    setSummaryLoading(false);
  };
  const handleCopy = () => {
    const text = `【面談前サマリー】\n年代：${age}\n合計スコア：${totalScore}/75点\n\n${summary}`;
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const progress = total > 0 ? (qIndex / total) * 100 : 0;
  const curQ = questions[qIndex];
  const curSkill = curQ ? SKILLS.find(s => s.key === curQ.skill) : null;
  const typeInfo = getTotalType(totalScore);
  const scoreColors = { 1: "#A04030", 2: "#C4813A", 3: "#B7950B", 4: "#5C7A3A", 5: "#1A6B72" };
  const scoreLabels = { 1: "まったくできていない", 2: "あまりできていない", 3: "どちらともいえない", 4: "だいたいできている", 5: "しっかりできている" };

  const BG = "#E8DFD0";
  const CARD = "rgba(255,252,248,0.85)";
  const BORDER = "rgba(139,109,72,0.20)";
  const font = "'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";
  const base = { minHeight: "100vh", background: BG, color: "#3D2B1A", fontFamily: font, display: "flex", flexDirection: "column", alignItems: "center" };
  const card = { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "24px 20px", width: "100%", maxWidth: 540, margin: "0 auto" };

  // ── AGE SCREEN ──
  if (screen === "age") return (
    <div style={base}>
      <div style={{ width: "100%", maxWidth: 540, padding: "48px 24px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#A0886A", marginBottom: 12 }}>生きてる証</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.45, color: "#2C1A0E", margin: "0 0 12px" }}>ひとりでいきる5大スキル<br />現在地診断</h1>
          <p style={{ fontSize: 13, color: "#8C7355", lineHeight: 1.7, margin: 0 }}>年代を選ぶと、15問のスキルチェックが始まります。</p>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#A0886A", letterSpacing: 2, marginBottom: 14, textAlign: "center" }}>年代を選択してください</div>
          {["20代","30代","40代","50代","60代"].map(a => (
            <button key={a} onClick={() => selectAge(a)} style={{ display: "block", width: "100%", marginBottom: 10, padding: "16px 20px", background: "rgba(255,252,248,0.85)", border: "1px solid rgba(255,252,248,0.60)", borderRadius: 12, color: "#3D2B1A", fontSize: 16, fontWeight: 700, cursor: "pointer", textAlign: "left", letterSpacing: 1 }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(100,180,255,0.1)"; e.currentTarget.style.borderColor = "rgba(180,140,90,0.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,252,248,0.85)"; e.currentTarget.style.borderColor = "rgba(255,252,248,0.60)"; }}>
              <span style={{ marginRight: 14, fontSize: 13, color: "#A0886A" }}>→</span>{a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ── QUIZ SCREEN ──
  if (screen === "quiz") return (
    <div style={base}>
      <div style={{ width: "100%", maxWidth: 540, padding: "24px 20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <button onClick={restart} style={{ background: "none", border: "none", color: "#A0886A", fontSize: 12, cursor: "pointer", padding: 0 }}>← 年代選択へ</button>
          <div style={{ fontSize: 12, color: "#A0886A" }}>{age}｜{qIndex + 1} / {total}</div>
        </div>
        <div style={{ background: "rgba(255,252,248,0.70)", borderRadius: 4, height: 4, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #C4956A, #A0724A)", borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${curSkill.color}22`, border: `1px solid ${curSkill.color}55`, borderRadius: 20, padding: "6px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 16 }}>{curSkill.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: curSkill.color }}>{curSkill.label}</span>
          <span style={{ fontSize: 11, color: "#A0886A", marginLeft: 4 }}>{curQ.qIdx + 1}/3</span>
        </div>
        <div style={{ ...card, opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.22s ease, transform 0.22s ease", marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#A0886A", letterSpacing: 2, marginBottom: 14 }}>Q{qIndex + 1}</div>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#3D2B1A", margin: 0, fontWeight: 500 }}>{curQ.text}</p>
        </div>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: "#A0886A", letterSpacing: 1, marginBottom: 12, textAlign: "center" }}>1（まったくできていない） → 5（しっかりできている）</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => handleScore(s)} style={{ flex: 1, maxWidth: 72, padding: "14px 0", background: selected === s ? scoreColors[s] : "rgba(255,252,248,0.85)", border: selected === s ? `2px solid ${scoreColors[s]}` : "1px solid rgba(139,109,72,0.22)", borderRadius: 10, color: selected === s ? "#fff" : "#8C7355", fontSize: 20, fontWeight: 800, cursor: "pointer", transition: "all 0.15s", transform: selected === s ? "scale(1.08)" : "scale(1)" }}>{s}</button>
            ))}
          </div>
          {selected && <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: scoreColors[selected], fontWeight: 600 }}>{scoreLabels[selected]}</div>}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {qIndex > 0 && <button onClick={goPrev} style={{ flex: 0.4, padding: "14px 0", background: "rgba(255,252,248,0.85)", border: "1px solid rgba(139,109,72,0.22)", borderRadius: 12, color: "#8C7355", fontSize: 14, cursor: "pointer" }}>← 戻る</button>}
          <button onClick={goNext} disabled={selected === null} style={{ flex: 1, padding: "14px 0", background: selected !== null ? "linear-gradient(135deg, #8B5E3C, #C4956A)" : "rgba(255,252,248,0.85)", border: "none", borderRadius: 12, color: selected !== null ? "#fff" : "#C4B09A", fontSize: 15, fontWeight: 700, cursor: selected !== null ? "pointer" : "default", transition: "all 0.2s" }}>
            {qIndex + 1 === total ? "診断結果を見る →" : "次の質問 →"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── RESULT SCREEN ──
  if (screen === "result") return (
    <div style={base}>
      <div style={{ width: "100%", maxWidth: 560, padding: "24px 20px 60px" }}>

        {/* header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#A0886A", marginBottom: 8 }}>RESULT</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#2C1A0E", margin: "0 0 6px" }}>{age}｜診断結果</h2>
          <p style={{ fontSize: 13, color: "#8C7355", margin: 0 }}>{INTROS[age]}</p>
        </div>

        {/* total score */}
        <div style={{ ...card, textAlign: "center", marginBottom: 20, borderColor: `${typeInfo.color}44` }}>
          <div style={{ fontSize: 11, color: "#A0886A", letterSpacing: 2, marginBottom: 8 }}>合計スコア</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: typeInfo.color, lineHeight: 1 }}>{totalScore}</div>
          <div style={{ fontSize: 14, color: "#8C7355", marginBottom: 12 }}>/ 75点</div>
          <div style={{ display: "inline-block", background: `${typeInfo.color}22`, border: `1px solid ${typeInfo.color}66`, borderRadius: 20, padding: "6px 18px", fontSize: 14, fontWeight: 700, color: typeInfo.color, marginBottom: 12 }}>{typeInfo.label}</div>
          <p style={{ fontSize: 13, color: "#6B5240", lineHeight: 1.7, margin: 0 }}>{typeInfo.msg}</p>
        </div>

        {/* radar */}
        <div style={{ ...card, marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#A0886A", letterSpacing: 2, marginBottom: 16 }}>スキルバランス</div>
          <div style={{ display: "flex", justifyContent: "center" }}><RadarChart scores={skillScores} /></div>
        </div>

        {/* skill breakdown */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#A0886A", letterSpacing: 2, marginBottom: 14 }}>スキル別スコアとアドバイス</div>
          {SKILLS.map(s => {
            const sc = skillScores[s.key];
            const level = getAdviceLevel(sc);
            const adv = (ADVICE_BY_AGE[age] || ADVICE_BY_AGE["40代"])[s.key][level];
            const pct = (sc / 15) * 100;
            const barColor = level === "high" ? "#5C7A3A" : level === "mid" ? "#C4813A" : "#A04030";
            return (
              <div key={s.key} style={{ ...card, marginBottom: 12, borderLeft: `3px solid ${s.color}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.label}</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: barColor }}>{sc}<span style={{ fontSize: 12, color: "#A0886A", fontWeight: 400 }}>/15</span></div>
                </div>
                <div style={{ background: "rgba(255,252,248,0.70)", borderRadius: 4, height: 6, marginBottom: 10, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: barColor, borderRadius: 4, transition: "width 0.8s ease" }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: barColor, marginBottom: 6 }}>{adv.label}</div>
                <p style={{ fontSize: 12, color: "#6B5240", lineHeight: 1.7, margin: 0 }}>{adv.text}</p>
              </div>
            );
          })}
        </div>

        {/* ── 面談予約CTA ── */}
        {!consentAgreed && !showConsent && (
          <div style={{ ...card, marginBottom: 20, background: "rgba(180,140,90,0.12)", borderColor: "rgba(180,140,90,0.30)", textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#2C1A0E", marginBottom: 8 }}>この診断結果をもとに、あなたは次にどんな行動を取りますか。</div>
            <p style={{ fontSize: 12, color: "#8C7355", lineHeight: 2, margin: "0 0 16px" }}>
              まずはひとりBASECAMPのリビングで、一緒に考えてみませんか。
            </p>
            <button onClick={handleBookingClick} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #8B5E3C, #C4956A)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              オンライン相談会はこちらから
            </button>
          </div>
        )}

        {/* ── 同意モーダル ── */}
        {showConsent && (
          <div style={{ ...card, marginBottom: 20, background: "rgba(80,50,30,0.08)", borderColor: "rgba(180,140,90,0.35)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#2C1A0E", marginBottom: 12 }}>無料相談会のご案内</div>
            <p style={{ fontSize: 12, color: "#6B5240", lineHeight: 1.8, margin: "0 0 20px" }}>
              より深い対話のために、診断結果を管理人と共有します。スコア・回答内容・傾向の所見が管理人に送信されます。ご了承の上、お進みください。
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowConsent(false)} style={{ flex: 1, padding: "12px 0", background: "rgba(255,252,248,0.85)", border: "1px solid rgba(139,109,72,0.22)", borderRadius: 10, color: "#8C7355", fontSize: 13, cursor: "pointer" }}>戻る</button>
              <button onClick={handleConsentAgree} style={{ flex: 2, padding: "12px 0", background: "linear-gradient(135deg, #8B5E3C, #C4956A)", border: "none", borderRadius: 10, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                同意してご予約へ進む
              </button>
            </div>
          </div>
        )}

        {/* ── サマリー生成中 ── */}
        {summaryLoading && (
          <div style={{ ...card, marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "#A0886A", marginBottom: 8 }}>面談前サマリーを生成中</div>
            <div style={{ fontSize: 11, color: "#B8A08A" }}>少々お待ちください...</div>
          </div>
        )}

        {/* ── サマリー完成・Calendly誘導 ── */}
        {summaryGenerated && !summaryLoading && (
          <div style={{ ...card, marginBottom: 20, background: "rgba(92,122,58,0.10)", borderColor: "rgba(92,122,58,0.30)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#5C7A3A", marginBottom: 4 }}>
              無料相談会の準備ができました
            </div>
            <p style={{ fontSize: 12, color: "#8C7355", lineHeight: 1.7, margin: "0 0 16px" }}>
              管理人への情報共有が完了しました。ご都合の良い日程を選んで、ひとりBASECAMPのリビングへお越しください。
            </p>
            <button onClick={handleCopy} style={{ display: "block", width: "100%", padding: "12px 0", marginBottom: 10, background: copied ? "rgba(92,122,58,0.15)" : "rgba(255,252,248,0.85)", border: `1px solid ${copied ? "rgba(92,122,58,0.35)" : "rgba(139,109,72,0.22)"}`, borderRadius: 10, color: copied ? "#5C7A3A" : "#8C7355", fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
              {copied ? "コピーしました" : "サマリーをコピー（管理人用）"}
            </button>
            <a href="https://calendly.com/your-link" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "14px 0", background: "linear-gradient(135deg, #8B5E3C, #C4956A)", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
              日程を選ぶ →
            </a>
          </div>
        )}

        {/* LINE CTA */}
        <div style={{ ...card, textAlign: "center", background: "rgba(180,140,90,0.15)", borderColor: "rgba(180,140,90,0.25)", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#C4956A", marginBottom: 8 }}>低スコアのスキルは、勉強会で一緒に学べます</div>
          <p style={{ fontSize: 12, color: "#8C7355", margin: "0 0 16px", lineHeight: 1.8 }}>ひとりBASECAMP公式LINEから、次回の勉強会テーマをご確認ください。</p>
          <button onClick={restart} style={{ padding: "12px 28px", background: "rgba(255,252,248,0.70)", border: "1px solid rgba(139,109,72,0.22)", borderRadius: 10, color: "#6B5240", fontSize: 13, cursor: "pointer" }}>もう一度診断する</button>
        </div>

      </div>
    </div>
  );
}
