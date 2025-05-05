import { LogoStyle, LetteringStyle } from '../components/LogoPreview';

// Design Knowledge Database with industry and audience-specific recommendations
interface DesignRecommendation {
  styles: LogoStyle[];
  colors: string[];
  letteringStyles: LetteringStyle[];
  advice: string;
  fontRecommendations?: string[];
  iconTypes?: string[];
}

interface IndustrySubcategory {
  [subcategory: string]: DesignRecommendation;
}

interface IndustryDatabase {
  [key: string]: DesignRecommendation & {
    subcategories?: IndustrySubcategory;
  };
}

interface AudienceDatabase {
  [key: string]: Omit<DesignRecommendation, 'colors'>;
}

interface DesignKnowledge {
  industry: IndustryDatabase;
  audience: AudienceDatabase;
  principles: Record<string, string>;
  colorTheory: Record<string, string>;
  logoTypes: Record<string, string>;
  letterCustomization: Record<string, string>;
}

const designKnowledge: DesignKnowledge = {
  industry: {
    tech: {
      styles: ['tech', 'minimalist', 'abstract'],
      colors: ['#3B82F6', '#0EA5E9', '#2563EB', '#64748B', '#334155'],
      letteringStyles: ['geometric', 'modern'],
      advice: "Tech logos are often geometric and minimalist with clean lines. Use modern typography and blue/gray color palettes.",
      fontRecommendations: ['sans', 'mono', 'helvetica'],
      iconTypes: ['abstract1', 'cube', 'hexagon'],
      subcategories: {
        'software': {
          styles: ['tech', 'minimalist', 'abstract'],
          colors: ['#3B82F6', '#0EA5E9', '#2563EB', '#64748B', '#334155'],
          letteringStyles: ['geometric', 'modern'],
          advice: "Software companies typically use clean, minimal logos with blue tones to convey reliability and innovation.",
          fontRecommendations: ['sans', 'mono', 'helvetica']
        },
        'hardware': {
          styles: ['tech', 'corporate', 'minimalist'],
          colors: ['#1E293B', '#475569', '#0EA5E9', '#334155', '#0F172A'],
          letteringStyles: ['geometric', 'modern'],
          advice: "Hardware companies often use solid, substantial letterforms with darker blues and grays to convey durability.",
          fontRecommendations: ['sans', 'helvetica', 'roboto']
        },
        'ai': {
          styles: ['tech', 'abstract', 'minimalist'],
          colors: ['#8B5CF6', '#6366F1', '#3B82F6', '#EC4899', '#1E293B'],
          letteringStyles: ['geometric', 'modern'],
          advice: "AI companies often use purple and blue tones with abstract elements to convey innovation and intelligence.",
          fontRecommendations: ['helvetica', 'sans', 'futura']
        }
      }
    },
    finance: {
      styles: ['corporate', 'premium', 'minimalist'],
      colors: ['#1E3A8A', '#0F172A', '#0C4A6E', '#365314', '#1E293B'],
      letteringStyles: ['classic', 'geometric'],
      advice: "Financial logos should convey trust and stability with traditional styling. Use deep blues, greens, or navy colors.",
      fontRecommendations: ['serif', 'helvetica', 'garamond'],
      iconTypes: ['shield', 'diamond', 'target'],
      subcategories: {
        'banking': {
          styles: ['corporate', 'premium', 'minimalist'],
          colors: ['#1E3A8A', '#0F172A', '#0C4A6E', '#365314', '#1E293B'],
          letteringStyles: ['classic', 'geometric'],
          advice: "Banking logos should convey stability and security with traditional styling and deep blue tones.",
          fontRecommendations: ['serif', 'helvetica', 'garamond']
        },
        'insurance': {
          styles: ['corporate', 'premium', 'minimalist'],
          colors: ['#1E3A8A', '#0F172A', '#0C4A6E', '#365314', '#1E293B'],
          letteringStyles: ['classic', 'geometric'],
          advice: "Insurance logos should evoke protection and reliability with shield-like elements and stable typography.",
          fontRecommendations: ['serif', 'helvetica', 'garamond']
        },
        'fintech': {
          styles: ['tech', 'minimalist', 'corporate'],
          colors: ['#0EA5E9', '#3B82F6', '#6366F1', '#1E293B', '#0F172A'],
          letteringStyles: ['geometric', 'modern'],
          advice: "Fintech combines financial stability with tech innovation. Use blue tones with more modern, geometric shapes.",
          fontRecommendations: ['sans', 'helvetica', 'mono']
        }
      }
    },
    creative: {
      styles: ['creative', 'abstract', 'calligraphic'],
      colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981', '#06B6D4'],
      letteringStyles: ['organic', 'abstract'],
      advice: "Creative industry logos can be more expressive. Use vibrant colors and unique letterforms that stand out.",
      fontRecommendations: ['display', 'montserrat', 'futura'],
      iconTypes: ['circle', 'abstract1', 'infinity'],
      subcategories: {
        'design': {
          styles: ['creative', 'abstract', 'minimalist'],
          colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981', '#06B6D4'],
          letteringStyles: ['organic', 'abstract'],
          advice: "Design agencies can showcase their creativity through unexpected color pairings and unique typography.",
          fontRecommendations: ['montserrat', 'futura', 'display']
        },
        'photography': {
          styles: ['minimalist', 'creative', 'abstract'],
          colors: ['#1E1E1E', '#475569', '#F59E0B', '#3B82F6', '#EC4899'],
          letteringStyles: ['modern', 'geometric'],
          advice: "Photography logos often use black with accent colors, and simple forms that suggest a camera, lens, or aperture.",
          fontRecommendations: ['helvetica', 'futura', 'montserrat']
        },
        'art': {
          styles: ['creative', 'abstract', 'calligraphic'],
          colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4', '#10B981'],
          letteringStyles: ['organic', 'abstract'],
          advice: "Art-related brands can be more expressive and avant-garde, with unique letterforms and vibrant colors.",
          fontRecommendations: ['display', 'serif', 'garamond']
        }
      }
    },
    luxury: {
      styles: ['luxury', 'premium', 'calligraphic'],
      colors: ['#DFBD69', '#A67C00', '#FBBF24', '#1E293B', '#1E1E1E'],
      letteringStyles: ['classic', 'modern'],
      advice: "Luxury brands benefit from refined, elegant logos. Consider gold tones, serif typography, and classic styling.",
      fontRecommendations: ['display', 'garamond', 'serif'],
      iconTypes: ['diamond', 'star', 'infinity'],
      subcategories: {
        'fashion': {
          styles: ['luxury', 'premium', 'minimalist'],
          colors: ['#1E1E1E', '#DFBD69', '#A67C00', '#F5F5F4', '#FBBF24'],
          letteringStyles: ['classic', 'modern'],
          advice: "Fashion logos are often minimal and elegant, with high contrast and sophisticated typography.",
          fontRecommendations: ['display', 'serif', 'garamond']
        },
        'jewelry': {
          styles: ['luxury', 'premium', 'calligraphic'],
          colors: ['#DFBD69', '#A67C00', '#FBBF24', '#1E293B', '#1E1E1E'],
          letteringStyles: ['classic', 'modern'],
          advice: "Jewelry brands benefit from gold tones and elegant, refined typography with generous spacing.",
          fontRecommendations: ['garamond', 'serif', 'display']
        },
        'automotive': {
          styles: ['premium', 'minimalist', 'luxury'],
          colors: ['#1E1E1E', '#0F172A', '#71717A', '#DFBD69', '#E5E5E5'],
          letteringStyles: ['classic', 'geometric'],
          advice: "Luxury automotive logos convey precision and heritage with emblematic designs and classic typography.",
          fontRecommendations: ['serif', 'helvetica', 'futura']
        }
      }
    },
    healthcare: {
      styles: ['organic', 'minimalist', 'corporate'],
      colors: ['#06B6D4', '#0E7490', '#0D9488', '#22C55E', '#2563EB'],
      letteringStyles: ['modern', 'geometric'],
      advice: "Healthcare logos often use blues and greens to convey trust and wellness. Keep forms clean and approachable.",
      fontRecommendations: ['opensans', 'roboto', 'sans'],
      iconTypes: ['circle', 'leaf', 'shield'],
      subcategories: {
        'medical': {
          styles: ['corporate', 'minimalist', 'organic'],
          colors: ['#2563EB', '#06B6D4', '#0E7490', '#0D9488', '#22C55E'],
          letteringStyles: ['modern', 'geometric'],
          advice: "Medical organizations typically use cool blues to convey professionalism, cleanliness and trust.",
          fontRecommendations: ['sans', 'roboto', 'helvetica']
        },
        'wellness': {
          styles: ['organic', 'minimalist', 'creative'],
          colors: ['#22C55E', '#10B981', '#0D9488', '#06B6D4', '#34D399'],
          letteringStyles: ['organic', 'modern'],
          advice: "Wellness brands use greens and teals with organic shapes to convey natural health and vitality.",
          fontRecommendations: ['opensans', 'montserrat', 'display']
        },
        'pharmaceutical': {
          styles: ['corporate', 'minimalist', 'tech'],
          colors: ['#2563EB', '#1E40AF', '#0E7490', '#1E293B', '#0F172A'],
          letteringStyles: ['modern', 'geometric'],
          advice: "Pharmaceutical logos need to convey scientific precision and reliability with clean, stable forms.",
          fontRecommendations: ['sans', 'helvetica', 'roboto']
        }
      }
    },
    food: {
      styles: ['organic', 'vintage', 'creative'],
      colors: ['#CA8A04', '#16A34A', '#DC2626', '#EA580C', '#D97706'],
      letteringStyles: ['organic', 'classic'],
      advice: "Food brands typically use warm, appetizing colors like reds, oranges, and greens. Opt for friendly, approachable forms.",
      fontRecommendations: ['display', 'opensans', 'futura'],
      iconTypes: ['leaf', 'circle', 'star'],
      subcategories: {
        'restaurant': {
          styles: ['vintage', 'organic', 'premium'],
          colors: ['#DC2626', '#EA580C', '#D97706', '#CA8A04', '#16A34A'],
          letteringStyles: ['classic', 'organic'],
          advice: "Restaurant logos often incorporate warm, appetizing colors with typography that reflects the cuisine style.",
          fontRecommendations: ['display', 'serif', 'garamond']
        },
        'grocery': {
          styles: ['organic', 'corporate', 'minimalist'],
          colors: ['#16A34A', '#CA8A04', '#0D9488', '#0E7490', '#22C55E'],
          letteringStyles: ['modern', 'organic'],
          advice: "Grocery stores often use green tones to suggest freshness, with clean typography for easy identification.",
          fontRecommendations: ['sans', 'opensans', 'montserrat']
        },
        'bakery': {
          styles: ['vintage', 'organic', 'calligraphic'],
          colors: ['#D97706', '#CA8A04', '#A16207', '#7C2D12', '#DC2626'],
          letteringStyles: ['classic', 'organic'],
          advice: "Bakery logos often use warm browns and yellows with script or hand-drawn typography for a handcrafted feel.",
          fontRecommendations: ['display', 'serif', 'garamond']
        },
        'coffee': {
          styles: ['vintage', 'organic', 'minimalist'],
          colors: ['#A16207', '#78350F', '#7C2D12', '#44403C', '#1C1917'],
          letteringStyles: ['classic', 'organic'],
          advice: "Coffee brands typically use rich browns with vintage or hand-crafted typography that suggests artisanal quality.",
          fontRecommendations: ['serif', 'display', 'garamond']
        }
      }
    },
    construction: {
      styles: ['corporate', 'tech', 'minimalist'],
      colors: ['#F59E0B', '#B45309', '#292524', '#78716C', '#0C4A6E'],
      letteringStyles: ['geometric', 'modern'],
      advice: "Construction logos benefit from strong, solid typography and industrial colors like yellows, blacks, and blues.",
      fontRecommendations: ['sans', 'helvetica', 'roboto'],
      iconTypes: ['triangle', 'hexagon', 'cube']
    },
    education: {
      styles: ['corporate', 'premium', 'minimalist'],
      colors: ['#4338CA', '#1E40AF', '#0E7490', '#1E293B', '#10B981'],
      letteringStyles: ['classic', 'modern'],
      advice: "Educational institutions typically use traditional colors like blues and greens with classic typography to convey knowledge and trust.",
      fontRecommendations: ['serif', 'garamond', 'montserrat'],
      iconTypes: ['shield', 'star', 'circle'],
      subcategories: {
        'university': {
          styles: ['premium', 'corporate', 'vintage'],
          colors: ['#4338CA', '#1E40AF', '#1E293B', '#0F172A', '#0E7490'],
          letteringStyles: ['classic', 'geometric'],
          advice: "Universities often use traditional shields or emblems with serif typography to convey heritage and prestige.",
          fontRecommendations: ['serif', 'garamond', 'display']
        },
        'school': {
          styles: ['corporate', 'premium', 'minimalist'],
          colors: ['#2563EB', '#4338CA', '#0E7490', '#10B981', '#0D9488'],
          letteringStyles: ['classic', 'modern'],
          advice: "K-12 schools typically use blues and greens with approachable typography that balances tradition with accessibility.",
          fontRecommendations: ['serif', 'opensans', 'montserrat']
        },
        'online learning': {
          styles: ['tech', 'minimalist', 'corporate'],
          colors: ['#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#10B981'],
          letteringStyles: ['modern', 'geometric'],
          advice: "Online education platforms use modern, tech-inspired logos with bright blue tones to suggest digital innovation.",
          fontRecommendations: ['sans', 'roboto', 'helvetica']
        }
      }
    },
    entertainment: {
      styles: ['creative', 'abstract', '3d'],
      colors: ['#9333EA', '#EC4899', '#F43F5E', '#8B5CF6', '#F59E0B'],
      letteringStyles: ['abstract', 'modern'],
      advice: "Entertainment logos can be bold and expressive with bright colors and dynamic typography that creates excitement.",
      fontRecommendations: ['display', 'futura', 'montserrat'],
      iconTypes: ['star', 'lightning', 'abstract1'],
      subcategories: {
        'gaming': {
          styles: ['tech', 'abstract', '3d'],
          colors: ['#8B5CF6', '#6366F1', '#3B82F6', '#EC4899', '#F43F5E'],
          letteringStyles: ['abstract', 'geometric'],
          advice: "Gaming logos often use vibrant colors with bold, dynamic forms that suggest action and excitement.",
          fontRecommendations: ['futura', 'montserrat', 'sans']
        },
        'music': {
          styles: ['creative', 'abstract', 'minimalist'],
          colors: ['#9333EA', '#8B5CF6', '#EC4899', '#1E1E1E', '#F43F5E'],
          letteringStyles: ['abstract', 'modern'],
          advice: "Music brands can use rhythmic, flowing forms with high-energy colors to suggest sound and movement.",
          fontRecommendations: ['display', 'futura', 'helvetica']
        },
        'film': {
          styles: ['premium', 'creative', 'minimalist'],
          colors: ['#1E1E1E', '#0F172A', '#F59E0B', '#FBBF24', '#F43F5E'],
          letteringStyles: ['classic', 'modern'],
          advice: "Film studios often use star icons or spotlight effects with elegant typography to suggest cinematic quality.",
          fontRecommendations: ['display', 'serif', 'montserrat']
        }
      }
    },
    retail: {
      styles: ['minimalist', 'creative', 'premium'],
      colors: ['#F43F5E', '#0EA5E9', '#10B981', '#6366F1', '#1E293B'],
      letteringStyles: ['modern', 'geometric'],
      advice: "Retail brands often benefit from clean, versatile logos that work well across different merchandise and signage.",
      fontRecommendations: ['sans', 'helvetica', 'montserrat'],
      iconTypes: ['diamond', 'circle', 'infinity'],
      subcategories: {
        'clothing': {
          styles: ['minimalist', 'luxury', 'premium'],
          colors: ['#1E1E1E', '#0F172A', '#71717A', '#F43F5E', '#F5F5F4'],
          letteringStyles: ['modern', 'classic'],
          advice: "Clothing brands often use minimal, elegant typography with high contrast to create a fashion-forward impression.",
          fontRecommendations: ['helvetica', 'futura', 'display']
        },
        'electronics': {
          styles: ['tech', 'minimalist', 'corporate'],
          colors: ['#3B82F6', '#0EA5E9', '#0F172A', '#1E293B', '#6366F1'],
          letteringStyles: ['geometric', 'modern'],
          advice: "Electronics retailers typically use tech-inspired blue tones with clean, modern typography for a contemporary feel.",
          fontRecommendations: ['sans', 'helvetica', 'roboto']
        },
        'home goods': {
          styles: ['minimalist', 'organic', 'premium'],
          colors: ['#0D9488', '#10B981', '#0E7490', '#292524', '#44403C'],
          letteringStyles: ['modern', 'organic'],
          advice: "Home goods retailers often use earthy tones with clean typography to suggest comfort, style, and quality.",
          fontRecommendations: ['montserrat', 'opensans', 'helvetica']
        }
      }
    }
  },
  
  audience: {
    professional: {
      styles: ['corporate', 'minimalist', 'premium'],
      letteringStyles: ['geometric', 'classic', 'modern'],
      advice: "For professional audiences, focus on clean, legible designs with restrained color palettes. Avoid overly decorative elements.",
      fontRecommendations: ['helvetica', 'serif', 'garamond']
    },
    youthful: {
      styles: ['creative', 'abstract', 'tech'],
      letteringStyles: ['geometric', 'abstract', 'modern'],
      advice: "Younger audiences respond to bold, dynamic logos with vibrant colors and contemporary styling.",
      fontRecommendations: ['futura', 'montserrat', 'opensans']
    },
    traditional: {
      styles: ['vintage', 'luxury', 'calligraphic'],
      letteringStyles: ['classic', 'organic'],
      advice: "Traditional audiences appreciate familiar, time-tested designs. Consider serif fonts and conventional layouts.",
      fontRecommendations: ['serif', 'garamond', 'display']
    },
    upscale: {
      styles: ['luxury', 'premium', 'minimalist'],
      letteringStyles: ['classic', 'modern'],
      advice: "Upscale audiences value sophistication and exclusivity. Use refined typography and elegant spacing.",
      fontRecommendations: ['display', 'garamond', 'serif']
    },
    technical: {
      styles: ['tech', 'minimalist', 'corporate'],
      letteringStyles: ['geometric', 'modern'],
      advice: "Technical audiences respond well to precise, functional design with a focus on clarity and logic.",
      fontRecommendations: ['mono', 'helvetica', 'sans']
    },
    family: {
      styles: ['organic', 'creative', 'premium'],
      letteringStyles: ['organic', 'modern'],
      advice: "Family-oriented brands benefit from friendly, approachable logos with warm colors and rounded shapes.",
      fontRecommendations: ['opensans', 'montserrat', 'display']
    },
    seniors: {
      styles: ['vintage', 'premium', 'corporate'],
      letteringStyles: ['classic', 'geometric'],
      advice: "Senior audiences appreciate clear, legible designs with adequate contrast and traditional styling.",
      fontRecommendations: ['serif', 'opensans', 'garamond']
    },
    multicultural: {
      styles: ['minimalist', 'creative', 'premium'],
      letteringStyles: ['modern', 'geometric'],
      advice: "For diverse audiences, focus on universal design principles, clear symbolism, and culturally neutral colors.",
      fontRecommendations: ['sans', 'helvetica', 'montserrat']
    },
    luxury_consumer: {
      styles: ['luxury', 'premium', 'minimalist'],
      letteringStyles: ['classic', 'modern'],
      advice: "Luxury consumers respond to understated elegance, refined details, and premium materials in design.",
      fontRecommendations: ['display', 'garamond', 'serif']
    },
    eco_conscious: {
      styles: ['organic', 'minimalist', 'creative'],
      letteringStyles: ['organic', 'modern'],
      advice: "Environmentally conscious audiences appreciate natural colors, organic forms, and sustainable design cues.",
      fontRecommendations: ['opensans', 'montserrat', 'futura']
    }
  },
  
  principles: {
    simplicity: "The best logos are often simple and memorable. Avoid unnecessary complexity.",
    versatility: "Great logos work across different sizes and mediums. Test at very small sizes for legibility.",
    distinctiveness: "Your logo should be distinguishable from competitors. Find your unique visual element.",
    relevance: "The style should align with your industry and values. A playful style works for a toy company, not a law firm.",
    timelessness: "Avoid extremely trendy elements that will look dated quickly. Aim for longevity.",
    balance: "Elements should be well-proportioned and visually balanced. Consider weight distribution carefully.",
    scalability: "Ensure your logo works at both small (favicon) and large (billboard) sizes without losing detail."
  },
  
  colorTheory: {
    blue: "Conveys trust, stability, professionalism, and calm. Popular in finance, tech, and healthcare.",
    red: "Evokes energy, excitement, passion, and urgency. Effective for food, entertainment, and calls to action.",
    green: "Represents growth, health, nature, and wealth. Common in healthcare, finance, and eco-friendly brands.",
    yellow: "Communicates optimism, clarity, warmth, and caution. Used for attention-grabbing elements.",
    purple: "Associated with creativity, luxury, wisdom, and spirituality. Popular in beauty and premium brands.",
    orange: "Suggests enthusiasm, creativity, determination, and affordability. Effective for calls to action.",
    black: "Conveys sophistication, authority, elegance, and power. Common in luxury and premium brands.",
    white: "Represents simplicity, purity, cleanliness, and minimalism. Creates breathing space in designs."
  },
  
  logoTypes: {
    wordmark: "Typography-based logos that clearly spell out the company name. Good for establishing brand recognition.",
    lettermark: "Monogram-style logos using initials or abbreviations. Ideal for long company names that need simplification.",
    pictorial: "Graphic symbols or icons that represent the brand. Works well when you have an established presence.",
    abstract: "Geometric forms that create a unique visual identity. Good for creating distinctive, ownable brand assets.",
    mascot: "Character-based logos that create a friendly brand ambassador. Popular for family and food brands.",
    emblem: "Badge or seal-style logos that combine text and symbol. Traditional, authoritative appearance.",
    combination: "Integrates wordmark with a symbol, providing flexibility to use elements separately or together."
  },
  
  letterCustomization: {
    firstLetter: "The first letter often receives special treatment, with larger size or unique styling to create emphasis.",
    substitution: "Replace a letter with a related symbol or icon to add visual interest (e.g., an orange slice for the 'O').",
    ligature: "Connect certain letter pairs to create a unified, flowing form across the wordmark.",
    distortion: "Selectively stretch, compress, or warp specific letters to create energy or emphasis.",
    negative: "Use negative space within a letter to reveal a symbol or secondary meaning.",
    deconstructed: "Break a letter into component parts while maintaining recognition.",
    embellishment: "Add decorative elements to specific letters to enhance their visual appeal.",
    geometric: "Rebuild letters using consistent geometric shapes for a cohesive, modern look.",
    "3d": "Apply perspective or dimensional effects to make certain letters appear three-dimensional.",
    custom: "Create completely custom letterforms for key characters that become signature elements."
  }
};

export default designKnowledge; 