import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  navHome: string;
  navDetect: string;
  navComparison: string;
  navHistory: string;
  navLibrary: string;
  navResearch: string;
  
  // Detection
  uploadTitle: string;
  uploadSubtitle: string;
  dragDropText: string;
  orChooseFile: string;
  browseFiles: string;
  useCamera: string;
  capturePhoto: string;
  switchCamera: string;
  closeCamera: string;
  selectModel: string;
  modelEfficientNetDesc: string;
  modelVitDesc: string;
  modelEnsembleDesc: string;
  runDiagnosisBtn: string;
  analyzingText: string;
  curatedSamplesTitle: string;
  curatedSamplesDesc: string;
  
  // Results
  diagnosisReport: string;
  predictedCondition: string;
  confidenceScore: string;
  healthStatus: string;
  statusHealthy: string;
  statusInfected: string;
  affectedArea: string;
  inferenceSpeed: string;
  explainableAITitle: string;
  gradcamTab: string;
  vitAttentionTab: string;
  overlayBlend: string;
  originalImage: string;
  heatmapOnly: string;
  topCandidates: string;
  clinicalProfile: string;
  symptomsTitle: string;
  chemicalManagement: string;
  organicManagement: string;
  preventionTitle: string;
  newScanBtn: string;
  saveReportBtn: string;
  
  // Comparison
  comparisonTitle: string;
  comparisonSubtitle: string;
  metricAccuracy: string;
  metricPrecision: string;
  metricRecall: string;
  metricF1: string;
  metricLatency: string;
  metricParams: string;
  metricFlops: string;
  confusionMatrixTitle: string;
  researchSummary: string;
  
  // History & Storage
  historyTitle: string;
  historySubtitle: string;
  totalScans: string;
  healthyCount: string;
  diseasedCount: string;
  clearHistory: string;
  exportCsv: string;
  noHistory: string;
  supabaseConnected: string;
  supabaseDisconnected: string;
  configureDatabase: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'Fruit Disease Detection & Classification System',
    appSubtitle: 'Deep Learning Diagnosis via EfficientNetB0 & Vision Transformer with Grad-CAM',
    navHome: 'Overview',
    navDetect: 'Disease Detection',
    navComparison: 'Model Benchmarks',
    navHistory: 'Scan History',
    navLibrary: 'Pathology Library',
    navResearch: 'Research Paper',
    
    uploadTitle: 'Diagnostic Specimen Input',
    uploadSubtitle: 'Upload or capture a high-resolution image of a fruit leaf or fruit specimen',
    dragDropText: 'Drop leaf/fruit image here, or browse',
    orChooseFile: 'Supports JPG, PNG, WEBP up to 25MB',
    browseFiles: 'Browse Files',
    useCamera: 'Open Camera',
    capturePhoto: 'Capture Frame',
    switchCamera: 'Switch Camera',
    closeCamera: 'Cancel Camera',
    selectModel: 'Inference Architecture',
    modelEfficientNetDesc: 'EfficientNetB0 (Transfer Learning - ConvNet Feature Saliency)',
    modelVitDesc: 'Vision Transformer ViT-B/16 (Self-Attention Patch Rollout)',
    modelEnsembleDesc: 'Comparative Dual-Model Ensemble (Cross-validation)',
    runDiagnosisBtn: 'Run Real-Time AI Diagnosis',
    analyzingText: 'Extracting features and computing Grad-CAM saliency...',
    curatedSamplesTitle: 'Verified Botanical Test Specimens',
    curatedSamplesDesc: 'Select an authentic field sample to test real inference immediately',
    
    diagnosisReport: 'Pathological Diagnostic Report',
    predictedCondition: 'Primary Diagnosis',
    confidenceScore: 'Model Confidence',
    healthStatus: 'Crop Health Status',
    statusHealthy: 'Healthy Specimen',
    statusInfected: 'Pathogen Detected',
    affectedArea: 'Affected Foliar Area',
    inferenceSpeed: 'Inference Latency',
    explainableAITitle: 'Explainable AI Visualization (XAI)',
    gradcamTab: 'EfficientNet Grad-CAM',
    vitAttentionTab: 'ViT Attention Rollout',
    overlayBlend: 'Heatmap Transparency Blend',
    originalImage: 'Original Specimen',
    heatmapOnly: 'Activation Saliency',
    topCandidates: 'Softmax Probability Distribution',
    clinicalProfile: 'Pathology & Agronomic Intervention',
    symptomsTitle: 'Diagnostic Visual Markers',
    chemicalManagement: 'Chemical Control (Targeted Fungicide / Bactericide)',
    organicManagement: 'Organic & Bio-Control Measures',
    preventionTitle: 'Agronomic Prevention Protocols',
    newScanBtn: 'Perform Another Scan',
    saveReportBtn: 'Export PDF / JSON Report',
    
    comparisonTitle: 'Comparative Experimental Evaluation',
    comparisonSubtitle: 'Empirical comparison between EfficientNetB0 and Vision Transformer on identical test splits',
    metricAccuracy: 'Top-1 Accuracy',
    metricPrecision: 'Macro Precision',
    metricRecall: 'Macro Recall',
    metricF1: 'Macro F1-Score',
    metricLatency: 'CPU Latency',
    metricParams: 'Parameter Count',
    metricFlops: 'Computational FLOPs',
    confusionMatrixTitle: 'Multi-Class Confusion Matrix',
    researchSummary: 'Academic Evaluation Analysis',
    
    historyTitle: 'Specimen Diagnostic Archive',
    historySubtitle: 'Persistent record of past diagnostic classifications and Grad-CAM explanations',
    totalScans: 'Total Specimens Analyzed',
    healthyCount: 'Healthy Samples',
    diseasedCount: 'Diseased Samples',
    clearHistory: 'Clear History',
    exportCsv: 'Export CSV',
    noHistory: 'No diagnostic scans recorded yet. Perform a scan in Disease Detection.',
    supabaseConnected: 'Supabase Cloud Sync Active',
    supabaseDisconnected: 'Local SQLite Storage Active (Supabase Optional)',
    configureDatabase: 'Database & Cloud Settings'
  },
  
  mr: {
    appName: 'फळ रोग निदान आणि वर्गीकरण प्रणाली',
    appSubtitle: 'एफिशियंटनेट-बी० आणि व्हिजन ट्रान्सफॉर्मर आधारित रिअल-टाइम एआय निदान व ग्रॅड-कॅम',
    navHome: 'मुख्य पृष्ठ',
    navDetect: 'रोग निदान',
    navComparison: 'मॉडेल तुलना',
    navHistory: 'निदान इतिहास',
    navLibrary: 'रोग ज्ञानकोश',
    navResearch: 'संशोधन अहवाल',
    
    uploadTitle: 'फळ किंवा पानाचा नमुना निवडा',
    uploadSubtitle: 'फळ किंवा फळाच्या पानाचा स्पष्ट फोटो अपलोड करा किंवा कॅमेऱ्याने काढा',
    dragDropText: 'येथे फोटो ड्रॅग करा किंवा फाइल निवडा',
    orChooseFile: 'JPG, PNG, WEBP (२५ MB पर्यंत)',
    browseFiles: 'फाइल निवडा',
    useCamera: 'कॅमेरा सुरू करा',
    capturePhoto: 'फोटो काढा',
    switchCamera: 'कॅमेरा बदला',
    closeCamera: 'कॅमेरा बंद करा',
    selectModel: 'एआय मॉडेल निवडा',
    modelEfficientNetDesc: 'एफिशियंटनेट बी० (ट्रान्सफर लर्निंग - कॉन्व्होल्यूशन मॉडेल)',
    modelVitDesc: 'व्हिजन ट्रान्सफॉर्मर ViT (सेल्फ-अटेंशन पॅच मॉडेल)',
    modelEnsembleDesc: 'दोन्ही मॉडेल्स एकत्रित तुलना (एन्सेम्बल)',
    runDiagnosisBtn: 'रिअल-टाइम एआय निदान सुरू करा',
    analyzingText: 'वैशिष्ट्ये विश्लेषण आणि ग्रॅड-कॅम हीटमॅप तयार होत आहे...',
    curatedSamplesTitle: 'चाचणीसाठी प्रमाणित शेतातील नमुने',
    curatedSamplesDesc: 'त्वरित अचूक चाचणीसाठी खालीलपैकी एक नमुना निवडा',
    
    diagnosisReport: 'रोग निदान अहवाल',
    predictedCondition: 'ओळखलेला रोग / स्थिती',
    confidenceScore: 'मॉडेल अचूकता विश्वास',
    healthStatus: 'आरोग्य स्थिती',
    statusHealthy: 'निरोगी नमुना',
    statusInfected: 'रोगग्रस्त नमुना आढळला',
    affectedArea: 'बाधित क्षेत्र प्रमाण',
    inferenceSpeed: 'प्रक्रियेचा वेळ',
    explainableAITitle: 'स्पष्टीकरणात्मक एआय (ग्रॅड-कॅम हीटमॅप)',
    gradcamTab: 'ग्रॅड-कॅम हीटमॅप',
    vitAttentionTab: 'व्हीआयटी अटेंशन मॅप',
    overlayBlend: 'हीटमॅप पारदर्शकता प्रमाण',
    originalImage: 'मूळ फोटो',
    heatmapOnly: 'हीटमॅप केवळ',
    topCandidates: 'संभाव्यता वितरण (Top-5)',
    clinicalProfile: 'रोग लक्षणे आणि उपाययोजना',
    symptomsTitle: 'रोगाची ठळक लक्षणे',
    chemicalManagement: 'रासायनिक कीटकनाशक / बुरशीनाशक उपाय',
    organicManagement: 'सेंद्रिय व जैविक उपाय',
    preventionTitle: 'प्रतिबंधात्मक शेती पद्धती',
    newScanBtn: 'नवीन नमुना तपासा',
    saveReportBtn: 'अहवाल डाउनलोड करा',
    
    comparisonTitle: 'प्रायोगिक मॉडेल कार्यप्रदर्शन तुलना',
    comparisonSubtitle: 'समान डेटासेटवर एफिशियंटनेट-बी० आणि व्हिजन ट्रान्सफॉर्मरची खरी आकडेवारी',
    metricAccuracy: 'अचूकता (Accuracy)',
    metricPrecision: 'प्रिसिजन (Precision)',
    metricRecall: 'रिकॉल (Recall)',
    metricF1: 'एफ१-स्कोर (F1-Score)',
    metricLatency: 'CPU प्रक्रिया वेळ',
    metricParams: 'पॅरामीटर्स संख्या',
    metricFlops: 'संगणकीय FLOPs',
    confusionMatrixTitle: 'कन्फ्यूजन मॅट्रिक्स (Confusion Matrix)',
    researchSummary: 'अकादमिक संशोधन निष्कर्ष',
    
    historyTitle: 'निदान इतिहास संग्रहण',
    historySubtitle: 'मागील सर्व नमुने, निदान आणि ग्रॅड-कॅम विश्लेषणाचा कायमस्वरूपी साठा',
    totalScans: 'एकूण तपासलेले नमुने',
    healthyCount: 'निरोगी नमुने',
    diseasedCount: 'रोगग्रस्त नमुने',
    clearHistory: 'इतिहास पुसा',
    exportCsv: 'CSV निर्यात करा',
    noHistory: 'अद्याप कोणतेही स्कॅन नोंदवलेले नाही. रोग निदान विभागात स्कॅन करा.',
    supabaseConnected: 'सुपाबेस क्लाउड सिंक सक्रिय',
    supabaseDisconnected: 'स्थानिक स्टोरेज सक्रिय (सुपाबेस पर्यायी)',
    configureDatabase: 'डेटाबेस व क्लाउड सेटिंग्ज'
  },
  
  hi: {
    appName: 'फल रोग पहचान एवं वर्गीकरण प्रणाली',
    appSubtitle: 'एफिशिएंटनेट-बी0 एवं विजन ट्रांसफॉर्मर द्वारा डीप लर्निंग रोग निदान और ग्रैड-कैम',
    navHome: 'मुख्य पृष्ठ',
    navDetect: 'रोग पहचान',
    navComparison: 'मॉडल तुलना',
    navHistory: 'निदान इतिहास',
    navLibrary: 'रोग ज्ञानकोश',
    navResearch: 'शोध पत्र',
    
    uploadTitle: 'फल या पत्ती का नमूना अपलोड करें',
    uploadSubtitle: 'फल या फल की पत्ती की उच्च-गुणवत्ता वाली तस्वीर अपलोड करें या कैमरे से खींचें',
    dragDropText: 'तस्वीर यहाँ खींचें या फाइल चुनें',
    orChooseFile: 'JPG, PNG, WEBP (25 MB तक)',
    browseFiles: 'फ़ाइल चुनें',
    useCamera: 'कैमरा खोलें',
    capturePhoto: 'तस्वीर खींचें',
    switchCamera: 'कैमरा बदलें',
    closeCamera: 'कैमरा बंद करें',
    selectModel: 'एआई मॉडल चुनें',
    modelEfficientNetDesc: 'एफिशिएंटनेट बी0 (ट्रांसफर लर्निंग - कन्वोल्यूशनल मॉडल)',
    modelVitDesc: 'विजन ट्रांसफॉर्मर ViT (सेल्फ-अटेंशन पैच मॉडल)',
    modelEnsembleDesc: 'संयुक्त तुलनात्मक मॉडल (एन्सेम्बल)',
    runDiagnosisBtn: 'रीयल-टाइम एआई निदान प्रारंभ करें',
    analyzingText: 'विशेषताओं का विश्लेषण एवं ग्रैड-कैम हीटमैप तैयार हो रहा है...',
    curatedSamplesTitle: 'सत्यापित परीक्षण नमूने',
    curatedSamplesDesc: 'त्वरित वास्तविक परीक्षण के लिए किसी एक नमूने का चयन करें',
    
    diagnosisReport: 'रोग निदान रिपोर्ट',
    predictedCondition: 'पहचाना गया रोग / स्थिति',
    confidenceScore: 'मॉडल विश्वास स्तर',
    healthStatus: 'स्वास्थ्य स्थिति',
    statusHealthy: 'स्वस्थ नमूना',
    statusInfected: 'रोगग्रस्त पाया गया',
    affectedArea: 'प्रभावित क्षेत्र अनुपात',
    inferenceSpeed: 'प्रक्रिया समय',
    explainableAITitle: 'व्याख्यात्मक एआई (ग्रैड-कैम हीटमैप)',
    gradcamTab: 'ग्रैड-कैम हीटमैप',
    vitAttentionTab: 'विज़न ट्रांसफॉर्मर अटेंशन',
    overlayBlend: 'हीटमैप पारदर्शिता नियंत्रण',
    originalImage: 'मूल तस्वीर',
    heatmapOnly: 'सक्रियता हीटमैप',
    topCandidates: 'संभाव्यता वितरण (Top-5)',
    clinicalProfile: 'रोग लक्षण एवं कृषि उपचार',
    symptomsTitle: 'पहचान योग्य मुख्य लक्षण',
    chemicalManagement: 'रासायनिक कीटनाशक / कवकनाशी प्रबंधन',
    organicManagement: 'जैविक एवं प्राकृतिक उपचार',
    preventionTitle: 'निवारक कृषि उपाय',
    newScanBtn: 'नया नमूना जांचें',
    saveReportBtn: 'रिपोर्ट डाउनलोड करें',
    
    comparisonTitle: 'प्रायोगिक मॉडल प्रदर्शन तुलना',
    comparisonSubtitle: 'समान डेटासेट पर एफिशिएंटनेट-बी0 एवं विज़न ट्रांसफॉर्मर का वास्तविक मूल्यांकन',
    metricAccuracy: 'सटीकता (Accuracy)',
    metricPrecision: 'प्रिसिजन (Precision)',
    metricRecall: 'रिकॉल (Recall)',
    metricF1: 'एफ1-स्कोर (F1-Score)',
    metricLatency: 'CPU प्रक्रिया समय',
    metricParams: 'पैरामीटर संख्या',
    metricFlops: 'कम्प्यूटेशनल FLOPs',
    confusionMatrixTitle: 'कन्फ्यूजन मैट्रिक्स (Confusion Matrix)',
    researchSummary: 'अकादमिक शोध निष्कर्ष',
    
    historyTitle: 'निदान इतिहास अभिलेखागार',
    historySubtitle: 'पूर्व में जाँचे गए नमूनों एवं ग्रैड-कैम हीटमैप का स्थायी संग्रह',
    totalScans: 'कुल विश्लेषित नमूने',
    healthyCount: 'स्वस्थ नमूने',
    diseasedCount: 'रोगग्रस्त नमूने',
    clearHistory: 'इतिहास साफ करें',
    exportCsv: 'CSV निर्यात करें',
    noHistory: 'अभी तक कोई स्कैन दर्ज नहीं किया गया है। रोग पहचान में जाकर जांचें।',
    supabaseConnected: 'सुपाबेस क्लाउड सिंक सक्रिय',
    supabaseDisconnected: 'स्थानीय डेटाबेस सक्रिय (सुपाबेस वैकल्पिक)',
    configureDatabase: 'डेटाबेस व क्लाउड सेटिंग्स'
  }
};
