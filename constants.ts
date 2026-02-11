
import { NavItem, Service } from './types';

export const NAV_ITEMS: NavItem[] = [
  { 
    label: 'Home', 
    urduLabel: 'ہوم', 
    href: '#' 
  },
  { 
    label: 'About Us', 
    urduLabel: 'ہمارے بارے میں', 
    href: '#about',
    summary: 'Nur-ul-Huda is a sacred sanctuary for those seeking divine clarity. Hum aapki privacy aur trust ko sabse upar rakhte hain, providing authentic Roohani guidance rooted in Quran & Sunnah.',
    cta: 'Explore Our Sacred Legacy'
  },
  { 
    label: 'Love & Marriage', 
    urduLabel: 'پسند کی شادی', 
    href: '#marriage',
    summary: 'Allah ki hidayat se apni azdawaji zindagi ko khush-gawar banayein. Halal solutions for hearts seeking peace.',
    cta: 'Consult for Marriage Success',
    children: [
      { 
        label: 'Pasand ki Shadi', 
        href: '#pasand',
        description: 'Parents ko manane aur shadi mein rukawat door karne ka masnoon hal. Seek blessings for your union.',
        benefits: ['Parental Consent Dua', 'Removal of Bandish', 'Barakah in Rishta']
      },
      { 
        label: 'Dua for Marriage', 
        href: '#dua-marriage',
        description: 'Quran-o-Sunnah se makhsoos duayein jo dilo mein mohabbat aur wafa paida karti hain.',
        benefits: ['Increase in Muhabbat', 'Proposal Acceptance', 'Azdawaji Sukun']
      },
      { 
        label: 'Breakup Solution', 
        href: '#breakup',
        description: 'Toote hue rishton ko jorne aur na-chaqi door karne ke liye roohani rehnumai aur sabr.',
        benefits: ['Emotional Healing', 'Sabr & Strength', 'Relationship Restore']
      }
    ]
  },
  { 
    label: 'Family Problems', 
    urduLabel: 'خاندانی مسائل', 
    href: '#family',
    summary: 'Ghar ko sukun ka gahwara banane ke liye Quranic rehnumai. Restore Rahma and love in your household.',
    cta: 'Heal Your Home Today',
    children: [
      { 
        label: 'Divorce Problem', 
        href: '#divorce',
        description: 'Talaq ke masail aur mian biwi ke darmiyan shadeed jhagray khatam karne ka hal.',
        benefits: ['Stopping Divorce', 'Evil Eye Protection', 'Heart Softening']
      },
      { 
        label: 'No Child Issue', 
        href: '#aulad',
        description: 'Aulad ki bandish aur be-auladi ke masail ka Quranic Shifa se mukammal hal.',
        benefits: ['Dua of Zakariya (AS)', 'Bandish Removal', 'Healthy Offspring']
      },
      { 
        label: 'Gharloo Na-chaqi', 
        href: '#harmony',
        description: 'Ghar ke roz marrah ke jhagray aur sakhti khatam kar ke aman-o-aman paida karna.',
        benefits: ['Peace at Home', 'Financial Barakah', 'Mutual Respect']
      }
    ]
  },
  { 
    label: 'Istikhara', 
    urduLabel: 'استخارہ', 
    href: '#istikhara',
    summary: 'Seeking Allah’s counsel for life’s most pivotal moments. Prophets followed this path, and so should we.',
    cta: 'Request Divine Guidance',
    children: [
      { 
        label: 'Business Istikhara', 
        href: '#business-istikhara',
        description: 'Karobar mein barkat aur naye projects ke liye Allah se mashwara aur behtari ki dua.',
        benefits: ['Loss Prevention', 'Strategic Clarity', 'Divine Approval']
      },
      { 
        label: 'Travel Istikhara', 
        href: '#travel-istikhara',
        description: 'Safar ki kamyabi aur hifazat ke liye istikhara taake safar ba-khair-o-afiyat ho.',
        benefits: ['Travel Safety', 'Purpose Success', 'Peace of Mind']
      },
      { 
        label: 'Life Decisions', 
        href: '#life-decisions',
        description: 'Zindagi ke ahem faislo mein ghalati se bachne ke liye masnoon istikhara.',
        benefits: ['Regret Prevention', 'Confidence in Choice', 'Spiritual Backing']
      }
    ]
  },
  { 
    label: 'Black Magic', 
    urduLabel: 'کالا جادو', 
    href: '#protection',
    summary: 'Complete shield from the unseen harms. Nazar-e-bad aur dushmano ke shar se hifazat ka taqatwar hal.',
    cta: 'Get Your Spiritual Shield',
    children: [
      { 
        label: 'Kala Jadu ka Torh', 
        href: '#magic-removal',
        description: 'Sihr aur jadu ke asrat ko Quran ki ayato aur masnoon duao se jarr se khatam karein.',
        benefits: ['Immediate Relief', 'Permanent Protection', 'Negative Energy Purge']
      },
      { 
        label: 'Nazar-e-Bad', 
        href: '#evil-eye',
        description: 'Hasid ki nazar aur buri quwwato se hifazat ke liye Quranic Shifa aur hifazati azkar.',
        benefits: ['Daily Protection', 'Health Restoration', 'Shielding for Kids']
      },
      { 
        label: 'Bandish ka Khatma', 
        href: '#bandish',
        description: 'Karobar, shadi aur sehat mein har kism ki bandish ka roohani torh.',
        benefits: ['Path Opening', 'Success Multiplier', 'Psychological Peace']
      }
    ]
  },
];

export const SERVICES: Service[] = [
  {
    id: 'istikhara-marriage',
    title: 'Istikhara for Marriage',
    urduTitle: 'شادی کے لیے استخارہ',
    description: 'Allah ki raza aur hidayat se apne jeevan sathi ka sahi intekhab karein.',
    icon: 'Heart',
  },
  {
    id: 'business-growth',
    title: 'Business Growth',
    urduTitle: 'کاروبار میں ترقی',
    description: 'Karobar mein barkat aur naye projects ke liye masnoon duayein aur mashwara.',
    icon: 'TrendingUp',
  },
  {
    id: 'family-harmony',
    title: 'Family Harmony',
    urduTitle: 'گھریلو ہم آہنگی',
    description: 'Gharloo jhagray aur pareshaniyon ka Quran-o-Sunnah ki roshni mein hal.',
    icon: 'Users',
  },
  {
    id: 'spiritual-healing',
    title: 'Spiritual Healing',
    urduTitle: 'روحانی علاج',
    description: 'Dil aur demagh ke sukoon ke liye makhsoos roohani azkar aur ilaj.',
    icon: 'Sparkles',
  },
  {
    id: 'career-success',
    title: 'Success in Career',
    urduTitle: 'کیریئر میں کامیابی',
    description: 'Job aur career mein rukawaton ko door karne ke liye roohani rehnumai.',
    icon: 'Briefcase',
  },
  {
    id: 'protection-hifazat',
    title: 'Protection (Hifazat)',
    urduTitle: 'حفاظت',
    description: 'Nazar-e-bad aur dushmano ke shar se hifazat ke liye Quranic wazaif.',
    icon: 'Shield',
  },
];
