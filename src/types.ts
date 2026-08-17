export interface DimensionScore {
  score: number;
  label: string;
  summary: string;
}

export interface StrengthItem {
  title: string;
  category: 'Layout' | 'Visuals' | 'CRO' | 'Typography' | 'Accessibility' | 'UX';
  description: string;
}

export interface BottleneckItem {
  title: string;
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  recommendation: string;
}

export interface ActionableRecommendation {
  title: string;
  priority: 'P0 - Immediate' | 'P1 - High Impact' | 'P2 - Optimization';
  effort: 'Quick Win (< 1 hr)' | 'Moderate (1-3 hrs)' | 'Complex (3+ hrs)';
  estimatedLift: string;
  stepByStep: string[];
}

export interface ColorItem {
  hex: string;
  name: string;
  role: 'Primary' | 'Secondary' | 'Accent' | 'Background' | 'Surface' | 'Text' | 'Border';
  contrastPass: boolean;
  contrastRatio?: string;
}

export interface AccessibilityCheck {
  criterion: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
}

export interface UxAuditReportData {
  overallScore: number;
  scoreVerdict: string;
  summary: string;
  estimatedConversionLift: string;
  dimensionScores: {
    visualHierarchy: DimensionScore;
    conversionPower: DimensionScore;
    accessibilityContrast: DimensionScore;
    typographySpacing: DimensionScore;
    mobileReadiness: DimensionScore;
  };
  strengths: StrengthItem[];
  bottlenecks: BottleneckItem[];
  recommendations: ActionableRecommendation[];
  colorPalette: ColorItem[];
  accessibilityChecks: AccessibilityCheck[];
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  componentName: string;
  description: string;
  reactTsxCode: string;
  tailwindHtmlCode: string;
  appRouterPageCode: string;
  apiRouteCode: string;
  audit: UxAuditReportData;
  sourceImage: string; // base64 or URL
  imageSpecs?: {
    width?: number;
    height?: number;
    sizeKb?: number;
    mimeType?: string;
  };
}

export interface PresetSample {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  data: AnalysisResult;
}
