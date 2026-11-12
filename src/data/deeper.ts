// After month one: real grammar, kanji for work and signs, and a plan for the months ahead.
// One phrase per line so `npm run audio` can find it. Use ’ (not ') inside English text.
import type { Phrase } from '../types'

export type Grammar = { id: string; level: 'N5' | 'N4'; title: string; ja: string; why: string; rules: string[]; examples: Phrase[] }

export const GRAMMAR: Grammar[] = [
  {
    id: 'desu', level: 'N5', title: 'Sentences with です', ja: '〜です',
    why: 'The base sentence. Everything else is built on it.',
    rules: ['A は B です = A is B. は is read “wa”.', 'Question: add か. Negative: じゃないです (casual) / ではありません (formal).', 'Past: でした. Past negative: ではありませんでした.'],
    examples: [
      { id: 'gr-desu1', ja: '私は会社員です', say: 'わたしはかいしゃいんです', romaji: 'Watashi wa kaishain desu', en: 'I am an office worker' },
      { id: 'gr-desu2', ja: 'これはウーバーのアプリですか', say: 'これはうーばーのあぷりですか', romaji: 'Kore wa Ūbā no apuri desu ka', en: 'Is this the Uber app?' },
      { id: 'gr-desu3', ja: '今日は休みではありません', say: 'きょうはやすみではありません', romaji: 'Kyō wa yasumi dewa arimasen', en: 'Today is not a day off' },
    ],
  },
  {
    id: 'particles1', level: 'N5', title: 'Core particles', ja: '助詞',
    why: 'Particles tell you the job of each word. Get these seven right and sentences click.',
    rules: ['は marks the topic. が marks the subject (new or emphasised info).', 'を marks the object. に marks a target, a time, or where something exists. で marks where an action happens, or the tool you use.', 'へ is direction (“to”), と is “and / with”, も is “also”. の joins nouns: 私の本.'],
    examples: [
      { id: 'gr-p1', ja: '毎朝、コーヒーを飲みます', say: 'まいあさ、こーひーをのみます', romaji: 'Maiasa, kōhī o nomimasu', en: 'I drink coffee every morning' },
      { id: 'gr-p2', ja: '会社まで電車で行きます', say: 'かいしゃまででんしゃでいきます', romaji: 'Kaisha made densha de ikimasu', en: 'I go to the office by train' },
      { id: 'gr-p3', ja: '同僚とランチに行きます', say: 'どうりょうとらんちにいきます', romaji: 'Dōryō to ranchi ni ikimasu', en: 'I go to lunch with a colleague' },
      { id: 'gr-p4', ja: '机の上に資料があります', say: 'つくえのうえにしりょうがあります', romaji: 'Tsukue no ue ni shiryō ga arimasu', en: 'There is a document on the desk' },
    ],
  },
  {
    id: 'masu', level: 'N5', title: 'Polite verbs (ます form)', ja: '〜ます',
    why: 'The default register at work. Learn the four forms and you can describe nearly anything.',
    rules: ['Present/future: 食べます. Negative: 食べません. Past: 食べました. Past negative: 食べませんでした.', 'Verbs fall into three groups: る-verbs (食べる→食べます), う-verbs (飲む→飲みます), and two irregulars: する→します, 来る→来ます.', 'Time words (昨日, 明日, 毎日) tell you the tense.'],
    examples: [
      { id: 'gr-m1', ja: '昨日、会議に出ました', say: 'きのう、かいぎにでました', romaji: 'Kinō, kaigi ni demashita', en: 'I attended the meeting yesterday' },
      { id: 'gr-m2', ja: '明日、資料を送ります', say: 'あした、しりょうをおくります', romaji: 'Ashita, shiryō o okurimasu', en: 'I’ll send the document tomorrow' },
      { id: 'gr-m3', ja: '週末は仕事をしませんでした', say: 'しゅうまつはしごとをしませんでした', romaji: 'Shūmatsu wa shigoto o shimasen deshita', en: 'I didn’t work at the weekend' },
    ],
  },
  {
    id: 'adj', level: 'N5', title: 'Adjectives: い and な', ja: '形容詞',
    why: 'Two families, each with its own rules for negatives and joining nouns.',
    rules: ['い-adjectives end in い: 高い (expensive). Negative: 高くない. Past: 高かった.', 'な-adjectives take な before a noun: 静かな店. Negative: 静かじゃない. Past: 静かだった.', 'Exceptions: いい (good) behaves as よい → よくない, よかった. きれい and 有名 are な-adjectives.'],
    examples: [
      { id: 'gr-a1', ja: 'この店は安くておいしいです', say: 'このみせはやすくておいしいです', romaji: 'Kono mise wa yasukute oishii desu', en: 'This shop is cheap and tasty' },
      { id: 'gr-a2', ja: '静かなカフェを探しています', say: 'しずかなかふぇをさがしています', romaji: 'Shizuka na kafe o sagashite imasu', en: 'I’m looking for a quiet café' },
      { id: 'gr-a3', ja: '昨日は忙しくなかったです', say: 'きのうはいそがしくなかったです', romaji: 'Kinō wa isogashikunakatta desu', en: 'I wasn’t busy yesterday' },
    ],
  },
  {
    id: 'teform', level: 'N5', title: 'The て-form', ja: '〜て',
    why: 'The most useful verb form. It links actions and opens a dozen patterns.',
    rules: ['る-verbs: drop る, add て (食べる→食べて). Irregular: して, 来て.', 'う-verbs: う/つ/る→って, む/ぶ/ぬ→んで, く→いて, ぐ→いで, す→して. 行く→行って is an exception.', 'Then: 〜てください (please), 〜ています (is doing), 〜てもいいです (may), 〜てはいけません (must not).'],
    examples: [
      { id: 'gr-t1', ja: 'ここに名前を書いてください', say: 'ここになまえをかいてください', romaji: 'Koko ni namae o kaite kudasai', en: 'Please write your name here' },
      { id: 'gr-t2', ja: '今、会議をしています', say: 'いま、かいぎをしています', romaji: 'Ima, kaigi o shite imasu', en: 'We are in a meeting now' },
      { id: 'gr-t3', ja: '写真を撮ってもいいですか', say: 'しゃしんをとってもいいですか', romaji: 'Shashin o totte mo ii desu ka', en: 'May I take a photo?' },
      { id: 'gr-t4', ja: 'ここでたばこを吸ってはいけません', say: 'ここでたばこをすってはいけません', romaji: 'Koko de tabako o sutte wa ikemasen', en: 'You must not smoke here' },
    ],
  },
  {
    id: 'tai', level: 'N5', title: 'Wanting and inviting', ja: '〜たい',
    why: 'Say what you want, and invite others naturally.',
    rules: ['ます-stem + たい = want to: 行きたい, 食べたい. Behaves like an い-adjective: 行きたくない.', 'ませんか = “won’t you ~?” (invitation). ましょう = “let’s ~”.', 'In business, 〜たいです is fine for yourself but avoid asking a senior “do you want to ~?” directly.'],
    examples: [
      { id: 'gr-ta1', ja: '日本の会社で働きたいです', say: 'にほんのかいしゃではたらきたいです', romaji: 'Nihon no kaisha de hatarakitai desu', en: 'I want to work at a Japanese company' },
      { id: 'gr-ta2', ja: '一緒にランチに行きませんか', say: 'いっしょにらんちにいきませんか', romaji: 'Issho ni ranchi ni ikimasen ka', en: 'Shall we go to lunch together?' },
      { id: 'gr-ta3', ja: '会議を始めましょう', say: 'かいぎをはじめましょう', romaji: 'Kaigi o hajimemashō', en: 'Let’s start the meeting' },
    ],
  },
  {
    id: 'plain', level: 'N4', title: 'Plain form and ない', ja: '普通形',
    why: 'Friends, colleagues and subordinates use plain form. It is also how longer sentences are built.',
    rules: ['Dictionary form: 食べる, 飲む, する, 来る. Negative: 食べない, 飲まない, しない, 来ない.', 'Past plain: 食べた, 飲んだ. Past negative: 食べなかった.', 'Use plain form in the middle of polite sentences: 「明日行くと思います」.'],
    examples: [
      { id: 'gr-pl1', ja: '明日は会社に行かない', say: 'あしたはかいしゃにいかない', romaji: 'Ashita wa kaisha ni ikanai', en: 'I’m not going to the office tomorrow' },
      { id: 'gr-pl2', ja: '昨日は早く帰った', say: 'きのうははやくかえった', romaji: 'Kinō wa hayaku kaetta', en: 'I went home early yesterday' },
      { id: 'gr-pl3', ja: '日本語を勉強しているところです', say: 'にほんごをべんきょうしているところです', romaji: 'Nihongo o benkyō shite iru tokoro desu', en: 'I’m in the middle of studying Japanese' },
    ],
  },
  {
    id: 'reason', level: 'N4', title: 'Reasons and contrast', ja: 'から・ので・けど',
    why: 'Explaining why, and gently disagreeing. You will use these every day.',
    rules: ['から = because (direct). ので = because (softer, better at work).', 'けど / が = but. 「難しいですが、やってみます」', 'Put the reason first with ので: 「忙しいので、後でお願いします」.'],
    examples: [
      { id: 'gr-r1', ja: '雨なので、タクシーで行きます', say: 'あめなので、たくしーでいきます', romaji: 'Ame na no de, takushī de ikimasu', en: 'It’s raining, so I’ll go by taxi' },
      { id: 'gr-r2', ja: '難しいですが、やってみます', say: 'むずかしいですが、やってみます', romaji: 'Muzukashii desu ga, yatte mimasu', en: 'It’s difficult, but I’ll try' },
      { id: 'gr-r3', ja: '時間がないから、急ぎましょう', say: 'じかんがないから、いそぎましょう', romaji: 'Jikan ga nai kara, isogimashō', en: 'We have no time, so let’s hurry' },
    ],
  },
  {
    id: 'ability', level: 'N4', title: 'Ability and experience', ja: 'できる・ことがある',
    why: 'Say what you can do, and what you have done.',
    rules: ['ことができる = can do. Potential form: 食べられる, 飲める (る-verbs add られる; う-verbs change to え-row + る).', 'ことがある = I have done it before. 日本に行ったことがあります.', 'Contrast with ている (ongoing) and ました (a single past event).'],
    examples: [
      { id: 'gr-ab1', ja: '少し日本語を話せます', say: 'すこしにほんごをはなせます', romaji: 'Sukoshi nihongo o hanasemasu', en: 'I can speak a little Japanese' },
      { id: 'gr-ab2', ja: '納豆を食べたことがありますか', say: 'なっとうをたべたことがありますか', romaji: 'Nattō o tabeta koto ga arimasu ka', en: 'Have you ever eaten natto?' },
    ],
  },
  {
    id: 'opinion', level: 'N4', title: 'Opinions and quoting', ja: 'と思います',
    why: 'Soften what you say; quote others. Core business language.',
    rules: ['Plain form + と思います = I think that ~. 明日は雨だと思います.', 'Plain form + と言いました = said that ~.', 'でしょう / だろう = probably. かもしれません = might.'],
    examples: [
      { id: 'gr-o1', ja: 'この計画はいいと思います', say: 'このけいかくはいいとおもいます', romaji: 'Kono keikaku wa ii to omoimasu', en: 'I think this plan is good' },
      { id: 'gr-o2', ja: '部長は来週戻ると言いました', say: 'ぶちょうはらいしゅうもどるといいました', romaji: 'Buchō wa raishū modoru to iimashita', en: 'The department head said he’ll be back next week' },
    ],
  },
  {
    id: 'compare', level: 'N4', title: 'Comparing', ja: 'より・一番',
    why: 'Preferences and recommendations come up constantly.',
    rules: ['AはBより〜 = A is more ~ than B.', 'AよりBのほうが〜 = B is more ~ than A.', '一番 = the most. どれが一番いいですか.'],
    examples: [
      { id: 'gr-c1', ja: '電車はバスより速いです', say: 'でんしゃはばすよりはやいです', romaji: 'Densha wa basu yori hayai desu', en: 'Trains are faster than buses' },
      { id: 'gr-c2', ja: 'どの店が一番おいしいですか', say: 'どのみせがいちばんおいしいですか', romaji: 'Dono mise ga ichiban oishii desu ka', en: 'Which place is the tastiest?' },
    ],
  },
  {
    id: 'giving', level: 'N4', title: 'Giving and receiving', ja: 'もらう・くれる',
    why: 'Japanese tracks who does a favour for whom. This is the key to sounding polite and natural.',
    rules: ['あげる = I give; くれる = someone gives me; もらう = I receive.', '〜てもらう = I get someone to do ~ (“have someone do”). 〜ていただく is the humble version.', '〜てくれる = someone did ~ for me. 〜てあげる = I did ~ for someone.'],
    examples: [
      { id: 'gr-g1', ja: '同僚が資料を直してくれました', say: 'どうりょうがしりょうをなおしてくれました', romaji: 'Dōryō ga shiryō o naoshite kuremashita', en: 'A colleague fixed the document for me' },
      { id: 'gr-g2', ja: '先輩に教えてもらいました', say: 'せんぱいにおしえてもらいました', romaji: 'Senpai ni oshiete moraimashita', en: 'My senior taught me' },
      { id: 'gr-g3', ja: 'ご確認いただき、ありがとうございます', say: 'ごかくにんいただき、ありがとうございます', romaji: 'Gokakunin itadaki, arigatō gozaimasu', en: 'Thank you for checking it' },
    ],
  },
  {
    id: 'conditional', level: 'N4', title: 'If and when', ja: 'たら・とき',
    why: 'Conditions, instructions, and plans.',
    rules: ['Past plain + ら = if/when ~. 終わったら、連絡します.', 'とき = when. 時間があるとき、来てください.', '前に / 後で = before / after: 食べる前に, 食べた後で.'],
    examples: [
      { id: 'gr-co1', ja: '終わったら、連絡します', say: 'おわったら、れんらくします', romaji: 'Owattara, renraku shimasu', en: 'I’ll contact you when it’s done' },
      { id: 'gr-co2', ja: '分からないときは、聞いてください', say: 'わからないときは、きいてください', romaji: 'Wakaranai toki wa, kiite kudasai', en: 'If you don’t understand, please ask' },
    ],
  },
]

// Kanji cards. Learn words, not isolated characters: signs, the office, and the app.
export type KanjiSet = { id: string; title: string; ja: string; blurb: string; phrases: Phrase[] }

export const KANJI: KanjiSet[] = [
  {
    id: 'signs', title: 'Signs & stations', ja: '標識', blurb: 'What you see every day on doors, platforms and shopfronts.',
    phrases: [
      { id: 'kj-iriguchi', ja: '入口', say: 'いりぐち', romaji: 'iriguchi', en: 'Entrance', note: '入 = enter, 口 = mouth/opening.' },
      { id: 'kj-deguchi', ja: '出口', say: 'でぐち', romaji: 'deguchi', en: 'Exit', note: '出 = go out.' },
      { id: 'kj-eki', ja: '駅', say: 'えき', romaji: 'eki', en: 'Station' },
      { id: 'kj-chikatetsu', ja: '地下鉄', say: 'ちかてつ', romaji: 'chikatetsu', en: 'Subway', note: '地下 = underground, 鉄 = iron/railway.' },
      { id: 'kj-kitsuen', ja: '禁煙', say: 'きんえん', romaji: 'kin’en', en: 'No smoking', note: '禁 = prohibit, 煙 = smoke.' },
      { id: 'kj-hijoguchi', ja: '非常口', say: 'ひじょうぐち', romaji: 'hijōguchi', en: 'Emergency exit' },
      { id: 'kj-eigyo', ja: '営業中', say: 'えいぎょうちゅう', romaji: 'eigyōchū', en: 'Open (for business)', note: '準備中 (junbichū) means “getting ready” = closed for now.' },
      { id: 'kj-teikyubi', ja: '定休日', say: 'ていきゅうび', romaji: 'teikyūbi', en: 'Regular closing day' },
      { id: 'kj-muryo', ja: '無料', say: 'むりょう', romaji: 'muryō', en: 'Free of charge' },
      { id: 'kj-chui', ja: '注意', say: 'ちゅうい', romaji: 'chūi', en: 'Caution' },
      { id: 'kj-kiken', ja: '危険', say: 'きけん', romaji: 'kiken', en: 'Danger' },
      { id: 'kj-tachiiri', ja: '立入禁止', say: 'たちいりきんし', romaji: 'tachiiri kinshi', en: 'No entry' },
    ],
  },
  {
    id: 'office', title: 'Office & email', ja: '仕事', blurb: 'The words you see in subject lines, calendars and documents.',
    phrases: [
      { id: 'kj-kaisha', ja: '会社', say: 'かいしゃ', romaji: 'kaisha', en: 'Company', note: '会 = meet, 社 = company/shrine.' },
      { id: 'kj-shigoto', ja: '仕事', say: 'しごと', romaji: 'shigoto', en: 'Work / job' },
      { id: 'kj-kaigi', ja: '会議', say: 'かいぎ', romaji: 'kaigi', en: 'Meeting' },
      { id: 'kj-shiryo', ja: '資料', say: 'しりょう', romaji: 'shiryō', en: 'Document / materials' },
      { id: 'kj-kakunin', ja: '確認', say: 'かくにん', romaji: 'kakunin', en: 'Confirmation / to check' },
      { id: 'kj-yotei', ja: '予定', say: 'よてい', romaji: 'yotei', en: 'Schedule / plan' },
      { id: 'kj-shimekiri', ja: '締切', say: 'しめきり', romaji: 'shimekiri', en: 'Deadline' },
      { id: 'kj-renraku', ja: '連絡', say: 'れんらく', romaji: 'renraku', en: 'Contact / getting in touch' },
      { id: 'kj-kyoyu', ja: '共有', say: 'きょうゆう', romaji: 'kyōyū', en: 'Sharing' },
      { id: 'kj-taio', ja: '対応', say: 'たいおう', romaji: 'taiō', en: 'Handling / response' },
      { id: 'kj-tanto', ja: '担当', say: 'たんとう', romaji: 'tantō', en: 'Person in charge' },
      { id: 'kj-keiyaku', ja: '契約', say: 'けいやく', romaji: 'keiyaku', en: 'Contract' },
      { id: 'kj-buchou', ja: '部長', say: 'ぶちょう', romaji: 'buchō', en: 'Department head' },
      { id: 'kj-katyo', ja: '課長', say: 'かちょう', romaji: 'kachō', en: 'Section chief' },
    ],
  },
  {
    id: 'app', title: 'Uber vocabulary', ja: 'アプリ', blurb: 'What appears in the app and in business documents.',
    phrases: [
      { id: 'kj-haisha', ja: '配車', say: 'はいしゃ', romaji: 'haisha', en: 'Dispatching a car', note: '配 = distribute, 車 = car.' },
      { id: 'kj-haitatsu', ja: '配達', say: 'はいたつ', romaji: 'haitatsu', en: 'Delivery', note: '配 appears again. Recognise it and two words become easier.' },
      { id: 'kj-chumon', ja: '注文', say: 'ちゅうもん', romaji: 'chūmon', en: 'Order' },
      { id: 'kj-unten', ja: '運転手', say: 'うんてんしゅ', romaji: 'untenshu', en: 'Driver', note: '運 = carry, 転 = turn, 手 = hand/person.' },
      { id: 'kj-jokyaku', ja: '乗客', say: 'じょうきゃく', romaji: 'jōkyaku', en: 'Passenger' },
      { id: 'kj-josha', ja: '乗車', say: 'じょうしゃ', romaji: 'jōsha', en: 'Boarding' },
      { id: 'kj-kosha', ja: '降車', say: 'こうしゃ', romaji: 'kōsha', en: 'Getting off' },
      { id: 'kj-unchin', ja: '運賃', say: 'うんちん', romaji: 'unchin', en: 'Fare' },
      { id: 'kj-ryokin', ja: '料金', say: 'りょうきん', romaji: 'ryōkin', en: 'Charge / fee' },
      { id: 'kj-uriage', ja: '売上', say: 'うりあげ', romaji: 'uriage', en: 'Sales' },
      { id: 'kj-tesuryo', ja: '手数料', say: 'てすうりょう', romaji: 'tesūryō', en: 'Commission / fee' },
      { id: 'kj-hyoka', ja: '評価', say: 'ひょうか', romaji: 'hyōka', en: 'Rating' },
    ],
  },
  {
    id: 'ops', title: 'Courier ops', ja: '運営', blurb: 'The kanji in your dashboards, policies and incident reports.',
    phrases: [
      { id: 'kj-kado', ja: '稼働', say: 'かどう', romaji: 'kadō', en: 'Active / in operation' },
      { id: 'kj-hoshu', ja: '報酬', say: 'ほうしゅう', romaji: 'hōshū', en: 'Pay / earnings' },
      { id: 'kj-hosho', ja: '補償', say: 'ほしょう', romaji: 'hoshō', en: 'Compensation / cover' },
      { id: 'kj-jiko', ja: '事故', say: 'じこ', romaji: 'jiko', en: 'Accident' },
      { id: 'kj-anzen', ja: '安全', say: 'あんぜん', romaji: 'anzen', en: 'Safety' },
      { id: 'kj-toroku', ja: '登録', say: 'とうろく', romaji: 'tōroku', en: 'Registration / sign-up' },
      { id: 'kj-honnin', ja: '本人確認', say: 'ほんにんかくにん', romaji: 'honnin kakunin', en: 'Identity verification' },
      { id: 'kj-teishi', ja: '停止', say: 'ていし', romaji: 'teishi', en: 'Suspension / stop' },
      { id: 'kj-fusei', ja: '不正', say: 'ふせい', romaji: 'fusei', en: 'Fraud / misconduct' },
      { id: 'kj-juyo', ja: '需要', say: 'じゅよう', romaji: 'juyō', en: 'Demand' },
      { id: 'kj-kyokyu', ja: '供給', say: 'きょうきゅう', romaji: 'kyōkyū', en: 'Supply' },
      { id: 'kj-haitatsuin', ja: '配達員', say: 'はいたついん', romaji: 'haitatsuin', en: 'Courier' },
    ],
  },
  {
    id: 'baby', title: 'Baby, health & the ward', ja: '子育て', blurb: 'The kanji on clinic signs, ward forms and nursery letters.',
    phrases: [
      { id: 'kj-shonika', ja: '小児科', say: 'しょうにか', romaji: 'shōnika', en: 'Paediatrics', note: '小 = small, 児 = child, 科 = department.' },
      { id: 'kj-byoin', ja: '病院', say: 'びょういん', romaji: 'byōin', en: 'Hospital' },
      { id: 'kj-yakkyoku', ja: '薬局', say: 'やっきょく', romaji: 'yakkyoku', en: 'Pharmacy' },
      { id: 'kj-yobo', ja: '予防接種', say: 'よぼうせっしゅ', romaji: 'yobō sesshu', en: 'Vaccination' },
      { id: 'kj-boshi', ja: '母子手帳', say: 'ぼしてちょう', romaji: 'boshi techō', en: 'Mother and Child Handbook' },
      { id: 'kj-kenshin', ja: '健診', say: 'けんしん', romaji: 'kenshin', en: 'Health check-up', note: 'Baby check-ups are 乳児健診 (nyūji kenshin).' },
      { id: 'kj-hoikuen', ja: '保育園', say: 'ほいくえん', romaji: 'hoikuen', en: 'Nursery' },
      { id: 'kj-jidokan', ja: '児童館', say: 'じどうかん', romaji: 'jidōkan', en: 'Children’s hall' },
      { id: 'kj-junyu', ja: '授乳室', say: 'じゅにゅうしつ', romaji: 'junyūshitsu', en: 'Nursing room' },
      { id: 'kj-rinyu', ja: '離乳食', say: 'りにゅうしょく', romaji: 'rinyūshoku', en: 'Baby food' },
      { id: 'kj-kuyakusho', ja: '区役所', say: 'くやくしょ', romaji: 'kuyakusho', en: 'Ward office' },
      { id: 'kj-shinsei', ja: '申請', say: 'しんせい', romaji: 'shinsei', en: 'Application (on forms)' },
    ],
  },
  {
    id: 'time', title: 'Time & numbers', ja: '時間', blurb: 'Dates and times written in kanji.',
    phrases: [
      { id: 'kj-kyo', ja: '今日', say: 'きょう', romaji: 'kyō', en: 'Today' },
      { id: 'kj-ashita', ja: '明日', say: 'あした', romaji: 'ashita', en: 'Tomorrow' },
      { id: 'kj-kino', ja: '昨日', say: 'きのう', romaji: 'kinō', en: 'Yesterday' },
      { id: 'kj-mainichi', ja: '毎日', say: 'まいにち', romaji: 'mainichi', en: 'Every day' },
      { id: 'kj-raigetsu', ja: '来月', say: 'らいげつ', romaji: 'raigetsu', en: 'Next month' },
      { id: 'kj-gozen', ja: '午前', say: 'ごぜん', romaji: 'gozen', en: 'A.M.' },
      { id: 'kj-gogo', ja: '午後', say: 'ごご', romaji: 'gogo', en: 'P.M.' },
      { id: 'kj-jikan', ja: '時間', say: 'じかん', romaji: 'jikan', en: 'Time / hours' },
      { id: 'kj-en', ja: '円', say: 'えん', romaji: 'en', en: 'Yen' },
      { id: 'kj-nan', ja: '何', say: 'なに', romaji: 'nani / nan', en: 'What', note: 'Read “nan” before numbers and counters: 何時, 何人.' },
    ],
  },
]

// `only` shows a step on one track; the rest are shared.
export type Step = { title: string; body: string; only?: 'work' | 'home' }
export const ROADMAP: { when: string; goal: string; steps: Step[] }[] = [
  {
    when: 'Months 2–3', goal: 'Solid N5: speak simple sentences, read basic signs.',
    steps: [
      { title: 'Pick a textbook and finish it', body: 'Genki I (N5 to early N4) is the usual choice. Do one chapter a week with the workbook. Minna no Nihongo is a good alternative if you prefer all-Japanese explanations.' },
      { title: 'Add a kanji tool', body: 'WaniKani or Anki. Aim for 10 new kanji a day. Learn them inside words (use the kanji cards in this app first).' },
      { title: 'Use this app’s Deeper tab', body: 'Do one grammar module every two days, then make three sentences about your own day.' },
      { title: 'Join a ward Japanese class', only: 'home', body: 'Many wards and community centres run free or cheap Japanese classes for residents, and some offer childcare during the class. Ask at the ward office or international association (国際交流協会).' },
      { title: 'Book a tutor', body: 'One 30-minute conversation lesson a week, on italki or a similar service. Say what you did that week in the lesson. This is when you notice what you can and cannot say.' },
    ],
  },
  {
    when: 'Months 4–6', goal: 'N4: understand slow, clear Japanese at work and in shops.',
    steps: [
      { title: 'Move to Genki II', body: 'This covers plain form, conditionals, giving/receiving and more. Aim to sit the N4 section of a practice test.' },
      { title: 'Read every day', body: 'NHK News Web Easy, Tadoku graded readers, and the Japanese around you: signs, menus, letters from the ward, and (at work) the Uber app and emails. Ten minutes a day matters more than an hour once a week.' },
      { title: 'Make a work-words notebook', only: 'work', body: 'Each time you hear an unknown word in a meeting, write it down. Once a week, turn the ten best into flashcards.' },
      { title: 'Read children’s picture books', only: 'home', body: 'Picture books (絵本, ehon) are perfect beginner reading, and reading aloud to your baby is shadowing practice. Libraries lend them free.' },
      { title: 'Listen on the commute', body: 'Podcasts for learners (e.g. Nihongo con Teppei) and short YouTube videos. Repeat the sentence out loud (shadowing) for five minutes.' },
    ],
  },
  {
    when: 'Months 7–12', goal: 'N3: follow ordinary meetings, write clear emails, read simple articles.',
    steps: [
      { title: 'Shin Kanzen Master or Sou Matome N3', body: 'Work through the grammar, vocab, kanji and reading books. N3 is the big step from “survival” to “useful at work”.' },
      { title: 'Ask for a Japanese-language buddy', only: 'work', body: 'Offer to trade: 20 minutes of English for 20 minutes of Japanese with a willing colleague.' },
      { title: 'Make a parent friend', only: 'home', body: 'Meet another parent weekly at the 児童館 or support centre. Trade English for Japanese, or just chat in Japanese while the babies play.' },
      { title: 'Write more', only: 'work', body: 'Draft Slack messages in Japanese first, then check with a translator or tutor. Compare your version to the corrected one.' },
      { title: 'Sit a JLPT', body: 'It is held twice a year (July and December) and you apply months ahead. A deadline makes study real.' },
    ],
  },
  {
    when: 'Year 2', goal: 'N2: business Japanese, reading reports, speaking confidently.',
    steps: [
      { title: 'Business Japanese course', only: 'work', body: 'Look for courses on keigo, business emails, meeting language and phone etiquette. Pair it with N2 exam prep.' },
      { title: 'Read the news in Japanese', body: 'Start with a news summary app, then a daily article. Mark unknown words, then review them weekly.' },
      { title: 'Keep a speaking habit', body: 'A weekly tutor is still the best investment. At this stage, ask for feedback on keigo and nuance rather than grammar.' },
    ],
  },
]

export const HABITS = [
  'Ten minutes every day beats one long session a week. Do your reviews first, and the rest follows.',
  'Say new phrases out loud. Your mouth needs to learn them as well as your eyes.',
  'Use real situations as your textbook: signs, menus, letters from the ward, and the apps you use every day, in Japanese.',
  'Keep one place for new words (this app’s review queue works), so the same word is never learned twice.',
  'Ask colleagues for corrections. People are happy to help someone who is trying.',
  'Treat plateaus as normal. Everyone feels stuck around the three-month mark and again around the year.',
]

export const DEEPER_PHRASES: Phrase[] = [...GRAMMAR.flatMap(g => g.examples), ...KANJI.flatMap(s => s.phrases)]
