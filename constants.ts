
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
        description: 'Allah ki madad se rishton ki rukawaton ko khatam karein. Hum Quran-o-Sunnah ke mutabiq aapki pasand ki shadi mein anay wali mushkilat ka hal nikaalte hain.',
        benefits: ['Parental Consent Dua', 'Removal of Bandish', 'Barakah in Rishta']
      },
      { 
        label: 'Dua for Marriage', 
        href: '#dua-marriage',
        description: 'Quranic wazaif for mutual love and relationship bonding to bring hearts closer together in a halal manner. Wazaif that instill loyalty and affection.',
        benefits: ['Increase in Muhabbat', 'Proposal Acceptance', 'Azdawaji Sukun']
      },
      { 
        label: 'Breakup Recovery', 
        href: '#breakup',
        description: 'Toote hue rishton ko jorne aur na-chaqi door karne ke liye roohani rehnumai aur sabr. Healing emotional wounds through divine remembrance.',
        benefits: ['Emotional Healing', 'Sabr & Strength', 'Relationship Restore']
      },
      { 
        label: 'Manpasand Shadi', 
        href: '#manpasand',
        description: 'Seeking the path of happiness with your chosen partner under divine guidance. We help navigate the social and spiritual hurdles of your union.',
        benefits: ['Social Acceptance', 'Marital Harmony', 'Divine Protection']
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
        description: 'Talaq jaise sakht faisle se bachne aur ghar ko dobara abad karne ke liye azmooda wazaif. Healing broken ties and softening hardened hearts.',
        benefits: ['Stopping Divorce', 'Evil Eye Protection', 'Heart Softening']
      },
      { 
        label: 'No Child Issue', 
        href: '#aulad',
        description: 'Aulad ki naimat se mehroom joron ke liye Quranic Shifa aur khas roohani ilaj. Seeking the miracle of birth through the Dua of Zakariya (AS).',
        benefits: ['Dua of Zakariya (AS)', 'Bandish Removal', 'Healthy Offspring']
      },
      { 
        label: 'Conflict Resolution', 
        href: '#harmony',
        description: 'Ghar ke roz marrah ke jhagray aur sakhti khatam kar ke aman-o-aman paida karna. Bringing Rahma back to the family dinner table.',
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
        description: 'Karobar mein barkat aur naye projects ke liye Allah se mashwara aur behtari ki dua. Ensuring your investments are backed by divine approval.',
        benefits: ['Loss Prevention', 'Strategic Clarity', 'Divine Approval']
      },
      { 
        label: 'Travel & Decisions', 
        href: '#travel-istikhara',
        description: 'Safar ki kamyabi aur hifazat ke liye istikhara taake safar ba-khair-o-afiyat ho. Guidance for migrations, relocation, and life-changing choices.',
        benefits: ['Travel Safety', 'Purpose Success', 'Peace of Mind']
      },
      { 
        label: 'Roohani Mashwara', 
        href: '#life-decisions',
        description: 'Zindagi ke ahem faislo mein ghalati se bachne ke liye masnoon istikhara and spiritual consultation for clarity of soul.',
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
        label: 'Kala Jadu Removal', 
        href: '#magic-removal',
        description: 'Sifli ilm aur har qism ke kale jadu ka Quran-e-Pak ki ayats se mukammal khatma. Pure spiritual cleansing from negative energy.',
        benefits: ['Immediate Relief', 'Permanent Protection', 'Negative Energy Purge']
      },
      { 
        label: 'Nazar-e-Bad', 
        href: '#evil-eye',
        description: 'Hasid ki nazar aur buri quwwato se hifazat ke liye Quranic Shifa aur hifazati azkar. Protecting your health and children from envy.',
        benefits: ['Daily Protection', 'Health Restoration', 'Shielding for Kids']
      },
      { 
        label: 'Bandish ka Khatma', 
        href: '#bandish',
        description: 'Karobar, shadi aur sehat mein har kism ki bandish ka roohani torh. Opening the closed doors of Rizq and opportunity.',
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
