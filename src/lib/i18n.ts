// Pre-generated translation dictionary for India's 6 official/widely spoken languages
// Supporting the hackathon requirement for Indian language accessibility without risking latency.

export type LanguageCode = "en" | "hi" | "mr" | "ta" | "bn" | "kn";

export interface LanguageInfo {
  code: LanguageCode;
  label: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", label: "Marathi", nativeName: "मराठी" },
  { code: "ta", label: "Tamil", nativeName: "தமிழ்" },
  { code: "bn", label: "Bengali", nativeName: "বাংলা" },
  { code: "kn", label: "Kannada", nativeName: "ಕನ್ನಡ" },
];

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Header & Nav
    header_tagline: "Government of India · Digital Census",
    header_title: "Census 2027",
    nav_overview: "Overview",
    nav_phases: "The Two Phases",
    nav_schedule: "State Schedule",
    nav_self_enum: "Self-Enumeration",
    nav_privacy: "Privacy & Myths",
    nav_data: "Census in Numbers",
    lang_select: "Language",

    // Home
    home_tagline: "India's first fully digital census. This is a working notice board for it — what's being collected, when, and how to complete your part.",
    home_phases_title: "The Two Phases",
    home_phases_desc: "What House Listing and Population Enumeration each collect.",
    home_schedule_title: "State Schedule",
    home_schedule_desc: "Self-enumeration and survey windows for your state.",
    home_enum_title: "Self-Enumeration",
    home_enum_desc: "Complete your household's record, guided step by step.",
    home_privacy_title: "Privacy & Myths",
    home_privacy_desc: "What is and isn't true about how your data is used.",
    home_data_title: "Census in Numbers",
    home_data_desc: "A look at self-enumeration progress across states.",

    // Form & Buttons
    btn_continue: "Continue",
    btn_back: "Back",
    btn_submit: "Submit",
    btn_submit_another: "Submit another household",
    enum_submitted_title: "Self-enumeration submitted",
    enum_intro: "Complete this form for your household. You can go back to any completed step to make changes before submitting.",
    
    // Privacy & Myths
    privacy_heading: "Privacy, Data Protection & Misinformation",
    privacy_subheading: "Your answers are legally sealed under Section 15 of the Census Act, 1948. Understand the safeguards and verify facts with our AI Assistant.",
    legal_badge: "Legal Protection",
    legal_title: "The Census Act, 1948 & DPDP Act, 2023",
    legal_p1: "Individual census data cannot be accessed by police, tax departments, courts, or commercial entities.",
    legal_p2: "Data is transmitted using 256-bit encryption directly to the sovereign Government of India Census Data Centre.",
    
    // ChatAssist
    chat_title: "Census 2027 AI Civic Assistant",
    chat_subtitle: "Ask questions about the census process, privacy guarantees, or verify common rumors.",
    chat_placeholder: "Ask anything about Census 2027 (e.g. 'Is Aadhaar mandatory?')...",
    chat_send: "Ask Assistant",
    chat_suggested: "Frequently Asked Questions & Rumor Verification",

    // Footer
    footer_text: "Built for PromptWars × ADYPU — hackathon submission. Not an official Government of India property.",
  },

  hi: {
    // Header & Nav
    header_tagline: "भारत सरकार · डिजिटल जनगणना",
    header_title: "जनगणना 2027",
    nav_overview: "अवलोकन",
    nav_phases: "दो चरण",
    nav_schedule: "राज्य अनुसूची",
    nav_self_enum: "स्व-गणना",
    nav_privacy: "गोपनीयता और भ्रांतियां",
    nav_data: "जनगणना के आंकड़े",
    lang_select: "भाषा",

    // Home
    home_tagline: "भारत की पहली पूर्णतः डिजिटल जनगणना। यह इसके लिए एक आधिकारिक सूचना-पट्ट है — क्या, कब और कैसे एकत्रित किया जा रहा है।",
    home_phases_title: "दो चरण",
    home_phases_desc: "मकान सूचीकरण और जनसंख्या गणना में क्या विवरण दर्ज होगा।",
    home_schedule_title: "राज्य अनुसूची",
    home_schedule_desc: "आपके राज्य के लिए स्व-गणना और सर्वेक्षण की तिथियां।",
    home_enum_title: "स्व-गणना",
    home_enum_desc: "अपने परिवार का विवरण चरण-दर-चरण स्वयं भरें।",
    home_privacy_title: "गोपनीयता और भ्रांतियां",
    home_privacy_desc: "आपके डेटा की सुरक्षा और अफवाहों का सच।",
    home_data_title: "जनगणना के आंकड़े",
    home_data_desc: "राज्यों में डिजिटल स्व-गणना की प्रगति।",

    // Form & Buttons
    btn_continue: "आगे बढ़ें",
    btn_back: "पीछे जाएं",
    btn_submit: "जमा करें",
    btn_submit_another: "अन्य परिवार का विवरण भरें",
    enum_submitted_title: "स्व-गणना सफलतापूर्वक जमा की गई",
    enum_intro: "अपने परिवार के लिए यह फॉर्म भरें। जमा करने से पहले आप किसी भी चरण में सुधार कर सकते हैं।",

    // Privacy & Myths
    privacy_heading: "गोपनीयता, डेटा सुरक्षा और भ्रांतियों का निवारण",
    privacy_subheading: "आपकी व्यक्तिगत जानकारी जनगणना अधिनियम, 1948 की धारा 15 के तहत पूरी तरह गोपनीय और सुरक्षित है।",
    legal_badge: "कानूनी सुरक्षा",
    legal_title: "जनगणना अधिनियम 1948 और DPDP अधिनियम 2023",
    legal_p1: "व्यक्तिगत जनगणना डेटा पुलिस, आयकर विभाग या किसी भी न्यायालय के लिए अप्रवेश्य है।",
    legal_p2: "डेटा 256-बिट एन्क्रिप्शन के साथ सीधे भारत सरकार के सुरक्षित डेटा सेंटर में भेजा जाता है।",

    // ChatAssist
    chat_title: "जनगणना 2027 एआई नागरिक सहायक",
    chat_subtitle: "जनगणना प्रक्रिया, गोपनीयता नियमों या अफवाहों की पुष्टि के लिए प्रश्न पूछें।",
    chat_placeholder: "जनगणना 2027 के बारे में पूछें (उदा. 'क्या आधार अनिवार्य है?')...",
    chat_send: "पूछें",
    chat_suggested: "अक्सर पूछे जाने वाले प्रश्न और अफवाहों का सच",

    // Footer
    footer_text: "PromptWars × ADYPU के लिए विकसित। भारत सरकार की आधिकारिक वेबसाइट नहीं है।",
  },

  mr: {
    // Header & Nav
    header_tagline: "भारत सरकार · डिजिटल जनगणना",
    header_title: "जनगणना २०२७",
    nav_overview: "आढावा",
    nav_phases: "दोन टप्पे",
    nav_schedule: "राज्य वेळापत्रक",
    nav_self_enum: "स्वयं-नोंदणी",
    nav_privacy: "गोपनीयता आणि समज-गैरसमज",
    nav_data: "जनगणना आकडेवारी",
    lang_select: "भाषा",

    // Home
    home_tagline: "भारताची पहिली संपूर्ण डिजिटल जनगणना. काय गोळा केले जात आहे, केव्हा आणि कसा सहभाग घ्यायचा याची माहिती.",
    home_phases_title: "दोन टप्पे",
    home_phases_desc: "घर यादी आणि लोकसंख्या मोजणी यातील माहिती.",
    home_schedule_title: "राज्य वेळापत्रक",
    home_schedule_desc: "तुमच्या राज्यासाठी स्वयं-नोंदणी आणि सर्वेक्षणाच्या तारखा.",
    home_enum_title: "स्वयं-नोंदणी",
    home_enum_desc: "तुमच्या कुटुंबाची माहिती टप्प्याटप्प्याने ऑनलाइन भरा.",
    home_privacy_title: "गोपनीयता आणि गैरसमज",
    home_privacy_desc: "डेटा सुरक्षा आणि अफवांचे निवारण.",
    home_data_title: "जनगणना आकडेवारी",
    home_data_desc: "राज्यांमधील स्वयं-नोंदणी प्रगती.",

    // Form & Buttons
    btn_continue: "पुढे जा",
    btn_back: "मागे जा",
    btn_submit: "सादर करा",
    btn_submit_another: "दुसऱ्या कुटुंबाची नोंदणी करा",
    enum_submitted_title: "स्वयं-नोंदणी यशस्वीरीत्या सादर केली",
    enum_intro: "तुमच्या कुटुंबासाठी हा अर्ज पूर्ण करा. सबमिट करण्यापूर्वी तुम्ही कोणत्याही टप्प्यात बदल करू शकता.",

    // Privacy & Myths
    privacy_heading: "गोपनीयता, डेटा संरक्षण आणि गैरसमज निवारण",
    privacy_subheading: "जनगणना कायदा १९४८ च्या कलम १५ अन्वये तुमची माहिती पूर्णतः गोपनीय आहे.",
    legal_badge: "कायदेशीर संरक्षण",
    legal_title: "जनगणना कायदा १९४८ आणि DPDP कायदा २०२३",
    legal_p1: "वैयक्तिक डेटा पोलीस किंवा आयकर विभागासह कोणाशीही सामायिक केला जात नाही.",
    legal_p2: "२५६-बिट एन्क्रिप्शनद्वारे डेटा थेट सुरक्षित डेटा केंद्रात पाठवला जातो.",

    // ChatAssist
    chat_title: "जनगणना २०२७ एआय सहाय्यक",
    chat_subtitle: "जनगणना प्रक्रियेबद्दल किंवा अफवांविषयी पडताळणी करण्यासाठी विचारा.",
    chat_placeholder: "काहीही विचारा (उदा. 'आधार अनिवार्य आहे का?')...",
    chat_send: "विचारा",
    chat_suggested: "वारंवार विचारले जाणारे प्रश्न आणि अफवांचे सत्य",

    // Footer
    footer_text: "PromptWars × ADYPU हॅकॅथॉनसाठी निर्मित. भारत सरकारची अधिकृत मालमत्ता नाही.",
  },

  ta: {
    // Header & Nav
    header_tagline: "இந்திய அரசு · டிஜிட்டல் மக்கள் தொகை கணக்கெடுப்பு",
    header_title: "சென்சஸ் 2027",
    nav_overview: "கண்ணோட்டம்",
    nav_phases: "இரு கட்டங்கள்",
    nav_schedule: "மாநில அட்டவணை",
    nav_self_enum: "சுய-கணக்கெடுப்பு",
    nav_privacy: "தனியுரிமை & வதந்திகள்",
    nav_data: "புள்ளிவிவரங்கள்",
    lang_select: "மொழி",

    // Home
    home_tagline: "இந்தியாவின் முதல் முழு டிஜிட்டல் மக்கள் தொகை கணக்கெடுப்பு அறிவிப்பு பலகை.",
    home_phases_title: "இரு கட்டங்கள்",
    home_phases_desc: "வீட்டுப் பட்டியல் மற்றும் மக்கள் தொகை விவரங்கள்.",
    home_schedule_title: "மாநில அட்டவணை",
    home_schedule_desc: "உங்கள் மாநிலத்திற்கான தேதிகள்.",
    home_enum_title: "சுய-கணக்கெடுப்பு",
    home_enum_desc: "உங்கள் குடும்ப விவரங்களை ஆன்லைனில் பதிவு செய்யுங்கள்.",
    home_privacy_title: "தனியுரிமை & வதந்திகள்",
    home_privacy_desc: "உங்கள் தரவு பாதுகாப்பு மற்றும் உண்மைகள்.",
    home_data_title: "புள்ளிவிவரங்கள்",
    home_data_desc: "மாநில வாரியான முன்னேற்றம்.",

    // Form & Buttons
    btn_continue: "தொடரவும்",
    btn_back: "பின்னே செல்",
    btn_submit: "சமர்ப்பிக்கவும்",
    btn_submit_another: "மற்றொரு குடும்பத்தை சமர்ப்பிக்கவும்",
    enum_submitted_title: "சுய-கணக்கெடுப்பு சமர்ப்பிக்கப்பட்டது",
    enum_intro: "உங்கள் குடும்பத்திற்கான படிவத்தை பூர்த்தி செய்யவும்.",

    // Privacy & Myths
    privacy_heading: "தனியுரிமை, தரவு பாதுகாப்பு மற்றும் வதந்திகள் தீர்வு",
    privacy_subheading: "மக்கள் தொகை கணக்கெடுப்பு சட்டம் 1948 பிரிவு 15 இன் கீழ் உங்கள் விவரங்கள் பாதுகாக்கப்படுகின்றன.",
    legal_badge: "சட்டப் பாதுகாப்பு",
    legal_title: "சென்சஸ் சட்டம் 1948 & DPDP சட்டம் 2023",
    legal_p1: "தனிநபர் விவரங்கள் வருமான வரி அல்லது காவல்துறைக்கு பகிரப்படாது.",
    legal_p2: "256-பிட் குறியாக்கத்துடன் பாதுகாப்பாக அனுப்பப்படுகிறது.",

    // ChatAssist
    chat_title: "சென்சஸ் 2027 AI குடிமக்கள் உதவியாளர்",
    chat_subtitle: "சந்தேகங்கள் மற்றும் வதந்திகள் குறித்து கேளுங்கள்.",
    chat_placeholder: "கேள்வி கேட்கவும் (எ.கா. 'ஆதார் கட்டாயமா?')...",
    chat_send: "கேட்கவும்",
    chat_suggested: "அடிக்கடி கேட்கப்படும் கேள்விகள்",

    // Footer
    footer_text: "PromptWars × ADYPU க்காக உருவாக்கப்பட்டது. அதிகாரப்பூர்வ அரசு தளம் அல்ல.",
  },

  bn: {
    // Header & Nav
    header_tagline: "ভারত সরকার · ডিজিটাল আদমশুমারি",
    header_title: "আদমশুমারি ২০২৭",
    nav_overview: "সংক্ষিপ্ত বিবরণ",
    nav_phases: "দুটি পর্যায়",
    nav_schedule: "রাজ্য সময়সূচী",
    nav_self_enum: "স্ব-গণনা",
    nav_privacy: "গোপনীয়তা ও তথ্য",
    nav_data: "পরিসংখ্যান",
    lang_select: "ভাষা",

    // Home
    home_tagline: "ভারতের প্রথম সম্পূর্ণ ডিজিটাল আদমশুমারি নোটিশ বোর্ড।",
    home_phases_title: "দুটি পর্যায়",
    home_phases_desc: "বাড়ি তালিকাভুক্তি এবং জনসংখ্যা গণনা।",
    home_schedule_title: "রাজ্য সময়সূচী",
    home_schedule_desc: "আপনার রাজ্যের জন্য নির্ধারিত তারিখ।",
    home_enum_title: "স্ব-গণনা",
    home_enum_desc: "আপনার পরিবারের তথ্য অনলাইন পূরণ করুন।",
    home_privacy_title: "গোপনীয়তা ও তথ্য",
    home_privacy_desc: "আপনার তথ্যের সুরক্ষা এবং সত্যতা।",
    home_data_title: "পরিসংখ্যান",
    home_data_desc: "রাজ্যভিত্তিক স্ব-গণনার অগ্রগতি।",

    // Form & Buttons
    btn_continue: "এগিয়ে যান",
    btn_back: "পেছনে যান",
    btn_submit: "জমা দিন",
    btn_submit_another: "অন্য পরিবারের তথ্য জমা দিন",
    enum_submitted_title: "স্ব-গণনা সফলভাবে জমা হয়েছে",
    enum_intro: "আপনার পরিবারের জন্য এই ফর্মটি পূরণ করুন।",

    // Privacy & Myths
    privacy_heading: "গোপনীয়তা, ডেটা সুরক্ষা এবং বিভ্রান্তি নিরসন",
    privacy_subheading: "আদমশুমারি আইন ১৯৪৮-এর ধারা ১৫ অনুযায়ী আপনার তথ্য সম্পূর্ণরূপে গোপনীয়।",
    legal_badge: "আইনি সুরক্ষা",
    legal_title: "আদমশুমারি আইন ১৯৪৮ ও DPDP আইন ২০২৩",
    legal_p1: "ব্যক্তিগত তথ্য কোনো কর্তৃপক্ষ বা আদালতে প্রমাণ হিসেবে ব্যবহারযোগ্য নয়।",
    legal_p2: "২৫৬-বিট এনক্রিপশনের মাধ্যমে তথ্য সরাসরি ডেটা সেন্টারে পৌঁছায়।",

    // ChatAssist
    chat_title: "আদমশুমারি ২০২৭ এআই সহায়ক",
    chat_subtitle: "যে কোনো প্রশ্ন বা গুজবের সত্যতা যাচাই করতে জিজ্ঞাসা করুন।",
    chat_placeholder: "প্রশ্ন জিজ্ঞাসা করুন (যেমন 'আধার কি বাধ্যতামূলক?')...",
    chat_send: "জিজ্ঞাসা করুন",
    chat_suggested: "সাধারণ প্রশ্নাবলী ও গুজবের সত্যতা",

    // Footer
    footer_text: "PromptWars × ADYPU হ্যাকাথনের জন্য নির্মিত। ভারত সরকারের প্রাতিষ্ঠানিক সাইট নয়।",
  },

  kn: {
    // Header & Nav
    header_tagline: "ಭಾರತ ಸರ್ಕಾರ · ಡಿಜಿಟಲ್ ಜನಗಣತಿ",
    header_title: "ಜನಗಣತಿ 2027",
    nav_overview: "ಅವಲೋಕನ",
    nav_phases: "ಎರಡು ಹಂತಗಳು",
    nav_schedule: "ರಾಜ್ಯ ವೇಳಾಪಟ್ಟಿ",
    nav_self_enum: "ಸ್ವಯಂ-ಗಣತಿ",
    nav_privacy: "ಗೌಪ್ಯತೆ ಮತ್ತು ಸತ್ಯಾಸತ್ಯತೆ",
    nav_data: "ಜನಗಣತಿ ಅಂಕಿಅಂಶಗಳು",
    lang_select: "ಭಾಷೆ",

    // Home
    home_tagline: "ಭಾರತದ ಮೊದಲ ಸಂಪೂರ್ಣ ಡಿಜಿಟಲ್ ಜನಗಣತಿಯ ಅಧಿಕೃತ ಮಾಹಿತಿ ಫಲಕ.",
    home_phases_title: "ಎರಡು ಹಂತಗಳು",
    home_phases_desc: "ಮನೆ ಪಟ್ಟಿ ಮತ್ತು ಜನಸಂಖ್ಯಾ ಗಣತಿಯ ವಿವರಗಳು.",
    home_schedule_title: "ರಾಜ್ಯ ವೇಳಾಪಟ್ಟಿ",
    home_schedule_desc: "ನಿಮ್ಮ ರಾಜ್ಯದ ಜನಗಣತಿ ದಿನಾಂಕಗಳು.",
    home_enum_title: "ಸ್ವಯಂ-ಗಣತಿ",
    home_enum_desc: "ನಿಮ್ಮ ಕುಟುಂಬದ ವಿವರಗಳನ್ನು ಹಂತ ಹಂತವಾಗಿ ಭರ್ತಿ ಮಾಡಿ.",
    home_privacy_title: "ಗೌಪ್ಯತೆ ಮತ್ತು ಸತ್ಯಾಸತ್ಯತೆ",
    home_privacy_desc: "ಮಾಹಿತಿ ರಕ್ಷಣೆ ಮತ್ತು ವದಂತಿಗಳ ನಿವಾರಣೆ.",
    home_data_title: "ಜನಗಣತಿ ಅಂಕಿಅಂಶಗಳು",
    home_data_desc: "ರಾಜ್ಯವಾರು ಸ್ವಯಂ-ಗಣತಿ ಪ್ರಗತಿ.",

    // Form & Buttons
    btn_continue: "ಮುಂದುವರಿಯಿರಿ",
    btn_back: "ಹಿಂದೆ",
    btn_submit: "ಸಲ್ಲಿಸಿ",
    btn_submit_another: "ಮತ್ತೊಂದು ಕುಟುಂಬವನ್ನು ನೋಂದಾಯಿಸಿ",
    enum_submitted_title: "ಸ್ವಯಂ-ಗಣತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    enum_intro: "ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕಾಗಿ ಈ ಫಾರ್ಮ್ ಅನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.",

    // Privacy & Myths
    privacy_heading: "ಗೌಪ್ಯತೆ, ಡೇಟಾ ರಕ್ಷಣೆ ಮತ್ತು ವದಂತಿಗಳ ಸತ್ಯ",
    privacy_subheading: "ಜನಗಣತಿ ಕಾಯ್ದೆ 1948 ರ ಸೆಕ್ಷನ್ 15 ರ ಅಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಮಾಹಿತಿ ಸಂಪೂರ್ಣ ರಕ್ಷಿತವಾಗಿದೆ.",
    legal_badge: "ಕಾನೂನು ರಕ್ಷಣೆ",
    legal_title: "ಜನಗಣತಿ ಕಾಯ್ದೆ 1948 ಮತ್ತು DPDP ಕಾಯ್ದೆ 2023",
    legal_p1: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಆದಾಯ ತೆರಿಗೆ ಅಥವಾ ಪೊಲೀಸರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ.",
    legal_p2: "256-ಬಿಟ್ ಎನ್‌ಕ್ರಿಪ್ಶನ್ ಮೂಲಕ ಡೇಟಾವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ರವಾನಿಸಲಾಗುತ್ತದೆ.",

    // ChatAssist
    chat_title: "ಜನಗಣತಿ 2027 AI ಸಹಾಯಕ",
    chat_subtitle: "ಜನಗಣತಿ ಪ್ರಕ್ರಿಯೆ ಅಥವಾ ವದಂತಿಗಳ ಪರಿಶೀಲನೆಗೆ ಪ್ರಶ್ನಿಸಿ.",
    chat_placeholder: "ಪ್ರಶ್ನೆ ಕೇಳಿ (ಉದಾ: 'ಆಧಾರ್ ಕಡ್ಡಾಯವೇ?')...",
    chat_send: "ಕೇಳಿ",
    chat_suggested: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಸತ್ಯ ಸಂಗತಿಗಳು",

    // Footer
    footer_text: "PromptWars × ADYPU ಗಾಗಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ. ಭಾರತ ಸರ್ಕಾರದ ಅಧಿಕೃತ ತಾಣವಲ್ಲ.",
  },
};

export function t(key: string, lang: LanguageCode = "en"): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}

export const stringCache = translations;
