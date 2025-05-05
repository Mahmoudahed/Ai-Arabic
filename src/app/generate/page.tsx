'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateContent } from '@/lib/gemini';
import toast from 'react-hot-toast';

// المجالات، الأهداف، اللهجات، اللغات
const domains = [
  'مطعم', 'مقهى', 'متجر إلكتروني', 'مدرسة', 'جامعة', 'روضة أطفال',
  'عيادة أسنان', 'عيادة تجميل', 'صيدلية', 'مستشفى', 'مركز صحي',
  'شركة تقنية', 'مكتب محاماة', 'مكتب هندسي', 'مركز تدريب',
  'صالة رياضية', 'استوديو تصوير', 'مكتب سياحة وسفر', 'مكتب عقاري',
  'مغسلة سيارات', 'مخبز', 'محل ملابس', 'محل أحذية', 'محل إكسسوارات',
  'محل مجوهرات', 'مكتبة أدوات مكتبية', 'مكتبة كتب', 'شركة تأمين',
  'شركة شحن', 'شركة تسويق', 'شركة استشارات', 'شركة مالية',
  'شركة تصميم داخلي', 'شركة مقاولات', 'محل أجهزة كهربائية',
  'محل هواتف', 'محل حيوانات أليفة', 'مزرعة', 'مدونة شخصية',
  'قناة يوتيوب', 'بودكاست', 'حساب انستغرام', 'مركز لغات',
  'أكاديمية تدريب أونلاين', 'منصة تعليمية', 'منتج رقمي',
  'برنامج أو تطبيق', 'خدمة اشتراك', 'منصة إخبارية', 'جريدة إلكترونية',
  'حساب تيك توك', 'منظمة خيرية', 'جمعية تطوعية', 'فعالية أو مهرجان',
  'مهرجان فني', 'ملتقى ثقافي', 'معرض كتاب', 'منتج غذائي',
  'مشروب صحي', 'مكملات غذائية', 'منتجات عناية بالبشرة', 'عطور',
  'خدمة تصوير', 'خدمة تصميم', 'خدمة مونتاج', 'خدمة كتابة محتوى',
  'خدمة استضافة', 'خدمة برمجة', 'خدمة دعم فني', 'خدمة تسويق رقمي',
  'خدمة استشارات أعمال', 'مؤسسة حكومية', 'بلدية', 'مكتبة عامة',
  'نادي رياضي', 'فريق كرة قدم', 'فريق إلكتروني', 'لعبة إلكترونية',
  'مبادرة مجتمعية', 'مؤتمر', 'حفل تخرج', 'مدرس خصوصي', 'مطور تطبيقات',
  'كاتب مستقل', 'رسام رقمي', 'مصمم جرافيك', 'محرر فيديو',
  'مغني مستقل', 'فنان تشكيلي', 'مؤثر سوشيال ميديا', 'مدير مشاريع',
  'فريق تطوعي', 'مخبز حلويات', 'مزرعة نحل', 'مزرعة عضوية',
  'صالون حلاقة رجالي', 'صالون نسائي', 'خياطة', 'مصنع صغير',
  'ورشة نجارة', 'مطبعة', 'مغسلة ملابس', 'سوبرماركت', 'بقالة',
  'شركة أمن وسلامة', 'محل دراجات هوائية', 'كافيه متنقل', 'كوش أفراح',
  'تنسيق حدائق', 'تأجير سيارات', 'أستوديو موسيقى', 'راديو إنترنتي'
];


// أكثر من 100 هدف (أمثلة فقط - يمكنك تعديلها لاحقًا)
const objectives = [
  'زيادة التفاعل', 'زيادة عدد المتابعين', 'تحقيق مبيعات',
  'جذب عملاء جدد', 'الترويج لخدمة جديدة', 'الترويج لمنتج جديد',
  'بناء هوية العلامة التجارية', 'زيادة الوعي بالعلامة', 'تحفيز الجمهور',
  'التسويق بالمحتوى', 'تحسين محركات البحث', 'الحصول على تقييمات',
  'إعادة استهداف العملاء السابقين', 'تشجيع الطلب المسبق',
  'زيادة الحجز المسبق', 'نشر معلومات تعليمية', 'نشر محتوى ترفيهي',
  'تحسين ولاء العملاء', 'تشجيع التفاعل مع المنشور', 'تحفيز المشاركة',
  'طلب رأي الجمهور', 'تشجيع الحضور لفعالية', 'زيادة تحميلات التطبيق',
  'نشر مراجعات العملاء', 'نشر قصص نجاح', 'نشر معلومات طبية',
  'نشر وصفات طعام', 'نشر تمارين رياضية', 'تعليم مهارة',
  'نشر نصائح في المجال', 'نشر إحصائيات', 'التسويق عبر قصص المستخدمين',
  'تشجيع مشاركة الجمهور', 'نشر إعلانات توظيف', 'نشر فرص تدريبية',
  'نشر منتجات مميزة', 'تغطية حدث مباشر', 'توعية حول مشكلة اجتماعية',
  'التشجيع على التبرع', 'الترويج لمبادرة', 'جذب داعمين', 'بناء مجتمع',
  'خلق حوار', 'تشجيع التفاعل في التعليقات', 'طلب تجربة المنتج',
  'تحفيز الاشتراك في النشرة البريدية', 'نشر محتوى تعليمي مبسط',
  'التثقيف المالي', 'تشجيع على الحجز', 'نشر أوقات العمل',
  'شرح ميزة جديدة', 'تسليط الضوء على موظف', 'نشر خلف الكواليس',
  'إبراز قيم المؤسسة', 'نشر عرض خاص', 'إعلان خصم', 'نشر محتوى رمضاني',
  'محتوى خاص بالأعياد', 'محتوى موسمي', 'تشجيع التفاعل في الاستوري',
  'زيادة وقت المشاهدة', 'رفع نسبة الوصول', 'تشجيع الحفظ والمشاركة',
  'بناء ثقة', 'نشر تجارب واقعية', 'نشر حالات قبل وبعد',
  'تسويق بالقصص', 'بناء توقع وتشويق', 'إطلاق منتج قادم',
  'كسر الروتين', 'نشر تحدي أو مسابقة', 'استعراض منتج', 'تجربة مستخدم',
  'شرح طريقة استخدام', 'تحفيز الانضمام لخدمة', 'التعريف بالشركة',
  'شرح خدمة معينة', 'تقديم هدية مجانية', 'زيادة التحويلات',
  'تقوية العلاقة مع الجمهور', 'تشجيع المراجعة والتقييم', 'حملة توعية',
  'التأكيد على جودة المنتج', 'عرض شهادات العملاء', 'إعلان فتح فرع جديد',
  'إطلاق موقع إلكتروني جديد', 'إطلاق تطبيق', 'إعلان عن شراكة',
  'تأكيد الالتزام بالمعايير', 'شرح سياسة الاسترجاع',
  'شرح سياسة الخصوصية', 'نشر قصص إنسانية', 'دعم فئة معينة',
  'تسليط الضوء على نشاط اجتماعي', 'مواكبة ترند', 'إعادة نشر محتوى سابق',
  'طلب محتوى من الجمهور', 'نشر خطة أسبوعية', 'التفاعل مع المناسبات',
  'إعلان عن بث مباشر', 'الترويج لدورة تعليمية', 'تحفيز للحجز الفوري',
  'طلب تقييم الخدمة', 'شرح الفرق بين الباقات', 'عرض باقة جديدة'
];


// اللهجات العربية
const dialects = [
  'العربية الفصحى',
  'المصرية',
  'الخليجية',
  'الشامية',
  'المغربية',
  'السودانية',
  'اليمنية',
  'العراقية',
  'الجزائرية',
  'التونسية',
  'الليبية',
  'البدوية',
  'الحجازية',
  'النجدية',
  'العمانية',
];

// اللغات المتاحة
const languages = [
  'العربية',
  'الإنجليزية',
  'الفرنسية',
  'الإسبانية',
  'الألمانية',
  'الإيطالية',
  'البرتغالية',
  'الروسية',
  'الصينية',
  'اليابانية',
  'الكورية',
  'الهندية',
  'الأوردو',
  'التركية',
  'الإندونيسية',
  'الماليزية',
  'الفارسية',
  'العبرية',
  'اليونانية',
  'التايلاندية',
  'البنغالية',
  'السويدية',
  'النرويجية',
  'الهولندية',
  'البولندية',
  'التشيكية',
  'الرومانية',
  'الفيتنامية',
  'الصربية',
  'الكرواتية',
  'الهنغارية',
  'الأوكرانية',
  'اللاتفية',
  'الليتوانية',
  'السلوفاكية',
  'السلوفينية',
  'الفنلندية',
  'الدنماركية',
  'البوسنية',
  'المقدونية',
  'النيبالية',
  'الأذرية',
  'الجورجية',
  'الأرمينية',
  'اللاوية',
  'الخميرية',
  'البشتو',
  'التاميلية',
  'التيلوجو',
  'الكانادية',
  'المالايالامية',
  'السينهالية',
  'السواحيلية',
  'الزولو',
  'الهاوسا',
  'الأمهرية',
  'اليوروبا',
  'الإيغبو',
  'الصومالية',
  'الكردية',
  'القبطية (لأغراض ثقافية)',
  'اللغة الفلبينية (تاغالوغ)',
  'اللغة البورمية',
  'اللغة التبتية',
  'اللغة الأويغورية',
  'لغة الإشارة'
];

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const contentType = searchParams.get('type');

  const [language, setLanguage] = useState('');
  const [dialect, setDialect] = useState('');
  const [domain, setDomain] = useState('');
  const [objective, setObjective] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!domain || !objective || (language === 'العربية' && !dialect)) {
      toast.error('الرجاء إكمال جميع الحقول');
      return;
    }

    setIsLoading(true);
    try {
      const content = await generateContent(
        contentType || '',
        domain,
        objective,
        language === 'العربية' ? dialect : language
      );
      setGeneratedContent(content);
      toast.success('تم توليد المحتوى بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء توليد المحتوى');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-blue-600 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-4xl font-extrabold text-center flex-1 text-blue-800 drop-shadow-sm">
            🎯 توليد المحتوى الذكي
          </h1>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          {/* اختيار اللغة */}
          <div>
            <label className="block text-blue-700 font-medium mb-2">🌐 اللغة</label>
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setDialect('');
              }}
              className="w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400"
            >
              <option value="">اختر اللغة</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* اللهجة */}
          {language === 'العربية' && (
            <div>
              <label className="block text-blue-700 font-medium mb-2">🗣️ اللهجة</label>
              <select
                value={dialect}
                onChange={(e) => setDialect(e.target.value)}
                className="w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400"
              >
                <option value="">اختر اللهجة</option>
                {dialects.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}

          {/* المجال */}
          <div>
            <label className="block text-blue-700 font-medium mb-2">🏢 المجال</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400"
            >
              <option value="">اختر المجال</option>
              {domains.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* الهدف */}
          <div>
            <label className="block text-blue-700 font-medium mb-2">🎯 الهدف</label>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400"
            >
              <option value="">اختر الهدف</option>
              {objectives.map((o, i) => (
                <option key={i} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* زر التوليد */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? '⏳ جاري التوليد...' : '⚡ توليد المحتوى'}
          </button>

          {/* عرض المحتوى */}
          {generatedContent && (
            <div className="mt-6 bg-gray-50 border border-gray-200 p-5 rounded-xl">
              <h2 className="text-xl font-bold text-blue-800 mb-4">📋 المحتوى المولد</h2>
              <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{generatedContent}</p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  className="flex-1 bg-blue-100 text-blue-800 font-medium py-2 rounded-xl hover:bg-blue-200"
                >
                  📋 نسخ
                </button>
                <button
                  onClick={() => {
                    const savedContent = {
                      id: Date.now().toString(),
                      content: generatedContent,
                      domain,
                      objective,
                      language,
                      dialect: language === 'العربية' ? dialect : undefined,
                      date: new Date().toISOString()
                    };
                    
                    // Get existing saved content
                    const existingContent = localStorage.getItem('savedContent');
                    const allContent = existingContent ? JSON.parse(existingContent) : [];
                    
                    // Add new content
                    allContent.unshift(savedContent);
                    
                    // Save back to localStorage
                    localStorage.setItem('savedContent', JSON.stringify(allContent));
                    
                    toast.success('تم حفظ المحتوى بنجاح');
                  }}
                  className="flex-1 bg-green-100 text-green-800 font-medium py-2 rounded-xl hover:bg-green-200"
                >
                  💾 حفظ
                </button>
                <button
                  onClick={() => setGeneratedContent('')}
                  className="flex-1 bg-red-100 text-red-700 font-medium py-2 rounded-xl hover:bg-red-200"
                >
                  🔁 توليد جديد
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
