import { FruitType } from '../types';

export interface DiseaseRecord {
  id: string;
  fruit: FruitType;
  fruitName: { en: string; mr: string; hi: string };
  diseaseName: { en: string; mr: string; hi: string };
  pathogen: string;
  isHealthy: boolean;
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Physiological' | 'Healthy';
  severityDefault: 'Mild' | 'Moderate' | 'Severe' | 'None';
  symptoms: { en: string[]; mr: string[]; hi: string[] };
  organicTreatment: { en: string[]; mr: string[]; hi: string[] };
  chemicalTreatment: { en: string[]; mr: string[]; hi: string[] };
  preventativeMeasures: { en: string[]; mr: string[]; hi: string[] };
  favorableConditions: string;
  economicImpact: string;
}

export const DISEASE_DATABASE: Record<string, DiseaseRecord> = {
  'apple_scab': {
    id: 'apple_scab',
    fruit: 'apple',
    fruitName: { en: 'Apple', mr: 'सफरचंद', hi: 'सेब' },
    diseaseName: { en: 'Apple Scab', mr: 'सफरचंद खरूज रोग (Apple Scab)', hi: 'सेब का पपड़ी रोग (Apple Scab)' },
    pathogen: 'Venturia inaequalis (Ascomycete fungus)',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Olive-green to velvety brown-black circular lesions on foliage',
        'Leaf deformation, premature yellowing, and early defoliation',
        'Dark scabby lesions on fruit surface leading to corky cracking'
      ],
      mr: [
        'पानांवर ऑलिव्ह-हिरवे ते काळपट तपकिरी रंगाचे मखमली डाग',
        'पाने वाकडी होणे, अकाली पिवळी पडून गळणे',
        'फळांवर काळपट खरखरीत डाग पडून फळे तडकणे'
      ],
      hi: [
        'पत्तियों पर जैतून-हरे से काले मखमली गोलाकार धब्बे',
        'पत्तियों का मुड़ना और समय से पहले गिरना',
        'फलों पर खुरदुरे काले धब्बे पड़ना और फल का फटना'
      ]
    },
    organicTreatment: {
      en: [
        'Apply liquid copper hydroxide or Bordeaux mixture (1%) at bud break',
        'Spray Bacillus subtilis (Serenade ASO) bio-fungicide weekly during wet periods',
        'Sulfur dust applications prior to rainfall infection periods'
      ],
      mr: [
        'बोरडो मिश्रण (१%) किंवा कॉपर ऑक्सिक्लोराईडची फवारणी',
        'ओल्या हवामानात बॅसिलस सबटिलिस जैविक बुरशीनाशकाची फवारणी',
        'पावसापूर्वी सल्फर (गंधक) भुकटीचा वापर'
      ],
      hi: [
        'बोर्डो मिश्रण (1%) या कॉपर कवकनाशी का छिड़काव',
        'आर्द्र मौसम में बैसिलस सबटिलिस जैविक कवकनाशी का प्रयोग',
        'वर्षा से पहले सल्फर (गंधक) पाउडर का बुरकाव'
      ]
    },
    chemicalTreatment: {
      en: [
        'Difenoconazole (25% EC) @ 0.5 mL/L as systemic curative fungicide',
        'Captan (50% WP) @ 2.5 g/L or Mancozeb (75% WP) @ 2.0 g/L protectant',
        'Trifloxystrobin + Tebuconazole combination spray during pink bud stage'
      ],
      mr: [
        'डायफेनोकोनाझोल (२५% EC) ०.५ मिली/लीटर प्रमाणे फवारणी',
        'मँकोझेब (७५% WP) २.० ग्रॅम/लीटर किंवा कॅप्टन २.५ ग्रॅम/लीटर संरक्षक बुरशीनाशक',
        'टेबुकोनाझोल संयुक्त बुरशीनाशकाची योग्य टप्प्यावर फवारणी'
      ],
      hi: [
        'डिफेनोकोनाज़ोल (25% EC) @ 0.5 मिली/लीटर का छिड़काव',
        'मैनकोज़ेब (75% WP) @ 2.0 ग्राम/लीटर सुरक्षात्मक कवकनाशी',
        'टेबुकोनाज़ोल आधारित मिश्रित कवकनाशी का प्रयोग'
      ]
    },
    preventativeMeasures: {
      en: [
        'Rake and destroy fallen leaf litter to eliminate overwintering pseudothecia',
        'Prune dense canopy branches to improve air circulation and rapid leaf drying',
        'Select resistant cultivars such as Liberty, Prima, or Enterprise'
      ],
      mr: [
        'झाडाखालील गळलेली पाने गोळा करून नष्ट करा जेणेकरून बुरशीचे बीजाणू नष्ट होतील',
        'हवा खेळती राहण्यासाठी फांद्यांची योग्य छाटणी करा',
        'रोगप्रतिकारक वाणांची निवड करा'
      ],
      hi: [
        'गिरे हुए पत्तों को इकट्ठा कर नष्ट करें ताकि फफूंद के बीजाणु समाप्त हों',
        'हवा के संचलन के लिए वृक्षों की समय पर छंटाई करें',
        'रोगरोधी किस्मों का चयन करें'
      ]
    },
    favorableConditions: 'Prolonged leaf wetness (>9 hours) at 15–24°C during spring bud break',
    economicImpact: 'Can cause up to 70% marketable yield loss due to fruit deformity and premature drop'
  },

  'apple_black_rot': {
    id: 'apple_black_rot',
    fruit: 'apple',
    fruitName: { en: 'Apple', mr: 'सफरचंद', hi: 'सेब' },
    diseaseName: { en: 'Apple Black Rot', mr: 'सफरचंद ब्लॅक रॉट (काळा सड)', hi: 'सेब का ब्लैक रोट (काला सड़न)' },
    pathogen: 'Botryosphaeria obtusa',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Severe',
    symptoms: {
      en: [
        'Frogeye leaf spots with purple margins and tan circular centers',
        'Firm, dark decaying circular rot on fruit expanding in concentric rings',
        'Cankers on twigs and bark exuding darkened sunken tissue'
      ],
      mr: [
        'पानांवर बेडकाच्या डोळ्यासारखे मध्यभागी फिकट आणि कडेने जांभळे डाग',
        'फळांवर गोलाकार काळी सड जी गोलाकार वलयांमध्ये पसरते',
        'झाडाच्या फांद्यांवर काळे खोलगट व्रण'
      ],
      hi: [
        'पत्तियों पर मेंढक की आंख जैसे किनारे पर बैंगनी और केंद्र में हल्के धब्बे',
        'फलों पर संकेंद्रित छल्लों में फैलती हुई काली सड़न',
        'शाखाओं और तनों पर गहरे धंसे हुए घाव'
      ]
    },
    organicTreatment: {
      en: [
        'Prune out cankered limbs at least 15 cm below diseased tissue during winter dormancy',
        'Spray copper sulfate or lime-sulfur during dormant period'
      ],
      mr: [
        'बाधित फांद्या १५ सेमी खाली छाटून जाळून नष्ट करा',
        'सुप्तावस्थेत कॉपर सल्फेट किंवा चुना-गंधक द्रावणाची फवारणी'
      ],
      hi: [
        'रोगग्रस्त शाखाओं को 15 सेमी नीचे से काटकर जला दें',
        'सुप्त अवस्था में कॉपर सल्फेट या चूना-सल्फर का छिड़काव'
      ]
    },
    chemicalTreatment: {
      en: [
        'Thiophanate-methyl (70% WP) @ 1.5 g/L at petal fall',
        'Pyraclostrobin + Boscalid fungicide program'
      ],
      mr: [
        'थायोफॅनेट-मिथाइल (७०% WP) १.५ ग्रॅम/लीटर फवारणी',
        'पायराक्लोस्ट्रोबिन बुरशीनाशक कार्यक्रम'
      ],
      hi: [
        'थियोफैनेट-मिथाइल (70% WP) @ 1.5 ग्राम/लीटर का छिड़काव',
        'पायराक्लोस्ट्रोबिन कवकनाशी का प्रयोग'
      ]
    },
    preventativeMeasures: {
      en: [
        'Remove mummified fruit hanging in the canopy or on the orchard floor',
        'Prevent mechanical bark wounds and frost injury'
      ],
      mr: [
        'सुकलेली व सडलेली जुनी फळे बागेतून काढून नष्ट करा',
        'झाडांच्या खोडाला इजा होणार नाही याची काळजी घ्या'
      ],
      hi: [
        'सूखे और सड़े हुए पुराने फलों को बाग से तुरंत हटाएं',
        'पेड़ों की छाल को चोट लगने से बचाएं'
      ]
    },
    favorableConditions: 'Warm, humid weather (24–28°C) following spring rainfalls',
    economicImpact: 'Causes extensive blossom end rot and destroys storage longevity'
  },

  'apple_cedar_rust': {
    id: 'apple_cedar_rust',
    fruit: 'apple',
    fruitName: { en: 'Apple', mr: 'सफरचंद', hi: 'सेब' },
    diseaseName: { en: 'Apple Cedar Rust', mr: 'सफरचंद सिडर रस्ट (तांबेरा)', hi: 'सेब का सिडार रस्ट (गेरुआ)' },
    pathogen: 'Gymnosporangium juniperi-virginianae',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Bright yellow-orange or reddish spots on the upper leaf surface',
        'Small fungal tube-like aecia structures protruding from lower leaf surface',
        'Orange cup-shaped lesions near the calyx end of young apples'
      ],
      mr: [
        'पानांच्या वरच्या बाजूला ठळक पिवळे-नारिंगी किंवा लालसर डाग',
        'पानाच्या खालच्या बाजूला नळीसारखी सूक्ष्म बीजाणूंची रचना',
        'फळांच्या खालील भागावर नारिंगी रंगाचे खोलगट डाग'
      ],
      hi: [
        'पत्तियों की ऊपरी सतह पर चमकीले पीले-नारंगी या लाल धब्बे',
        'पत्तियों की निचली सतह पर नलिकाकार संरचनाएं',
        'फलों पर नारंगी रंग के धब्बे'
      ]
    },
    organicTreatment: {
      en: [
        'Remove nearby alternate host cedar/juniper trees within 500 meters if practical',
        'Apply wettable sulfur at tight cluster to petal fall'
      ],
      mr: [
        'बागेभोवती असलेली जुनिपर / सिडरची झाडे नष्ट करा',
        'फुलोऱ्याच्या वेळी गंधकाची फवारणी करा'
      ],
      hi: [
        'बाग के आसपास मौजूद जुनिपर/सिडार के पेड़ों को हटाएं',
        'फूल आने के समय घुलनशील सल्फर का छिड़काव करें'
      ]
    },
    chemicalTreatment: {
      en: [
        'Myclobutanil (40% WP) @ 0.4 g/L applied preventatively',
        'Mancozeb or Propiconazole @ 1.0 mL/L'
      ],
      mr: [
        'मायक्लोब्युटॅनिल (४०% WP) ०.४ ग्रॅम/लीटर फवारणी',
        'प्रोपिकोनाझोल १.० मिली/लीटर प्रमाणे'
      ],
      hi: [
        'माइक्लोबुटानिल (40% WP) @ 0.4 ग्राम/लीटर',
        'प्रोपिकोनाज़ोल 1.0 मिली/लीटर का छिड़काव'
      ]
    },
    preventativeMeasures: {
      en: ['Plant rust-immune cultivars', 'Inspect nearby windbreak conifers in early spring'],
      mr: ['तांबेरा प्रतिकारक वाण लावा', 'वसंतात आजूबाजूच्या झाडांची तपासणी करा'],
      hi: ['रोग प्रतिरोधी किस्में लगाएं', 'आसपास के पेड़ों की नियमित जांच करें']
    },
    favorableConditions: 'Spring rains between 10–24°C coinciding with cedar gall telial horn emergence',
    economicImpact: 'Severe defoliation weakens trees and reduces fruit size'
  },

  'apple_healthy': {
    id: 'apple_healthy',
    fruit: 'apple',
    fruitName: { en: 'Apple', mr: 'सफरचंद', hi: 'सेब' },
    diseaseName: { en: 'Healthy Apple Foliage & Fruit', mr: 'निरोगी सफरचंद (रोगमुक्त)', hi: 'स्वस्थ सेब (रोगमुक्त)' },
    pathogen: 'None (Physiologically Normal & Disease-Free)',
    isHealthy: true,
    category: 'Healthy',
    severityDefault: 'None',
    symptoms: {
      en: ['Vibrant deep green foliage with uniform lamina', 'No necrotic lesions or chlorotic spotting', 'Smooth, undamaged cuticle'],
      mr: ['गडद हिरवी चमकदार पाने व समान पोत', 'कोणतेही काळे किंवा पिवळे डाग नाहीत', 'गुळगुळीत आणि निरोगी फळ व पान'],
      hi: ['चमकदार गहरी हरी पत्तियां', 'किसी भी प्रकार के धब्बे या सड़न का अभाव', 'स्वस्थ एवं चमकदार फल व पत्तियां']
    },
    organicTreatment: {
      en: ['Continue balanced foliar compost tea and seaweed extract nutrition', 'Maintain beneficial insect habitat'],
      mr: ['सेंद्रिय खते आणि जीवामृताचा नियमित वापर सुरू ठेवा', 'मित्र कीटकांचे संवर्धन करा'],
      hi: ['जीवामृत एवं संतुलित पोषण बनाए रखें', 'मित्र कीटों का संरक्षण करें']
    },
    chemicalTreatment: {
      en: ['No chemical intervention required; preserve natural biocontrol microbiome'],
      mr: ['कोणत्याही रासायनिक औषधांची गरज नाही'],
      hi: ['किसी भी रासायनिक कीटनाशक की आवश्यकता नहीं है']
    },
    preventativeMeasures: {
      en: ['Maintain calibrated drip irrigation', 'Regular weekly orchard scouting'],
      mr: ['नियमित पाणी व्यवस्थापन आणि बागेची पाहणी करा'],
      hi: ['नियमित सिंचाई एवं बाग की निगरानी जारी रखें']
    },
    favorableConditions: 'Balanced nutrition, optimal soil pH 6.0–6.8, proper sunlight penetration',
    economicImpact: 'Optimal commercial fruit yield and Grade-A export pack-out potential'
  },

  'grape_black_rot': {
    id: 'grape_black_rot',
    fruit: 'grape',
    fruitName: { en: 'Grape', mr: 'द्राक्ष', hi: 'अंगूर' },
    diseaseName: { en: 'Grape Black Rot', mr: 'द्राक्ष ब्लॅक रॉट (काळा कुजवा)', hi: 'अंगूर का ब्लैक रोट (काला सड़ांध)' },
    pathogen: 'Guignardia bidwellii',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Severe',
    symptoms: {
      en: [
        'Small reddish-brown circular spots with dark border on young leaves',
        'Black pinhead pycnidia fruiting bodies visible inside necrotic lesions',
        'Berries shrivel into hard, black wrinkled mummies'
      ],
      mr: [
        'कोवळ्या पानांवर तांबूस-तपकिरी रंगाचे डाग काळ्या कडेसह',
        'डागांच्या आत काळे सूक्ष्म ठिपके (Pycnidia) दिसणे',
        'द्राक्षांचे मणी सुकून काळे, सुरकुतलेले व कडक होणे'
      ],
      hi: [
        'कोमल पत्तियों पर लाल-भूरे रंग के गोलाकार धब्बे',
        'धब्बों के केंद्र में काले बारीक कण दिखाई देना',
        'अंगूर के दाने सूखकर काले व कठोर होकर सिकुड़ना'
      ]
    },
    organicTreatment: {
      en: ['Bordeaux mixture (1%) applied before rain events', 'Remove infected canes and clusters during pruning'],
      mr: ['पावसापूर्वी बोर्डो मिश्रण (१%) फवारा', 'छाटणीच्या वेळी बाधित घड आणि काड्या नष्ट करा'],
      hi: ['बारिश से पहले 1% बोर्डो मिश्रण का छिड़काव करें', 'रोगग्रस्त गुच्छों को काटकर नष्ट करें']
    },
    chemicalTreatment: {
      en: ['Azoxystrobin (23% SC) @ 1.0 mL/L or Kresoxim-methyl @ 0.7 g/L', 'Mancozeb @ 2.5 g/L protective schedule'],
      mr: ['अझॉक्सीस्ट्रोबिन (२३% SC) १.० मिली/लीटर किंवा क्रेक्सॉक्सीम-मिथाईल', 'मँकोझेब २.५ ग्रॅम/लीटर संरक्षक फवारणी'],
      hi: ['एज़ोक्सीस्ट्रोबिन (23% SC) @ 1.0 मिली/लीटर', 'मैनकोज़ेब 2.5 ग्राम/लीटर का सुरक्षात्मक छिड़काव']
    },
    preventativeMeasures: {
      en: ['Open canopy shoot positioning to maximize UV exposure', 'Collect all ground mummies'],
      mr: ['घड आणि पानांवर सूर्यप्रकाश पोहोचेल अशी कॅनोपी ठेवा', 'जमिनीवर पडलेले सुकलेले मणी गोळा करून जाळा'],
      hi: ['कैनोपी में धूप का संचलन बढ़ाएं', 'जमीन पर गिरे सूखे मणियों को नष्ट करें']
    },
    favorableConditions: 'Warm, humid weather with frequent rainfall at 26–32°C',
    economicImpact: 'Can destroy entire grape clusters resulting in 80–100% crop loss in wet years'
  },

  'grape_esca': {
    id: 'grape_esca',
    fruit: 'grape',
    fruitName: { en: 'Grape', mr: 'द्राक्ष', hi: 'अंगूर' },
    diseaseName: { en: 'Grape Esca (Black Measles)', mr: 'द्राक्ष एस्का रोग (वाघा रोख / ब्लॅक मिझल्स)', hi: 'अंगूर का एस्का रोग (ब्लैक मीजल्स)' },
    pathogen: 'Phaeomoniella chlamydospora & Phaeoacremonium minimum',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Severe',
    symptoms: {
      en: [
        'Interveinal necrotic drying creating distinct "tiger-stripe" pattern on leaves',
        'Berries develop small purple or black punctate spots (measles)',
        'Apoplexy: sudden total vine collapse and leaf desiccation during hot dry spells'
      ],
      mr: [
        'पानांच्या शिरांच्या मधोमध पिवळे व काळे पट्टे पडून "वाघाच्या त्वचेसारखा" (Tiger-stripe) आकार',
        'द्राक्षांच्या मण्यांवर काळे बारीक ठिपके पडणे',
        'उन्हाळ्यात अचानक संपूर्ण वेल सुकणे व मरणे (Apoplexy)'
      ],
      hi: [
        'पत्तियों की नसों के बीच "बाघ की धारियों" जैसा सूखा पैटर्न बनना',
        'अंगूर के दानों पर छोटे-छोटे काले चकत्ते उभरना',
        'गर्मियों में अचानक पूरी बेल का सूख जाना'
      ]
    },
    organicTreatment: {
      en: ['Apply Trichoderma atroviride to pruning wounds within 24 hours of cutting', 'Sodium arsenite alternatives and vine surgery (curettage)'],
      mr: ['छाटणीनंतर २४ तासांत छाटलेल्या भागावर ट्रायकोडर्मा पेस्ट लावा', 'खोडात सडलेला भाग खरवडून काढून निर्जंतुक करा'],
      hi: ['कटाई के तुरंत बाद तनों पर ट्राइकोडर्मा का लेप लगाएं', 'सड़े हुए तने की सफाई करें']
    },
    chemicalTreatment: {
      en: ['Pyridine sealants on large cuts', 'Fosetyl-Al soil drench to bolster systemic resistance'],
      mr: ['मोठ्या जखमांवर बुरशीनाशक पेस्ट लावा', 'फॉसेटाईल-अल ड्रेन्चिंग करा'],
      hi: ['कटाई वाले घावों पर कवकनाशी सीलेंट लगाएं', 'फॉसेटाइल-अल का उपयोग करें']
    },
    preventativeMeasures: {
      en: ['Delay pruning to late winter when spore count is low', 'Disinfect pruning shears with 70% alcohol between vines'],
      mr: ['छाटणी उशिरा करा जेणेकरून हवेत बीजाणू कमी असतील', 'छाटणी कात्री ७०% अल्कोहोलने निर्जंतुक करा'],
      hi: ['कटाई के औजारों को नियमित रूप से सैनिटाइज करें', 'प्रमाणित रोगमुक्त पौधे लगाएं']
    },
    favorableConditions: 'Old vineyards (>8-10 years), vascular wound infection, high summer transpiration demand',
    economicImpact: 'Progressive permanent vine mortality and unmarketable spotted table grapes'
  },

  'grape_healthy': {
    id: 'grape_healthy',
    fruit: 'grape',
    fruitName: { en: 'Grape', mr: 'द्राक्ष', hi: 'अंगूर' },
    diseaseName: { en: 'Healthy Grape Vine & Clusters', mr: 'निरोगी द्राक्ष बाग (रोगमुक्त)', hi: 'स्वस्थ अंगूर की बेल (रोगमुक्त)' },
    pathogen: 'None (Vigorous & Clean)',
    isHealthy: true,
    category: 'Healthy',
    severityDefault: 'None',
    symptoms: {
      en: ['Lush emerald-green leaves with crisp edges', 'Uniform cluster development without spots or blemishes', 'Firm canes with intact nodal vascular tissue'],
      mr: ['टवटवीत हिरवीगार पाने व निरोगी घड', 'मण्यांवर डाग किंवा सड नाही', 'मजबूत निरोगी काड्या'],
      hi: ['स्वस्थ हरी पत्तियां एवं निर्दोष गुच्छे', 'फलों पर कोई दाग नहीं', 'मजबूत शाखाएं']
    },
    organicTreatment: {
      en: ['Continue bio-fertilizer application (PSB, KMB)', 'Seaweed kelp extracts for berry firmness'],
      mr: ['जिवाणू खते आणि समुद्री शैवाल अर्काचा वापर चालू ठेवा', 'सूक्ष्म अन्नद्रव्यांचे संतुलित व्यवस्थापन'],
      hi: ['जैविक खाद एवं सूक्ष्म पोषक तत्वों का संतुलित प्रयोग जारी रखें']
    },
    chemicalTreatment: {
      en: ['No chemical fungicides needed; preserve canopy microflora'],
      mr: ['रासायनिक औषधांची आवश्यकता नाही'],
      hi: ['किसी रासायनिक कीटनाशक की आवश्यकता नहीं']
    },
    preventativeMeasures: {
      en: ['Maintain optimal leaf area index (LAI)', 'Strict humidity monitoring in canopy'],
      mr: ['कॅनोपीचे नियमित व्यवस्थापन आणि आर्द्रता निरीक्षण'],
      hi: ['नियमित सिंचाई और पौधों की छंटाई का ध्यान रखें']
    },
    favorableConditions: 'Proper trellis training, drip fertigation, balanced fruit-to-leaf ratio',
    economicImpact: 'Maximum export grade brix level (18–20° Brix) and premium valuation'
  },

  'tomato_early_blight': {
    id: 'tomato_early_blight',
    fruit: 'tomato',
    fruitName: { en: 'Tomato', mr: 'टोमॅटो', hi: 'टमाटर' },
    diseaseName: { en: 'Tomato Early Blight', mr: 'टोमॅटो अर्ली ब्लाइट (करपा)', hi: 'टमाटर का अगेती झुलसा (Early Blight)' },
    pathogen: 'Alternaria solani',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Dark brown to black necrotic spots with concentric rings ("target board" appearance)',
        'Yellow chlorotic halos surrounding the target spots',
        'Stem collar rot and sunken leathery black lesions at the stem attachment of fruit'
      ],
      mr: [
        'पानांवर गोलाकार काळे-तपकिरी डाग ज्यामध्ये चक्राकार वलये ("टार्गेट बोर्ड" सारखी) दिसतात',
        'डागांच्या भोवती पिवळे कडे (क्लोरोसिस) निर्माण होणे',
        'फळाच्या देठाजवळ काळे खोलगट चामड्यासारखे डाग'
      ],
      hi: [
        'पत्तियों पर संकेंद्रित छल्लों वाले गहरे भूरे-काले धब्बे ("टारगेट बोर्ड" पैटर्न)',
        'धब्बों के चारों ओर पीला घेरा बनना',
        'फलों के डंठल के पास काले धंसे हुए कड़े धब्बे'
      ]
    },
    organicTreatment: {
      en: ['Copper hydroxide (2 g/L) weekly spray', 'Trichoderma harzianum soil and foliar spray', 'Neem cake soil amendment'],
      mr: ['कॉपर हायड्रॉक्साईड २ ग्रॅम/लीटर फवारणी', 'ट्रायकोडर्मा हरझियानम पानांवर व जमिनीत वापरा', 'निंबोळी पेंडीचा खतात वापर'],
      hi: ['कॉपर हाइड्रोक्साइड (2 ग्राम/लीटर) का छिड़काव', 'ट्राइकोडर्मा का छिड़काव', 'नीम खली का प्रयोग']
    },
    chemicalTreatment: {
      en: ['Mancozeb 75% WP @ 2.5 g/L preventative', 'Chlorothalonil @ 2 g/L or Azoxystrobin + Difenoconazole @ 1 mL/L'],
      mr: ['मँकोझेब ७५% WP २.५ ग्रॅम/लीटर फवारणी', 'अझॉक्सीस्ट्रोबिन + डायफेनोकोनाझोल १.० मिली/लीटर प्रमाणे'],
      hi: ['मैनकोज़ेब (75% WP) @ 2.5 ग्राम/लीटर', 'एज़ोक्सीस्ट्रोबिन + डिफेनोकोनाज़ोल 1 मिली/लीटर']
    },
    preventativeMeasures: {
      en: ['Use drip irrigation instead of overhead sprinklers to keep foliage dry', 'Stake vines and prune bottom 30 cm leaves away from soil contact', '3-year crop rotation with non-solanaceous crops'],
      mr: ['ठिबक सिंचन वापरा जेणेकरून पाने ओली राहणार नाहीत', 'झाडांना आधार (स्टेकिंग) द्या आणि जमिनीलगतची खालची पाने काढून टाका', 'पीक फेरपालट करा'],
      hi: ['ड्रिप सिंचाई का उपयोग करें ताकि पत्तियां गीली न हों', 'पौधों को सहारा दें और निचली पत्तियों को छांटें', 'फसल चक्र अपनाएं']
    },
    favorableConditions: 'Warm temperatures (24–29°C) alternating with rain or heavy dew periods',
    economicImpact: 'Reduces photosynthetic canopy by up to 50–70%, causing severe fruit sunscald and yield loss'
  },

  'tomato_late_blight': {
    id: 'tomato_late_blight',
    fruit: 'tomato',
    fruitName: { en: 'Tomato', mr: 'टोमॅटो', hi: 'टमाटर' },
    diseaseName: { en: 'Tomato Late Blight', mr: 'टोमॅटो लेट ब्लाइट (लेट करपा)', hi: 'टमाटर का पछेती झुलसा (Late Blight)' },
    pathogen: 'Phytophthora infestans (Oomycete)',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Severe',
    symptoms: {
      en: [
        'Water-soaked pale green or dark brown lesions on leaves expanding rapidly',
        'White cottony downy fungal mildew visible on leaf undersides in humid conditions',
        'Large greasy bronze-brown firm lesions covering green fruit'
      ],
      mr: [
        'पानांवर पाण्यासारखे भिजलेले वेगाने पसरणारे काळपट डाग',
        'दमट हवेत पानाच्या खालच्या बाजूला पांढरी कापसासारखी बुरशीची वाढ',
        'हिरव्या फळांवर तेलकट काळसर-तपकिरी कडक डाग'
      ],
      hi: [
        'पत्तियों पर पानी से भीगे हुए तेजी से फैलते गहरे धब्बे',
        'आर्द्र मौसम में पत्तियों के नीचे सफेद फफूंद दिखना',
        'फलों पर चिकने, भूरे-कांस्य रंग के कड़े धब्बे'
      ]
    },
    organicTreatment: {
      en: ['Immediate Bordeaux mixture (1%) application', 'Destroy heavily infected plants immediately to prevent airborne spread'],
      mr: ['ताबडतोब बोर्डो मिश्रण (१%) ची फवारणी करा', 'तीव्र बाधित झाडे उपटून जाळून टाका'],
      hi: ['तुरंत बोर्डो मिश्रण (1%) का छिड़काव करें', 'गंभीर रूप से प्रभावित पौधों को उखाड़कर नष्ट करें']
    },
    chemicalTreatment: {
      en: ['Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2.5 g/L', 'Dimethomorph (50% WP) @ 1.0 g/L', 'Cymoxanil + Mancozeb @ 2.0 g/L'],
      mr: ['मेटॅलॅक्सिल + मँकोझेब (रिडोमिल) २.५ ग्रॅम/लीटर', 'डायमेथोमॉर्फ १.० ग्रॅम/लीटर किंवा सायमोक्सॅनील'],
      hi: ['मेटालेक्सिल + मैनकोज़ेब @ 2.5 ग्राम/लीटर', 'डाइमेथोमोर्फ @ 1.0 ग्राम/लीटर का छिड़काव']
    },
    preventativeMeasures: {
      en: ['Destroy volunteer tomato and potato cull piles', 'Ensure wide plant spacing for rapid air drainage', 'Monitor blight forecast advisories'],
      mr: ['जुने बटाटा व टोमॅटोचे अवशेष नष्ट करा', 'झाडांमध्ये पुरेशी मोकळी जागा ठेवा', 'हवामानातील बदलांवर लक्ष ठेवा'],
      hi: ['पुराने पौधों के मलबे को नष्ट करें', 'पौधों के बीच उचित दूरी रखें']
    },
    favorableConditions: 'Cool, wet, cloudy weather (15–20°C) with relative humidity >90%',
    economicImpact: 'Can destroy entire commercial tomato fields within 7 to 10 days if unchecked'
  },

  'tomato_bacterial_spot': {
    id: 'tomato_bacterial_spot',
    fruit: 'tomato',
    fruitName: { en: 'Tomato', mr: 'टोमॅटो', hi: 'टमाटर' },
    diseaseName: { en: 'Tomato Bacterial Spot', mr: 'टोमॅटो जिवाणूजन्य ठिपके (Bacterial Spot)', hi: 'टमाटर का जीवाणु धब्बा रोग' },
    pathogen: 'Xanthomonas perforans / Xanthomonas vesicatoria',
    isHealthy: false,
    category: 'Bacterial',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Small dark brown water-soaked angular spots on leaves (<3 mm)',
        'Spots turn greasy and scab-like with translucent yellow halos',
        'Raised scab-like black blisters with cratered centers on green fruit'
      ],
      mr: [
        'पानांवर लहान काळे-तपकिरी कोनात्मक ठिपके (<३ मिमी)',
        'ठिपके तेलकट होऊन भोवती पिवळे वलय दिसते',
        'फळांवर खरखरीत खरुजेसारखे काळे फोड'
      ],
      hi: [
        'पत्तियों पर छोटे, कोणीय गहरे भूरे धब्बे',
        'धब्बों के चारों ओर पारदर्शी पीला घेरा',
        'फलों पर उभरे हुए खुरदुरे छाले'
      ]
    },
    organicTreatment: {
      en: ['Copper hydroxide combined with Bacillus amyloliquefaciens', 'Bacteriophage bio-pesticides (AgriPhage)'],
      mr: ['कॉपर हायड्रॉक्साईड सोबत जैविक जिवाणूनाशकाची फवारणी', 'बॅक्टेरियोफेज जैविक घटक वापरा'],
      hi: ['कॉपर हाइड्रोक्साइड के साथ जैविक जीवाणुरोधी छिड़काव', 'बैक्टेरियोफेज का प्रयोग']
    },
    chemicalTreatment: {
      en: ['Streptomycin sulphate + Tetracycline hydrochloride (Streptocycline) @ 0.5 g/L + Copper Oxychloride @ 2.5 g/L', 'Kasugamycin @ 1.5 mL/L'],
      mr: ['स्ट्रेप्टोसायक्लिन ०.५ ग्रॅम/लीटर + कॉपर ऑक्सिक्लोराईड २.५ ग्रॅम/लीटर एकत्र फवारणी', 'कासुगामायसिन १.५ मिली/लीटर'],
      hi: ['स्ट्रेप्टोसाइक्लिन 0.5 ग्राम/लीटर + कॉपर ऑक्सीक्लोराइड 2.5 ग्राम/लीटर', 'कासुगामाइसिन 1.5 मिली/लीटर']
    },
    preventativeMeasures: {
      en: ['Use hot-water treated or certified disease-free seed', 'Do not work in fields when foliage is wet from rain or dew'],
      mr: ['उष्ण जल प्रक्रिया केलेले प्रमाणित बियाणे वापरा', 'पाने ओली असताना शेतात मशागत करू नका'],
      hi: ['प्रमाणित एवं उपचारित बीज ही बोएं', 'पत्तियां गीली होने पर खेत में काम न करें']
    },
    favorableConditions: 'High temperatures (24–30°C) combined with wind-driven heavy rains',
    economicImpact: 'Unmarketable scabby fruit and defoliation resulting in sunscald'
  },

  'tomato_healthy': {
    id: 'tomato_healthy',
    fruit: 'tomato',
    fruitName: { en: 'Tomato', mr: 'टोमॅटो', hi: 'टमाटर' },
    diseaseName: { en: 'Healthy Tomato Plant & Fruit', mr: 'निरोगी टोमॅटो वनस्पती (रोगमुक्त)', hi: 'स्वस्थ टमाटर का पौधा (रोगमुक्त)' },
    pathogen: 'None (Healthy & Vigorous)',
    isHealthy: true,
    category: 'Healthy',
    severityDefault: 'None',
    symptoms: {
      en: ['Even forest-green color with dense turgid trichomes', 'No spots, mosaic mottling, or curling', 'Smooth firm red or green fruit without cracks'],
      mr: ['एकसारखा हिरवा रंग आणि टवटवीत पाने', 'कोणतेही ठिपके किंवा वाकडी झालेली पाने नाहीत', 'गुळगुळीत आणि टणक फळे'],
      hi: ['एकसमान गहरा हरा रंग और स्वस्थ पत्तियां', 'किसी भी प्रकार के धब्बों या सिकुड़न का अभाव', 'स्वस्थ, चमकदार फल']
    },
    organicTreatment: {
      en: ['Maintain beneficial mycorrhizae inoculants', 'Foliar humic acid and micro-nutrient sprays'],
      mr: ['मायकोरायझा आणि जिवाणू खतांचा वापर ठेवा', 'ह्युमिक ॲसिड आणि सूक्ष्म अन्नद्रव्ये फवारा'],
      hi: ['माइकोराइजा एवं सूक्ष्म पोषक तत्वों का छिड़काव जारी रखें']
    },
    chemicalTreatment: {
      en: ['No chemicals needed'],
      mr: ['कोणत्याही रासायनिक औषधांची गरज नाही'],
      hi: ['किसी रासायनिक कीटनाशक की आवश्यकता नहीं']
    },
    preventativeMeasures: {
      en: ['Clean trellising and continuous soil moisture management'],
      mr: ['योग्य आधार देणे व नियमित पाणी व्यवस्थापन'],
      hi: ['उचित सहारा एवं नमी का प्रबंधन']
    },
    favorableConditions: 'Optimal soil moisture, balanced NPK with sufficient calcium to prevent blossom end rot',
    economicImpact: 'Maximum yield and Grade-A packaging standard'
  },

  'citrus_greening': {
    id: 'citrus_greening',
    fruit: 'citrus',
    fruitName: { en: 'Citrus / Orange', mr: 'लिंबूवर्गीय / संत्रा', hi: 'नींबू वर्गीय / संतरा' },
    diseaseName: { en: 'Citrus Greening (Huanglongbing - HLB)', mr: 'संत्रा ग्रीनिंग रोग (हुआंगलाँगबिंग)', hi: 'सिट्रस ग्रीनिंग (हुआंगलोंगबिंग)' },
    pathogen: 'Candidatus Liberibacter asiaticus (Vectored by Asian Citrus Psyllid)',
    isHealthy: false,
    category: 'Bacterial',
    severityDefault: 'Severe',
    symptoms: {
      en: [
        'Asymmetrical blotchy leaf mottle crossing the primary leaf veins',
        'Yellow shoot discoloration ("yellow dragon") standing out in canopy',
        'Small, lopsided, bitter fruit that stays green at the blossom end with aborted dark seeds'
      ],
      mr: [
        'पानांच्या मुख्य शिरांच्या दोन्ही बाजूंना असमान पिवळे ठिपके व चट्टे (Blotchy mottle)',
        'झाडाचा एखादा शेंडा पूर्ण पिवळा पडणे ("यलो ड्रॅगन")',
        'फळे वेडीवाकडी, लहान आणि खालच्या बाजूला हिरवीच राहणे, फळ कडू होणे'
      ],
      hi: [
        'पत्तियों की मुख्य नसों के आर-पार असमान पीले धब्बे',
        'वृक्ष की कुछ शाखाओं का अचानक पूरी तरह पीला पड़ना',
        'फल छोटे, टेढ़े-मेढ़े और नीचे से हरे ही रहना एवं स्वाद कड़वा होना'
      ]
    },
    organicTreatment: {
      en: ['Systemic vector control: release Tamarixia radiata parasitoid wasps', 'Nutritional therapy sprays with zinc, manganese, boron to sustain vigor'],
      mr: ['सिट्रस सायलीड किडीचे नियंत्रण करा; टॅमारिक्सिया परोपजीवी कीटक सोडा', 'झिंक, मँगनीज, बोरॉन युक्त पोषण फवारणी'],
      hi: ['सिट्रस साइलिड कीट का जैविक नियंत्रण करें', 'जिंक, मैंगनीज और बोरॉन का पर्णीय छिड़काव']
    },
    chemicalTreatment: {
      en: ['Imidacloprid (17.8% SL) @ 0.5 mL/L or Thiamethoxam @ 0.3 g/L to kill psyllid vector', 'Oxytetracycline trunk injections where officially registered'],
      mr: ['इमिडाक्लोप्रिड (१७.८% SL) ०.५ मिली/लीटर किंवा थायामेथोक्साम सायलीड किडीच्या नियंत्रणासाठी', 'खोडामध्ये अँटीबायोटिक इंजेक्शन (नोंदणीकृत असल्यास)'],
      hi: ['इमिडाक्लोप्रिड (17.8% SL) @ 0.5 मिली/लीटर साइलिड कीट की रोकथाम हेतु', 'अनुशंसित एंटीबायोटिक उपचार']
    },
    preventativeMeasures: {
      en: ['Plant only certified disease-free nursery stock from screened houses', 'Scout and eliminate infected trees immediately to protect neighboring groves'],
      mr: ['प्रमाणित रोगमुक्त रोपवाटिकेतूनच रोपे घ्या', 'तीव्र बाधित झाडे उपटून नष्ट करा जेणेकरून इतर झाडे वाचतील'],
      hi: ['प्रमाणित नर्सरी से ही पौधे खरीदें', 'गंभीर संक्रमित पौधों को नष्ट करें']
    },
    favorableConditions: 'Warm climate (20–32°C) favoring Asian citrus psyllid reproduction and flush emergence',
    economicImpact: 'Devastating worldwide citrus disease causing decline and tree death within 3–5 years'
  },

  'citrus_healthy': {
    id: 'citrus_healthy',
    fruit: 'citrus',
    fruitName: { en: 'Citrus / Orange', mr: 'संत्रा / मोसंबी', hi: 'संतरा / मौसमी' },
    diseaseName: { en: 'Healthy Citrus Foliage & Fruit', mr: 'निरोगी संत्रा झाड (रोगमुक्त)', hi: 'स्वस्थ संतरा वृक्ष (रोगमुक्त)' },
    pathogen: 'None (Healthy & Productive)',
    isHealthy: true,
    category: 'Healthy',
    severityDefault: 'None',
    symptoms: {
      en: ['Glossy deep-green leaves with uniform winged petioles', 'Symmetrical bright orange or green rind with oil glands', 'No blotching or vein yellowing'],
      mr: ['चमकदार गडद हिरवी पाने व निरोगी देठ', 'समान आकाराची गुळगुळीत सुंदर संत्री/मोसंबी', 'कोणताही पिवळेपणा नाही'],
      hi: ['चमकदार हरी पत्तियां', 'सुडौल, बेदाग संतरे व फल', 'स्वस्थ वृक्ष']
    },
    organicTreatment: {
      en: ['Neem oil preventive sprays during flush periods', 'Composted manure and zinc sulfate balance'],
      mr: ['नवीन पालवीच्या वेळी निंबोळी अर्क फवारा', 'सेंद्रिय खत व झिंक सल्फेटचा वापर'],
      hi: ['नई पत्तियों के समय नीम तेल का छिड़काव', 'संतुलित खाद का प्रयोग']
    },
    chemicalTreatment: {
      en: ['No chemical intervention required'],
      mr: ['रासायनिक औषधांची गरज नाही'],
      hi: ['किसी रसायन की आवश्यकता नहीं']
    },
    preventativeMeasures: {
      en: ['Install yellow sticky traps to monitor psyllid populations'],
      mr: ['सायलीड किडीच्या देखरेखीसाठी पिवळे चिकट सापळे लावा'],
      hi: ['कीट निगरानी हेतु पीले चिपचिपे कार्ड लगाएं']
    },
    favorableConditions: 'Well-draining sandy loam soil, proper micronutrient balance, moderate humidity',
    economicImpact: 'High juice content and premium market price'
  },

  'banana_sigatoka': {
    id: 'banana_sigatoka',
    fruit: 'banana',
    fruitName: { en: 'Banana', mr: 'केळी', hi: 'केला' },
    diseaseName: { en: 'Banana Sigatoka (Black Leaf Streak)', mr: 'केळी सिगाटोका रोग (काळा करपा)', hi: 'केला सिगाटोका रोग (ब्लैक लीफ स्ट्रीक)' },
    pathogen: 'Pseudocercospora fijiensis / Mycosphaerella musicola',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Severe',
    symptoms: {
      en: [
        'Small narrow reddish-brown streaks parallel to leaf veins',
        'Streaks enlarge into dark brown to black elliptical spots with depressed grey centers',
        'Extensive leaf tissue burns causing premature bunch ripening and undersized fingers'
      ],
      mr: [
        'पानांच्या शिरांना समांतर लहान तांबूस-तपकिरी रेषा/पट्टे',
        'पट्टे मोठे होऊन लंबगोलाकार काळे डाग बनतात ज्यांचा मध्यभाग राखाडी खोलगट असतो',
        'पाने वेगाने जळून वाळतात ज्यामुळे केळीची घड अकाली पिकते व फळे लहान राहतात'
      ],
      hi: [
        'पत्तियों की नसों के समानांतर लाल-भूरे रंग की धारियां',
        'धारियां बढ़कर बीच में धंसी हुई भूरी-काली हो जाती हैं',
        'पत्तियां सूख जाती हैं जिससे केले के गुच्छे समय से पहले पक जाते हैं'
      ]
    },
    organicTreatment: {
      en: ['Deleafing: cut off and remove severely affected leaf strips weekly', 'Foliar sprays of mineral oil (1% emulsion) to inhibit ascospore germination'],
      mr: ['बाधित पानांचा भाग कापून बागेबाहेर नेऊन जाळा (Deleafing)', '१% मिनरल ऑईलची फवारणी करा'],
      hi: ['संक्रमित पत्तियों को काटकर अलग करें', '1% मिनरल ऑयल का छिड़काव करें']
    },
    chemicalTreatment: {
      en: ['Propiconazole (25% EC) @ 1.0 mL/L or Difenoconazole @ 0.5 mL/L rotated with Mancozeb @ 2.5 g/L', 'Mineral spray oil + systemic triazoles'],
      mr: ['प्रोपिकोनाझोल (२५% EC) १.० मिली/लीटर किंवा डायफेनोकोनाझोल ०.५ मिली/लीटर मँकोझेब सोबत आलटून-पालटून फवारा', 'बुरशीनाशक + मिनरल ऑईल मिश्रण'],
      hi: ['प्रोपिकोनाज़ोल (25% EC) @ 1.0 मिली/लीटर या मैनकोज़ेब @ 2.5 ग्राम/लीटर का छिड़काव', 'फफूंदनाशक का चक्रीय प्रयोग']
    },
    preventativeMeasures: {
      en: ['Ensure excellent plantation drainage to reduce standing water humidity', 'Optimum planting spacing (1.8m x 1.8m) to encourage canopy aeration'],
      mr: ['बागेत पाण्याचा निचरा उत्तम ठेवा जेणेकरून दमटपणा कमी होईल', 'हवा खेळती राहण्यासाठी योग्य अंतर ठेवा'],
      hi: ['उचित जल निकासी की व्यवस्था करें', 'पौधों के बीच पर्याप्त दूरी रखें']
    },
    favorableConditions: 'High rainfall, relative humidity >95%, and temperatures 26–28°C',
    economicImpact: 'Reduces export yield by 35–50% due to premature ripening during transit'
  },

  'banana_healthy': {
    id: 'banana_healthy',
    fruit: 'banana',
    fruitName: { en: 'Banana', mr: 'केळी', hi: 'केला' },
    diseaseName: { en: 'Healthy Banana Plant & Foliage', mr: 'निरोगी केळी बाग (रोगमुक्त)', hi: 'स्वस्थ केला पौधा (रोगमुक्त)' },
    pathogen: 'None (Healthy & Vigorous)',
    isHealthy: true,
    category: 'Healthy',
    severityDefault: 'None',
    symptoms: {
      en: ['Broad, deep emerald unblemished functional leaves', 'Clean sturdy pseudostem without vascular discoloration', 'Heavy uniform bunch architecture'],
      mr: ['लांब रुंद, चमकदार हिरवीगार पाने', 'मजबूत खोड आणि कोणतीही सड नाही', 'निरोगी आणि वजनदार केळीचा घड'],
      hi: ['चौड़ी, चमकदार हरी पत्तियां', 'मजबूत तना एवं स्वस्थ गुच्छा', 'रोगमुक्त पौधा']
    },
    organicTreatment: {
      en: ['Pseudomonas fluorescens root zone enrichment', 'Potash rich compost and bio-slurry fertigation'],
      mr: ['स्यूडोमोनास फ्लुरोसन्स जिवाणू जमिनीत द्या', 'पोटॅशयुक्त सेंद्रिय स्लरी व खतांचा वापर'],
      hi: ['स्यूडोमोनास एवं पोटाश युक्त जैविक खाद का प्रयोग']
    },
    chemicalTreatment: {
      en: ['No chemicals needed'],
      mr: ['रासायनिक औषधांची गरज नाही'],
      hi: ['किसी रसायन की आवश्यकता नहीं']
    },
    preventativeMeasures: {
      en: ['Propping bunches with bamboo poles to prevent lodging', 'Sucker desuckering management'],
      mr: ['घडांना बांबूचा आधार द्या', 'अनावश्यक पिळांची (सकर्स) वेळोवेळी छाटणी करा'],
      hi: ['गुच्छों को बांस का सहारा दें', 'अतिरिक्त कल्लें समय पर निकालें']
    },
    favorableConditions: 'Rich alluvial soil, warm subtropical temperatures, consistent moisture',
    economicImpact: 'High bunch weight (30–40 kg) and maximum market value'
  },

  'mango_anthracnose': {
    id: 'mango_anthracnose',
    fruit: 'mango',
    fruitName: { en: 'Mango', mr: 'आंबा', hi: 'आम' },
    diseaseName: { en: 'Mango Anthracnose', mr: 'आंबा करपा / अँथ्रॅकनोज रोग', hi: 'आम का एन्थ्रेक्नोज (काला धब्बा)' },
    pathogen: 'Colletotrichum gloeosporioides',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Small dark brown to black circular to angular spots on leaves that coalesce into large necrotic areas',
        'Blossom blight: flowers turn black and drop prematurely preventing fruit set',
        'Tear-stain streaks and sunken black circular decay on maturing mango fruit'
      ],
      mr: [
        'पानांवर लहान काळे-तपकिरी डाग जे एकत्र येऊन पाने करपतात',
        'मोहरावर काळे डाग पडून मोहर जळणे आणि फळधारणा न होणे',
        'फळांवर अश्रूंसारखे वाहणारे काळे डाग आणि सड पडणे'
      ],
      hi: [
        'पत्तियों पर छोटे काले-भूरे धब्बे जो आपस में मिलकर बड़े झुलसे हुए क्षेत्र बनाते हैं',
        'बौर (फूल) का काला पड़ना और झड़ जाना',
        'फलों पर काले धब्बे और सड़न पैदा होना'
      ]
    },
    organicTreatment: {
      en: ['Hot water treatment of harvested fruits (48°C for 15 minutes)', 'Spray copper oxychloride (3 g/L) before flowering', 'Bio-agent Trichoderma viride'],
      mr: ['काढणीनंतर फळांवर गरम पाण्याची प्रक्रिया (४८° से. १५ मिनिटे)', 'फुलोऱ्यापूर्वी कॉपर ऑक्सिक्लोराईड ३ ग्रॅम/लीटर फवारणी', 'ट्रायकोडर्मा व्हिरिडी वापरा'],
      hi: ['कटाई के बाद फलों का गर्म पानी से उपचार (48°C पर 15 मिनट)', 'फूल आने से पहले कॉपर ऑक्सीक्लोराइड का छिड़काव', 'ट्राइकोडर्मा का प्रयोग']
    },
    chemicalTreatment: {
      en: ['Azoxystrobin (23% SC) @ 1.0 mL/L or Carbendazim (50% WP) @ 1.0 g/L', 'Prochloraz or Tebuconazole @ 1.0 mL/L during panicle emergence'],
      mr: ['अझॉक्सीस्ट्रोबिन १.० मिली/लीटर किंवा कार्बेन्डाझिम १.० ग्रॅम/लीटर', 'टेबुकोनाझोल १.० मिली/लीटर मोहर फुटताना फवारा'],
      hi: ['एज़ोक्सीस्ट्रोबिन @ 1.0 मिली/लीटर या कार्बेन्डाजिम @ 1.0 ग्राम/लीटर', 'टेबुकोनाज़ोल का छिड़काव']
    },
    preventativeMeasures: {
      en: ['Prune dead twigs and open tree canopy to increase sunlight penetration', 'Collect and incinerate fallen infected leaves and blighted blossoms'],
      mr: ['वाळलेल्या फांद्यांची छाटणी करा व झाडात सूर्यप्रकाश खेळता ठेवा', 'खाली पडलेला करपलेला मोहर व पाने जाळून टाका'],
      hi: ['सूखी टहनियों की छंटाई करें', 'गिरे हुए संक्रमित फूलों और पत्तियों को जलाएं']
    },
    favorableConditions: 'High relative humidity (>95%) with frequent drizzle or mist during flowering at 22–30°C',
    economicImpact: 'Can cause 60–80% loss in blossom set and post-harvest fruit decay in transit'
  },

  'peach_bacterial_spot': {
    id: 'peach_bacterial_spot',
    fruit: 'peach',
    fruitName: { en: 'Peach', mr: 'पीच (सप्ताळू)', hi: 'आड़ू (पीच)' },
    diseaseName: { en: 'Peach Bacterial Spot', mr: 'पीच जिवाणूजन्य डाग (Bacterial Spot)', hi: 'आड़ू का जीवाणु धब्बा रोग' },
    pathogen: 'Xanthomonas arboricola pv. pruni',
    isHealthy: false,
    category: 'Bacterial',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Angular purple-brown spots on leaves with centers dropping out giving "shot-hole" effect',
        'Severe premature defoliation starting at leaf tips and margins',
        'Small dark water-soaked spots on peach fruit that crack deeply and exude gum'
      ],
      mr: [
        'पानांवर जांभळे-तपकिरी कोनात्मक डाग, डागांचा मध्यभाग गळून पानांना गोळ्या लागल्यासारखी छिद्रे (Shot-hole)',
        'पाने वेगाने गळणे',
        'फळांवर खोल काळे तडे जाऊन डिंक बाहेर येणे'
      ],
      hi: [
        'पत्तियों पर कोणीय धब्बे जिनका केंद्र गिरकर छलनी (शॉट-होल) जैसा दिखता है',
        'पत्तियों का तेजी से गिरना',
        'फलों पर गहरे दरारदार धब्बे जिनसे गोंद निकलता है'
      ]
    },
    organicTreatment: {
      en: ['Low-rate copper sulfate applications with hydrated lime throughout shuck split', 'Resistant rootstock scion pairing'],
      mr: ['कमी तीव्रतेचे कॉपर आणि चुन्याचे द्रावण फवारा', 'रोगप्रतिकारक वाण वापरा'],
      hi: ['हल्की मात्रा में कॉपर और चूने का छिड़काव', 'रोगरोधी किस्मों का उपयोग']
    },
    chemicalTreatment: {
      en: ['Oxytetracycline (Mycoshield) sprays during post-bloom', 'Streptocycline + Copper hydroxide programs'],
      mr: ['ऑक्सीटेट्रासायक्लिन किंवा स्ट्रेप्टोसायक्लिन + कॉपर फवारणी'],
      hi: ['ऑक्सीटेट्रासाइक्लिन या स्ट्रेप्टोसाइक्लिन का छिड़काव']
    },
    preventativeMeasures: {
      en: ['Avoid planting in light sandy soils prone to windblown sand abrasion', 'Plant windbreaks around the orchard perimeter'],
      mr: ['वारा रोखण्यासाठी बागेभोवती पवनरोधक झाडे लावा', 'झाडांना जखमा होऊ देऊ नका'],
      hi: ['बाग के चारों ओर वायुरोधी पेड़ लगाएं', 'पौधों को खरोंच से बचाएं']
    },
    favorableConditions: 'Warm, windy, wet spring weather with blowing sand particles damaging leaf cuticles',
    economicImpact: 'Causes extensive fruit pitting, culling, and reduced tree vigor'
  },

  'strawberry_leaf_scorch': {
    id: 'strawberry_leaf_scorch',
    fruit: 'strawberry',
    fruitName: { en: 'Strawberry', mr: 'स्ट्रॉबेरी', hi: 'स्ट्रॉबेरी' },
    diseaseName: { en: 'Strawberry Leaf Scorch', mr: 'स्ट्रॉबेरी लीफ स्कॉर्च (पान करपा)', hi: 'स्ट्रॉबेरी लीफ स्कॉर्च (पत्ता झुलसा)' },
    pathogen: 'Diplocarpon earlianum',
    isHealthy: false,
    category: 'Fungal',
    severityDefault: 'Moderate',
    symptoms: {
      en: [
        'Irregular dark purple to reddish-brown blotches on upper leaf surface',
        'No white center (unlike leaf spot); lesions coalesce giving scorched or burned leaf appearance',
        'Leaves curl upward at edges and dry out completely'
      ],
      mr: [
        'पानांच्या वरच्या बाजूला अनियमित गडद जांभळे ते तांबूस-तपकिरी चट्टे',
        'चट्टे एकत्र येऊन संपूर्ण पान आगीने जळाल्यासारखे दिसते (Scorch)',
        'पाने वरच्या बाजूला वाकतात आणि पूर्णपणे सुकतात'
      ],
      hi: [
        'पत्तियों पर अनियमित गहरे बैंगनी-भूरे धब्बे',
        'धब्बे मिलकर पूरी पत्ती को झुलसा हुआ रूप देते हैं',
        'पत्तियों के किनारे ऊपर मुड़ जाते हैं और पत्तियां सूख जाती हैं'
      ]
    },
    organicTreatment: {
      en: ['Bordeaux mixture (0.5%) before flowering', 'Remove and destroy old foliage after renovation'],
      mr: ['फुलोऱ्यापूर्वी बोर्डो मिश्रण (०.५%) फवारा', 'हंगामानंतर जुनी सुकलेली पाने जाळून टाका'],
      hi: ['फूल आने से पहले 0.5% बोर्डो मिश्रण का छिड़काव', 'पुरानी सूखी पत्तियों को नष्ट करें']
    },
    chemicalTreatment: {
      en: ['Captan (50% WP) @ 2.5 g/L or Thiophanate-methyl @ 1.5 g/L', 'Pyraclostrobin + Boscalid fungicide'],
      mr: ['कॅप्टन २.५ ग्रॅम/लीटर किंवा थायोफॅनेट-मिथाईल १.५ ग्रॅम/लीटर', 'पायराक्लोस्ट्रोबिन बुरशीनाशक'],
      hi: ['कैप्टन 2.5 ग्राम/लीटर या थियोफैनेट-मिथाइल 1.5 ग्राम/लीटर', 'पायराक्लोस्ट्रोबिन कवकनाशी']
    },
    preventativeMeasures: {
      en: ['Use raised plastic-mulched beds to avoid soil contact', 'Drip irrigation under plastic mulch'],
      mr: ['मल्चिंग पेपरवर गादीवाफ्यावर लागवड करा', 'मल्चिंग खाली ठिबक सिंचन वापरा'],
      hi: ['मल्चिंग पेपर पर उठी हुई क्यारियों में रोपण करें', 'ड्रिप सिंचाई का उपयोग करें']
    },
    favorableConditions: 'Extended leaf wetness, moderate temperatures (18–25°C), high planting density',
    economicImpact: 'Weakens plants, drastically reduces crown formation and following year yield'
  }
};
