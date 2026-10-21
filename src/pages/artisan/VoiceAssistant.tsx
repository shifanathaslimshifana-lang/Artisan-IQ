import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  CheckCircle2,
  Globe,
} from 'lucide-react';

interface VoiceQueryPrompt {
  text: string;
  lang: string;
  response: string;
  suggestedAction?: { screenId: string; label: string };
}

const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
];

const REGIONAL_SAMPLE_QUERIES: Record<LanguageCode, VoiceQueryPrompt[]> = {
  en: [
    {
      text: 'Suggest a price for my handmade terracotta pot.',
      lang: 'English',
      response:
        'Based on current raw silt costs (₹160) and 4.5 craft hours at ₹75/hr living wage, your suggested fair selling price is ₹850, yielding a 26.2% net livelihood margin.',
      suggestedAction: { screenId: 'artisan-pricing', label: 'Open Fair Pricing Calculator' },
    },
    {
      text: 'Where can I find affordable, lead-free red clay in Thanjavur?',
      lang: 'English',
      response:
        'Murugan Raw Minerals in Thiruvaiyaru has Master Grade triple-sieved Cauvery red silt at ₹32/kg with 2-day delivery to your workshop in Madurai.',
      suggestedAction: { screenId: 'artisan-materials', label: 'View Supplier Details' },
    },
    {
      text: 'What should I make next for the upcoming festival season?',
      lang: 'English',
      response:
        'Our market gap detector shows a 310% surge in demand for Unglazed Curd Setter Handis with steam-vented lids across Bengaluru and Hyderabad.',
      suggestedAction: { screenId: 'artisan-what-next', label: 'View Recommendation Plan' },
    },
  ],
  ta: [
    {
      text: 'எனது மண்பாண்டங்களுக்கு நியாயமான விலை என்ன?',
      lang: 'Tamil',
      response:
        'உங்கள் 4.5 மணி நேர உழைப்பு மற்றும் காவிரி களிமண் மூலப்பொருள் செலவைக் கணக்கிட்டால், ஒரு பானைக்கு ₹850 நியாயமான விலை ஆகும். இது உங்களுக்கு 26% நிலையான லாபத்தை வழங்கும்.',
      suggestedAction: { screenId: 'artisan-pricing', label: 'விலை கணக்கீட்டைப் பார்க்கவும்' },
    },
    {
      text: 'தஞ்சாவூரில் தூய காவிரி சிவப்பு களிமண் எங்கே கிடைக்கும்?',
      lang: 'Tamil',
      response:
        'திருவையாறில் உள்ள முருகன் கனிமங்கள் நிறுவனத்தில் காவிரி சிவப்பு வண்டல் மண் கிலோ ₹32க்கு கிடைக்கிறது. 2 நாட்களில் உங்கள் பட்டறைக்கு டெலிவரி செய்யப்படும்.',
      suggestedAction: { screenId: 'artisan-materials', label: 'விற்பனையாளர் விபரம்' },
    },
    {
      text: 'வரவிருக்கும் பண்டிகைக்கு நான் என்ன கைவினைப் பொருட்களை உருவாக்க வேண்டும்?',
      lang: 'Tamil',
      response:
        'பெங்களூரு மற்றும் ஹைதராபாத்தில் நீராவி துளையிட்ட தயிர் சட்டிக்கு 310% அதிக தேவை உள்ளது. 25 துண்டுகள் கொண்ட தொகுப்பை உருவாக்க பரிந்துரைக்கிறோம்.',
      suggestedAction: { screenId: 'artisan-what-next', label: 'பரிந்துரை திட்டத்தை காண்க' },
    },
  ],
  hi: [
    {
      text: 'मेरे हस्तनिर्मित मिट्टी के बर्तन के लिए उचित मूल्य क्या है?',
      lang: 'Hindi',
      response:
        '4.5 घंटे के शिल्प श्रम और कावेरी मिट्टी की लागत को ध्यान में रखते हुए, अनुशंसित उचित बिक्री मूल्य ₹850 है, जिससे 26.2% शुद्ध आजीविका मार्जिन मिलेगा।',
      suggestedAction: { screenId: 'artisan-pricing', label: 'उचित मूल्य कैलकुलेटर खोलें' },
    },
    {
      text: 'किफायती और शुद्ध लाल मिट्टी कहाँ मिल सकती है?',
      lang: 'Hindi',
      response:
        'थिरुवैयारु में मुरुगन रॉ मिनरल्स के पास ₹32/किग्रा पर कावेरी लाल मिट्टी उपलब्ध है, जो 2 दिनों में आपकी कार्यशाला में पहुंचा दी जाएगी।',
      suggestedAction: { screenId: 'artisan-materials', label: 'आपूर्तिकर्ता विवरण देखें' },
    },
    {
      text: 'आगामी त्योहारी सीजन के लिए मुझे आगे क्या बनाना चाहिए?',
      lang: 'Hindi',
      response:
        'बाजार विश्लेषण के अनुसार भाप-छिद्रित ढक्कन वाली दही हांडी की मांग में 310% की वृद्धि हुई है। हम 25 बर्तनों का बैच तैयार करने का सुझाव देते हैं।',
      suggestedAction: { screenId: 'artisan-what-next', label: 'सिफारिश योजना देखें' },
    },
  ],
  te: [
    {
      text: 'నా చేతితో తయారు చేసిన కుండకు సరసమైన ధర ఎంత?',
      lang: 'Telugu',
      response:
        'మీ 4.5 గంటల పని మరియు కావేరి మట్టి ఖర్చును లెక్కిస్తే, ప్రతి కుండకు ₹850 సరసమైన ధర. ఇది మీకు 26% స్థిరమైన నికర లాభాన్ని అందిస్తుంది.',
      suggestedAction: { screenId: 'artisan-pricing', label: 'ధర కాలిక్యులేటర్ తెరవండి' },
    },
    {
      text: 'నాణ్యమైన ఎర్ర మట్టి సరఫరాదారులను ఎక్కడ కనుగొనవచ్చు?',
      lang: 'Telugu',
      response:
        'తిరువయ్యారు లోని మురుగన్ రా మినరల్స్ వద్ద కిలో ₹32 చొప్పున కావేరి ఎర్ర మట్టి లభిస్తుంది. 2 రోజుల్లో మీ వర్క్‌షాప్‌కు డెలివరీ చేయబడుతుంది.',
      suggestedAction: { screenId: 'artisan-materials', label: 'సరఫరాదారు వివరాలు' },
    },
  ],
  kn: [
    {
      text: 'ನನ್ನ ಕೈಯಿಂದ ಮಾಡಿದ ಮಣ್ಣಿನ ಮಡಕೆಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆ ಎಷ್ಟು?',
      lang: 'Kannada',
      response:
        'ನಿಮ್ಮ 4.5 ಗಂಟೆಗಳ ಕರಕುಶಲ ಶ್ರಮ ಮತ್ತು ಕಾವೇರಿ ಮಣ್ಣಿನ ವೆಚ್ಚವನ್ನು ಪರಿಗಣಿಸಿದರೆ, ಪ್ರತಿ ಮಡಕೆಗೆ ₹850 ನ್ಯಾಯಯುತ ಬೆಲೆಯಾಗಿದೆ. ಇದು ನಿಮಗೆ 26% ಲಾಭವನ್ನು ನೀಡುತ್ತದೆ.',
      suggestedAction: { screenId: 'artisan-pricing', label: 'ಬೆಲೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ತೆರೆಯಿರಿ' },
    },
    {
      text: 'ಗುಣಮಟ್ಟದ ಕೆಂಪು ಜೇಡಿಮಣ್ಣು ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?',
      lang: 'Kannada',
      response:
        'ತಿರುವೈಯಾರುವಿನಲ್ಲಿರುವ ಮುರುಗನ್ ರಾ ಮಿನರಲ್ಸ್ ಕೆಜಿಗೆ ₹32 ದರದಲ್ಲಿ ಕಾವೇರಿ ಕೆಂಪು ಜೇಡಿಮಣ್ಣನ್ನು ಒದಗಿಸುತ್ತದೆ, ಇದು 2 ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಕಾರ್ಯಾಗಾರಕ್ಕೆ ತಲುಪುತ್ತದೆ.',
      suggestedAction: { screenId: 'artisan-materials', label: 'ಪೂರೈಕೆದಾರರ ವಿವರಗಳು' },
    },
  ],
  ml: [
    {
      text: 'എന്റെ കൈകൊണ്ട് നിർമ്മിച്ച മൺപാത്രത്തിന് ന്യായമായ വില എന്താണ്?',
      lang: 'Malayalam',
      response:
        'നിങ്ങളുടെ 4.5 മണിക്കൂർ കരകൗശല അധ്വാനവും കാവേരി കളിമൺ ചെലവും കണക്കാക്കിയാൽ, ഒരു കലം ₹850 ന്യായമായ വിലയാണ്. ഇത് നിങ്ങൾക്ക് 26% അറ്റാദായം നൽകും.',
      suggestedAction: { screenId: 'artisan-pricing', label: 'വില കാൽക്കുലേറ്റർ തുറക്കുക' },
    },
    {
      text: 'ഗുണനിലവാരമുള്ള ചുവന്ന കളിമണ്ണ് എവിടെ ലഭിക്കും?',
      lang: 'Malayalam',
      response:
        'തിരുവയ്യാറിലെ മുരുകൻ റോ മിനറൽസിൽ കാവേരി ചുവന്ന മണ്ണ് കിലോയ്ക്ക് ₹32 നിരക്കിൽ ലഭ്യമാണ്. 2 ദിവസത്തിനുള്ളിൽ നിങ്ങളുടെ വർക്ക്ഷോപ്പിൽ എത്തിക്കും.',
      suggestedAction: { screenId: 'artisan-materials', label: 'വിതരണക്കാരന്റെ വിവരങ്ങൾ' },
    },
  ],
};

export const VoiceAssistant: React.FC = () => {
  const { language, setLanguage, setActiveScreen, showToast, t } = useApp();
  const currentQueries = REGIONAL_SAMPLE_QUERIES[language] || REGIONAL_SAMPLE_QUERIES['en'];
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseText, setResponseText] = useState(currentQueries[0]?.response || '');
  const [activeAction, setActiveAction] = useState<{ screenId: string; label: string } | undefined>(
    currentQueries[0]?.suggestedAction
  );
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync default responses when user toggles language
  React.useEffect(() => {
    const queries = REGIONAL_SAMPLE_QUERIES[language] || REGIONAL_SAMPLE_QUERIES['en'];
    if (queries && queries.length > 0) {
      setResponseText(queries[0].response);
      setActiveAction(queries[0].suggestedAction);
      setTranscript('');
    }
  }, [language]);

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setTranscript(t('Listening to your voice...'));

    // Simulate voice capture and resolution
    setTimeout(() => {
      setIsListening(false);
      const query = currentQueries[0] || REGIONAL_SAMPLE_QUERIES['en'][0];
      setTranscript(query.text);
      setResponseText(query.response);
      setActiveAction(query.suggestedAction);
      speakResponse(query.response);
    }, 2400);
  };

  const handleQuerySelect = (query: VoiceQueryPrompt) => {
    setTranscript(query.text);
    setResponseText(query.response);
    setActiveAction(query.suggestedAction);
    speakResponse(query.response);
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langLocaleMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        ta: 'ta-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
      };
      utterance.lang = langLocaleMap[language] || 'en-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    // Check query match or default
    const matched = currentQueries.find((q) =>
      q.text.toLowerCase().includes(transcript.toLowerCase().substring(0, 8))
    ) || {
      text: transcript,
      lang: language,
      response: `AI Assistant: "${transcript}". Calculated regional demand score: 92/100.`,
      suggestedAction: { screenId: 'artisan-pricing', label: t('AI Fair Pricing Calculator') },
    };

    setResponseText(matched.response);
    setActiveAction(matched.suggestedAction);
    speakResponse(matched.response);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C76B45]" /> Voice-First Artisan Intelligence
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">
          {t('Speak in Your Regional Language')}
        </h1>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          No typing required. Traditional artisans can ask about pricing, raw materials, customer demand, and production planning hands-free.
        </p>

        {/* Regional Language Switcher Pill Strip */}
        <div className="pt-2 flex items-center justify-center gap-1.5 flex-wrap">
          <Globe className="w-4 h-4 text-neutral-400 mr-1" />
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                language === item.code
                  ? 'bg-black text-white shadow-xs font-bold'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Assistant Studio Card */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-md p-8 text-center space-y-6">
        {/* Big Mic Button */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-[#C76B45] opacity-25 animate-ping" />
            )}
            <button
              onClick={handleToggleListening}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isListening
                  ? 'bg-[#C76B45] text-white scale-105'
                  : 'bg-indigo-900 hover:bg-indigo-950 text-white'
              }`}
            >
              {isListening ? (
                <Mic className="w-10 h-10 animate-pulse text-amber-200" />
              ) : (
                <Mic className="w-10 h-10 text-amber-200" />
              )}
            </button>
          </div>

          <div className="mt-3">
            <span className="text-xs font-bold text-neutral-900 block">
              {isListening ? t('Listening to your voice...') : t('Tap Microphone to Speak')}
            </span>
            <span className="text-[11px] text-neutral-500">
              Supports Tamil, Hindi, Kannada, Telugu, Malayalam & English
            </span>
          </div>
        </div>

        {/* Live Audio / Transcribed Box */}
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-2">
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-semibold">
            <span>Recognized Speech / Query Input:</span>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-indigo-900 hover:underline flex items-center gap-1 font-bold"
              >
                <VolumeX className="w-3.5 h-3.5" /> Stop Voice
              </button>
            )}
          </div>
          <p className="text-sm font-medium text-neutral-900 min-h-[24px]">
            {transcript || 'e.g. "Suggest a price for my handmade terracotta pot."'}
          </p>
        </div>

        {/* Text Input Fallback */}
        <form onSubmit={handleSendText} className="flex gap-2">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Or type an artisan question here..."
            className="flex-1 text-xs p-2.5 border border-neutral-300 rounded-lg focus:ring-1 focus:ring-indigo-900"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t('Ask')}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Audio Response Card */}
        {responseText && (
          <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-xl text-left space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <span className="text-xs font-bold text-neutral-900">{t('AI Voice Assistant Response')}</span>
              </div>
              <button
                onClick={() => speakResponse(responseText)}
                className="text-xs text-orange-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                title="Play Audio"
              >
                <Volume2 className="w-4 h-4" /> {t('Listen Again')}
              </button>
            </div>

            <p className="text-xs text-neutral-800 leading-relaxed font-medium">
              {responseText}
            </p>

            {activeAction && (
              <div className="pt-2 border-t border-orange-100 flex items-center justify-end">
                <button
                  onClick={() => setActiveScreen(activeAction.screenId)}
                  className="px-3.5 py-1.5 bg-black hover:bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>{activeAction.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Common Voice Prompts */}
        <div className="text-left pt-2">
          <label className="text-xs font-bold text-neutral-700 block mb-2">
            {t('Try Sample Artisan Questions:')}
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuerySelect(q)}
                className="p-3 text-left bg-white hover:bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-700 transition-colors flex items-start gap-2 group"
              >
                <HelpCircle className="w-4 h-4 text-[#C76B45] shrink-0 mt-0.5" />
                <span className="group-hover:text-neutral-900 font-medium">{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
