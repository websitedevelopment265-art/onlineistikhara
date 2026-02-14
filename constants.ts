
import { NavItem, Service } from './types.ts';

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
    summary: 'Nur-ul-Huda is a sacred sanctuary for those seeking divine clarity. Hum aapki privacy aur trust ko sabse upar rakhte hain.',
    cta: 'Explore Our Sacred Legacy'
  },
  { 
    label: 'Love & Marriage', 
    urduLabel: 'پسند کی شادی', 
    href: '#marriage',
    children: [
      { 
        label: 'Pasand ki Shadi', 
        href: '#pasand',
        description: 'Allah ki madad se rishton ki rukawaton ko khatam karein.',
        benefits: ['PARENTAL CONSENT DUA', 'REMOVAL OF BANDISH']
      },
      { 
        label: 'Dua for Marriage', 
        href: '#dua-marriage',
        description: 'Quranic wazaif for mutual love and relationship bonding.',
        benefits: ['INCREASE IN MUHABBAT', 'PROPOSAL ACCEPTANCE']
      },
      { 
        label: 'Breakup Recovery', 
        href: '#breakup',
        description: 'Toote hue rishton ko jorne aur na-chaqi door karne ke liye roohani rehnumai.',
        benefits: ['EMOTIONAL HEALING', 'SABR & STRENGTH']
      },
      { 
        label: 'Manpasand Shadi', 
        href: '#manpasand',
        description: 'Seeking the path of happiness with your chosen partner.',
        benefits: ['SOCIAL ACCEPTANCE', 'MARITAL HARMONY']
      }
    ]
  },
  { 
    label: 'Family Problems', 
    urduLabel: 'خاندانی مسائل', 
    href: '#family',
    children: [
      { 
        label: 'Divorce Problem', 
        href: '#divorce',
        description: 'Talaq jaise sakht faisle se bachne ke liye azmooda wazaif.',
        benefits: ['STOPPING DIVORCE', 'EVIL EYE PROTECTION']
      },
      { 
        label: 'No Child Issue', 
        href: '#aulad',
        description: 'Aulad ki naimat se mehroom joron ke liye Quranic Shifa.',
        benefits: ['DUA OF ZAKARIYA (AS)', 'BANDISH REMOVAL']
      },
      { 
        label: 'Conflict Resolution', 
        href: '#harmony',
        description: 'Ghar ke roz marrah ke jhagray aur sakhti khatam karna.',
        benefits: ['PEACE AT HOME', 'FINANCIAL BARAKAH']
      },
      { 
        label: 'Gharloo Sukun', 
        href: '#domestic-peace',
        description: 'Ghar mein barkat aur apas ki muhabbat ko barhane ke liye.',
        benefits: ['HOME BARAKAH', 'STRESS RELIEF']
      }
    ]
  },
  { 
    label: 'Istikhara', 
    urduLabel: 'استخارہ', 
    href: '#istikhara',
    children: [
      { 
        label: 'Business Istikhara', 
        href: '#business-istikhara',
        description: 'Karobar mein barkat aur naye projects ke liye Allah se mashwara.',
        benefits: ['LOSS PREVENTION', 'STRATEGIC CLARITY']
      },
      { 
        label: 'Travel & Decisions', 
        href: '#travel-istikhara',
        description: 'Safar ki kamyabi aur hifazat ke liye istikhara.',
        benefits: ['TRAVEL SAFETY', 'PURPOSE SUCCESS']
      },
      { 
        label: 'Roohani Mashwara', 
        href: '#life-decisions',
        description: 'Zindagi ke ahem faislo mein ghalati se bachne ke liye.',
        benefits: ['REGRET PREVENTION', 'CONFIDENCE IN CHOICE']
      },
      { 
        label: 'Marriage Istikhara', 
        href: '#marriage-istikhara',
        description: 'Naye rishte ya shadi ke faisle se pehle Allah ki marzi.',
        benefits: ['RIGHT PARTNER', 'FUTURE CLARITY']
      }
    ]
  },
  { 
    label: 'Black Magic', 
    urduLabel: 'کالا جادو', 
    href: '#protection',
    children: [
      { 
        label: 'Kala Jadu Removal', 
        href: '#magic-removal',
        description: 'Sifli ilm aur har qism ke kale jadu ka mukammal khatma.',
        benefits: ['IMMEDIATE RELIEF', 'PERMANENT PROTECTION']
      },
      { 
        label: 'Nazar-e-Bad', 
        href: '#evil-eye',
        description: 'Hasid ki nazar aur buri quwwato se hifazat.',
        benefits: ['DAILY PROTECTION', 'HEALTH RESTORATION']
      },
      { 
        label: 'Bandish ka Khatma', 
        href: '#bandish',
        description: 'Karobar, shadi aur sehat mein har kism ki bandish ka torh.',
        benefits: ['PATH OPENING', 'SUCCESS MULTIPLIER']
      },
      { 
        label: 'Hifazati Hisar', 
        href: '#spiritual-shield',
        description: 'Apne ghar aur karobar ko hamesha ke liye mehfooz rakhein.',
        benefits: ['HOUSE SHIELDING', 'ENEMY PROTECTION']
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
